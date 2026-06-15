# Social Distribution + Funnel System — Design Spec
**Date:** 2026-06-14  
**Status:** Approved for implementation

---

## Overview

Full-stack distribution system across 4 platforms + website hub with segmented email capture and dual conversion tracks. Goal: client pipeline running now, founder/product audience compounding in background.

**Revenue model:** C — both client work (custom AI builds, full-stack dev) and products (tools, SaaS), served by separate but parallel tracks.  
**Operation:** Solo. No team. All systems must be automatable or async.

---

## Architecture

```
X / LinkedIn / Instagram / YouTube
          ↓
    nikolas.helpmarq.com (hub)
          ↓
   Immediate bifurcation:
   "I want to build something" | "I'm here for the content"
          ↓                              ↓
   Track 1: Client Pipeline      Track 2: Founder Community
   Book a Call → proposal        Email gate → Starter Pack + newsletter
          ↓                              ↓
   Client signed                  Product subscriber / future buyer
```

> **Domain flag:** Site lives at `nikolas.helpmarq.com` (subdomain of a product). Personal brand tied to a product domain is a long-term risk — if helpmarq pivots or the domain moves, the portfolio URL breaks. Consider migrating to `nikolassapalidis.com` or similar personal domain when bandwidth allows. Not blocking now.

---

## Platform Strategy

### X (510 followers)
**Goal:** Recognition in the Claude Code / AI builder space. Not primary client acquisition.  
**The play:** Own the Claude Code documentation space. Tutorials are shallow. Hype is everywhere. Real setups at depth are nowhere. Nikolas has custom skills, hooks, agents, MCP servers, 3+ months of CC Max. Become the reference account people send when someone asks "what can you actually do with Claude Code?"  
**Content:**
- Weekly deep-dive — one real thing, at depth. Hooks setup. Agent communication. What a custom skill actually looks like. Not "10 tips." One thing, documented properly.
- Soft product mentions — MarketMyApp, npm repos (Branch AI, Grip, Clientcast, SkillSwitch), GitHub — mentioned naturally where relevant. Not as ads. As "here's the thing I built that does X." The work speaks.
- Long posts and articles (X Premium available) — use for breakdowns that earn the length. Articles for evergreen reference pieces ("How I set up my Claude Code workflow"). Long posts over threads when it's one continuous idea.
- Format mix: insight drops, build updates, Claude Code deep-dives, occasional product mentions.  
**Engagement:** Target 20 — identify 20 specific founders/builders to engage with deeply and consistently. Concentrated relationships beat spray-and-pray.  
**Cadence:** 1-2 posts/day. No pushy product CTAs.

### LinkedIn (3.3k connections)
**Goal:** Primary client pipeline + founder credibility.  
**Content:** 3x/week. Rotate between: founder story (problem → tried → built → result), system walkthrough (exact workflow, step by step), build update (what shipped, what broke, real numbers).  
**CTA rotation:** Alternate every post between "Book a Free AI System Blueprint Call" and "Download the Claude Code Starter Pack."  
**Engagement:** Comment on 5-10 posts/day from target clients — founders and small teams who need AI automation but can't build it themselves.

### Instagram (2.6k followers)
**Goal:** Community growth + client awareness + IG-native discovery.  
**What works:** Talking-head videos. Not b-roll. Not scripted reads. When talking directly to camera, it works. Keep this format.  
**Content formats:**
- **"I built X for a client"** — screen recording of it running, voiceover. 60-90s. Show input → output → problem solved. Every client project is a video: the RAG system, the trading bot, the memory system.
- **"Here's what [project] actually does"** — demo first, explanation after. Lead with the thing working.
- **"I just shipped [thing]"** — raw, no polish. What it is, what broke, what surprised you.  
**Comment-to-DM flow (ManyChat):** On lead magnet videos, CTA in the video is "comment [keyword] below." ManyChat auto-DMs the commenter with a link to the email gate page. Commenter enters email → gets download → added to newsletter. This also boosts post algorithmically via comments.  
**Cadence:** 3-4x/week videos. Stories daily showing process.  
**Hook formula:** Lead with the impressive output. "I just built a system that reads 2,000 pages and answers questions about them instantly."

### TikTok
**Status:** Deprioritized. Likely shadowbanned. Audience fit is weak. Do not invest time here.

### YouTube (100 followers)
**Now:** Cross-post IG videos as Shorts. Free distribution, zero extra work.  
**Later:** Longer technical tutorials (Claude Code setup walkthroughs, build-along videos) when IG cadence is consistent.

---

## Website (Hub) — nikolas.helpmarq.com

### Landing bifurcation
Homepage immediately segments visitors:
- **"I want to build something"** → services section → Book a Call
- **"I'm here for the content"** → lead magnet section → email gate → download

### Client path
Clean services section. What can be built: custom AI agents, RAG systems, automation pipelines, dashboards, web/iOS apps, Claude Code setup and infrastructure. CTA: **"Book a Free AI System Blueprint Call"** → Cal.com. No intermediate asset. The call is the offer.

### Community path
Lead Magnet B displayed prominently. Resource hosted on the page but gated behind an email form — user enters email, form submits, download unlocks or link is emailed. EmailOctopus handles the form embed and delivery.

