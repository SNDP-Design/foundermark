import React from 'react';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

const actions = [
  {
    key: 'qa-generate',
    href: '/content-generator',
    icon: '✎',
    label: 'Generate Content',
    description: 'Create new marketing copy with AI',
    primary: true,
  },
  {
    key: 'qa-library',
    href: '/content-library',
    icon: '⊞',
    label: 'Browse Library',
    description: 'View and reuse saved content',
    primary: false,
  },
  {
    key: 'qa-product',
    href: '/product-setup',
    icon: '◈',
    label: 'Update Product',
    description: 'Refine your product profile',
    primary: false,
  },
];

export default function QuickActions() {
  return (
    <div className="rounded-[11px] p-[18px] h-full flex flex-col" style={{ background: '#0d0d0d', border: '1px solid #1f1f1f' }}>
      <h4 className="text-[11.5px] font-semibold uppercase tracking-[0.4px] mb-[14px]" style={{ color: '#8a8a8a' }}>Quick Actions</h4>
      <div className="flex flex-col gap-[9px] flex-1">
        {actions?.map((action) => (
          <Link
            key={action?.key}
            href={action?.href}
            className="flex items-center gap-[10px] px-[11px] py-[9px] rounded-[8px] text-[12.5px] font-medium transition-all duration-200 group"
            style={{ background: '#0a0a0a', border: '1px solid #1f1f1f', color: '#ededed' }}
          >
            <div
              className="w-[26px] h-[26px] rounded-[7px] flex items-center justify-center text-[12px] shrink-0 transition-all duration-200 group-hover:border-[#3a3a3a]"
              style={{ background: '#161616', border: '1px solid #1f1f1f' }}
            >
              {action?.icon}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[12.5px] font-semibold" style={{ color: '#ededed' }}>{action?.label}</p>
              <p className="text-[11px]" style={{ color: '#8a8a8a' }}>{action?.description}</p>
            </div>
            <ArrowRight size={13} className="shrink-0 transition-transform duration-200 group-hover:translate-x-1" style={{ color: '#8a8a8a' }} />
          </Link>
        ))}
      </div>
    </div>
  );
}