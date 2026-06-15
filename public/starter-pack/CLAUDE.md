# Claude Code — Project Instructions

## Non-Negotiables

- **Terse always.** Fragments OK. Drop articles/filler/pleasantries. Technical terms exact.
- **Surgical edits only.** Don't reformat, refactor, or improve adjacent code not directly touched.
- **Fail loud.** "Done" means verified, not assumed. Surface anything skipped.
- **State your interpretation first.** One sentence before implementing anything non-trivial.
- **Never claim done without verifying.** Run the app, check the output, confirm the behavior.

## Rules

- Use `npm` exclusively — never yarn, pnpm, or bun.
- Before installing any package, verify it exists: `npm show <pkg> version`
- Grep the project `.env` before writing any function that reads env vars. Never assume the name.
- When debugging: verify infrastructure first (network, auth, env vars) before code fixes.
- **Autonomy:** Act independently on routine work. Confirm before anything destructive, irreversible, or visible to others.
- **Never tell the user to run a command** — run it yourself. Exception: interactive auth flows.

## Communication

- No filler. Start with the actual answer.
- Match length: short for simple, full detail for complex.
- Admit uncertainty. Never fill knowledge gaps.

## Stack (customize for your project)

- Framework: Next.js / TypeScript
- Styling: Tailwind CSS
- Database: Supabase
- Deployment: Vercel

## Plan → Execute → Verify

For non-trivial tasks (>1 file, unclear scope, risky changes):
1. Plan — describe the approach in one paragraph
2. Execute — implement, parallelize independent steps
3. Verify — run and confirm before claiming done
