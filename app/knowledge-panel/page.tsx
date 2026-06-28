'use client'

import { useState, useEffect, useCallback } from 'react'

const TOTAL = 20

type Slide = {
  tag: string
  content: React.ReactNode
}

function Tag({ n }: { n: number }) {
  return (
    <span style={{ fontFamily: 'var(--font-geist-mono)', fontSize: 11, color: '#8B8D91', letterSpacing: '0.08em', textTransform: 'uppercase' as const }}>
      {String(n).padStart(2, '0')} / {TOTAL}
    </span>
  )
}

function Divider() {
  return <div style={{ width: 36, height: 2, background: 'rgba(243,242,238,0.12)', borderRadius: 2 }} />
}

function Card({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ background: '#222228', border: '1px solid rgba(243,242,238,0.07)', borderRadius: 12, padding: '16px 20px' }}>
      {children}
    </div>
  )
}

function Mono({ children }: { children: React.ReactNode }) {
  return <span style={{ fontFamily: 'var(--font-geist-mono)', fontSize: 12, color: '#8B8D91' }}>{children}</span>
}

function MonoHL({ children }: { children: React.ReactNode }) {
  return <span style={{ fontFamily: 'var(--font-geist-mono)', fontSize: 12, color: '#F3F2EE' }}>{children}</span>
}

