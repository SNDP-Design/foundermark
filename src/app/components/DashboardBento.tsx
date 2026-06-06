import React from 'react';
import {
  Zap,
  FileText,
  Bookmark,
  TrendingUp,
  Flame,
  AlertTriangle,
} from 'lucide-react';

export default function DashboardBento() {
  // Bento plan: 5 cards → grid-cols-4
  // Row 1: hero (credits, spans 2 cols) + total generated + saved
  // Row 2: most-used channel + streak (each 2 cols)
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-4 gap-4">
      {/* HERO: Credits Remaining — spans 2 cols */}
      <div className="md:col-span-2 lg:col-span-2 card-base p-6 gradient-card-rose border-rose-200 relative overflow-hidden">
        <div className="absolute top-3 right-3">
          <AlertTriangle size={16} className="text-rose-500" />
        </div>
        <div className="flex items-start justify-between mb-4">
          <div>
            <p className="text-xs font-semibold text-muted-foreground tracking-wide uppercase">Credits Remaining</p>
            <p className="text-4xl font-bold font-tabular text-foreground mt-1">153</p>
            <p className="text-sm text-muted-foreground mt-0.5">of 200 monthly credits</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-rose-100 flex items-center justify-center">
            <Zap size={20} className="text-rose-500" />
          </div>
        </div>
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-xs">
            <span className="text-muted-foreground">Used this month</span>
            <span className="font-semibold font-tabular text-rose-600">47 used (23.5%)</span>
          </div>
          <div className="h-2 rounded-full bg-rose-100 overflow-hidden">
            <div className="h-full rounded-full bg-rose-400" style={{ width: '23.5%' }} />
          </div>
          <p className="text-xs text-rose-600 font-medium">Resets in 24 days · Consider upgrading to Pro</p>
        </div>
      </div>
      {/* Total Generated */}
      <div className="card-base p-5 gradient-card-violet border-violet-200">
        <div className="flex items-center justify-between mb-3">
          <p className="text-xs font-semibold text-muted-foreground tracking-wide uppercase">Total Generated</p>
          <div className="w-8 h-8 rounded-lg bg-violet-100 flex items-center justify-center">
            <FileText size={15} className="text-primary" />
          </div>
        </div>
        <p className="text-3xl font-bold font-tabular text-foreground">247</p>
        <p className="text-xs text-muted-foreground mt-1">content pieces all-time</p>
        <div className="flex items-center gap-1 mt-3">
          <TrendingUp size={12} className="text-emerald-500" />
          <span className="text-xs font-semibold text-emerald-600">+18 this week</span>
        </div>
      </div>
      {/* Saved to Library */}
      <div className="card-base p-5 gradient-card-green border-emerald-100">
        <div className="flex items-center justify-between mb-3">
          <p className="text-xs font-semibold text-muted-foreground tracking-wide uppercase">Saved to Library</p>
          <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center">
            <Bookmark size={15} className="text-emerald-600" />
          </div>
        </div>
        <p className="text-3xl font-bold font-tabular text-foreground">89</p>
        <p className="text-xs text-muted-foreground mt-1">pieces saved for reuse</p>
        <div className="flex items-center gap-1 mt-3">
          <span className="text-xs text-muted-foreground">36% save rate</span>
        </div>
      </div>
      {/* Most-Used Channel — spans 2 cols */}
      <div className="md:col-span-1 lg:col-span-2 card-base p-5 gradient-card-amber border-amber-100">
        <div className="flex items-center justify-between mb-3">
          <p className="text-xs font-semibold text-muted-foreground tracking-wide uppercase">Top Channel</p>
          <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center">
            <TrendingUp size={15} className="text-accent" />
          </div>
        </div>
        <p className="text-2xl font-bold text-foreground">LinkedIn</p>
        <p className="text-xs text-muted-foreground mt-0.5 mb-3">Most content generated for this channel</p>
        <div className="space-y-2">
          {[
            { label: 'LinkedIn', count: 84, pct: 100 },
            { label: 'Twitter / X', count: 67, pct: 80 },
            { label: 'Email', count: 51, pct: 61 },
            { label: 'Instagram', count: 45, pct: 54 },
          ]?.map((ch) => (
            <div key={`ch-${ch?.label}`} className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground w-20 shrink-0">{ch?.label}</span>
              <div className="flex-1 h-1.5 rounded-full bg-amber-100 overflow-hidden">
                <div className="h-full rounded-full bg-accent" style={{ width: `${ch?.pct}%` }} />
              </div>
              <span className="text-xs font-tabular font-semibold text-foreground w-6 text-right">{ch?.count}</span>
            </div>
          ))}
        </div>
      </div>
      {/* Streak */}
      <div className="md:col-span-1 lg:col-span-2 card-base p-5 gradient-card-blue border-sky-100">
        <div className="flex items-center justify-between mb-3">
          <p className="text-xs font-semibold text-muted-foreground tracking-wide uppercase">Generation Streak</p>
          <div className="w-8 h-8 rounded-lg bg-sky-100 flex items-center justify-center">
            <Flame size={15} className="text-sky-500" />
          </div>
        </div>
        <p className="text-3xl font-bold font-tabular text-foreground">7 days</p>
        <p className="text-xs text-muted-foreground mt-0.5 mb-3">You've generated content 7 days in a row</p>
        <div className="flex items-center gap-1.5">
          {['M', 'T', 'W', 'T', 'F', 'S', 'S']?.map((day, i) => (
            <div key={`streak-${i}`} className="flex flex-col items-center gap-1">
              <div className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-semibold ${
                i < 7 ? 'bg-sky-500 text-white' : 'bg-sky-100 text-sky-400'
              }`}>
                {day}
              </div>
              <span className="text-xs text-muted-foreground">{day}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}