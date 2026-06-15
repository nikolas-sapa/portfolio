---
name: wrap-up
description: End-of-session ritual — summarize work done, capture open questions, and create a handoff note so the next session starts with full context.
triggers:
  - /wrap-up
  - wrap up
  - end session
user-invocable: true
---

# /wrap-up

Run this at the end of every session to preserve context.

---

## Step 1: Summarize what happened

Identify:
- **Session type:** coding | research | planning | design | mixed
- **Key outcomes:** 3–5 bullets — what changed, what was decided, what was shipped
- **Open questions:** anything that surfaced but wasn't resolved

---

## Step 2: Write a handoff note

Create a file at `docs/sessions/YYYY-MM-DD.md` (create the folder if needed):

```markdown
## Session — YYYY-MM-DD

### What we did
- [bullet list of outcomes]

### Decisions made
- [any architecture, design, or product decisions]

### Open questions
- [unresolved items for next session]

### Next steps
1. [ordered list of what to do next]

### Files changed
- [list of files created or modified]
```

---

## Step 3: Update the project README or status doc

If the project has a `STATUS.md` or `README.md` with a "Current State" section, update it to reflect what's now true. Keep it accurate — stale docs are worse than no docs.

---

## Step 4: Confirm git state

- Uncommitted changes? Commit or stash them.
- Unresolved TODOs added this session? Note them in the handoff.
- Any secrets or debug code accidentally staged? Remove before pushing.

---

## Output

End with a one-paragraph summary the user can read in 15 seconds:
> "This session we [outcome]. The main decision was [decision]. Next up: [next action]."
