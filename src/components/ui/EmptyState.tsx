import React from 'react';
import { LucideIcon } from 'lucide-react';
import Icon from '@/components/ui/AppIcon';


interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export default function EmptyState({ icon: Icon, title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-6 text-center">
      <div
        className="w-14 h-14 rounded-[12px] flex items-center justify-center mb-4"
        style={{ background: '#161616', border: '1px solid #1f1f1f' }}
      >
        <Icon size={22} style={{ color: '#8a8a8a' }} />
      </div>
      <h3 className="text-[15px] font-bold mb-2" style={{ color: '#ededed' }}>{title}</h3>
      <p className="text-[13px] max-w-sm mb-6" style={{ color: '#8a8a8a' }}>{description}</p>
      {action && (
        <button onClick={action.onClick} className="btn-primary text-[13px]">
          {action.label}
        </button>
      )}
    </div>
  );
}