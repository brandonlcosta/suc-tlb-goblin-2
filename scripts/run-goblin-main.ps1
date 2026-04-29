$ErrorActionPreference = "Stop"

$RepoRoot = "C:\dev\suc-tlb-goblin-2"
$GoblinDir = Join-Path $RepoRoot ".goblin"
$LogDir = Join-Path $GoblinDir "logs"
$PausedFile = Join-Path $GoblinDir "PAUSED"

Set-Location $RepoRoot
New-Item -ItemType Directory -Force -Path $LogDir | Out-Null

if (Test-Path $PausedFile) {
  Write-Output "Goblin paused: $PausedFile exists."
  exit 0
}

$Timestamp = Get-Date -Format "yyyyMMdd-HHmmss"
$LogPath = Join-Path $LogDir "goblin-main-$Timestamp.log"

function Write-LogLine {
  param([string]$Message)

  $Line = "[$(Get-Date -Format o)] $Message"
  $Line | Tee-Object -FilePath $LogPath -Append
}

function Invoke-LoggedCommand {
  param(
    [Parameter(Mandatory = $true)][string]$Command,
    [Parameter(Mandatory = $true)][string[]]$Arguments
  )

  Write-LogLine "> $Command $($Arguments -join ' ')"
  & $Command @Arguments *>> $LogPath
  $ExitCode = if ($null -eq $LASTEXITCODE) { 0 } else { $LASTEXITCODE }

  if ($ExitCode -ne 0) {
    throw "Command failed with exit code ${ExitCode}: $Command $($Arguments -join ' ')"
  }
}

try {
  Write-LogLine "Starting direct-main goblin run in $RepoRoot"
  Invoke-LoggedCommand -Command "git" -Arguments @("checkout", "main")
  Invoke-LoggedCommand -Command "git" -Arguments @("pull", "--ff-only", "origin", "main")
  Invoke-LoggedCommand -Command "npm" -Arguments @("run", "goblin:main")
  Write-LogLine "Direct-main goblin run completed successfully."
  exit 0
} catch {
  Write-LogLine "Direct-main goblin run failed: $($_.Exception.Message)"
  exit 1
}
