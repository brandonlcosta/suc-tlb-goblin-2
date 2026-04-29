$ErrorActionPreference = "Stop"

$TaskName = "STLB Full Goblin Main"
$RepoRoot = "C:\dev\suc-tlb-goblin-2"
$RunnerPath = Join-Path $RepoRoot "scripts\run-goblin-main.ps1"

if (-not (Test-Path $RunnerPath)) {
  throw "Missing runner script: $RunnerPath"
}

$ExistingTask = Get-ScheduledTask -TaskName $TaskName -ErrorAction SilentlyContinue
if ($ExistingTask) {
  Unregister-ScheduledTask -TaskName $TaskName -Confirm:$false
}

$Action = New-ScheduledTaskAction `
  -Execute "powershell.exe" `
  -Argument "-NoProfile -ExecutionPolicy Bypass -File `"$RunnerPath`"" `
  -WorkingDirectory $RepoRoot

$Trigger = New-ScheduledTaskTrigger `
  -Once `
  -At (Get-Date).AddMinutes(1) `
  -RepetitionInterval (New-TimeSpan -Minutes 15) `
  -RepetitionDuration (New-TimeSpan -Days 3650)

$Settings = New-ScheduledTaskSettingsSet `
  -MultipleInstances IgnoreNew `
  -StartWhenAvailable `
  -ExecutionTimeLimit (New-TimeSpan -Hours 2)

# Battery settings are intentionally omitted because their cmdlet parameters
# vary across Windows PowerShell / ScheduledTasks versions.

# Use the broadly supported Limited run level. Some ScheduledTasks versions
# reject LeastPrivilege even though it appears in examples elsewhere.
$Principal = New-ScheduledTaskPrincipal `
  -UserId ([System.Security.Principal.WindowsIdentity]::GetCurrent().Name) `
  -LogonType Interactive `
  -RunLevel Limited

$Task = New-ScheduledTask `
  -Action $Action `
  -Trigger $Trigger `
  -Settings $Settings `
  -Principal $Principal `
  -Description "Runs one STLB direct-main goblin prompt attempt every 15 minutes."

Register-ScheduledTask -TaskName $TaskName -InputObject $Task | Out-Null

Write-Output "Registered scheduled task: $TaskName"
Write-Output "Runner: $RunnerPath"
Write-Output "Logs: $(Join-Path $RepoRoot '.goblin\logs')"
