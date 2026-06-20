"use client";

import { useState, useCallback } from "react";
import { ChevronRight, ChevronDown, ExternalLink } from "lucide-react";

// ─── Types ───────────────────────────────────────────────────────────────────

type FileNode = {
  id: string;
  name: string;
  type: "file";
  kind: string;
  modified: string;
  url?: string;
  videoUrl?: string;
  preview: string;
};

type FolderNode = {
  id: string;
  name: string;
  type: "folder";
  modified: string;
  children: TreeNode[];
};

type TreeNode = FileNode | FolderNode;

// ─── Data ────────────────────────────────────────────────────────────────────

const ROOT: FolderNode = {
  id: "root",
  name: "nikolas.sapa",
  type: "folder",
  modified: "Apr 15, 2026",
  children: [
    {
      id: "about",
      name: "About.md",
      type: "file",
      kind: "Markdown Document",
      modified: "Apr 15, 2026",
      preview:
        "Athens, Greece. Solo founder and developer.\n\nI build across the full stack — web apps, iOS apps, AI tools, CLI tools, automation systems, e-commerce. Client work and my own products, in parallel.\n\nI care about how things look and how they work. Most freelancers do one or the other. I do both — together. You don't get a beautiful mockup that breaks in the browser, or a technically solid app that looks like 2014.\n\nI'm fast. Clients usually have something live within 1–2 weeks. I communicate clearly, don't disappear mid-project, and tell you when something is a bad idea instead of building it and charging you anyway.\n\nOn the product side, I've shipped CLI tools, iOS apps, browser SDKs, AI agents, and SaaS — all solo. Some are live, some in review, some in development.",
    },
    {
      id: "services",
      name: "Services",
      type: "folder",
      modified: "Apr 15, 2026",
      children: [
        {
          id: "websites",
          name: "Websites.md",
          type: "file",
          kind: "Markdown Document",
          modified: "Apr 15, 2026",
          preview:
            "Marketing sites, brand presences, portfolios.\n\nThe kind of site that makes someone think \"these people are legit\" the moment they land on it. Strong visual hierarchy, fast load times, clean copy structure, mobile-perfect. Designed from scratch — not adapted from a template.\n\nMost businesses are losing potential customers because their website looks like it was made in 2019 and runs like it. A well-built site isn't just an aesthetic thing — it's a trust signal. People decide within seconds whether to stay or leave, and most of that decision is visual.\n\nWhat's included: full custom design in Figma, development, SEO setup (meta tags, sitemap, structured data), Vercel deployment, and one round of revisions after delivery.\n\nGood for: local businesses, studios, agencies, consultants, personal brands — anyone who needs a serious web presence without the Squarespace ceiling.",
        },
        {
          id: "web-apps",
          name: "Web Apps.md",
          type: "file",
          kind: "Markdown Document",
          modified: "Apr 15, 2026",
          preview:
            "Full-stack web applications — MVPs to production.\n\nAuth, databases, APIs, payments, real-time features — the whole stack. Built with Next.js, TypeScript, and Supabase. Deployed on Vercel.\n\nI've shipped my own SaaS products from scratch, so I understand product thinking, not just implementation. I know what corners are safe to cut in an MVP and which ones will cost you later. I know what to build first, what to defer, and what to skip entirely.\n\nTypical MVP stack: Next.js App Router + TypeScript + Supabase (auth + database) + Stripe for payments + Resend for emails + Vercel for deployment. This combination moves fast and has no real ceiling.\n\nWhat I can build: SaaS products, internal tools, dashboards, booking systems, marketplaces, AI-powered apps, anything that needs a real backend.\n\nIf you have a product idea and need someone who can design it, build it, and get it in front of users — that's exactly what I do.",
        },
        {
          id: "landing-pages",
          name: "Landing Pages.md",
          type: "file",
          kind: "Markdown Document",
          modified: "Apr 15, 2026",
          preview:
            "High-converting, design-led landing pages.\n\nA landing page has one job: turn visitors into customers. That means getting the hierarchy right, the copy structure right, the visual flow right — and making it load fast enough that no one leaves before they've read anything.\n\nMost landing pages fail because they're built by someone who either cares about design or cares about conversion — rarely both. I care about both. The visual decisions and the copy structure are made together, not bolted on after.\n\nWhat I get right every time: above-the-fold clarity (visitors understand what you do in under 5 seconds), trust signals placed where they actually matter, a CTA that isn't just a button at the bottom, and performance scores that don't embarrass you in PageSpeed.\n\nAlso built to rank — semantic HTML, proper meta setup, clean structured data, fast load.\n\nGood for: product launches, service businesses, course sales, anything where one page needs to do serious work.",
        },
        {
          id: "custom-systems",
          name: "Custom Systems.md",
          type: "file",
          kind: "Markdown Document",
          modified: "Apr 15, 2026",
          preview:
            "Bespoke backend systems and internal tools.\n\nBooking systems, custom ecommerce, inventory management, API integrations, admin dashboards, automation workflows. If your business has a specific problem that off-the-shelf software can't solve cleanly — or you're paying for five different tools that should be one thing — I build the one thing.\n\nThe conversation usually starts with \"we've been doing this manually\" or \"we're using [tool] but it doesn't quite fit.\" That's the signal. When a process is manual or the tool is constantly fighting you, a custom system pays for itself fast.\n\nI build these on Supabase + Next.js, which means they're fast to build, easy to extend, and you're not locked into a proprietary platform. You own the database, you own the code.\n\nRecent examples:\n— Custom booking + jewelry ecommerce for a piercing studio (replaced three separate systems)\n— Full clothing store built from scratch with inventory management (replaced Shopify)\n— Internal admin tools for managing user accounts and billing",
        },
        {
          id: "automations",
          name: "Automations.md",
          type: "file",
          kind: "Markdown Document",
          modified: "Jun 15, 2026",
          preview:
            "AI agents, n8n workflows, custom automation pipelines.\n\nIf your team is doing something manually that a machine should be doing, I build the machine. Lead routing, client onboarding sequences, content pipelines, data sync between tools, AI-powered workflows — whatever the manual process is, there's usually a cleaner automated version of it.\n\nI work with n8n (self-hosted and cloud), Make, and custom code where platforms can't reach. For AI-powered flows, I build with Claude (Anthropic) and integrate with whatever data sources you're working with.\n\nThe conversation usually starts with \"we're copying and pasting X into Y every day\" or \"we need to check this and then trigger that.\" That's the signal.\n\nAlso what I do at AutomateSphere AI — custom AI automation for businesses. This isn't theoretical. I've built and deployed these for actual clients.",
        },
        {
          id: "dashboards",
          name: "Dashboards.md",
          type: "file",
          kind: "Markdown Document",
          modified: "Jun 15, 2026",
          preview:
            "Admin panels, analytics dashboards, internal tools.\n\nThe kind of thing that never ships because it's \"internal\" — so it stays as a spreadsheet forever, or a mess of different tools stitched together with copy-paste. I build the actual thing.\n\nOperations dashboards, user management panels, analytics views, CRM-light tools, reporting interfaces. Built on Next.js + Supabase — fast, real-time where it matters, not locked into a vendor you'll want to leave in 18 months.\n\nGood for: companies who have data but can't see it clearly, teams who live in spreadsheets and shouldn't have to, founders who need to monitor their product without logging into five different tools.",
        },
      ],
    },
    {
      id: "work",
      name: "Work",
      type: "folder",
      modified: "Apr 15, 2026",
      children: [
        {
          id: "nr40",
          name: "nr40athens.com",
          type: "file",
          kind: "URL",
          modified: "Mar 2026",
          url: "https://nr40athens.com",
          preview:
            "Tattoo studio — Athens, Greece.\n\nThe brief was clear: dark, atmospheric, no stock photos, nothing generic. The site needed to feel like the studio — not like a template a tattooist happened to fill in.\n\nBuilt with strong local SEO so they rank when people in Athens search for tattoo studios. Fast load, clean booking flow, custom design throughout. The kind of site that makes someone send a DM instead of scrolling past.",
        },
        {
          id: "allcity",
          name: "allcity-clothing",
          type: "file",
          kind: "URL",
          modified: "Mar 2026",
          url: "https://allcity-clothing.vercel.app/",
          preview:
            "Custom ecommerce — clothing brand.\n\nFull online store built from the ground up. Product pages, cart, checkout flow, order management — no Shopify, no templates, no monthly platform fees eating into margins.\n\nThe client had been on Shopify and kept hitting walls: couldn't customise the checkout the way they wanted, the theme felt generic, and the costs were adding up. The new store looks and works exactly how they want it to, and they own it outright.\n\nBuilt with Next.js, Supabase for inventory and orders, Stripe for payments.",
        },
        {
          id: "hustlemedia",
          name: "hustle-media",
          type: "file",
          kind: "URL",
          modified: "Feb 2026",
          url: "https://hustle-media-rouge.vercel.app/",
          preview:
            "Agency website — social media marketing.\n\nSMMA agencies live or die on their first impression. If your site doesn't look as good as the results you claim to deliver, no one's hiring you.\n\nSharp design, clear service breakdown, proof sections that actually build trust rather than just listing logos. Built to get the right prospects to reach out and filter out the wrong ones. Fast, clean, nothing that doesn't earn its place on the page.",
        },
        {
          id: "tsvc",
          name: "tsvcstudio.com",
          type: "file",
          kind: "URL",
          modified: "Feb 2026",
          url: "https://www.tsvcstudio.com/",
          preview:
            "Agency website — digital studio.\n\nThe brief: look established, look like you've done this before, build immediate trust. Clean layout, strong typography, clear hierarchy — the kind of site that makes a prospect think \"these people clearly know what they're doing\" before reading a single word of copy.\n\nDelivered fast. Client went from placeholder site to live in under two weeks.",
        },
        {
          id: "521",
          name: "521.is",
          type: "file",
          kind: "URL",
          modified: "Apr 2026",
          url: "https://521.is/",
          preview:
            "Course landing page — location independence.\n\nSales page for a course on building a location-independent income. The audience is skeptical — they've seen a lot of grifty course landing pages — so the design and copy had to earn trust, not just sell hard.\n\nTight structure: strong above-the-fold, clear value prop, objection handling baked into the flow, single focused CTA. Nothing on the page that doesn't earn its place. Loads fast, looks clean on every device.",
        },
        {
          id: "storm",
          name: "storm-piercing.com",
          type: "file",
          kind: "URL",
          modified: "Apr 2026",
          url: "https://storm-piercing.com/en",
          preview:
            "Custom ecommerce + booking — piercing studio.\n\nOne of the more complex builds. The studio needed two things in one: a jewelry store (product pages, cart, checkout) and an appointment booking system. Off-the-shelf tools either did one or the other — and stitching two platforms together would have been a mess.\n\nBuilt everything from scratch: jewelry catalogue with variants, cart, Stripe checkout, appointment booking with availability management, multilingual (EN/GR). All in one codebase, one database, one admin interface.\n\nThe client went from managing three separate systems to one that actually fits how they work.",
        },
        {
          id: "portfolio",
          name: "nikolassapa.vercel.app",
          type: "file",
          kind: "URL",
          modified: "Apr 2026",
          url: "https://nikolassapa.vercel.app",
          preview:
            "This site.\n\nBuilt as a macOS Finder clone — because a standard portfolio page felt boring. Everything custom: the window chrome, the sidebar tree, the file preview panel. Next.js, Tailwind, deployed on Vercel.",
        },
        {
          id: "helpmarq",
          name: "helpmarq.com",
          type: "file",
          kind: "URL",
          modified: "Jan 2026",
          url: "https://helpmarq.com",
          preview:
            "Review marketplace — Athens, Greece.\n\nFull-stack SaaS product built from scratch. Helpmarq lets founders and creators submit their work and get structured, expert feedback from real reviewers — not generic AI output.\n\nBuilt the entire stack: Next.js App Router, Supabase (auth + database), Stripe payments, Resend for email, Vercel deployment. Designed and developed solo.\n\nOne of my own products — not a client project. Built it because the feedback tools that existed were either too vague or too slow.",
        },
        {
          id: "dailycar",
          name: "dailycargreece.com",
          type: "file",
          kind: "URL",
          modified: "May 2026",
          url: "https://www.dailycargreece.com",
          preview:
            "Car rental — Athens, Greece.\n\nBilingual (EN/GR) car rental site for a local fleet operator. Fleet showcase, quick-book strip, transparent pricing, WhatsApp booking integration.\n\nStrong local SEO setup, structured data for rental schema, mobile-first layout. Client went from zero online presence to ranking in Athens car rental searches.",
        },
        {
          id: "trypadelup",
          name: "trypadelup.com",
          type: "file",
          kind: "URL",
          modified: "Jun 2026",
          url: "https://www.trypadelup.com",
          preview:
            "Padel AI coach — iOS app marketing site.\n\nMarketing site for Padel Up, an AI-powered padel coaching iOS app. Handles onboarding, feature explanation, and App Store conversion.\n\nClean, sport-forward design. Bilingual EN/GR. Mobile-optimised — most visitors come from phones. Built to support App Store submission and pre-launch email capture.",
        },
        {
          id: "demos",
          name: "Demos",
          type: "folder",
          modified: "May 2026",
          children: [
            {
              id: "demo-restaurant",
              name: "olive-and-thyme",
              type: "file",
              kind: "URL",
              modified: "May 2026",
              url: "https://demo-1-bice.vercel.app",
              preview:
                "Demo — Mediterranean restaurant.\n\nFull demo site: menu showcase, instant online reservation flow, warm visual design. Built to show restaurant clients exactly what their site could look like before committing.",
            },
            {
              id: "demo-carrental",
              name: "athens-car-rental-demo",
              type: "file",
              kind: "URL",
              modified: "May 2026",
              url: "https://car-rental-beta-taupe.vercel.app",
              preview:
                "Demo — car rental.\n\nFleet showcase with real-time availability feel, quick-book strip, bilingual EN/GR, WhatsApp booking integration. Reference for car rental businesses considering a new site.",
            },
            {
              id: "demo-ecommerce",
              name: "luxewear-fashion",
              type: "file",
              kind: "URL",
              modified: "May 2026",
              url: "https://e-commerce-plum-eight-76.vercel.app",
              preview:
                "Demo — fashion e-commerce.\n\nFull shopping cart, product filtering, seamless checkout. Shows what a clean, conversion-focused fashion store looks like without Shopify's template ceiling.",
            },
            {
              id: "demo-barbershop",
              name: "barberhaus",
              type: "file",
              kind: "URL",
              modified: "May 2026",
              url: "https://barbershop-demo-eosin.vercel.app",
              preview:
                "Demo — premium barbershop.\n\nOnline booking, team showcase, dark gold aesthetic. For barbershops that want to look premium and convert Instagram followers into booked appointments.",
            },
            {
              id: "demo-saas",
              name: "flowspace-saas",
              type: "file",
              kind: "URL",
              modified: "May 2026",
              url: "https://saas-three-pi-67.vercel.app",
              preview:
                "Demo — SaaS project management.\n\nSubscription pricing, feature pages, conversion-focused design. Shows SaaS founders what a clean, professional marketing site looks like before they build the product.",
            },
            {
              id: "demo-gym",
              name: "fitzone-gym",
              type: "file",
              kind: "URL",
              modified: "May 2026",
              url: "https://demo-4-mu.vercel.app",
              preview:
                "Demo — gym / fitness.\n\nHigh-energy design, class schedules, trainer profiles, pricing built for conversions. For gyms and fitness studios that want a site that drives sign-ups, not just looks.",
            },
          ],
        },
      ],
    },
    {
      id: "products",
      name: "Products",
      type: "folder",
      modified: "Jun 2026",
      children: [
        {
          id: "padelup",
          name: "PadelUp",
          type: "file",
          kind: "iOS App · In Review",
          modified: "Jun 2026",
          url: "https://www.trypadelup.com",
          preview:
            "AI padel coaching app for iOS.\n\nPersonalized training plans, AI video technique analysis, an in-app AI coach, court finder, and progression stats. Built for players who take their game seriously — not a generic fitness tracker with a padel skin.\n\nNative SwiftUI, Supabase backend, Superwall for subscriptions. Currently in TestFlight review.\n\ntrypadelup.com",
        },
        {
          id: "branch-ai",
          name: "Branch AI",
          type: "file",
          kind: "CLI Tool · npm",
          modified: "Jun 2026",
          url: "https://branchai-fawn.vercel.app",
          preview:
            "Reasoning canvas for AI CLIs.\n\nWhen an AI works through a hard problem, the reasoning disappears the moment you see the answer. Branch captures every step as a navigable, forkable tree — rewind to any point, explore alternative paths, inject new facts mid-thought.\n\nWorks with Claude Code, Codex, Gemini CLI, and Factory Droid. Ships as a CLI, an MCP server, and a hosted web viewer.\n\nnpm install -g branch-ai",
        },
        {
          id: "clientcast",
          name: "Clientcast",
          type: "file",
          kind: "CLI Tool · npm",
          modified: "Jun 2026",
          preview:
            "Git commits → client update emails, automatically.\n\nReads your recent commits, drafts a plain-English update for the client, delivers it, and classifies the reply — approval, feedback, or scope creep (with hours and dollars attached). Stripe invoicing built in for flagged additional work.\n\nBuilt for freelancers and agencies who bleed hours on status updates and unpaid 'can you also...' requests.\n\nnpm install -g clientcast",
        },
        {
          id: "grip",
          name: "Grip",
          type: "file",
          kind: "Python SDK · PyPI",
          modified: "Jun 2026",
          preview:
            "Token-efficient browser SDK for AI agents.\n\nBuilt directly on Chrome DevTools Protocol — no Playwright, no Puppeteer overhead. Instead of dumping raw HTML (12,000 tokens per page) or screenshots (3,000 tokens), Grip gives agents a semantic summary of interactive elements and visible text.\n\nFor any agent that needs to browse the web without burning through its context window.\n\npip install grip-browser",
        },
        {
          id: "neurolens",
          name: "NeuroPulse",
          type: "file",
          kind: "Open Source · Live",
          modified: "Apr 2026",
          url: "https://neurolens-nine.vercel.app",
          preview:
            "Brain-response analysis for marketing content.\n\nDrop in any ad — video, image, text, or a YouTube/TikTok URL — and get scored across 8 brain regions: visual cortex, face/social processing, amygdala, hippocampus, language, reward, prefrontal, motor action. Actionable recommendations, creator-persona overlays, A/B comparison.\n\nOpen source. Self-host for full privacy, or use the hosted demo.\n\nneurolens-nine.vercel.app",
        },
        {
          id: "skillswitch",
          name: "Skillswitch",
          type: "file",
          kind: "CLI Tool · npm",
          modified: "Jun 2026",
          preview:
            "Skill manager for AI CLIs.\n\nRunning 100+ Claude Code skills? Every installed skill gets injected into your context window — thousands of tokens burned before your first message. Skillswitch lets you create profiles, enable/disable skills per context, and manage installs across Claude Code, Gemini CLI, Codex, Aider, Amp, and Factory Droid.\n\nnpm install -g skillswitch",
        },
        {
          id: "pulse",
          name: "Pulse",
          type: "file",
          kind: "iOS App · In Development",
          modified: "Jun 2026",
          preview:
            "Approve Claude Code tool calls from your phone.\n\nA Claude Code PreToolUse hook posts every tool call to a relay, which pushes a notification to your iPhone. You approve or deny from the app — Claude continues or stops.\n\nFull auditability over what your AI coding agent does, without sitting at your laptop. iOS + Supabase + Next.js relay.",
        },
        {
          id: "sac-capital",
          name: "SAC Capital",
          type: "file",
          kind: "Live · Mantle",
          modified: "Jun 2026",
          url: "https://sapa-fund.vercel.app",
          preview:
            "Verifiable AI trading agent.\n\nAn autonomous agent making decisions across US equities and prediction markets. Every decision — the reasoning, confidence, and risk parameters — is hashed and anchored on Mantle as a bytes32 commitment before execution. A public verifier frontend lets anyone confirm the on-chain record matches the agent's actual reasoning.\n\nAI trading decisions shouldn't be black boxes.\n\nsapa-fund.vercel.app",
        },
        {
          id: "creator-roast",
          name: "Creator Roast",
          type: "file",
          kind: "SaaS · In Development",
          modified: "Jun 2026",
          preview:
            "AI audit for content creators.\n\nSubmit your social profile — LinkedIn, TikTok, Instagram, X — and get an honest, AI-generated breakdown of what's working, what's broken, and what to fix. Shareable audit card included.\n\nBuilt for creators who want real feedback instead of engagement metrics that mean nothing.",
        },
        {
          id: "marketmyapp",
          name: "MarketMyApp",
          type: "file",
          kind: "SaaS · In Development",
          modified: "Jun 2026",
          preview:
            "Marketing score for indie founders.\n\nMost apps fail at marketing, not at building. MarketMyApp surfaces exactly what's broken in your marketing before your launch does — positioning, copy, channels, conversion. Outputs a scored breakdown and a weekly action plan.\n\nBuilt for founders who build well and market poorly.",
        },
        {
          id: "toolfence",
          name: "Toolfence",
          type: "file",
          kind: "OSS Scanner · npm + Live",
          modified: "Jun 2026",
          url: "https://mcpguard-site.vercel.app",
          preview:
            "Security scanner for MCP servers.\n\nFlags tool poisoning, prompt injection, drift, and scope/cost issues before your AI agents connect to an MCP server. Open-source scanner (Apache 2.0) is the free wedge; a proprietary hosted gateway sits behind it for teams that need a runtime enforcement layer — allow-lists, rate/cost ceilings, audit logging.\n\nnpx toolfence <url>",
        },
        {
          id: "helm",
          name: "Helm",
          type: "file",
          kind: "Internal Agent Platform · MVP",
          modified: "Jun 2026",
          preview:
            "Vercel for internal agents.\n\nAn employee writes an AI agent, runs one command, gets hosting plus an auto-provisioned per-agent database. IT scopes what each agent can touch, watches every execution, and caps token spend per agent with a kill switch.\n\nTypeScript monorepo, Convex, Vercel Sandbox, pluggable LLM backend (keyless Codex CLI default). MVP built and verified end-to-end against real Codex + Convex.",
        },
        {
          id: "command-center",
          name: "Command Center",
          type: "file",
          kind: "Local-First Dashboard · v1.5",
          modified: "Jun 2026",
          url: "https://landing-gamma-black.vercel.app",
          preview:
            "Run side projects as a company of AI agents you can see and manage.\n\nOrg-chart canvas — hire agents, assign tasks, watch them work in real time, stop them mid-run. Agent-to-agent delegation lets a manager agent hand work to reports. No API keys, no cloud — runs on the Claude subscription via the Agent SDK.\n\nLocal-first by design: React UI, Fastify + WebSocket server, Agent SDK workers in real repos on your machine.",
        },
      ],
    },
    {
      id: "testimonials",
      name: "Testimonials",
      type: "folder",
      modified: "Jun 2026",
      children: [
        {
          id: "t-nr40",
          name: "nr40athens.com",
          type: "file",
          kind: "Client Reference",
          modified: "Mar 2026",
          url: "https://nr40athens.com",
          preview:
            "NR40 Urban Arts — Tattoo Studio, Athens\n\nDelivered: full custom site, bilingual EN/GR, dark atmospheric design, booking flow, local SEO.\n\n\"Είμαστε απόλυτα ικανοποιημένοι από τη συνεργασία μας με τον Νίκο για την κατασκευή της ιστοσελίδας μας. Από την πρώτη στιγμή έδειξε επαγγελματισμό, συνέπεια και άριστη τεχνική κατάρτιση. Κατανόησε πλήρως τις ανάγκες μας και υλοποίησε ένα σύγχρονο, λειτουργικό και αισθητικά άρτιο website, δίνοντας μεγάλη προσοχή στη λεπτομέρεια.\n\nΗ επικοινωνία μας ήταν άμεση και αποτελεσματική σε όλη τη διάρκεια του έργου, ενώ ανταποκρινόταν γρήγορα σε κάθε απορία ή αίτημά μας. Το τελικό αποτέλεσμα ξεπέρασε τις προσδοκίες μας και συνέβαλε σημαντικά στην επαγγελματική εικόνα της επιχείρησής μας.\n\nΤον συστήνουμε ανεπιφύλακτα σε όποιον αναζητά έναν αξιόπιστο και ικανό επαγγελματία για την κατασκευή ή αναβάθμιση μιας ιστοσελίδας.\"\n\n\"We are absolutely satisfied with our collaboration with Nikos on building our website. From the very first moment he showed professionalism, consistency, and excellent technical expertise. He fully understood our needs and delivered a modern, functional, and aesthetically polished website, paying great attention to detail.\n\nOur communication was direct and effective throughout the project, and he responded quickly to every question or request. The final result exceeded our expectations and contributed significantly to our business's professional image.\n\nWe wholeheartedly recommend him to anyone looking for a reliable and capable professional to build or upgrade a website.\"",
        },
        {
          id: "t-allcity",
          name: "allcity-clothing",
          type: "file",
          kind: "Client Reference",
          modified: "Mar 2026",
          url: "https://allcity-clothing.vercel.app/",
          preview:
            "All City Clothing — Streetwear Brand\n\nDelivered: full custom e-commerce store. Product pages, cart, checkout, order management. Replaced Shopify.\n\n\"Είμαστε απόλυτα ικανοποιημένοι από τη συνεργασία μας με τον Νίκο για την κατασκευή της ιστοσελίδας μας. Από την πρώτη στιγμή έδειξε επαγγελματισμό, συνέπεια και άριστη τεχνική κατάρτιση. Κατανόησε πλήρως τις ανάγκες μας και υλοποίησε ένα σύγχρονο, λειτουργικό και αισθητικά άρτιο website, δίνοντας μεγάλη προσοχή στη λεπτομέρεια.\n\nΗ επικοινωνία μας ήταν άμεση και αποτελεσματική σε όλη τη διάρκεια του έργου, ενώ ανταποκρινόταν γρήγορα σε κάθε απορία ή αίτημά μας. Το τελικό αποτέλεσμα ξεπέρασε τις προσδοκίες μας και συνέβαλε σημαντικά στην επαγγελματική εικόνα της επιχείρησής μας.\n\nΤον συστήνουμε ανεπιφύλακτα σε όποιον αναζητά έναν αξιόπιστο και ικανό επαγγελματία για την κατασκευή ή αναβάθμιση μιας ιστοσελίδας.\"\n\n\"We are absolutely satisfied with our collaboration with Nikos on building our website. From the very first moment he showed professionalism, consistency, and excellent technical expertise. He fully understood our needs and delivered a modern, functional, and aesthetically polished website, paying great attention to detail.\n\nOur communication was direct and effective throughout the project, and he responded quickly to every question or request. The final result exceeded our expectations and contributed significantly to our business's professional image.\n\nWe wholeheartedly recommend him to anyone looking for a reliable and capable professional to build or upgrade a website.\"",
        },
        {
          id: "t-tsvc",
          name: "tsvcstudio.com",
          type: "file",
          kind: "Client Reference",
          modified: "Feb 2026",
          url: "https://www.tsvcstudio.com/",
          preview:
            "TSVC Studio — Digital Agency\n\nDelivered: agency website. Clean layout, strong typography, clear hierarchy.\n\n\"Went from placeholder to live in under two weeks. Exactly what we needed — looks like we've been doing this for years.\"\n\nResult: positioned as an established, credible studio from day one.",
        },
        {
          id: "t-hustle",
          name: "hustle-media",
          type: "file",
          kind: "Client Reference · Video",
          modified: "Feb 2026",
          url: "https://hustle-media-rouge.vercel.app/",
          videoUrl: "https://www.youtube.com/embed/oqYyvhVvtgg",
          preview:
            "Hustle Media — Social Media Agency\n\nDelivered: SMMA agency website. Sharp design, clear service breakdown, trust-building proof sections.\n\nResult: site filters wrong-fit clients and converts the right ones. Built to reflect the results they claim to deliver.\n\n▶ Video testimonial below.",
        },
        {
          id: "t-521",
          name: "521.is",
          type: "file",
          kind: "Client Reference",
          modified: "Apr 2026",
          url: "https://521.is/",
          preview:
            "521 — Course / Location Independence\n\nDelivered: sales landing page. Tight structure, objection handling in the flow, single focused CTA, fast load.\n\nResult: above-the-fold clarity in under 5 seconds, clean on every device, consistent PageSpeed scores.",
        },
        {
          id: "t-storm",
          name: "storm-piercing.com",
          type: "file",
          kind: "Client Reference",
          modified: "Apr 2026",
          url: "https://storm-piercing.com/en",
          preview:
            "Storm Piercing — Piercing Studio & Jewelry\n\nDelivered: custom e-commerce + booking system in one. Jewelry catalogue, cart, Stripe checkout, appointment booking with availability management. Multilingual EN/GR. Replaced three separate systems.\n\n\"We went from juggling three tools to one thing that actually works. Build time was faster than I expected.\"\n\nResult: one codebase, one database, one admin interface.",
        },
        {
          id: "t-dailycar",
          name: "dailycargreece.com",
          type: "file",
          kind: "Client Reference",
          modified: "May 2026",
          url: "https://www.dailycargreece.com",
          preview:
            "Daily Car Greece — Car Rental, Athens\n\nDelivered: bilingual (EN/GR) car rental site. Fleet showcase, WhatsApp booking, strong local SEO, structured data.\n\nResult: went from zero online presence to ranking for Athens car rental searches within weeks of launch.",
        },
        {
          id: "t-sean-lee",
          name: "simplicity-in-motion",
          type: "file",
          kind: "Client Reference",
          modified: "Jun 2026",
          preview:
            "Sean Lee — Simplicity in Motion\n\n\"Before working with Nik I had no website at all — just an idea and no clue where to start. What surprised me most was how available he was — basically on call the whole time, which meant no waiting around to schedule things. Questions got answered fast, tweaks happened quickly, and nothing ever got lost in back-and-forth. Even for someone like me who had to be walked through a lot of it, the process never felt overwhelming. He let me pick elements from across his templates and then pulled it all together into something that felt uniquely mine. What came out the other side is something I'm genuinely proud of. Clean, sharp, and it actually feels like the brand. I'd recommend him without hesitation.\"\n\n— Sean Lee · @SeanLeeOnline",
        },
      ],
    },
    {
      id: "stack",
      name: "Stack.md",
      type: "file",
      kind: "Markdown Document",
      modified: "Apr 15, 2026",
      preview:
        "Next.js · React · TypeScript · Tailwind CSS\nSupabase · Vercel · Figma · React Native · Python / FastAPI\n\nI don't chase new frameworks. I use tools I know deeply, that have strong ecosystems, and that don't surprise you in production.\n\nNext.js for everything web. Supabase for auth and databases — it's fast to work with and scales without drama. Vercel for deployment, because zero-config deploys matter when you're moving fast. Figma before any line of code, always.\n\nFor mobile: React Native. For AI features and backend services: Python and FastAPI. For styling: Tailwind — consistent, responsive, no fighting the cascade.",
    },
    {
      id: "process",
      name: "Process.md",
      type: "file",
      kind: "Markdown Document",
      modified: "Apr 15, 2026",
      preview:
        "Simple process. No unnecessary back-and-forth.\n\n1. Discovery — 20–30 min call or a few messages. You explain what you need, I ask the right questions. I want to understand the business, not just the brief.\n\n2. Proposal — clear doc: what I'll build, what's not included, timeline, price. You know exactly what you're getting before anything starts.\n\n3. Design — Figma first. You see it before a single line of code is written. Feedback here is fast and cheap.\n\n4. Build — I develop against the approved design. Regular updates. No disappearing for two weeks and coming back with something you didn't expect.\n\n5. Launch — I handle deployment, domain setup, and any final checks. You get the repo, the keys, and a working product.\n\nMost projects: 1–3 weeks from kickoff to live.",
    },
    {
      id: "rates",
      name: "Rates.md",
      type: "file",
      kind: "Markdown Document",
      modified: "Apr 15, 2026",
      preview:
        "Project-based. You know the number before work starts.\n\nLanding page         from €400\nMarketing site       from €800\nCustom ecommerce     from €1,200\nFull web app (MVP)   from €1,500\nCustom system        scoped individually\n\nEvery project includes design, development, deployment, and one round of revisions after delivery. The price reflects the full thing — not a starting point that quietly grows.\n\nOngoing support and maintenance available as a separate arrangement.\n\nNot sure what your project fits into? Just describe it — I'll give you an honest estimate.",
    },
    {
      id: "contact",
      name: "Contact.md",
      type: "file",
      kind: "Markdown Document",
      modified: "Apr 15, 2026",
      url: "https://cal.com/nikolas-sapa/business-meeting",
      preview:
        "Book a call — cal.com/nikolas-sapa/business-meeting\nEmail — nikolas@helpmarq.com\n\nTell me what you're working on. Even a rough idea is enough to start a conversation — I'll ask whatever I need to understand the scope.\n\nBook directly via cal.com or drop an email. I reply within 24 hours, usually faster.\n\nBased in Athens, Greece. Work with clients remotely, no location restrictions.",
    },
  ],
};

