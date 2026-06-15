# MCP Server Recommendations

MCP (Model Context Protocol) servers extend Claude Code with new tools.
Install via: `claude mcp add <name> <command>`

---

## Essential

### context7 — Up-to-date library docs
```bash
claude mcp add context7 npx @upstash/context7-mcp
```
Use before writing code for any library. Always: `resolve-library-id` → `query-docs`.
Never answer library questions from training data — docs change.

### Playwright — Browser automation
```bash
claude mcp add playwright npx @playwright/mcp
```
E2E testing, screenshots, form filling, scraping. Essential for any web project.

### GitHub — Issues, PRs, code
```bash
claude mcp add github npx @modelcontextprotocol/server-github
```
Read/write issues, PRs, file contents, branches. Set `GITHUB_TOKEN` env var.

---

## Productivity

### Filesystem — Full file access
```bash
claude mcp add filesystem npx @modelcontextprotocol/server-filesystem /path/to/allow
```
Explicit file access outside the working directory. Useful for accessing shared config.

### Memory — Persistent knowledge graph
```bash
claude mcp add memory npx @modelcontextprotocol/server-memory
```
Store entities, relations, and observations across sessions.

---

## Research

### Tavily — Web search
```bash
claude mcp add tavily npx tavily-mcp
```
Real-time web search with high-quality results. Better than generic search for technical queries.

---

## When to use MCP vs native tools

| Use native tools | Use MCP |
|---|---|
| Reading/writing files in the project | Accessing live data (GitHub, web, calendar) |
| Running shell commands | Searching external knowledge bases |
| Git operations | Browser automation |
| Simple searches | Structured API access |

---

## Setup

Add to `~/.claude/settings.json` under `"mcpServers"`:

```json
{
  "mcpServers": {
    "context7": {
      "command": "npx",
      "args": ["-y", "@upstash/context7-mcp"]
    },
    "playwright": {
      "command": "npx",
      "args": ["@playwright/mcp"]
    }
  }
}
```
