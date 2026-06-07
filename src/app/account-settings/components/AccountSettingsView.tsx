'use client';

import React, { useState } from 'react';
import { User, Shield, CreditCard, Bell } from 'lucide-react';
import ProfileSettings from './ProfileSettings';
import SecuritySettings from './SecuritySettings';
import SubscriptionSettings from './SubscriptionSettings';
import PreferencesSettings from './PreferencesSettings';
import Icon from '@/components/ui/AppIcon';


const sections = [
  { key: 'sec-profile', id: 'profile', label: 'Profile', icon: User, description: 'Name, email, avatar' },
  { key: 'sec-security', id: 'security', label: 'Security', icon: Shield, description: 'Password & 2FA' },
  { key: 'sec-subscription', id: 'subscription', label: 'Subscription', icon: CreditCard, description: 'Plan & credits' },
  { key: 'sec-preferences', id: 'preferences', label: 'Preferences', icon: Bell, description: 'Notifications & defaults' },
];

export default function AccountSettingsView() {
  const [activeSection, setActiveSection] = useState('profile');

  return (
    <div className="flex flex-col lg:flex-row gap-6 items-start">
      {/* Left nav */}
      <div className="lg:w-56 xl:w-64 shrink-0">
        <div className="rounded-[14px] p-2 flex flex-col gap-[3px]" style={{ background: 'linear-gradient(180deg, #0d0d0d 0%, #141414 100%)', border: '1px solid #1f1f1f' }}>
          {sections?.map((section) => {
            const Icon = section?.icon;
            const active = activeSection === section?.id;
            return (
              <button
                key={section?.key}
                onClick={() => setActiveSection(section?.id)}
                className="w-full flex items-center gap-3 px-3 py-3 rounded-[10px] text-left transition-all duration-150"
                style={{
                  background: active ? 'linear-gradient(#1c1c1c, #141414)' : 'transparent',
                  border: `1px solid ${active ? '#1f1f1f' : 'transparent'}`,
                }}
              >
                <Icon size={15} style={{ color: active ? '#ededed' : '#8a8a8a' }} />
                <div>
                  <p className="text-[13px] font-semibold" style={{ color: active ? '#ededed' : '#8a8a8a' }}>
                    {section?.label}
                  </p>
                  <p className="text-[11px]" style={{ color: '#8a8a8a' }}>{section?.description}</p>
                </div>
              </button>
            );
          })}
        </div>
      </div>
      {/* Right content */}
      <div className="flex-1 min-w-0">
        {activeSection === 'profile' && <ProfileSettings />}
        {activeSection === 'security' && <SecuritySettings />}
        {activeSection === 'subscription' && <SubscriptionSettings />}
        {activeSection === 'preferences' && <PreferencesSettings />}
      </div>
    </div>
  );
}