import React from 'react';
import AppLayout from '@/components/AppLayout';
import DashboardBento from './components/DashboardBento';
import DashboardChart from './components/DashboardChart';
import RecentGenerations from './components/RecentGenerations';
import QuickActions from './components/QuickActions';

export default function DashboardPage() {
  return (
    <AppLayout>
      <div className="space-y-8 fade-in">
        {/* Page header */}
        <div className="flex items-start justify-between">
          <div>
            <p className="text-[12px] font-medium mb-[6px]" style={{ color: '#8a8a8a' }}>Dashboard · Track what moves the needle</p>
            <h1 className="text-[22px] font-bold tracking-[-0.4px]" style={{ color: '#ededed' }}>Good morning, Nadia</h1>
            <div className="flex items-center gap-[7px] mt-[8px] flex-wrap">
              <span className="text-[11px] px-[10px] py-[4px] rounded-full" style={{ background: '#161616', border: '1px solid #1f1f1f', color: '#8a8a8a' }}>
                Niche · <strong style={{ color: '#ededed' }}>Marketing</strong>
              </span>
              <span className="text-[11px] px-[10px] py-[4px] rounded-full" style={{ background: '#161616', border: '1px solid #1f1f1f', color: '#8a8a8a' }}>
                Stage · <strong style={{ color: '#ededed' }}>Solo</strong>
              </span>
              <span className="text-[11px] px-[10px] py-[4px] rounded-full" style={{ background: '#161616', border: '1px solid #1f1f1f', color: '#8a8a8a' }}>
                Goal · <strong style={{ color: '#ededed' }}>10k followers</strong>
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2 text-[11px] px-3 py-1.5 rounded-[8px]" style={{ background: '#161616', border: '1px solid #1f1f1f', color: '#8a8a8a' }}>
            <span className="w-[6px] h-[6px] rounded-full" style={{ background: '#4ade80' }} />
            Updated just now
          </div>
        </div>

        <DashboardBento />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <DashboardChart />
          </div>
          <div className="lg:col-span-1">
            <QuickActions />
          </div>
        </div>

        <RecentGenerations />
      </div>
    </AppLayout>
  );
}