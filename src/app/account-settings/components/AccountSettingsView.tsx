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
        <div className="card-base p-2 space-y-0.5">
          {sections?.map((section) => {
            const Icon = section?.icon;
            const active = activeSection === section?.id;
            return (
              <button
                key={section?.key}
                onClick={() => setActiveSection(section?.id)}
                className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl text-left transition-all duration-150 ${
                  active
                    ? 'bg-secondary text-secondary-foreground'
                    : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                }`}
              >
                <Icon size={16} className={active ? 'text-primary' : ''} />
                <div>
                  <p className={`text-sm font-semibold ${active ? 'text-secondary-foreground' : 'text-foreground'}`}>
                    {section?.label}
                  </p>
                  <p className="text-xs text-muted-foreground">{section?.description}</p>
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