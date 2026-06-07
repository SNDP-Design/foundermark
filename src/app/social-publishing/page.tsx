import React from 'react';
import AppLayout from '@/components/AppLayout';
import SocialPublishingView from './components/SocialPublishingView';

export default function SocialPublishingPage() {
  return (
    <AppLayout>
      <div className="fade-in">
        <div className="mb-6">
          <p className="text-[12px] font-medium mb-[6px]" style={{ color: '#8a8a8a' }}>Publish · Social Accounts</p>
          <h1 className="text-[22px] font-bold tracking-[-0.4px]" style={{ color: '#ededed' }}>Social Publishing</h1>
          <p className="text-[13px] mt-[4px]" style={{ color: '#8a8a8a' }}>Connect your accounts, schedule posts, and publish saved content with platform-specific formatting.</p>
        </div>
        <SocialPublishingView />
      </div>
    </AppLayout>
  );
}