// ─── Helpers ─────────────────────────────────────────────────────────────────

function findNode(node: TreeNode, id: string): TreeNode | null {
  if (node.id === id) return node;
  if (node.type === "folder") {
    for (const child of node.children) {
      const found = findNode(child, id);
      if (found) return found;
    }
  }
  return null;
}

// ─── Icons ───────────────────────────────────────────────────────────────────

function FolderIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none">
      <path
        d="M1 4.5C1 3.67 1.67 3 2.5 3H6L7.5 4.5H13.5C14.33 4.5 15 5.17 15 6V12.5C15 13.33 14.33 14 13.5 14H2.5C1.67 14 1 13.33 1 12.5V4.5Z"
        fill="#7BA7E8"
        stroke="#5A8ED4"
        strokeWidth="0.5"
      />
    </svg>
  );
}

function FileIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none">
      <path d="M3 2H10L13 5V14H3V2Z" fill="#fff" stroke="#C0C0C0" strokeWidth="0.8" />
      <path d="M10 2V5H13" fill="none" stroke="#C0C0C0" strokeWidth="0.8" />
      <line x1="5" y1="7.5" x2="11" y2="7.5" stroke="#C0C0C0" strokeWidth="0.7" />
      <line x1="5" y1="9.5" x2="11" y2="9.5" stroke="#C0C0C0" strokeWidth="0.7" />
      <line x1="5" y1="11.5" x2="9" y2="11.5" stroke="#C0C0C0" strokeWidth="0.7" />
    </svg>
  );
}

