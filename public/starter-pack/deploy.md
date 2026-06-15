---
name: deploy
description: Deploy the application with pre-deploy validation, deployment, and post-deploy verification
command: /deploy
---

## First Run Adaptation

Before your first deploy, scan the project:
1. Read package.json for the framework and build/test scripts
2. Check for deployment configs (vercel.json, railway.json, netlify.toml, fly.toml, Dockerfile)
3. Look for .env.example or .env.production to know required environment variables
4. Identify the deployment platform from existing configs or ask
5. Check for a CI/CD pipeline (.github/workflows/) and understand what it does
6. Note the current git branch and whether there's a staging/production branch strategy

## Environment Detection

Determine which environment to deploy to:
- If the user says "deploy" with no qualifier, ask: staging or production?
- If there's only one environment configured, deploy there and mention it
- Never deploy to production without running in staging first, unless the user explicitly says to skip staging
- Check for environment-specific configs (e.g., vercel.json vs vercel.staging.json, separate fly.toml files)

## Pre-deploy Checks

Run through this checklist before every deploy:

1. Run the build command (pnpm build, npm run build, etc.) and fix any errors
2. Run the test suite and make sure everything passes
3. Search for console.log statements in src/. Remove any that aren't intentional
4. Compare .env.example against the target environment to verify all required vars are set
5. Check that no .env files or secret files are staged for commit
6. Verify the git working tree is clean (no uncommitted changes)
7. If deploying to production, check that the staging deploy succeeded first
8. Look for any pending database migrations that need to run with this deploy

## Deploy

If all checks pass:
1. Note the current deployment hash/version for rollback purposes
2. Commit any pending changes with a descriptive message
3. Push to the appropriate branch
4. Run the platform-specific deploy command:
   - Vercel: `vercel --prod` (or `vercel` for preview)
   - Railway: `railway up`
   - Netlify: `netlify deploy --prod`
   - Fly.io: `fly deploy`
   - Docker: `docker build && docker push`
   - Custom: run whatever deploy script exists in package.json
5. Wait for the deployment to complete and capture the deployment ID/URL

## Post-deploy Verification

1. Hit the health endpoint (usually /api/health or /healthz) and confirm 200
2. If no health endpoint exists, load the homepage and verify it returns 200
3. Check 2-3 critical user flows if possible (API responds, auth works, main page loads)
4. Check deployment logs for warnings, errors, or deprecation notices
5. If the app has a database, verify the connection is working
6. Report the deployment URL, version/commit hash, and status

## Rollback Procedures

If something breaks after deploy:

**Vercel**: `vercel rollback` or redeploy previous commit with `vercel --prod`
**Railway**: `railway up` on the previous commit, or use the dashboard to rollback
**Fly.io**: `fly releases` to list versions, `fly deploy --image <previous-image>` to rollback
**Netlify**: `netlify deploy --prod` on previous commit, or use dashboard "Publish deploy" on a prior build
**Docker/custom**: redeploy the previous tagged image

Always:
1. Rollback first, investigate second. Don't debug in production while users are affected.
2. After rollback, verify the site is healthy again before investigating
3. Document what went wrong in a brief post-mortem (even just a comment in the PR)

## Notifications

After a deploy completes (success or failure):
- If there's a Slack webhook or Discord webhook in the env, send a notification
- If deploying for a user in Telegram, send them the status directly
- Include: environment, commit hash, deploy URL, and pass/fail status
- On failure, include the first relevant error from the logs

## Common Issues

- **Build works locally but fails in CI**: check Node version mismatch, missing env vars, or OS-specific dependencies
- **Deploy succeeds but app crashes**: check runtime env vars vs build-time env vars (common Vite/Next.js gotcha)
- **Database connection refused after deploy**: check if the database allows connections from the new deployment IP/region
- **Static assets 404 after deploy**: check the public/static directory config and base path settings
