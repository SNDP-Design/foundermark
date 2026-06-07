'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import AppLogo from '@/components/ui/AppLogo';

// ─── Nav ────────────────────────────────────────────────────────────────────
function LandingNav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? 'rgba(255,255,255,0.92)' : 'transparent',
        backdropFilter: scrolled ? 'blur(16px)' : 'none',
        borderBottom: scrolled ? '1px solid #e5e7eb' : '1px solid transparent',
      }}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div
            className="w-8 h-8 rounded-[9px] flex items-center justify-center"
            style={{ background: '#111', border: '1px solid #1f1f1f' }}
          >
            <AppLogo size={20} />
          </div>
          <span className="font-bold text-[15px] tracking-[-0.3px]" style={{ color: '#111' }}>
            FounderMark
          </span>
        </div>
        <div className="hidden md:flex items-center gap-7">
          {['Features', 'Pricing'].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-[13px] font-medium transition-colors duration-150"
              style={{ color: '#6b7280' }}
              onMouseEnter={(e) => ((e.target as HTMLElement).style.color = '#111')}
              onMouseLeave={(e) => ((e.target as HTMLElement).style.color = '#6b7280')}
            >
              {item}
            </a>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/sign-up-login-screen"
            className="text-[13px] font-semibold px-4 py-2 rounded-[9px] transition-all duration-150"
            style={{ color: '#374151', border: '1px solid #e5e7eb' }}
          >
            Sign in
          </Link>
          <Link href="/sign-up-login-screen" className="btn-primary text-[13px] px-4 py-2">
            Start free
          </Link>
        </div>
      </div>
    </nav>
  );
}

// ─── Hero ────────────────────────────────────────────────────────────────────
function HeroSection() {
  return (
    <section className="relative pt-32 pb-20 overflow-hidden">
      {/* Background mesh */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 80% 50% at 50% -10%, rgba(17,17,17,0.06) 0%, transparent 70%)',
        }}
      />
      <div className="max-w-6xl mx-auto px-6 text-center relative z-10">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-8" style={{ background: '#f3f4f6', border: '1px solid #e5e7eb' }}>
          <span className="w-1.5 h-1.5 rounded-full" style={{ background: '#16a34a' }} />
          <span className="text-[12px] font-semibold tracking-[0.3px]" style={{ color: '#374151' }}>
            AI-powered content for founders
          </span>
        </div>

        <h1
          className="text-[52px] md:text-[68px] font-bold leading-[1.05] tracking-[-2px] mb-6 max-w-3xl mx-auto"
          style={{ color: '#111' }}
        >
          Marketing copy that sounds like{' '}
          <span
            style={{
              background: 'linear-gradient(135deg, #111 0%, #555 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            you
          </span>
          .
        </h1>

        <p className="text-[18px] leading-relaxed max-w-xl mx-auto mb-10" style={{ color: '#6b7280' }}>
          Skip the blank page. FounderMark writes social posts, ad copy, and email subjects in your voice — in under 2 minutes.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link href="/sign-up-login-screen" className="btn-primary text-[15px] px-7 py-3">
            Start for free →
          </Link>
          <a
            href="#features"
            className="btn-secondary text-[15px] px-7 py-3"
          >
            See how it works
          </a>
        </div>

        <p className="mt-4 text-[12px]" style={{ color: '#9ca3af' }}>
          No credit card required · Free plan available
        </p>

        {/* Hero preview card */}
        <div className="mt-16 max-w-2xl mx-auto">
          <HeroPreviewCard />
        </div>
      </div>
    </section>
  );
}

