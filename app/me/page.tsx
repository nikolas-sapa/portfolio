export const metadata = {
  title: "Nikolas Sapalidis",
};

export default function MePage() {
  return (
    <main className="flex-1 bg-white overflow-y-auto">
      <div className="p-8 md:p-12 max-w-2xl">
        <div className="mb-10 pb-6 border-b border-[#EBEBEB]">
          <p className="text-[11px] font-mono uppercase tracking-widest text-[#86868b] mb-3">
            Athens, Greece · 16
          </p>
          <h1 className="text-2xl font-sans font-semibold text-[#1d1d1f] leading-tight">
            Nikolas Sapalidis
          </h1>
        </div>

        <div className="space-y-5 text-sm text-[#1d1d1f] leading-relaxed">
          <p>
            I started where most teenagers start: deep in the self-improvement
            rabbit hole. That led to trading and crypto, then running a Google
            Ads agency, then trying to sell digital products — and getting
            nowhere. Didn&apos;t make a cent from any of it.
          </p>

          <p>
            Then I learned to code. Got my first paying client in February 2026
            and realized it was actually working. Since then I&apos;ve built
            across the full stack — websites, web apps, iOS apps, AI
            automations, custom pipelines, admin dashboards, internal tools. No
            templates, no page builders. Everything custom.
          </p>

          <p>
            Alongside client work I build products. First was{" "}
            <a
              href="https://helpmarq.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium underline underline-offset-2"
            >
              Helpmarq
            </a>{" "}
            — a feedback marketplace for structured, expert feedback on real
            projects. Since then:{" "}
            <a
              href="https://www.trypadelup.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium underline underline-offset-2"
            >
              Padel Up
            </a>{" "}
            (iOS AI padel coach),{" "}
            <span className="font-medium">MarketMyApp</span>,{" "}
            <span className="font-medium">Creator Roast</span>,{" "}
            <a
              href="https://www.npmjs.com/package/branch-ai"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium underline underline-offset-2"
            >
              Branch AI
            </a>{" "}
            (500+ npm downloads), <span className="font-medium">NeuroPulse</span>,
            and more. I also work at{" "}
            <a
              href="https://automatesphereai.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium underline underline-offset-2"
            >
              AutomateSphere AI
            </a>{" "}
            building custom AI automation for businesses.
          </p>

          <p>
            Since April 2026 I&apos;ve been on Claude Code Max. It changed how
            I work. I run a homelab (self-hosted Supabase + n8n), ship multiple
            products in parallel, and build client work on the side. I write
            about the patterns that actually work — not the hype.
          </p>

          <div className="pt-5 border-t border-[#EBEBEB]">
            <p className="text-[11px] font-mono uppercase tracking-widest text-[#86868b] mb-3">
              Currently
            </p>
            <ul className="space-y-1.5 font-mono text-xs text-[#86868b]">
              <li>→ Padel Up — in TestFlight review</li>
              <li>→ Noctiq — building (iOS sleep app)</li>
              <li>→ MarketMyApp — deploying</li>
              <li>→ AutomateSphere AI — client automations</li>
              <li>→ Client dev work — web, iOS, automations</li>
              <li>→ Always open to interesting problems</li>
            </ul>
          </div>

          <div className="pt-5 border-t border-[#EBEBEB] grid grid-cols-2 gap-3">
            <a
              href="https://cal.com/nikolas-sapalidis/blueprint"
              target="_blank"
              rel="noopener noreferrer"
              className="block p-4 border border-[#EBEBEB] rounded-lg hover:border-[#1d1d1f] transition-colors"
            >
              <p className="text-[10px] font-mono uppercase tracking-widest text-[#86868b] mb-1.5">
                Build something
              </p>
              <p className="text-sm font-medium text-[#1d1d1f]">
                Free AI System Blueprint Call
              </p>
              <p className="text-xs text-[#86868b] mt-1">
                30 min. No pitch. Just a blueprint.
              </p>
            </a>
            <a
              href="/resources/starter-pack"
              className="block p-4 border border-[#EBEBEB] rounded-lg hover:border-[#1d1d1f] transition-colors"
            >
              <p className="text-[10px] font-mono uppercase tracking-widest text-[#86868b] mb-1.5">
                Here for the content
              </p>
              <p className="text-sm font-medium text-[#1d1d1f]">
                Claude Code Starter Pack
              </p>
              <p className="text-xs text-[#86868b] mt-1">
                Skills, hooks, CLAUDE.md template. Free.
              </p>
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
