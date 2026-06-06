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
  const currentPlan = 'free';
  const creditsUsed = 47;
  const creditsTotal = 200;
  const creditsPercent = (creditsUsed / creditsTotal) * 100;

  return (
    <div className="space-y-5">
      {/* Current plan */}
      <div className="card-base p-6">
        <h2 className="text-base font-bold text-foreground mb-5">Current Plan</h2>

        <div className="flex items-start justify-between mb-5 pb-5 border-b border-border">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-lg font-bold text-foreground">Free Plan</span>
              <span className="px-2 py-0.5 rounded-full bg-muted text-xs font-semibold text-muted-foreground">Active</span>
            </div>
            <p className="text-sm text-muted-foreground">200 AI credits per month · Resets on July 1, 2026</p>
          </div>
          <button className="btn-primary text-sm flex items-center gap-1.5">
            Upgrade to Pro <ArrowRight size={14} />
          </button>
        </div>

        {/* Credits usage */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-semibold text-foreground flex items-center gap-1.5">
              <Zap size={14} className="text-accent" /> Credits used this month
            </span>
            <span className="text-sm font-bold font-tabular text-foreground">{creditsUsed} / {creditsTotal}</span>
          </div>
          <div className="h-3 rounded-full bg-muted overflow-hidden mb-2">
            <div
              className="h-full rounded-full bg-primary transition-all duration-500"
              style={{ width: `${creditsPercent}%` }}
            />
          </div>
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>{creditsTotal - creditsUsed} credits remaining</span>
            <span>Resets in 24 days</span>
          </div>
        </div>

        {/* Usage breakdown */}
        <div className="mt-5 pt-5 border-t border-border">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3">Credits used by type</p>
          <div className="space-y-2">
            {[
              { label: 'Social Posts', count: 18, credits: 18 },
              { label: 'Ad Copy', count: 9, credits: 9 },
              { label: 'Email Subjects', count: 12, credits: 12 },
              { label: 'Taglines', count: 5, credits: 5 },
              { label: 'Blog Intros', count: 3, credits: 3 },
            ]?.map((row) => (
              <div key={`usage-${row?.label}`} className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">{row?.label}</span>
                <div className="flex items-center gap-4">
                  <span className="text-xs text-muted-foreground">{row?.count} pieces</span>
                  <span className="font-tabular font-semibold text-foreground w-12 text-right">{row?.credits} credits</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Plan comparison */}
      <div className="card-base p-6">
        <h3 className="text-base font-bold text-foreground mb-5">Upgrade to Pro</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Free */}
          <div className="border border-border rounded-2xl p-5">
            <div className="flex items-center justify-between mb-1">
              <p className="text-sm font-bold text-foreground">Free</p>
              <span className="px-2 py-0.5 rounded-full bg-muted text-xs font-semibold text-muted-foreground">Current</span>
            </div>
            <p className="text-2xl font-bold text-foreground mb-4">$0<span className="text-sm font-normal text-muted-foreground">/mo</span></p>
            <ul className="space-y-2">
              {planFeatures?.free?.map((f, i) => (
                <li key={`free-feat-${i}`} className="flex items-start gap-2 text-xs text-muted-foreground">
                  <Check size={13} className="text-emerald-500 mt-0.5 shrink-0" />
                  {f}
                </li>
              ))}
            </ul>
          </div>

          {/* Pro */}
          <div className="border-2 border-primary rounded-2xl p-5 relative overflow-hidden">
            <div className="absolute top-3 right-3 px-2 py-0.5 rounded-full bg-primary text-primary-foreground text-xs font-bold">
              Popular
            </div>
            <p className="text-sm font-bold text-foreground mb-1">Pro</p>
            <p className="text-2xl font-bold text-foreground mb-4">$29<span className="text-sm font-normal text-muted-foreground">/mo</span></p>
            <ul className="space-y-2 mb-5">
              {planFeatures?.pro?.map((f, i) => (
                <li key={`pro-feat-${i}`} className="flex items-start gap-2 text-xs text-foreground">
                  <Check size={13} className="text-primary mt-0.5 shrink-0" />
                  {f}
                </li>
              ))}
            </ul>
            <button className="btn-primary w-full text-sm flex items-center justify-center gap-1.5">
              Upgrade to Pro <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}