$ErrorActionPreference = "Stop"

$TaskName = "STLB Full Goblin Main"

$Task = Get-ScheduledTask -TaskName $TaskName -ErrorAction SilentlyContinue
if ($Task) {
  Unregister-ScheduledTask -TaskName $TaskName -Confirm:$false
  Write-Output "Unregistered scheduled task: $TaskName"
} else {
  Write-Output "Scheduled task not found: $TaskName"
}
