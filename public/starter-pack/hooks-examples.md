# Claude Code Hooks — Examples

Hooks are shell commands that run automatically in response to Claude Code events.
Configure them in `.claude/settings.json` (project) or `~/.claude/settings.json` (global).

---

## Hook Structure

```json
{
  "hooks": {
    "EventName": [
      {
        "matcher": "optional-tool-name-filter",
        "hooks": [
          {
            "type": "command",
            "command": "your-shell-command"
          }
        ]
      }
    ]
  }
}
```

---

## Useful Hook Events

| Event | Fires when |
|---|---|
| `SessionStart` | Claude Code session begins |
| `SessionEnd` | Session ends (user exits) |
| `PreToolUse` | Before any tool runs |
| `PostToolUse` | After any tool runs |
| `Stop` | Claude finishes responding |

---

## Example 1 — Log every session start

```json
{
  "hooks": {
    "SessionStart": [
      {
        "hooks": [
          {
            "type": "command",
            "command": "echo \"Session started: $(date)\" >> ~/claude-sessions.log"
          }
        ]
      }
    ]
  }
}
```

---

## Example 2 — Auto-run tests after file edits

```json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Edit",
        "hooks": [
          {
            "type": "command",
            "command": "cd /path/to/project && npm test --passWithNoTests 2>&1 | tail -5"
          }
        ]
      }
    ]
  }
}
```

---

## Example 3 — Remind Claude of project rules on every session

```json
{
  "hooks": {
    "SessionStart": [
      {
        "hooks": [
          {
            "type": "command",
            "command": "cat ~/.claude/project-context.md 2>/dev/null || true"
          }
        ]
      }
    ]
  }
}
```

---

## Example 4 — Block dangerous git commands

```json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Bash",
        "hooks": [
          {
            "type": "command",
            "command": "echo '$CLAUDE_TOOL_INPUT' | grep -q 'git push --force' && echo 'BLOCKED: force push requires manual confirmation' && exit 1 || true"
          }
        ]
      }
    ]
  }
}
```

---

## Tips

- Hook output is injected into Claude's context — keep it short and useful.
- `exit 1` from a PreToolUse hook blocks the tool call.
- Use hooks for: logging, context injection, guardrails, auto-formatting, test runs.
- Don't use hooks for: anything that takes >2 seconds (it blocks the session).
