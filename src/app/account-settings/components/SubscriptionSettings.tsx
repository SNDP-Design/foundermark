'use client';

import React from 'react';
import { Zap, Check, ArrowRight } from 'lucide-react';

const planFeatures = {
  free: [
    '200 AI credits per month',
    '1 product profile',
    'Social posts, ad copy, email subjects',
    'Content library (up to 50 pieces)',
    'Export as plain text',
  ],
  pro: [
    '2,000 AI credits per month',
    '5 product profiles',
    'All content types + Blog intros',
    'Unlimited content library',
    'Export as PDF & CSV',
    'Priority AI generation',
    'Custom tone fine-tuning',
  ],
};

export default function SubscriptionSettings() {
  const creditsUsed = 47;
  const creditsTotal = 200;
  const creditsPercent = (creditsUsed / creditsTotal) * 100;

  return (
    <div className="space-y-5">
      {/* Current plan */}
      <div className="rounded-[14px] p-6" style={{ background: 'linear-gradient(180deg, #0d0d0d 0%, #141414 100%)', border: '1px solid #1f1f1f' }}>
        <h2 className="text-[16px] font-bold tracking-[-0.3px] mb-5" style={{ color: '#ededed' }}>Current Plan</h2>

        <div className="flex items-start justify-between mb-5 pb-5" style={{ borderBottom: '1px solid #1f1f1f' }}>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[17px] font-bold" style={{ color: '#ededed' }}>Free Plan</span>
              <span className="px-2 py-[2px] rounded-full text-[10px] font-semibold" style={{ background: '#161616', border: '1px solid #1f1f1f', color: '#8a8a8a' }}>Active</span>
            </div>
            <p className="text-[12px]" style={{ color: '#8a8a8a' }}>200 AI credits per month · Resets on July 1, 2026</p>
          </div>
          <button className="btn-primary text-[13px] flex items-center gap-1.5">
            Upgrade to Pro <ArrowRight size={13} />
          </button>
        </div>

        {/* Credits usage */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-[13px] font-semibold flex items-center gap-1.5" style={{ color: '#ededed' }}>
              <Zap size={13} style={{ color: '#4ade80' }} /> Credits used this month
            </span>
            <span className="text-[13px] font-bold font-tabular" style={{ color: '#ededed' }}>{creditsUsed} / {creditsTotal}</span>
          </div>
          <div className="h-[4px] rounded-full overflow-hidden mb-2" style={{ background: '#1f1f1f' }}>
            <div className="h-full rounded-full transition-all duration-500" style={{ width: `${creditsPercent}%`, background: '#ededed' }} />
          </div>
          <div className="flex items-center justify-between text-[11px]" style={{ color: '#8a8a8a' }}>
            <span>{creditsTotal - creditsUsed} credits remaining</span>
            <span>Resets in 24 days</span>
          </div>
        </div>

        {/* Usage breakdown */}
        <div className="mt-5 pt-5" style={{ borderTop: '1px solid #1f1f1f' }}>
          <p className="text-[11px] font-semibold uppercase tracking-[0.4px] mb-3" style={{ color: '#8a8a8a' }}>Credits used by type</p>
          <div className="space-y-2">
            {[
              { label: 'Social Posts', count: 18, credits: 18 },
              { label: 'Ad Copy', count: 9, credits: 9 },
              { label: 'Email Subjects', count: 12, credits: 12 },
              { label: 'Taglines', count: 5, credits: 5 },
              { label: 'Blog Intros', count: 3, credits: 3 },
            ]?.map((row) => (
              <div key={`usage-${row?.label}`} className="flex items-center justify-between text-[12px]">
                <span style={{ color: '#8a8a8a' }}>{row?.label}</span>
                <div className="flex items-center gap-4">
                  <span className="text-[11px]" style={{ color: '#8a8a8a' }}>{row?.count} pieces</span>
                  <span className="font-tabular font-semibold w-12 text-right" style={{ color: '#ededed' }}>{row?.credits} credits</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Plan comparison */}
      <div className="rounded-[14px] p-6" style={{ background: 'linear-gradient(180deg, #0d0d0d 0%, #141414 100%)', border: '1px solid #1f1f1f' }}>
        <h3 className="text-[16px] font-bold tracking-[-0.3px] mb-5" style={{ color: '#ededed' }}>Upgrade to Pro</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Free */}
          <div className="rounded-[12px] p-5" style={{ border: '1px solid #1f1f1f' }}>
            <div className="flex items-center justify-between mb-1">
              <p className="text-[14px] font-bold" style={{ color: '#ededed' }}>Free</p>
              <span className="px-2 py-[2px] rounded-full text-[10px] font-semibold" style={{ background: '#161616', border: '1px solid #1f1f1f', color: '#8a8a8a' }}>Current</span>
            </div>
            <p className="text-[28px] font-bold mb-4" style={{ color: '#ededed' }}>$0<span className="text-[13px] font-normal" style={{ color: '#8a8a8a' }}>/mo</span></p>
            <ul className="space-y-2">
              {planFeatures?.free?.map((f, i) => (
                <li key={`free-feat-${i}`} className="flex items-start gap-2 text-[12px]" style={{ color: '#8a8a8a' }}>
                  <Check size={12} className="mt-[2px] shrink-0" style={{ color: '#4ade80' }} />
                  {f}
                </li>
              ))}
            </ul>
          </div>

          {/* Pro */}
          <div className="rounded-[12px] p-5 relative overflow-hidden" style={{ border: '1px solid #5a5a5a', background: 'linear-gradient(#181818, #0f0f0f)', boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.06), 0 30px 60px rgba(0,0,0,0.4)' }}>
            <div className="absolute top-[-11px] right-[22px] px-[10px] py-[4px] rounded-full text-[11px] font-bold" style={{ background: '#fafafa', color: '#0a0a0a' }}>Popular</div>
            <p className="text-[14px] font-bold mb-1" style={{ color: '#ededed' }}>Pro</p>
            <p className="text-[28px] font-bold mb-4" style={{ color: '#ededed' }}>$29<span className="text-[13px] font-normal" style={{ color: '#8a8a8a' }}>/mo</span></p>
            <ul className="space-y-2 mb-5">
              {planFeatures?.pro?.map((f, i) => (
                <li key={`pro-feat-${i}`} className="flex items-start gap-2 text-[12px]" style={{ color: '#cfcfcf' }}>
                  <Check size={12} className="mt-[2px] shrink-0" style={{ color: '#4ade80' }} />
                  {f}
                </li>
              ))}
            </ul>
            <button className="btn-primary w-full text-[13px] flex items-center justify-center gap-1.5">
              Upgrade to Pro <ArrowRight size={13} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}