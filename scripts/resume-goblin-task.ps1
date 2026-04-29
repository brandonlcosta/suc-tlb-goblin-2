$ErrorActionPreference = "Stop"

$TaskName = "STLB Full Goblin Main"
$RepoRoot = "C:\dev\suc-tlb-goblin-2"
$PausedFile = Join-Path $RepoRoot ".goblin\PAUSED"

Remove-Item -Path $PausedFile -Force -ErrorAction SilentlyContinue

$Task = Get-ScheduledTask -TaskName $TaskName -ErrorAction SilentlyContinue
if ($Task) {
  Enable-ScheduledTask -TaskName $TaskName | Out-Null
  Write-Output "Enabled scheduled task: $TaskName"
} else {
  Write-Output "Scheduled task not found: $TaskName"
}

Write-Output "Removed pause file if present: $PausedFile"