// ─── Tree Item ────────────────────────────────────────────────────────────────

type TreeItemProps = {
  node: TreeNode;
  depth: number;
  selected: string;
  openFolders: Set<string>;
  onSelect: (id: string) => void;
  onToggle: (id: string) => void;
};

function TreeItem({ node, depth, selected, openFolders, onSelect, onToggle }: TreeItemProps) {
  const isFolder = node.type === "folder";
  const isOpen = isFolder && openFolders.has(node.id);
  const isSelected = selected === node.id;

  return (
    <div>
      <div
        className={[
          "flex items-center gap-1 py-[3px] pr-2 rounded cursor-pointer select-none",
          isSelected
            ? "bg-[#0064D2] text-white"
            : "text-[#1d1d1f] hover:bg-black/[0.06]",
        ].join(" ")}
        style={{ paddingLeft: `${6 + depth * 14}px` }}
        onClick={() => {
          onSelect(node.id);
          if (isFolder) onToggle(node.id);
        }}
      >
        <span className="w-3 h-3 flex-none flex items-center justify-center">
          {isFolder &&
            (isOpen ? (
              <ChevronDown size={9} className={isSelected ? "text-white" : "text-[#86868b]"} />
            ) : (
              <ChevronRight size={9} className={isSelected ? "text-white" : "text-[#86868b]"} />
            ))}
        </span>
        {isFolder ? (
          <FolderIcon className="w-4 h-4 flex-none" />
        ) : (
          <FileIcon className="w-4 h-4 flex-none" />
        )}
        <span className="ml-1 text-[12px] truncate leading-none">{node.name}</span>
      </div>

      {isFolder && isOpen &&
        node.children.map((child) => (
          <TreeItem
            key={child.id}
            node={child}
            depth={depth + 1}
            selected={selected}
            openFolders={openFolders}
            onSelect={onSelect}
            onToggle={onToggle}
          />
        ))}
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export function FinderWindow() {
  const [selected, setSelected] = useState<string>("root");
  const [openFolders, setOpenFolders] = useState<Set<string>>(new Set(["root"]));

  const toggleFolder = useCallback((id: string) => {
    setOpenFolders((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }, []);

  const handleSelect = useCallback((id: string) => {
    setSelected(id);
  }, []);

  const selectedNode = findNode(ROOT, selected);
  const rightItems: TreeNode[] =
    selectedNode?.type === "folder" ? selectedNode.children : [];
  const selectedFile: FileNode | null =
    selectedNode?.type === "file" ? selectedNode : null;

  return (
    <>
      {/* ── Mobile: horizontal strip showing top-level items ── */}
      <div className="md:hidden flex items-center gap-1.5 px-3 py-2 overflow-x-auto border-b border-[#DCDCDC] bg-[#F6F6F6] flex-none">
        <div className="flex items-center gap-1 flex-none pr-2 border-r border-[#DCDCDC]">
          <FolderIcon className="w-3.5 h-3.5" />
          <span className="text-[10px] font-semibold uppercase tracking-wider text-[#86868b] whitespace-nowrap">
            Dev Work
          </span>
        </div>
        {ROOT.children.map((child) => {
          const isActive = selected === child.id;
          return (
            <button
              key={child.id}
              onClick={() => {
                handleSelect(child.id);
                if (child.type === "folder") toggleFolder(child.id);
              }}
              className={[
                "flex items-center gap-1 px-2 py-0.5 rounded text-[11px] whitespace-nowrap flex-none transition-colors",
                isActive
                  ? "bg-[#0064D2] text-white"
                  : "text-[#1d1d1f] bg-black/[0.05] hover:bg-black/[0.10]",
              ].join(" ")}
            >
              {child.type === "folder" ? (
                <FolderIcon className="w-3 h-3 flex-none" />
              ) : (
                <FileIcon className="w-3 h-3 flex-none" />
              )}
              <span>{child.name}</span>
            </button>
          );
        })}
      </div>

      {/* ── Desktop: tree panel — left sidebar ── */}
      <div className="hidden md:block md:w-52 md:flex-none border-r border-[#DCDCDC] bg-[#F6F6F6] overflow-y-auto py-1.5 px-1">
        <TreeItem
          node={ROOT}
          depth={0}
          selected={selected}
          openFolders={openFolders}
          onSelect={handleSelect}
          onToggle={toggleFolder}
        />
      </div>

      {/* Content panel — right */}
      <div className="flex-1 bg-white overflow-y-auto min-h-0">
        {selectedFile ? (
          <div className="p-6">
            <div className="flex items-start gap-3 mb-5 pb-4 border-b border-[#EBEBEB]">
              <FileIcon className="w-9 h-9 flex-none mt-0.5" />
              <div className="flex-1 min-w-0">
                <p className="text-[13px] font-semibold text-[#1d1d1f] truncate">
                  {selectedFile.name}
                </p>
                <p className="text-[11px] text-[#86868b] mt-0.5">
                  {selectedFile.kind} · {selectedFile.modified}
                </p>
              </div>
              {selectedFile.url && (
                <a
                  href={selectedFile.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-[11px] text-[#0064D2] hover:underline flex-none"
                >
                  Open <ExternalLink size={10} />
                </a>
              )}
            </div>
            <pre className="text-[12px] text-[#3d3d3d] leading-[1.6] whitespace-pre-wrap font-sans">
              {selectedFile.preview}
            </pre>
            {selectedFile.videoUrl && (
              <div className="mt-5">
                <iframe
                  src={selectedFile.videoUrl}
                  className="w-full rounded-lg aspect-video"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  loading="lazy"
                />
              </div>
            )}
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-4 px-4 py-1.5 border-b border-[#E5E5E5] bg-[#FAFAFA] sticky top-0">
              <span className="flex-1 text-[11px] font-medium text-[#86868b] select-none">Name</span>
              <span className="w-32 text-[11px] font-medium text-[#86868b] select-none">Date Modified</span>
              <span className="w-32 text-[11px] font-medium text-[#86868b] select-none">Kind</span>
            </div>
            {rightItems.length === 0 ? (
              <p className="p-6 text-[12px] text-[#86868b]">Empty folder</p>
            ) : (
              rightItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-4 px-4 py-[5px] hover:bg-[#F0F0F0] cursor-pointer border-b border-[#F0F0F0] last:border-0"
                  onClick={() => {
                    handleSelect(item.id);
                    if (item.type === "folder") toggleFolder(item.id);
                  }}
                >
                  <div className="flex-1 flex items-center gap-2 min-w-0">
                    {item.type === "folder" ? (
                      <FolderIcon className="w-4 h-4 flex-none" />
                    ) : (
                      <FileIcon className="w-4 h-4 flex-none" />
                    )}
                    <span className="text-[12px] text-[#1d1d1f] truncate">{item.name}</span>
                    {item.type === "file" && item.url && (
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="text-[#0064D2] hover:opacity-70 flex-none"
                      >
                        <ExternalLink size={10} />
                      </a>
                    )}
                  </div>
                  <span className="w-32 text-[11px] text-[#86868b] flex-none">{item.modified}</span>
                  <span className="w-32 text-[11px] text-[#86868b] flex-none">
                    {item.type === "folder" ? "Folder" : item.kind}
                  </span>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </>
  );
}