function HeroPreviewCard() {
  const [activeTab, setActiveTab] = useState(0);
  const tabs = [
    {
      label: 'LinkedIn Post',
      content:
        '"We just launched our beta — 500 signups in 48 hours. Here\'s what we learned about building in public as a first-time founder…"',
      tag: 'Social',
    },
    {
      label: 'Ad Copy',
      content:
        '"Stop writing marketing copy from scratch. FounderMark learns your voice and ships content that converts — in minutes, not days."',
      tag: 'Ads',
    },
    {
      label: 'Email Subject',
      content: '"Your product launch checklist (the one we wish we had)"',
      tag: 'Email',
    },
  ];

  return (
    <div
      className="rounded-2xl overflow-hidden text-left"
      style={{
        background: '#0a0a0a',
        border: '1px solid #1f1f1f',
        boxShadow: '0 40px 80px rgba(0,0,0,0.2)',
      }}
    >
      {/* Window chrome */}
      <div className="flex items-center gap-2 px-5 py-3.5" style={{ borderBottom: '1px solid #1a1a1a' }}>
        <span className="w-3 h-3 rounded-full" style={{ background: '#ff5f57' }} />
        <span className="w-3 h-3 rounded-full" style={{ background: '#febc2e' }} />
        <span className="w-3 h-3 rounded-full" style={{ background: '#28c840' }} />
        <span className="ml-3 text-[12px]" style={{ color: '#555' }}>FounderMark — Content Generator</span>
      </div>
      {/* Tabs */}
      <div className="flex gap-1 px-5 pt-4">
        {tabs.map((t, i) => (
          <button
            key={t.label}
            onClick={() => setActiveTab(i)}
            className="px-3 py-1.5 rounded-[7px] text-[12px] font-medium transition-all duration-150"
            style={{
              background: activeTab === i ? '#1a1a1a' : 'transparent',
              color: activeTab === i ? '#ededed' : '#555',
              border: activeTab === i ? '1px solid #2a2a2a' : '1px solid transparent',
            }}
          >
            {t.label}
          </button>
        ))}
      </div>
      {/* Content */}
      <div className="px-5 py-5">
        <div className="flex items-center gap-2 mb-3">
          <span
            className="px-2 py-0.5 rounded-full text-[10px] font-semibold"
            style={{ background: '#161616', border: '1px solid #2a2a2a', color: '#8a8a8a' }}
          >
            {tabs[activeTab].tag}
          </span>
          <span
            className="px-2 py-0.5 rounded-full text-[10px] font-semibold"
            style={{ background: 'rgba(74,222,128,0.1)', border: '1px solid rgba(74,222,128,0.2)', color: '#4ade80' }}
          >
            AI Generated
          </span>
        </div>
        <p className="text-[14px] leading-relaxed" style={{ color: '#cfcfcf' }}>
          {tabs[activeTab].content}
        </p>
        <div className="flex items-center justify-between mt-4 pt-4" style={{ borderTop: '1px solid #1a1a1a' }}>
          <span className="text-[11px]" style={{ color: '#555' }}>Generated in 1.4s</span>
          <span
            className="text-[11px] font-semibold px-3 py-1.5 rounded-[6px] cursor-pointer"
            style={{ background: '#ededed', color: '#0a0a0a' }}
          >
            Copy
          </span>
        </div>
      </div>
    </div>
  );
}