---

## Lead Magnets

### Lead Magnet A — Client track
No intermediate asset. Content does the warming, website closes.  
**The call:** "Free AI System Blueprint Call" — 30 minutes. Diagnose their situation, map what can be built, propose a solution. The call is the lead magnet. Framing: "Blueprint Call" not "consultation" — specific, implies a deliverable.

### Lead Magnet B — Community track
**Claude Code Starter Pack** — downloadable ZIP containing actual `.md` skill files, a CLAUDE.md template, basic hooks examples, and an MCP server recommendations list.  
**Skills to include:** Safe, broadly useful skills only — wrap-up, deploy, improve, and 2-3 others that demonstrate the concept without exposing proprietary workflows. Do not include: symdex-code-search, autoplan, ad-creative-analysis, app-launch-conversion-audit, capture, or any compound orchestration skills.  
**Why this works:** Builders can install it immediately. Genuinely rare — most people don't know Claude Code skills exist at this depth. Demonstrates capability without claiming it. People pass it around.  
**Delivery:** Email captured → resource unlocks on page OR download link emailed via EmailOctopus.

---

## Email System

**Platform:** EmailOctopus (sending + forms)

### Track 1 — Client nurture (4 emails, triggered after booking or inquiry tag)
1. **Proof** — projects shipped, stack proof, what's been built
2. **Credibility** — one specific build story with real outcome
3. **Case study** — detailed breakdown of one complete client project
4. **CTA** — "Ready to build? Here's how to start" → Cal.com booking link

### Track 2 — Community newsletter (weekly, Sunday)
**Format:** 3-5 AI things found this week + one build/ship update  
**Click habit:** Every issue includes one low-commitment click — a video, an X post, a tool, occasionally a meme. Trains readers to click so when a real CTA appears (book a call, buy a product), the habit is already there.  
**Each issue ships with one usable artifact:** a Claude prompt, a skill file, a workflow diagram, or a script.  
**Subject line:** Most useful thing in the issue, 6 words or fewer.  
**Voice:** Same as brand DNA. Punchy, no filler, specific.  
**Warm launch:** Import old mailing list from previous product as initial subscribers.

---

## Content Pillars (mapped to platforms)

| Pillar | X | LinkedIn | Instagram |
|---|---|---|---|
| Building in Public | build updates, ship notes | founder stories with numbers | "I just shipped" videos |
| AI & Automation | Claude Code deep dives | system walkthroughs | demo videos of agents running |
| Product × Marketing | soft product drops (npm, GitHub) | counterpoints, launch lessons | — |
| Systems & Tools | workflow internals, skill files | "here's the exact system" | Obsidian + CC setup videos |
| Honest Takes | contrarian posts | counterpoints | talking-head takes |

---

## Proof Bank — Content Ready to Use

Stats are **dynamic** — verify current numbers before posting. Do not use static figures. Either ask or check the source.

Post-safe facts (stable):
- First paying client: February 2026
- Claude Code Max since April 2026
- Age: 16, Athens, Greece
- Ships iOS + web + CLI + Python libraries simultaneously
- Self-hosted homelab: Supabase + n8n
- 6+ products running in parallel
- Products: Branch AI (npm), Grip (PyPI), Clientcast (npm), SkillSwitch (npm), HelpMarq, AutomateSphere

Check before using (dynamic):
- Branch AI npm download count
- Grip token reduction figure (currently documented as 100×, verify it holds)
- Any MRR or user count figures

---

## Implementation Sequence

1. **Cal.com** — booking page, "AI System Blueprint Call," 30-min slot
2. **EmailOctopus** — account setup, import old list, configure two tracks, embed form code
3. **Claude Code Starter Pack** — compile safe skill files, CLAUDE.md template, hooks examples, MCP list into ZIP
4. **Website** — bifurcation on landing, client services section, email-gated resource page
5. **4-email client nurture sequence** — written in EmailOctopus, triggered on client tag
6. **Newsletter issue 1** — launch to warm list, set Sunday cadence
7. **ManyChat** — set up comment-to-DM flow for IG lead magnet videos
8. **Platform cadence** — X (Target 20 list + weekly CC deep-dive + soft product mentions), LinkedIn (3x/week + CTA rotation), IG (3-4x/week build videos + Stories daily)
9. **YouTube Shorts** — cross-post IG content, no extra work

---

## Non-Negotiables

- No generic content. Every post has a thesis.
- IG: talking-head only. No b-roll. No scripted reads.
- X: no pushy CTAs. Product mentions must feel natural, not promotional.
- Newsletter: every issue has a low-commitment click AND a usable artifact.
- Starter Pack: safe skills only. Never expose proprietary workflows.
- Website CTA: "Book a Free AI System Blueprint Call" — not "contact me."
- Stats: always verify before using. Never hardcode dynamic numbers.
- Cal.com over Calendly.

---

## Open Questions

- Confirm nikolas.helpmarq.com is the live URL (flag: consider personal domain migration)
- EmailOctopus plan — free tier to start, paid when list exceeds limit
- Cal.com personal plan
- ManyChat — free tier supports basic comment-to-DM flows
- Which 2-3 additional safe skills to include in Starter Pack beyond wrap-up, deploy, improve