const slides: Slide[] = [
  // 01
  {
    tag: '01',
    content: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        <Tag n={1} />
        <h1 style={{ fontFamily: 'Sora, sans-serif', fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 800, lineHeight: 1.1, letterSpacing: '-0.03em', color: '#F3F2EE', margin: 0 }}>
          How I gave myself<br />a Google Knowledge Panel.
        </h1>
        <p style={{ fontSize: 15, color: '#8B8D91', lineHeight: 1.6, margin: 0 }}>
          10 weeks. No PR firm. No Wikipedia. Here&apos;s the recipe.
        </p>
      </div>
    ),
  },
  // 02
  {
    tag: '02',
    content: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
        <Tag n={2} />
        <Divider />
        <h2 style={{ fontFamily: 'Sora, sans-serif', fontSize: 'clamp(20px, 3vw, 30px)', fontWeight: 700, lineHeight: 1.2, letterSpacing: '-0.02em', color: '#F3F2EE', margin: 0 }}>
          Google calls it a Knowledge Panel.
        </h2>
        <p style={{ fontSize: 15, color: 'rgba(243,242,238,0.6)', lineHeight: 1.65, margin: 0 }}>
          You don&apos;t apply. You give it the right signals, and Google instantiates one.
        </p>
        <p style={{ fontSize: 15, color: 'rgba(243,242,238,0.6)', lineHeight: 1.65, margin: 0 }}>
          It&apos;s pulled from the <strong style={{ color: '#F3F2EE', fontWeight: 600 }}>Knowledge Graph</strong> — Google&apos;s internal database of entities it considers notable.
        </p>
      </div>
    ),
  },
  // 03
  {
    tag: '03',
    content: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        <Tag n={3} />
        <h2 style={{ fontFamily: 'Sora, sans-serif', fontSize: 'clamp(20px, 3vw, 30px)', fontWeight: 700, lineHeight: 1.2, letterSpacing: '-0.02em', color: '#F3F2EE', margin: 0 }}>
          What you don&apos;t need.
        </h2>
        <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10, padding: 0, margin: 0 }}>
          {['a Wikipedia article', 'a PR firm', 'a $5k SEO consultant', 'tier-1 press', 'a "claim your panel" service'].map(item => (
            <li key={item} style={{ display: 'flex', gap: 12, fontSize: 15, color: 'rgba(243,242,238,0.6)', lineHeight: 1.5 }}>
              <span style={{ fontFamily: 'var(--font-geist-mono)', fontSize: 12, color: '#8B8D91', marginTop: 3, flexShrink: 0 }}>—</span>
              {item}
            </li>
          ))}
        </ul>
      </div>
    ),
  },
  // 04
  {
    tag: '04',
    content: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        <Tag n={4} />
        <h2 style={{ fontFamily: 'Sora, sans-serif', fontSize: 'clamp(20px, 3vw, 30px)', fontWeight: 700, lineHeight: 1.2, letterSpacing: '-0.02em', color: '#F3F2EE', margin: 0 }}>
          The 5-step recipe.
        </h2>
        <ol style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 12, padding: 0, margin: 0, counterReset: 'step' }}>
          {['Schema on your site.', 'A Wikidata Q-item.', 'An image uploaded to Wikimedia Commons.', 'Consistency across every profile.', 'Wait.'].map((item, i) => (
            <li key={item} style={{ display: 'flex', gap: 12, fontSize: 15, color: 'rgba(243,242,238,0.6)', lineHeight: 1.5, alignItems: 'flex-start' }}>
              <span style={{ fontFamily: 'var(--font-geist-mono)', fontSize: 11, color: '#8B8D91', background: '#222228', border: '1px solid rgba(243,242,238,0.07)', borderRadius: 6, minWidth: 22, height: 22, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 2 }}>{i + 1}</span>
              {item}
            </li>
          ))}
        </ol>
      </div>
    ),
  },
  // 05
  {
    tag: '05',
    content: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
        <Tag n={5} />
        <span style={{ fontFamily: 'Sora, sans-serif', fontSize: 13, fontWeight: 600, color: '#8B8D91', letterSpacing: '-0.01em' }}>Step 1 + 2 — the foundation.</span>
        <h2 style={{ fontFamily: 'Sora, sans-serif', fontSize: 'clamp(20px, 3vw, 30px)', fontWeight: 700, lineHeight: 1.2, letterSpacing: '-0.02em', color: '#F3F2EE', margin: 0 }}>
          JSON-LD + Wikidata.
        </h2>
        <p style={{ fontSize: 15, color: 'rgba(243,242,238,0.6)', lineHeight: 1.65, margin: 0 }}>
          JSON-LD <Mono>Person</Mono> schema on your homepage.
        </p>
        <p style={{ fontSize: 15, color: 'rgba(243,242,238,0.6)', lineHeight: 1.65, margin: 0 }}>
          A Wikidata Q-item, every claim referenced to an independent source. The <strong style={{ color: '#F3F2EE', fontWeight: 600 }}>sameAs</strong> array is your site-side bridge.
        </p>
        <p style={{ fontSize: 13, color: '#8B8D91', margin: 0 }}>~3 hours of focused work.</p>
      </div>
    ),
  },
  // 06
  {
    tag: '06',
    content: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
        <Tag n={6} />
        <span style={{ fontFamily: 'var(--font-geist-mono)', fontSize: 11, color: '#8B8D91', letterSpacing: '0.1em', textTransform: 'uppercase' as const }}>Step 3 — the unlock</span>
        <h2 style={{ fontFamily: 'Sora, sans-serif', fontSize: 'clamp(20px, 3vw, 30px)', fontWeight: 700, lineHeight: 1.2, letterSpacing: '-0.02em', color: '#F3F2EE', margin: 0 }}>
          I uploaded my headshot to Wikimedia Commons.
        </h2>
        <p style={{ fontSize: 15, color: 'rgba(243,242,238,0.6)', lineHeight: 1.65, margin: 0 }}>5 weeks later, the panel appeared.</p>
        <Card>
          <div style={{ lineHeight: 1.9 }}>
            <Mono>License: </Mono><MonoHL>CC-BY-SA 4.0</MonoHL><br />
            <Mono>File → Wikidata property </Mono><MonoHL>P18</MonoHL><br />
            <Mono>Single highest-impact step.</Mono>
          </div>
        </Card>
      </div>
    ),
  },
  // 07
  {
    tag: '07',
    content: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
        <Tag n={7} />
        <span style={{ fontFamily: 'Sora, sans-serif', fontSize: 13, fontWeight: 600, color: '#8B8D91' }}>Step 4 + 5 — consistency, then wait.</span>
        <h2 style={{ fontFamily: 'Sora, sans-serif', fontSize: 'clamp(20px, 3vw, 30px)', fontWeight: 700, lineHeight: 1.2, letterSpacing: '-0.02em', color: '#F3F2EE', margin: 0 }}>
          Make every profile say the same things.
        </h2>
        <p style={{ fontSize: 15, color: 'rgba(243,242,238,0.6)', lineHeight: 1.65, margin: 0 }}>
          LinkedIn, X, Crunchbase, about.me — same city, same title, same bio.
        </p>
        <p style={{ fontSize: 15, color: 'rgba(243,242,238,0.6)', lineHeight: 1.65, margin: 0 }}>
          Google cross-references these to verify the entity. <strong style={{ color: '#F3F2EE', fontWeight: 600 }}>Inconsistencies weaken the signal.</strong>
        </p>
      </div>
    ),
  },
  // 08
  {
    tag: '08',
    content: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
        <Tag n={8} />
        <h2 style={{ fontFamily: 'Sora, sans-serif', fontSize: 'clamp(20px, 3vw, 30px)', fontWeight: 700, lineHeight: 1.2, letterSpacing: '-0.02em', color: '#F3F2EE', margin: 0 }}>
          The timeline.
        </h2>
        <Card>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {[
              ['Day 1', 'First JSON-LD schema deployed on homepage'],
              ['Day 2', 'Wikidata Q-item created, all statements referenced'],
              ['Day 3', 'llms.txt + sameAs array updated'],
              ['Week 3', 'Profile consistency pass across all platforms'],
              ['Week 5', 'Headshot uploaded to Wikimedia Commons + P18 added'],
              ['Week 10', 'Knowledge Panel went live'],
            ].map(([date, event], i, arr) => (
              <div key={date} style={{ display: 'grid', gridTemplateColumns: '80px 1fr', gap: 14, padding: '10px 0', borderBottom: i < arr.length - 1 ? '1px solid rgba(243,242,238,0.06)' : 'none' }}>
                <span style={{ fontFamily: 'var(--font-geist-mono)', fontSize: 11, color: '#8B8D91' }}>{date}</span>
                <span style={{ fontSize: 13, color: 'rgba(243,242,238,0.6)', lineHeight: 1.4 }}>{event}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    ),
  },
  // 09
  {
    tag: '09',
    content: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        <Tag n={9} />
        <h2 style={{ fontFamily: 'Sora, sans-serif', fontSize: 'clamp(20px, 3vw, 30px)', fontWeight: 700, lineHeight: 1.2, letterSpacing: '-0.02em', color: '#F3F2EE', margin: 0 }}>
          It worked.
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          {[['73', 'days from first commit to panel'], ['$0', 'spent on PR, SEO, or consultants']].map(([n, label]) => (
            <Card key={label}>
              <div style={{ fontFamily: 'Sora, sans-serif', fontSize: 32, fontWeight: 700, color: '#F3F2EE', lineHeight: 1 }}>{n}</div>
              <div style={{ fontSize: 12, color: '#8B8D91', marginTop: 8 }}>{label}</div>
            </Card>
          ))}
        </div>
        <p style={{ fontSize: 15, color: 'rgba(243,242,238,0.6)', margin: 0 }}>Scroll for the technical manual ↓</p>
      </div>
    ),
  },
  // 10
  {
    tag: '10',
    content: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        <Tag n={10} />
        <h2 style={{ fontFamily: 'Sora, sans-serif', fontSize: 'clamp(20px, 3vw, 30px)', fontWeight: 700, lineHeight: 1.2, letterSpacing: '-0.02em', color: '#F3F2EE', margin: 0 }}>
          Want the manual?
        </h2>
        <p style={{ fontSize: 15, color: 'rgba(243,242,238,0.6)', lineHeight: 1.65, margin: 0 }}>If you came for the wow — screenshot and share.</p>
        <p style={{ fontSize: 15, color: 'rgba(243,242,238,0.6)', lineHeight: 1.65, margin: 0 }}>If you&apos;re building your own — keep scrolling.</p>
        <Divider />
        <p style={{ fontSize: 13, color: '#8B8D91', margin: 0 }}>Everything below is the technical implementation.</p>
      </div>
    ),
  },
  // 11
  {
    tag: '11',
    content: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
        <Tag n={11} />
        <h2 style={{ fontFamily: 'Sora, sans-serif', fontSize: 'clamp(20px, 3vw, 30px)', fontWeight: 700, lineHeight: 1.2, letterSpacing: '-0.02em', color: '#F3F2EE', margin: 0 }}>
          JSON-LD @graph anatomy.
        </h2>
        <p style={{ fontSize: 15, color: 'rgba(243,242,238,0.6)', lineHeight: 1.65, margin: 0 }}>
          Person, Projects, WebSite — all linked by <Mono>@id</Mono>. One entity. Multiple types.
        </p>
        <Card>
          <div style={{ lineHeight: 1.9 }}>
            <Mono>&quot;@context&quot;: </Mono><MonoHL>&quot;https://schema.org&quot;</MonoHL><Mono>,</Mono><br />
            <Mono>&quot;@graph&quot;: [</Mono><br />
            <Mono>&nbsp;&nbsp;{'{ '}&quot;@type&quot;: </Mono><MonoHL>&quot;Person&quot;</MonoHL><Mono>{' },'}</Mono><br />
            <Mono>&nbsp;&nbsp;{'{ '}&quot;@type&quot;: </Mono><MonoHL>&quot;SoftwareApplication&quot;</MonoHL><Mono>{' },'}</Mono><br />
            <Mono>&nbsp;&nbsp;{'{ '}&quot;@type&quot;: </Mono><MonoHL>&quot;WebSite&quot;</MonoHL><Mono>{' }'}</Mono><br />
            <Mono>]</Mono>
          </div>
        </Card>
      </div>
    ),
  },
  // 12
  {
    tag: '12',
    content: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
        <Tag n={12} />
        <h2 style={{ fontFamily: 'Sora, sans-serif', fontSize: 'clamp(20px, 3vw, 30px)', fontWeight: 700, lineHeight: 1.2, letterSpacing: '-0.02em', color: '#F3F2EE', margin: 0 }}>
          Wikidata P-codes that matter.
        </h2>
        <Card>
          {[
            ['P31', 'instance of', '→ human'],
            ['P106', 'occupation', '→ entrepreneur, software engineer'],
            ['P800', 'notable work', '→ your projects (as Q-items)'],
            ['P18', 'image', '→ Commons file (the unlock)'],
            ['P551', 'residence', '→ your city (Q-item)'],
            ['P856', 'official website', '→ your site'],
          ].map(([code, label, value], i, arr) => (
            <div key={code} style={{ display: 'grid', gridTemplateColumns: '36px 1fr', gap: 14, padding: '9px 0', borderBottom: i < arr.length - 1 ? '1px solid rgba(243,242,238,0.06)' : 'none', alignItems: 'baseline' }}>
              <span style={{ fontFamily: 'var(--font-geist-mono)', fontSize: 11, color: '#8B8D91' }}>{code}</span>
              <span style={{ fontSize: 13, color: 'rgba(243,242,238,0.6)' }}><strong style={{ color: '#F3F2EE', fontWeight: 500 }}>{label}</strong> {value}</span>
            </div>
          ))}
        </Card>
        <p style={{ fontSize: 12, color: '#8B8D91', margin: 0 }}>Every statement needs a P854 reference URL. Unreferenced claims get nominated for deletion.</p>
      </div>
    ),
  },
  // 13
  {
    tag: '13',
    content: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        <Tag n={13} />
        <h2 style={{ fontFamily: 'Sora, sans-serif', fontSize: 'clamp(20px, 3vw, 30px)', fontWeight: 700, lineHeight: 1.2, letterSpacing: '-0.02em', color: '#F3F2EE', margin: 0 }}>
          Commons upload, in 60 seconds.
        </h2>
        <ol style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 12, padding: 0, margin: 0 }}>
          {[
            'commons.wikimedia.org/wiki/Special:UploadWizard',
            '"It is entirely my own work" — CC-BY-SA 4.0',
            'Descriptive filename: Nikolas Sapalidis headshot 2026.jpg',
            'On Wikidata: add property P18, paste the filename',
          ].map((item, i) => (
            <li key={i} style={{ display: 'flex', gap: 12, fontSize: 14, color: 'rgba(243,242,238,0.6)', lineHeight: 1.5, alignItems: 'flex-start' }}>
              <span style={{ fontFamily: 'var(--font-geist-mono)', fontSize: 11, color: '#8B8D91', background: '#222228', border: '1px solid rgba(243,242,238,0.07)', borderRadius: 6, minWidth: 22, height: 22, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 1 }}>{i + 1}</span>
              {item}
            </li>
          ))}
        </ol>
        <p style={{ fontSize: 12, color: '#8B8D91', margin: 0 }}>Until P18 is set, the panel may not instantiate at all.</p>
      </div>
    ),
  },
  // 14
  {
    tag: '14',
    content: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
        <Tag n={14} />
        <h2 style={{ fontFamily: 'Sora, sans-serif', fontSize: 'clamp(20px, 3vw, 30px)', fontWeight: 700, lineHeight: 1.2, letterSpacing: '-0.02em', color: '#F3F2EE', margin: 0 }}>
          Cross-platform consistency.
        </h2>
        <p style={{ fontSize: 15, color: 'rgba(243,242,238,0.6)', margin: 0 }}>Same city. Same title. Same bio. Everywhere.</p>
        <Card>
          {[
            ['Schema', 'homeLocation, jobTitle, description'],
            ['Wikidata', 'P551 residence, P106 occupation'],
            ['LinkedIn', 'headline, location, about'],
            ['X / Twitter', 'bio, location'],
            ['Crunchbase', 'person page'],
            ['about.me', 'headline + location field'],
          ].map(([platform, fields], i, arr) => (
            <div key={platform} style={{ display: 'grid', gridTemplateColumns: '80px 1fr', gap: 14, padding: '9px 0', borderBottom: i < arr.length - 1 ? '1px solid rgba(243,242,238,0.06)' : 'none' }}>
              <span style={{ fontFamily: 'var(--font-geist-mono)', fontSize: 11, color: '#8B8D91' }}>{platform}</span>
              <span style={{ fontSize: 13, color: 'rgba(243,242,238,0.6)' }}>{fields}</span>
            </div>
          ))}
        </Card>
      </div>
    ),
  },
  // 15
  {
    tag: '15',
    content: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        <Tag n={15} />
        <h2 style={{ fontFamily: 'Sora, sans-serif', fontSize: 'clamp(20px, 3vw, 30px)', fontWeight: 700, lineHeight: 1.2, letterSpacing: '-0.02em', color: '#F3F2EE', margin: 0 }}>
          Validators.
        </h2>
        <ol style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 12, padding: 0, margin: 0 }}>
          {[
            ['validator.schema.org', 'aim for 0 errors, 0 warnings'],
            ['Google Rich Results Test', 'Person + WebSite parse silently; SoftwareApp lights up'],
          ].map(([tool, note], i) => (
            <li key={tool} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
              <span style={{ fontFamily: 'var(--font-geist-mono)', fontSize: 11, color: '#8B8D91', background: '#222228', border: '1px solid rgba(243,242,238,0.07)', borderRadius: 6, minWidth: 22, height: 22, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 2 }}>{i + 1}</span>
              <div>
                <strong style={{ fontSize: 14, color: '#F3F2EE', fontWeight: 500 }}>{tool}</strong>
                <p style={{ fontSize: 13, color: '#8B8D91', margin: '2px 0 0' }}>{note}</p>
              </div>
            </li>
          ))}
        </ol>
        <Card>
          <Mono>Append </Mono><MonoHL>?v=2</MonoHL><Mono> to bust Google&apos;s URL-level cache when retesting.</Mono>
        </Card>
      </div>
    ),
  },
  // 16
  {
    tag: '16',
    content: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
        <Tag n={16} />
        <h2 style={{ fontFamily: 'Sora, sans-serif', fontSize: 'clamp(20px, 3vw, 30px)', fontWeight: 700, lineHeight: 1.2, letterSpacing: '-0.02em', color: '#F3F2EE', margin: 0 }}>
          The CDN gotcha.
        </h2>
        <p style={{ fontSize: 15, color: 'rgba(243,242,238,0.6)', lineHeight: 1.65, margin: 0 }}>
          After every schema deploy: <strong style={{ color: '#F3F2EE', fontWeight: 600 }}>purge your cache.</strong>
        </p>
        <p style={{ fontSize: 15, color: 'rgba(243,242,238,0.6)', lineHeight: 1.65, margin: 0 }}>
          Googlebot can hit a stale edge and index the old schema. Takes hours to recover.
        </p>
        <Card>
          <div style={{ lineHeight: 1.9 }}>
            <Mono>Cloudflare → Caching → Configuration → </Mono><MonoHL>Purge Everything</MonoHL><br />
            <Mono>Always. Even if </Mono><MonoHL>cf-cache-status: DYNAMIC</MonoHL>
          </div>
        </Card>
      </div>
    ),
  },
  // 17
  {
    tag: '17',
    content: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
        <Tag n={17} />
        <h2 style={{ fontFamily: 'Sora, sans-serif', fontSize: 'clamp(20px, 3vw, 30px)', fontWeight: 700, lineHeight: 1.2, letterSpacing: '-0.02em', color: '#F3F2EE', margin: 0 }}>
          The Wikipedia post-mortem.
        </h2>
        <p style={{ fontSize: 15, color: 'rgba(243,242,238,0.6)', lineHeight: 1.65, margin: 0 }}>I considered submitting a Wikipedia article.</p>
        <p style={{ fontSize: 15, color: 'rgba(243,242,238,0.6)', lineHeight: 1.65, margin: 0 }}>The panel went live without it.</p>
        <p style={{ fontSize: 15, color: 'rgba(243,242,238,0.6)', lineHeight: 1.65, margin: 0 }}>
          The <strong style={{ color: '#F3F2EE', fontWeight: 600 }}>schema + Wikidata + image combo was sufficient.</strong>
        </p>
        <p style={{ fontSize: 12, color: '#8B8D91', margin: 0 }}>LLM-drafted articles get flagged. Sources need to profile you, not just mention you in passing.</p>
      </div>
    ),
  },
  // 18
  {
    tag: '18',
    content: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        <Tag n={18} />
        <h2 style={{ fontFamily: 'Sora, sans-serif', fontSize: 'clamp(20px, 3vw, 30px)', fontWeight: 700, lineHeight: 1.2, letterSpacing: '-0.02em', color: '#F3F2EE', margin: 0 }}>
          What to skip.
        </h2>
        <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10, padding: 0, margin: 0 }}>
          {[
            'Org Q-items for companies without independent press → deletion-bait',
            'LLM-drafted Wikipedia articles → flagged on sight',
            '"Bestselling / pioneering / leading" in your own bio → reviewers strip these',
            'Tweaking after the panel goes live → can cause Google to retract it',
          ].map(item => (
            <li key={item} style={{ display: 'flex', gap: 12, fontSize: 14, color: 'rgba(243,242,238,0.6)', lineHeight: 1.5 }}>
              <span style={{ fontFamily: 'var(--font-geist-mono)', fontSize: 12, color: '#8B8D91', marginTop: 3, flexShrink: 0 }}>—</span>
              {item}
            </li>
          ))}
        </ul>
      </div>
    ),
  },
  // 19
  {
    tag: '19',
    content: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        <Tag n={19} />
        <h2 style={{ fontFamily: 'Sora, sans-serif', fontSize: 'clamp(20px, 3vw, 30px)', fontWeight: 700, lineHeight: 1.2, letterSpacing: '-0.02em', color: '#F3F2EE', margin: 0 }}>
          Timing benchmark.
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          {[['~5 wks', 'Commons upload + P18 → panel live'], ['~10 wks', 'bare-schema start → panel live']].map(([n, label]) => (
            <Card key={label}>
              <div style={{ fontFamily: 'Sora, sans-serif', fontSize: 28, fontWeight: 700, color: '#F3F2EE', lineHeight: 1 }}>{n}</div>
              <div style={{ fontSize: 12, color: '#8B8D91', marginTop: 8 }}>{label}</div>
            </Card>
          ))}
        </div>
        <p style={{ fontSize: 15, color: 'rgba(243,242,238,0.6)', margin: 0 }}>Don&apos;t tweak during the wait. Let Google&apos;s crawl cycle catch up.</p>
      </div>
    ),
  },
  // 20
  {
    tag: '20',
    content: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        <Tag n={20} />
        <h2 style={{ fontFamily: 'Sora, sans-serif', fontSize: 'clamp(20px, 3vw, 30px)', fontWeight: 700, lineHeight: 1.2, letterSpacing: '-0.02em', color: '#F3F2EE', margin: 0 }}>
          Resources.
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {[
            ['schema.org/Person', 'https://schema.org/Person', 'Full property reference for JSON-LD'],
            ['wikidata.org', 'https://www.wikidata.org', 'Create and edit your Q-item'],
            ['Wikimedia Commons Upload Wizard', 'https://commons.wikimedia.org/wiki/Special:UploadWizard', 'Upload your headshot, CC-BY-SA 4.0'],
            ['validator.schema.org', 'https://validator.schema.org', 'Validate JSON-LD, aim for 0 errors'],
          ].map(([label, href, desc]) => (
            <div key={href} style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <a href={href} target="_blank" rel="noopener noreferrer" style={{ fontSize: 14, color: '#F3F2EE', textDecoration: 'underline', textUnderlineOffset: 3, textDecorationColor: 'rgba(243,242,238,0.2)' }}>{label}</a>
              <span style={{ fontSize: 12, color: '#8B8D91' }}>{desc}</span>
            </div>
          ))}
        </div>
        <p style={{ fontSize: 13, color: '#8B8D91', margin: 0 }}>If this helped — share it.</p>
      </div>
    ),
  },
]

