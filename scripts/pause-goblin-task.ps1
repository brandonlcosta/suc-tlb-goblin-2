$ErrorActionPreference = "Stop"

$TaskName = "STLB Full Goblin Main"
$RepoRoot = "C:\dev\suc-tlb-goblin-2"
$GoblinDir = Join-Path $RepoRoot ".goblin"
$PausedFile = Join-Path $GoblinDir "PAUSED"

New-Item -ItemType Directory -Force -Path $GoblinDir | Out-Null
"Paused at $(Get-Date -Format o)" | Set-Content -Path $PausedFile -Encoding UTF8

$Task = Get-ScheduledTask -TaskName $TaskName -ErrorAction SilentlyContinue
if ($Task) {
  Disable-ScheduledTask -TaskName $TaskName | Out-Null
  Write-Output "Disabled scheduled task: $TaskName"
} else {
  Write-Output "Scheduled task not found: $TaskName"
}

Write-Output "Created pause file: $PausedFile"
