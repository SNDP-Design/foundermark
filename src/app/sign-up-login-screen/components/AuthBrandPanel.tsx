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
    <div className="hidden lg:flex lg:w-[480px] xl:w-[560px] auth-brand-bg flex-col justify-between p-12 text-white shrink-0">
      <div className="flex items-center gap-3">
        <AppLogo size={36} />
        <span className="font-bold text-xl tracking-tight">FounderMark</span>
      </div>
      <div>
        <h2 className="text-3xl font-bold leading-snug mb-3">
          Marketing copy that sounds like you — written in seconds.
        </h2>
        <p className="text-violet-200 text-base leading-relaxed mb-8">
          First-time founders use FounderMark to skip the blank page and start publishing content that actually converts.
        </p>
        <ul className="space-y-3">
          {valueProps?.map((vp) => (
            <li key={vp?.key} className="flex items-start gap-3">
              <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center shrink-0 mt-0.5">
                <Check size={11} className="text-white" />
              </span>
              <span className="text-sm text-violet-100">{vp?.text}</span>
            </li>
          ))}
        </ul>
      </div>
      {/* Mock content preview card */}
      <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-5">
        <div className="flex items-center gap-2 mb-3">
          <span className="px-2.5 py-0.5 rounded-full bg-violet-400/40 text-xs font-semibold text-white">Social Post</span>
          <span className="px-2.5 py-0.5 rounded-full bg-amber-400/40 text-xs font-semibold text-white">LinkedIn</span>
        </div>
        <p className="text-sm text-violet-100 leading-relaxed">
          "We just launched our beta — and the response has been overwhelming. 500 signups in 48 hours. Here's what we learned about building in public as a first-time founder…"
        </p>
        <div className="flex items-center justify-between mt-3 pt-3 border-t border-white/15">
          <span className="text-xs text-violet-300">Generated 2 min ago</span>
          <span className="text-xs font-semibold text-white bg-white/15 px-2.5 py-1 rounded-lg cursor-pointer hover:bg-white/25 transition-colors">Copy</span>
        </div>
      </div>
    </div>
  );
}