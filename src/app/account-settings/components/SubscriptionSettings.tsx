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
      <div className="rounded-[14px] p-6" style={{ background: 'linear-gradient(180deg, #ffffff 0%, #fafafa 100%)', border: '1px solid #e5e7eb' }}>
        <h2 className="text-[16px] font-bold tracking-[-0.3px] mb-5" style={{ color: '#111111' }}>Current Plan</h2>

        <div className="flex items-start justify-between mb-5 pb-5" style={{ borderBottom: '1px solid #e5e7eb' }}>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[17px] font-bold" style={{ color: '#111111' }}>Free Plan</span>
              <span className="px-2 py-[2px] rounded-full text-[10px] font-semibold" style={{ background: '#f3f4f6', border: '1px solid #e5e7eb', color: '#6b7280' }}>Active</span>
            </div>
            <p className="text-[12px]" style={{ color: '#9ca3af' }}>200 AI credits per month · Resets on July 1, 2026</p>
          </div>
          <button className="btn-primary text-[13px] flex items-center gap-1.5">
            Upgrade to Pro <ArrowRight size={13} />
          </button>
        </div>

        {/* Credits usage */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-[13px] font-semibold flex items-center gap-1.5" style={{ color: '#111111' }}>
              <Zap size={13} style={{ color: '#16a34a' }} /> Credits used this month
            </span>
            <span className="text-[13px] font-bold font-tabular" style={{ color: '#111111' }}>{creditsUsed} / {creditsTotal}</span>
          </div>
          <div className="h-[4px] rounded-full overflow-hidden mb-2" style={{ background: '#e5e7eb' }}>
            <div className="h-full rounded-full transition-all duration-500" style={{ width: `${creditsPercent}%`, background: '#111111' }} />
          </div>
          <div className="flex items-center justify-between text-[11px]" style={{ color: '#9ca3af' }}>
            <span>{creditsTotal - creditsUsed} credits remaining</span>
            <span>Resets in 24 days</span>
          </div>
        </div>

        {/* Usage breakdown */}
        <div className="mt-5 pt-5" style={{ borderTop: '1px solid #e5e7eb' }}>
          <p className="text-[11px] font-semibold uppercase tracking-[0.4px] mb-3" style={{ color: '#9ca3af' }}>Credits used by type</p>
          <div className="space-y-2">
            {[
              { label: 'Social Posts', count: 18, credits: 18 },
              { label: 'Ad Copy', count: 9, credits: 9 },
              { label: 'Email Subjects', count: 12, credits: 12 },
              { label: 'Taglines', count: 5, credits: 5 },
              { label: 'Blog Intros', count: 3, credits: 3 },
            ]?.map((row) => (
              <div key={`usage-${row?.label}`} className="flex items-center justify-between text-[12px]">
                <span style={{ color: '#6b7280' }}>{row?.label}</span>
                <div className="flex items-center gap-4">
                  <span className="text-[11px]" style={{ color: '#9ca3af' }}>{row?.count} pieces</span>
                  <span className="font-tabular font-semibold w-12 text-right" style={{ color: '#111111' }}>{row?.credits} credits</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Plan comparison */}
      <div className="rounded-[14px] p-6" style={{ background: 'linear-gradient(180deg, #ffffff 0%, #fafafa 100%)', border: '1px solid #e5e7eb' }}>
        <h3 className="text-[16px] font-bold tracking-[-0.3px] mb-5" style={{ color: '#111111' }}>Upgrade to Pro</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Free */}
          <div className="rounded-[12px] p-5" style={{ border: '1px solid #e5e7eb' }}>
            <div className="flex items-center justify-between mb-1">
              <p className="text-[14px] font-bold" style={{ color: '#111111' }}>Free</p>
              <span className="px-2 py-[2px] rounded-full text-[10px] font-semibold" style={{ background: '#f3f4f6', border: '1px solid #e5e7eb', color: '#6b7280' }}>Current</span>
            </div>
            <p className="text-[28px] font-bold mb-4" style={{ color: '#111111' }}>$0<span className="text-[13px] font-normal" style={{ color: '#9ca3af' }}>/mo</span></p>
            <ul className="space-y-2">
              {planFeatures?.free?.map((f, i) => (
                <li key={`free-feat-${i}`} className="flex items-start gap-2 text-[12px]" style={{ color: '#6b7280' }}>
                  <Check size={12} className="mt-[2px] shrink-0" style={{ color: '#16a34a' }} />
                  {f}
                </li>
              ))}
            </ul>
          </div>

          {/* Pro */}
          <div className="rounded-[12px] p-5 relative overflow-hidden" style={{ border: '1px solid #9ca3af', background: 'linear-gradient(#f9fafb, #f3f4f6)', boxShadow: '0 4px 16px rgba(0,0,0,0.08)' }}>
            <div className="absolute top-[-11px] right-[22px] px-[10px] py-[4px] rounded-full text-[11px] font-bold" style={{ background: '#111111', color: '#ffffff' }}>Popular</div>
            <p className="text-[14px] font-bold mb-1" style={{ color: '#111111' }}>Pro</p>
            <p className="text-[28px] font-bold mb-4" style={{ color: '#111111' }}>$29<span className="text-[13px] font-normal" style={{ color: '#9ca3af' }}>/mo</span></p>
            <ul className="space-y-2 mb-5">
              {planFeatures?.pro?.map((f, i) => (
                <li key={`pro-feat-${i}`} className="flex items-start gap-2 text-[12px]" style={{ color: '#374151' }}>
                  <Check size={12} className="mt-[2px] shrink-0" style={{ color: '#16a34a' }} />
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