# Claude Code Starter Pack

Files in this pack:

| File | What it is |
|---|---|
| `CLAUDE.md` | Project instructions template — drop into any project root |
| `deploy.md` | `/deploy` skill — pre-deploy checks, deploy, post-deploy verification |
| `wrap-up.md` | `/wrap-up` skill — end-of-session ritual, handoff notes |
| `hooks-examples.md` | Hook patterns for SessionStart, PostToolUse, guardrails |
| `mcp-recommendations.md` | Best MCP servers and how to install them |

## Quick Start

1. Copy `CLAUDE.md` into your project root and edit the Stack section
2. Copy skills to `~/.claude/skills/` (create the folder if needed)
3. Add hooks to `~/.claude/settings.json`
4. Install the MCP servers you need

## Installing a skill

```bash
mkdir -p ~/.claude/skills
cp deploy.md ~/.claude/skills/
cp wrap-up.md ~/.claude/skills/
```

Then in Claude Code, run `/deploy` or `/wrap-up`.

## More

More skills, hooks patterns, and deep-dives at nikolas.helpmarq.com/resources