// ─── Features Bento ──────────────────────────────────────────────────────────
function FeaturesSection() {
  return (
    <section id="features" className="py-24">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-12">
          <p className="text-[12px] font-semibold tracking-[1px] uppercase mb-3" style={{ color: '#9ca3af' }}>
            Features
          </p>
          <h2 className="text-[38px] font-bold tracking-[-1px] leading-[1.1]" style={{ color: '#111' }}>
            Everything a founder needs
            <br />
            to ship content fast.
          </h2>
        </div>

        {/* Bento grid — asymmetric */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          {/* Large card — spans 7 cols */}
          <BentoCard
            className="md:col-span-7 md:row-span-2"
            tag="AI Content Engine"
            title="Writes in your voice from day one"
            description="Set up your product, audience, and tone once. FounderMark learns your brand voice and generates copy that sounds authentically like you — not like a robot."
            visual={<VoiceVisual />}
          />

          {/* Tall card — spans 5 cols */}
          <BentoCard
            className="md:col-span-5"
            tag="Multi-Channel"
            title="One brief, six formats"
            description="LinkedIn posts, Twitter threads, ad headlines, email subjects, product descriptions, and launch announcements — all from a single input."
            visual={<ChannelVisual />}
          />

          {/* Wide card — spans 5 cols */}
          <BentoCard
            className="md:col-span-5"
            tag="Content Library"
            title="Every piece, organized"
            description="Browse, filter, and reuse your generated content. Never lose a good idea or rewrite the same post twice."
            visual={<LibraryVisual />}
          />

          {/* Bottom row — 4 + 4 + 4 */}
          <BentoCard
            className="md:col-span-4"
            tag="Speed"
            title="Full batch in under 2 min"
            description="Stop spending hours on copy. Generate a week's worth of content in the time it takes to make coffee."
            compact
          />
          <BentoCard
            className="md:col-span-4"
            tag="Social Publishing"
            title="Schedule & publish directly"
            description="Connect your social accounts and publish or schedule posts without leaving FounderMark."
            compact
          />
          <BentoCard
            className="md:col-span-4"
            tag="Founder-first"
            title="No marketing degree needed"
            description="Built for people who know their product deeply but don't have a marketing team behind them."
            compact
          />
        </div>
      </div>
    </section>
  );
}

interface BentoCardProps {
  className?: string;
  tag: string;
  title: string;
  description: string;
  visual?: React.ReactNode;
  compact?: boolean;
}

function BentoCard({ className = '', tag, title, description, visual, compact }: BentoCardProps) {
  return (
    <div
      className={`xg-card xg-card-hover p-6 flex flex-col ${compact ? 'gap-2' : 'gap-4'} ${className}`}
    >
      <span
        className="self-start px-2.5 py-1 rounded-full text-[11px] font-semibold"
        style={{ background: '#f3f4f6', color: '#374151', border: '1px solid #e5e7eb' }}
      >
        {tag}
      </span>
      <div>
        <h3 className="text-[17px] font-bold tracking-[-0.4px] mb-1.5" style={{ color: '#111' }}>
          {title}
        </h3>
        <p className="text-[13px] leading-relaxed" style={{ color: '#6b7280' }}>
          {description}
        </p>
      </div>
      {visual && <div className="mt-auto">{visual}</div>}
    </div>
  );
}

function VoiceVisual() {
  const lines = [
    { w: '85%', label: 'Tone match' },
    { w: '92%', label: 'Brand voice' },
    { w: '78%', label: 'Audience fit' },
  ];
  return (
    <div className="space-y-3 mt-2">
      {lines.map((l) => (
        <div key={l.label}>
          <div className="flex justify-between mb-1">
            <span className="text-[11px]" style={{ color: '#9ca3af' }}>{l.label}</span>
            <span className="text-[11px] font-semibold" style={{ color: '#111' }}>{l.w}</span>
          </div>
          <div className="h-1.5 rounded-full" style={{ background: '#f3f4f6' }}>
            <div
              className="h-full rounded-full"
              style={{ width: l.w, background: 'linear-gradient(90deg, #111 0%, #555 100%)' }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

function ChannelVisual() {
  const channels = ['LinkedIn', 'Twitter', 'Email', 'Ads', 'Product', 'Launch'];
  return (
    <div className="flex flex-wrap gap-2 mt-2">
      {channels.map((c) => (
        <span
          key={c}
          className="px-2.5 py-1 rounded-[7px] text-[12px] font-medium"
          style={{ background: '#f9fafb', border: '1px solid #e5e7eb', color: '#374151' }}
        >
          {c}
        </span>
      ))}
    </div>
  );
}

function LibraryVisual() {
  const items = [
    { type: 'LinkedIn', date: '2 days ago' },
    { type: 'Ad Copy', date: '4 days ago' },
    { type: 'Email', date: '1 week ago' },
  ];
  return (
    <div className="space-y-2 mt-2">
      {items.map((item) => (
        <div
          key={item.type + item.date}
          className="flex items-center justify-between px-3 py-2 rounded-[9px]"
          style={{ background: '#f9fafb', border: '1px solid #f3f4f6' }}
        >
          <span className="text-[12px] font-medium" style={{ color: '#374151' }}>{item.type}</span>
          <span className="text-[11px]" style={{ color: '#9ca3af' }}>{item.date}</span>
        </div>
      ))}
    </div>
  );
}

// ─── Pricing ─────────────────────────────────────────────────────────────────
interface PricingPlan {
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  cta: string;
  highlighted: boolean;
}

const plans: PricingPlan[] = [
  {
    name: 'Free',
    price: '$0',
    period: 'forever',
    description: 'Try FounderMark with no commitment.',
    features: [
      '10 AI generations / month',
      '3 content formats',
      'Content library (last 30 days)',
      'Email support',
    ],
    cta: 'Get started free',
    highlighted: false,
  },
  {
    name: 'Founder',
    price: '$29',
    period: 'per month',
    description: 'For founders shipping content every week.',
    features: [
      'Unlimited AI generations',
      'All 6 content formats',
      'Full content library',
      'Social publishing & scheduling',
      'Custom brand voice profiles',
      'Priority support',
    ],
    cta: 'Start Founder plan',
    highlighted: true,
  },
  {
    name: 'Team',
    price: '$79',
    period: 'per month',
    description: 'For small teams building in public together.',
    features: [
      'Everything in Founder',
      'Up to 5 team members',
      'Shared content library',
      'Team brand voice profiles',
      'Analytics & performance',
      'Dedicated onboarding',
    ],
    cta: 'Start Team plan',
    highlighted: false,
  },
];

function PricingSection() {
  return (
    <section id="pricing" className="py-24" style={{ background: '#fafafa', borderTop: '1px solid #f3f4f6', borderBottom: '1px solid #f3f4f6' }}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-14">
          <p className="text-[12px] font-semibold tracking-[1px] uppercase mb-3" style={{ color: '#9ca3af' }}>
            Pricing
          </p>
          <h2 className="text-[38px] font-bold tracking-[-1px]" style={{ color: '#111' }}>
            Simple, honest pricing.
          </h2>
          <p className="mt-3 text-[16px]" style={{ color: '#6b7280' }}>
            No hidden fees. Cancel any time.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {plans.map((plan) => (
            <PricingCard key={plan.name} plan={plan} />
          ))}
        </div>
      </div>
    </section>
  );
}

function PricingCard({ plan }: { plan: PricingPlan }) {
  return (
    <div
      className="rounded-2xl p-7 flex flex-col"
      style={{
        background: plan.highlighted ? '#111' : '#fff',
        border: plan.highlighted ? '1px solid #1f1f1f' : '1px solid #e5e7eb',
        boxShadow: plan.highlighted ? '0 20px 50px rgba(0,0,0,0.15)' : '0 1px 3px rgba(0,0,0,0.06)',
      }}
    >
      {plan.highlighted && (
        <span
          className="self-start px-2.5 py-1 rounded-full text-[11px] font-semibold mb-4"
          style={{ background: 'rgba(74,222,128,0.15)', color: '#4ade80', border: '1px solid rgba(74,222,128,0.25)' }}
        >
          Most popular
        </span>
      )}
      <p className="text-[13px] font-semibold mb-1" style={{ color: plan.highlighted ? '#8a8a8a' : '#9ca3af' }}>
        {plan.name}
      </p>
      <div className="flex items-end gap-1.5 mb-2">
        <span className="text-[40px] font-bold tracking-[-1.5px]" style={{ color: plan.highlighted ? '#ededed' : '#111' }}>
          {plan.price}
        </span>
        <span className="text-[13px] mb-2" style={{ color: plan.highlighted ? '#555' : '#9ca3af' }}>
          / {plan.period}
        </span>
      </div>
      <p className="text-[13px] mb-6" style={{ color: plan.highlighted ? '#8a8a8a' : '#6b7280' }}>
        {plan.description}
      </p>
      <ul className="space-y-3 mb-8 flex-1">
        {plan.features.map((f) => (
          <li key={f} className="flex items-start gap-2.5">
            <span
              className="w-4 h-4 rounded-full flex items-center justify-center shrink-0 mt-[2px]"
              style={{
                background: plan.highlighted ? 'rgba(74,222,128,0.15)' : '#f3f4f6',
                border: plan.highlighted ? '1px solid rgba(74,222,128,0.3)' : '1px solid #e5e7eb',
              }}
            >
              <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                <path d="M1 4l2 2 4-4" stroke={plan.highlighted ? '#4ade80' : '#374151'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            <span className="text-[13px]" style={{ color: plan.highlighted ? '#cfcfcf' : '#374151' }}>
              {f}
            </span>
          </li>
        ))}
      </ul>
      <Link
        href="/sign-up-login-screen"
        className="block text-center py-3 rounded-[10px] text-[14px] font-semibold transition-all duration-150"
        style={{
          background: plan.highlighted ? '#ededed' : '#111',
          color: plan.highlighted ? '#0a0a0a' : '#fff',
        }}
      >
        {plan.cta}
      </Link>
    </div>
  );
}

// ─── CTA ─────────────────────────────────────────────────────────────────────
function CTASection() {
  return (
    <section className="py-28">
      <div className="max-w-3xl mx-auto px-6 text-center">
        <div
          className="rounded-3xl px-10 py-16 relative overflow-hidden"
          style={{ background: '#0a0a0a', border: '1px solid #1f1f1f' }}
        >
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: 'radial-gradient(600px 400px at 50% 0%, rgba(255,255,255,0.04), transparent 70%)' }}
          />
          <p className="text-[12px] font-semibold tracking-[1px] uppercase mb-4 relative z-10" style={{ color: '#555' }}>
            Get started today
          </p>
          <h2 className="text-[38px] font-bold tracking-[-1px] leading-[1.1] mb-4 relative z-10" style={{ color: '#ededed' }}>
            Your first post is
            <br />2 minutes away.
          </h2>
          <p className="text-[16px] mb-8 relative z-10" style={{ color: '#8a8a8a' }}>
            Join founders who stopped staring at blank pages and started shipping content that converts.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 relative z-10">
            <Link
              href="/sign-up-login-screen"
              className="px-8 py-3.5 rounded-[11px] text-[15px] font-semibold transition-all duration-150 hover:opacity-90"
              style={{ background: '#ededed', color: '#0a0a0a' }}
            >
              Start for free →
            </Link>
          </div>
          <p className="mt-4 text-[12px] relative z-10" style={{ color: '#555' }}>
            No credit card · Free plan · Cancel any time
          </p>
        </div>
      </div>
    </section>
  );
}

// ─── Footer ──────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="py-10" style={{ borderTop: '1px solid #f3f4f6' }}>
      <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div
            className="w-6 h-6 rounded-[6px] flex items-center justify-center"
            style={{ background: '#111', border: '1px solid #1f1f1f' }}
          >
            <AppLogo size={14} />
          </div>
          <span className="text-[13px] font-semibold" style={{ color: '#374151' }}>FounderMark</span>
        </div>
        <p className="text-[12px]" style={{ color: '#9ca3af' }}>
          © {new Date().getFullYear()} FounderMark. Built for founders.
        </p>
        <div className="flex items-center gap-5">
          <Link href="/sign-up-login-screen" className="text-[12px] transition-colors" style={{ color: '#9ca3af' }}>
            Sign in
          </Link>
          <Link href="/sign-up-login-screen" className="text-[12px] transition-colors" style={{ color: '#9ca3af' }}>
            Sign up
          </Link>
        </div>
      </div>
    </footer>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function LandingPage() {
  return (
    <div style={{ background: '#ffffff', minHeight: '100vh' }}>
      <LandingNav />
      <HeroSection />
      <FeaturesSection />
      <PricingSection />
      <CTASection />
      <Footer />
    </div>
  );
}
