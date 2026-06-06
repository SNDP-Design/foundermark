import React from 'react';
import AppLogo from '@/components/ui/AppLogo';
import { Check } from 'lucide-react';

const valueProps = [
  { key: 'vp-copy', text: 'AI-written copy tailored to your product' },
  { key: 'vp-channels', text: 'Social posts, ad creatives, email subjects & more' },
  { key: 'vp-voice', text: 'Captures your brand voice from day one' },
  { key: 'vp-speed', text: 'Generate a full content batch in under 2 minutes' },
];

export default function AuthBrandPanel() {
  return (
    <div
      className="hidden lg:flex lg:w-[480px] xl:w-[520px] flex-col justify-between p-12 shrink-0 relative overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #0a0a0a 0%, #050505 100%)', borderRight: '1px solid #1f1f1f' }}
    >
      {/* Subtle radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(600px 400px at 30% 20%, rgba(255,255,255,0.03), transparent 70%)' }}
      />
      <div className="flex items-center gap-3 relative z-10">
        <div className="w-[36px] h-[36px] rounded-[10px] flex items-center justify-center" style={{ background: '#000', border: '1px solid #1f1f1f' }}>
          <AppLogo size={24} />
        </div>
        <span className="font-bold text-[15px] tracking-[0.2px]" style={{ color: '#ededed' }}>FounderMark</span>
      </div>
      <div className="relative z-10">
        <h2 className="text-[32px] font-bold leading-[1.15] tracking-[-0.8px] mb-3" style={{ color: '#ededed' }}>
          Marketing copy that sounds like you — written in seconds.
        </h2>
        <p className="text-[15px] leading-relaxed mb-8" style={{ color: '#8a8a8a' }}>
          First-time founders use FounderMark to skip the blank page and start publishing content that actually converts.
        </p>
        <ul className="space-y-3">
          {valueProps?.map((vp) => (
            <li key={vp?.key} className="flex items-start gap-3">
              <span
                className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-[2px]"
                style={{ background: 'rgba(74, 222, 128, 0.15)', border: '1px solid rgba(74, 222, 128, 0.3)' }}
              >
                <Check size={10} style={{ color: '#4ade80' }} />
              </span>
              <span className="text-[13px]" style={{ color: '#8a8a8a' }}>{vp?.text}</span>
            </li>
          ))}
        </ul>
      </div>
      {/* Mock content preview card */}
      <div
        className="rounded-[14px] p-5 relative z-10"
        style={{ background: 'linear-gradient(180deg, #0d0d0d 0%, #141414 100%)', border: '1px solid #1f1f1f' }}
      >
        <div className="flex items-center gap-2 mb-3">
          <span className="inline-flex items-center px-[8px] py-[3px] rounded-full text-[10px] font-semibold" style={{ background: '#161616', border: '1px solid #1f1f1f', color: '#8a8a8a' }}>Social Post</span>
          <span className="inline-flex items-center px-[8px] py-[3px] rounded-full text-[10px] font-semibold" style={{ background: '#161616', border: '1px solid #1f1f1f', color: '#8a8a8a' }}>LinkedIn</span>
        </div>
        <p className="text-[13px] leading-relaxed" style={{ color: '#cfcfcf' }}>
          &ldquo;We just launched our beta — and the response has been overwhelming. 500 signups in 48 hours. Here&apos;s what we learned about building in public as a first-time founder…&rdquo;
        </p>
        <div className="flex items-center justify-between mt-3 pt-3" style={{ borderTop: '1px solid #1f1f1f' }}>
          <span className="text-[11px]" style={{ color: '#8a8a8a' }}>Generated 2 min ago</span>
          <span
            className="text-[11px] font-semibold px-[10px] py-[4px] rounded-[6px] cursor-pointer transition-all duration-150 hover:opacity-80"
            style={{ background: '#ededed', color: '#0a0a0a' }}
          >
            Copy
          </span>
        </div>
      </div>
    </div>
  );
}