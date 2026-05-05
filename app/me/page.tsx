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
            Then I learned to code. Started building websites for businesses,
            got my first paying client in February 2026, and realized this was
            actually working. No templates — everything I build is custom, from
            scratch, exactly what the client needs.
          </p>

          <p>
            Alongside the client work, I started building products. First was{" "}
            <a
              href="https://helpmarq.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium underline underline-offset-2"
            >
              Helpmarq
            </a>{" "}
            — a feedback marketplace for structured, multi-perspective feedback
            on real projects. It&apos;s live. Since then I&apos;ve shipped{" "}
            <a
              href="https://www.trypadelup.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium underline underline-offset-2"
            >
              Padel Up
            </a>{" "}
            (iOS padel coaching app),{" "}
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
            (500+ npm downloads),{" "}
            <span className="font-medium">NeuroPulse</span>, and more. I also
            work at{" "}
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
            products in parallel, and build client apps on the side. I write
            about the patterns that actually work — not the hype.
          </p>

          <div className="pt-5 border-t border-[#EBEBEB]">
            <p className="text-[11px] font-mono uppercase tracking-widest text-[#86868b] mb-3">
              Currently
            </p>
            <ul className="space-y-1.5 font-mono text-xs text-[#86868b]">
              <li>→ Padel Up — pre-launch, App Store submission</li>
              <li>→ Noctiq — building (iOS sleep app)</li>
              <li>→ MarketMyApp — deploying</li>
              <li>→ AutomateSphere AI — building client automations</li>
              <li>→ Client apps — custom iOS + web work</li>
              <li>→ Always exploring new opportunities</li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
}
