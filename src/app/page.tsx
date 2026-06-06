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
            <h1 className="text-2xl font-bold text-foreground tracking-tight">Good morning, Nadia 👋</h1>
            <p className="text-sm text-muted-foreground mt-1">Here's what's happening with your marketing content.</p>
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground bg-muted px-3 py-1.5 rounded-lg">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
            Updated just now
          </div>
        </div>

        <DashboardBento />

        <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3 gap-6">
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