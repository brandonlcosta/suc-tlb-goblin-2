# Goblin Queue Automation

`npm run goblin:queue` is a safe unattended supervisor for direct-main goblin automation. It repeatedly calls `npm run goblin:main`, so each inner run still consumes exactly one oldest pending prompt, validates it, moves it to `prompts/completed/` or `prompts/blocked/`, and writes the normal per-prompt run report.

The queue supervisor adds the outer loop:

- stops when `prompts/pending/` has no `.md` prompts
- stops after 15 successful runs by default
- verifies `git status --short` is clean before every `goblin:main` run
- runs `npm run agent:check` and `npm run build` after each successful `goblin:main` run
- stops immediately on any failure
- writes a queue-level report in `reports/runs/`

## Commands

Run the default queue, capped at 15 prompt attempts:

```powershell
npm run goblin:queue
```

Run a smaller capped queue:

```powershell
npm run goblin:queue -- --max=3
```

Run a no-op safety check that writes a queue report without consuming prompts:

```powershell
node scripts/goblin-run-queue.mjs --max=0
```

## Windows Task Scheduler

Use Task Scheduler only for this sandbox repo and only when you are comfortable with direct-main goblin mode.

1. Open **Task Scheduler**.
2. Choose **Create Task**.
3. Set the task name to something clear, such as `STLB Goblin Queue`.
4. On **Triggers**, choose the schedule you want. Start conservatively.
5. On **Actions**, choose **Start a program**.
6. Set **Program/script** to:

```txt
powershell.exe
```

7. Set **Add arguments** to:

```txt
-NoProfile -ExecutionPolicy Bypass -Command "Set-Location 'C:\dev\suc-tlb-goblin-2'; npm run goblin:queue -- --max=3"
```

8. Set **Start in** to:

```txt
C:\dev\suc-tlb-goblin-2
```

The queue command is not a daemon, server, UI, or background watcher. Each scheduled invocation runs, writes console output and a report, then exits.

## Why It Stops

The runner stops on a dirty git state because unattended automation should not mix prompt work with unreviewed local edits, generated reports, merge conflicts, or Brandon's manual changes.

The runner stops on the first command failure because later prompts depend on a known-good ledger, build, and working tree. Continuing after a failed prompt would make the queue harder to audit and could compound a broken state.

## Inspecting Reports

Queue-level reports are written to:

```txt
reports/runs/
```

List the newest reports:

```powershell
Get-ChildItem reports\runs -Filter *.md | Sort-Object LastWriteTime -Descending | Select-Object -First 10
```

Open the newest queue report and the nearby per-prompt reports. The queue report summarizes start time, prompts attempted, successful runs, failure reason, and final pending/completed/blocked counts.
