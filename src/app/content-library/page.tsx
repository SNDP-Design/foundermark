import React from 'react';
import AppLayout from '@/components/AppLayout';
import ContentLibraryView from './components/ContentLibraryView';

export default function ContentLibraryPage() {
  return (
    <AppLayout>
      <div className="fade-in">
        <div className="mb-6">
          <p className="text-[12px] font-medium mb-[6px]" style={{ color: '#8a8a8a' }}>Library · Saved Content</p>
          <h1 className="text-[22px] font-bold tracking-[-0.4px]" style={{ color: '#ededed' }}>Content Library</h1>
          <p className="text-[13px] mt-[4px]" style={{ color: '#8a8a8a' }}>All your saved marketing content in one place. Copy, reuse, or export anytime.</p>
        </div>
        <ContentLibraryView />
      </div>
    </AppLayout>
  );
}