import React from 'react';
import Sidebar from './Sidebar';

interface AppLayoutProps {
  children: React.ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="flex flex-col h-screen overflow-hidden" style={{ background: '#f5f5f5' }}>
      {/* Top Header */}
      <header className="flex items-center justify-end h-[56px] px-6 border-b border-[#e5e7eb] shrink-0 z-30" style={{ background: '#ffffff' }}>
        <div className="flex items-center gap-[10px] border border-[#e5e7eb] rounded-[10px] px-[11px] py-[7px]" style={{ background: '#f9fafb' }}>
          <img
            src="https://img.rocket.new/generatedImages/rocket_gen_img_1bee6f5b2-1772814263694.png"
            alt="Nadia Patel"
            className="w-[28px] h-[28px] rounded-full flex-shrink-0 object-cover"
          />
          <div className="flex flex-col min-w-0">
            <p className="text-[12px] font-semibold text-[#111111] leading-tight">Nadia Patel</p>
            <span className="text-[10px] font-medium flex items-center gap-[5px]" style={{ color: '#16a34a' }}>
              <span className="w-[5px] h-[5px] rounded-full flex-shrink-0" style={{ background: '#16a34a' }} />
              Synced
            </span>
          </div>
        </div>
      </header>

      {/* Body */}
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-y-auto min-w-0 relative z-10">
          <div className="max-w-screen-2xl mx-auto px-6 lg:px-8 xl:px-10 py-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}