export default function KnowledgePanelPage() {
  const [cur, setCur] = useState(0)

  const go = useCallback((dir: number) => {
    setCur(c => Math.max(0, Math.min(TOTAL - 1, c + dir)))
  }, [])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') go(1)
      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') go(-1)
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [go])

  // Touch swipe
  useEffect(() => {
    let tx = 0
    const start = (e: TouchEvent) => { tx = e.touches[0].clientX }
    const end = (e: TouchEvent) => {
      const dx = tx - e.changedTouches[0].clientX
      if (Math.abs(dx) > 40) go(dx > 0 ? 1 : -1)
    }
    window.addEventListener('touchstart', start, { passive: true })
    window.addEventListener('touchend', end, { passive: true })
    return () => {
      window.removeEventListener('touchstart', start)
      window.removeEventListener('touchend', end)
    }
  }, [go])

  const progress = ((cur + 1) / TOTAL) * 100

  return (
    <main className="flex-1 overflow-hidden relative" style={{ background: '#0B0B0D', display: 'flex', flexDirection: 'column' }}>
      {/* Progress bar */}
      <div style={{ height: 2, background: 'rgba(243,242,238,0.08)', flexShrink: 0 }}>
        <div style={{ height: '100%', width: `${progress}%`, background: '#F3F2EE', transition: 'width 0.4s cubic-bezier(0.4,0,0.2,1)' }} />
      </div>

      {/* Slides */}
      <div style={{ flex: 1, overflow: 'hidden', position: 'relative' }}>
        <div
          style={{
            display: 'flex',
            height: '100%',
            transform: `translateX(-${cur * 100}%)`,
            transition: 'transform 0.5s cubic-bezier(0.4,0,0.2,1)',
            willChange: 'transform',
          }}
        >
          {slides.map((slide, i) => (
            <div
              key={i}
              style={{
                minWidth: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '32px 40px 20px',
                overflowY: 'auto',
              }}
            >
              <div style={{ maxWidth: 560, width: '100%' }}>
                {slide.content}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Nav */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 24px', borderTop: '1px solid rgba(243,242,238,0.06)', flexShrink: 0 }}>
        <button
          onClick={() => go(-1)}
          disabled={cur === 0}
          style={{ fontFamily: 'var(--font-geist-mono)', fontSize: 12, color: cur === 0 ? '#8B8D91' : '#F3F2EE', background: cur === 0 ? 'transparent' : '#1A1A1E', border: '1px solid rgba(243,242,238,0.08)', borderRadius: 6, padding: '7px 14px', cursor: cur === 0 ? 'default' : 'pointer', opacity: cur === 0 ? 0.3 : 1, transition: 'all 0.15s' }}
        >
          ← prev
        </button>
        <span style={{ fontFamily: 'var(--font-geist-mono)', fontSize: 11, color: '#8B8D91' }}>{cur + 1} / {TOTAL}</span>
        <button
          onClick={() => go(1)}
          disabled={cur === TOTAL - 1}
          style={{ fontFamily: 'var(--font-geist-mono)', fontSize: 12, color: cur === TOTAL - 1 ? '#8B8D91' : '#F3F2EE', background: cur === TOTAL - 1 ? 'transparent' : '#1A1A1E', border: '1px solid rgba(243,242,238,0.08)', borderRadius: 6, padding: '7px 14px', cursor: cur === TOTAL - 1 ? 'default' : 'pointer', opacity: cur === TOTAL - 1 ? 0.3 : 1, transition: 'all 0.15s' }}
        >
          next →
        </button>
      </div>
    </main>
  )
}
