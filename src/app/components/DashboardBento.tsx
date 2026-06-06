import React from 'react';
import {  } from 'lucide-react';

const kpis = [
  { key: 'kpi-followers', label: 'Followers', value: '1.9k', delta: '+16.1%', positive: true },
  { key: 'kpi-impressions', label: 'Impressions', value: '81.3k', delta: '+13.0%', positive: true },
  { key: 'kpi-engagement', label: 'Engagement', value: '3.1%', delta: '-1.1pp', positive: false },
  { key: 'kpi-visits', label: 'Visits', value: '2.6k', delta: '+20.0%', positive: true },
  { key: 'kpi-reply', label: 'Reply Rate', value: '0.27%', delta: '-0.49pp', positive: false },
];

const sparkData = [
  [30, 45, 35, 60, 55, 70, 65],
  [50, 60, 45, 80, 75, 90, 85],
  [40, 35, 50, 45, 55, 40, 45],
  [20, 35, 30, 50, 45, 65, 60],
  [15, 20, 18, 25, 22, 20, 18],
];

const channels = [
  { label: 'LinkedIn', count: 84, pct: 100 },
  { label: 'Twitter / X', count: 67, pct: 80 },
  { label: 'Email', count: 51, pct: 61 },
  { label: 'Instagram', count: 45, pct: 54 },
];

export default function DashboardBento() {
  return (
    <div className="flex flex-col gap-3">
      {/* KPI Row */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
        {kpis?.map((kpi, idx) => (
          <div
            key={kpi?.key}
            className="rounded-[11px] p-4"
            style={{ background: '#0d0d0d', border: '1px solid #1f1f1f' }}
          >
            <h4 className="text-[11px] font-medium uppercase tracking-[0.4px] mb-2" style={{ color: '#8a8a8a' }}>
              {kpi?.label}
            </h4>
            <div className="flex items-baseline gap-1">
              <span className="text-[23px] font-bold tracking-[-0.5px]" style={{ color: '#ededed' }}>{kpi?.value}</span>
              <span className="text-[11px] font-semibold" style={{ color: kpi?.positive ? '#4ade80' : '#f87171' }}>
                {kpi?.delta}
              </span>
            </div>
            {/* Spark bars */}
            <div className="mt-3 h-[42px] flex gap-[2px] items-end">
              {sparkData?.[idx]?.map((h, i) => (
                <div
                  key={`spark-${kpi?.key}-${i}`}
                  className="flex-1 rounded-[2px] bar-animate"
                  style={{
                    height: `${h}%`,
                    background: 'linear-gradient(#e5e5e5, #525252)',
                    animationDelay: `${0.6 + i * 0.05}s`,
                  }}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
      {/* Row 2: Funnel + Channel Mix + Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {/* Conversion Funnel */}
        <div className="rounded-[11px] p-[18px]" style={{ background: '#0d0d0d', border: '1px solid #1f1f1f' }}>
          <h4 className="text-[11.5px] font-semibold uppercase tracking-[0.4px] mb-[14px]" style={{ color: '#8a8a8a' }}>Conversion Funnel</h4>
          <div className="flex flex-col gap-[10px]">
            {[
              { label: 'Impressions · 81.3k', width: '100%', cls: '' },
              { label: 'Profile Visits · 2.6k', width: '78%', cls: 'f2' },
              { label: 'CTA Clicks · 874', width: '55%', cls: 'f3' },
              { label: 'Leads · 123', width: '32%', cls: 'f4' },
            ]?.map((bar, i) => (
              <div
                key={`funnel-${i}`}
                className="h-[24px] rounded-[6px] flex items-center px-[10px] text-[10.5px] font-bold funnel-bar"
                style={{
                  width: bar?.width,
                  background: i === 0 ? 'linear-gradient(90deg, #f5f5f5, #a3a3a3)'
                    : i === 1 ? 'linear-gradient(90deg, #d4d4d4, #7a7a7a)'
                    : i === 2 ? 'linear-gradient(90deg, #a3a3a3, #525252)' :'linear-gradient(90deg, #737373, #3a3a3a)',
                  color: i < 3 ? '#0a0a0a' : '#ededed',
                  animationDelay: `${0.5 + i * 0.15}s`,
                }}
              >
                {bar?.label}
              </div>
            ))}
          </div>
        </div>

        {/* Top Channel */}
        <div className="rounded-[11px] p-[18px]" style={{ background: '#0d0d0d', border: '1px solid #1f1f1f' }}>
          <h4 className="text-[11.5px] font-semibold uppercase tracking-[0.4px] mb-[14px]" style={{ color: '#8a8a8a' }}>Top Channel</h4>
          <p className="text-[20px] font-bold tracking-[-0.3px] mb-[4px]" style={{ color: '#ededed' }}>LinkedIn</p>
          <p className="text-[12px] mb-[14px]" style={{ color: '#8a8a8a' }}>Most content generated</p>
          <div className="flex flex-col gap-[8px]">
            {channels?.map((ch) => (
              <div key={`ch-${ch?.label}`} className="flex items-center gap-2">
                <span className="text-[11px] w-[80px] shrink-0" style={{ color: '#8a8a8a' }}>{ch?.label}</span>
                <div className="flex-1 h-[3px] rounded-full overflow-hidden" style={{ background: '#1f1f1f' }}>
                  <div className="h-full rounded-full" style={{ width: `${ch?.pct}%`, background: '#ededed' }} />
                </div>
                <span className="text-[11px] font-semibold font-tabular w-6 text-right" style={{ color: '#ededed' }}>{ch?.count}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="rounded-[11px] p-[18px]" style={{ background: '#0d0d0d', border: '1px solid #1f1f1f' }}>
          <h4 className="text-[11.5px] font-semibold uppercase tracking-[0.4px] mb-[14px]" style={{ color: '#8a8a8a' }}>Quick Actions</h4>
          <div className="flex flex-col gap-[9px]">
            {[
              { icon: '✎', label: 'Generate a thread' },
              { icon: '🔍', label: 'Audit your posts' },
              { icon: '+', label: 'Log a post' },
            ]?.map((qa, i) => (
              <div
                key={`qa-${i}`}
                className="flex items-center gap-[10px] px-[11px] py-[9px] rounded-[8px] text-[12.5px] font-medium cursor-pointer transition-all duration-200 hover:border-[#3a3a3a]"
                style={{ background: '#0a0a0a', border: '1px solid #1f1f1f', color: '#ededed' }}
              >
                <div
                  className="w-[26px] h-[26px] rounded-[7px] flex items-center justify-center text-[12px] shrink-0"
                  style={{ background: '#161616', border: '1px solid #1f1f1f' }}
                >
                  {qa?.icon}
                </div>
                {qa?.label}
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Row 3: Goal Progress + Streak */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {/* Goal Progress */}
        <div className="rounded-[11px] p-[18px]" style={{ background: '#0d0d0d', border: '1px solid #1f1f1f' }}>
          <h4 className="text-[11.5px] font-semibold uppercase tracking-[0.4px] mb-[14px]" style={{ color: '#8a8a8a' }}>Goal Progress</h4>
          <div className="flex items-center justify-between mb-[8px]">
            <span className="text-[13px]" style={{ color: '#8a8a8a' }}>followers ·</span>
            <span className="text-[15px] font-bold tracking-[-0.3px]" style={{ color: '#ededed' }}>1.9k / 10k</span>
          </div>
          <div className="h-[6px] rounded-full overflow-hidden mb-[6px]" style={{ background: '#1f1f1f' }}>
            <div className="h-full rounded-full" style={{ width: '19%', background: 'linear-gradient(90deg, #ededed, #8a8a8a)' }} />
          </div>
          <p className="text-[11px] mb-[14px]" style={{ color: '#8a8a8a' }}>19% complete</p>
          <div className="flex items-center justify-between px-[12px] py-[10px] rounded-[8px]" style={{ background: '#161616', border: '1px solid #1f1f1f' }}>
            <div>
              <p className="text-[12px] font-semibold" style={{ color: '#ededed' }}>Premium Audit · $49</p>
              <p className="text-[11px]" style={{ color: '#8a8a8a' }}>Hand-tuned thread review</p>
            </div>
            <button className="btn-primary text-[11px] px-3 py-1.5 rounded-[8px]">Upgrade</button>
          </div>
        </div>

        {/* Generation Streak */}
        <div className="rounded-[11px] p-[18px]" style={{ background: '#0d0d0d', border: '1px solid #1f1f1f' }}>
          <h4 className="text-[11.5px] font-semibold uppercase tracking-[0.4px] mb-[14px]" style={{ color: '#8a8a8a' }}>Generation Streak</h4>
          <p className="text-[28px] font-bold tracking-[-0.5px] mb-[4px]" style={{ color: '#ededed' }}>7 days</p>
          <p className="text-[12px] mb-[14px]" style={{ color: '#8a8a8a' }}>You've generated content 7 days in a row</p>
          <div className="flex items-center gap-[6px]">
            {['M', 'T', 'W', 'T', 'F', 'S', 'S']?.map((day, i) => (
              <div key={`streak-day-${i}`} className="flex flex-col items-center gap-1">
                <div
                  className="w-[28px] h-[28px] rounded-[6px] flex items-center justify-center text-[11px] font-semibold"
                  style={{
                    background: i < 7 ? '#ededed' : '#1f1f1f',
                    color: i < 7 ? '#0a0a0a' : '#8a8a8a',
                  }}
                >
                  {day}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}