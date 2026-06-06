'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import AppLogo from '@/components/ui/AppLogo';
import {
  LayoutDashboard,
  Sparkles,
  BookOpen,
  Settings,
  ChevronLeft,
  ChevronRight,
  Zap,
  Package,
} from 'lucide-react';

const navItems = [
  { key: 'nav-dashboard', href: '/', label: 'Dashboard', icon: LayoutDashboard },
  { key: 'nav-generator', href: '/content-generator', label: 'Generate', icon: Sparkles, badge: null },
  { key: 'nav-library', href: '/content-library', label: 'Library', icon: BookOpen, badge: '24' },
  { key: 'nav-product', href: '/product-setup', label: 'Product', icon: Package },
];

const bottomItems = [
  { key: 'nav-settings', href: '/account-settings', label: 'Settings', icon: Settings },
];

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <aside
      className={`sidebar-transition flex flex-col shrink-0 relative z-20 border-r border-[#1f1f1f] ${
        collapsed ? 'w-16' : 'w-[220px]'
      }`}
      style={{ background: 'linear-gradient(#0a0a0a, #050505)' }}
    >
      {/* Logo */}
      <div className={`flex items-center h-[72px] px-4 border-b border-[#1f1f1f] ${
        collapsed ? 'justify-center' : 'gap-3'
      }`}>
        <div className="w-[30px] h-[30px] rounded-[8px] bg-black border border-[#1f1f1f] flex items-center justify-center shrink-0 overflow-hidden">
          <AppLogo size={22} />
        </div>
        {!collapsed && (
          <span className="font-bold text-[14px] tracking-[0.2px] text-[#ededed]">
            FounderMark
          </span>
        )}
      </div>

      {/* Credits pill */}
      {!collapsed && (
        <div className="mx-3 mt-4 mb-1 border border-[#1f1f1f] rounded-[10px] p-[11px] flex items-center gap-[9px]" style={{ background: '#0d0d0d' }}>
          <div className="w-[30px] h-[30px] rounded-full flex-shrink-0" style={{ background: 'linear-gradient(135deg, #9a9a9a, #3a3a3a)' }} />
          <div className="flex-1 min-w-0">
            <p className="text-[12px] font-semibold text-[#ededed] leading-tight truncate">Nadia Patel</p>
            <span className="text-[10px] font-medium flex items-center gap-[5px] mt-[3px]" style={{ color: '#4ade80' }}>
              <span className="w-[6px] h-[6px] rounded-full flex-shrink-0" style={{ background: '#4ade80' }} />
              Synced
            </span>
          </div>
        </div>
      )}

      {/* Nav items */}
      <nav className="flex-1 px-[14px] py-3 flex flex-col gap-[5px]">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href);
          return (
            <Link
              key={item.key}
              href={item.href}
              title={collapsed ? item.label : undefined}
              className={`flex items-center gap-[11px] px-[11px] py-[9px] text-[12.5px] border rounded-[8px] transition-all duration-200 group relative ${
                active
                  ? 'text-[#ededed] border-[#1f1f1f]'
                  : 'text-[#8a8a8a] border-transparent hover:text-[#ededed] hover:bg-[#0d0d0d]'
              } ${collapsed ? 'justify-center' : ''}`}
              style={active ? { background: 'linear-gradient(#1c1c1c, #141414)' } : {}}
            >
              <div
                className={`w-[14px] h-[14px] rounded-[3px] shrink-0 ${
                  active ? 'opacity-85' : 'opacity-40 group-hover:opacity-70'
                }`}
                style={{ background: 'currentColor' }}
              />
              {!collapsed && (
                <span className="flex-1 truncate">{item.label}</span>
              )}
              {!collapsed && item.badge && (
                <span className="text-[10px] font-semibold px-[6px] py-[2px] rounded-full" style={{ background: '#1f1f1f', color: '#8a8a8a' }}>
                  {item.badge}
                </span>
              )}
              {collapsed && item.badge && (
                <span className="absolute top-1 right-1 w-2 h-2 rounded-full" style={{ background: '#4ade80' }} />
              )}
              {collapsed && (
                <span className="absolute left-full ml-3 px-2 py-1 text-[11px] rounded-[8px] opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50" style={{ background: '#ededed', color: '#0a0a0a' }}>
                  {item.label}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Bottom items */}
      <div className="px-[14px] py-3 border-t border-[#1f1f1f] flex flex-col gap-[5px]">
        {bottomItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href);
          return (
            <Link
              key={item.key}
              href={item.href}
              title={collapsed ? item.label : undefined}
              className={`flex items-center gap-[11px] px-[11px] py-[9px] text-[12.5px] border rounded-[8px] transition-all duration-200 group relative ${
                active
                  ? 'text-[#ededed] border-[#1f1f1f]'
                  : 'text-[#8a8a8a] border-transparent hover:text-[#ededed] hover:bg-[#0d0d0d]'
              } ${collapsed ? 'justify-center' : ''}`}
              style={active ? { background: 'linear-gradient(#1c1c1c, #141414)' } : {}}
            >
              <div
                className={`w-[14px] h-[14px] rounded-[3px] shrink-0 ${
                  active ? 'opacity-85' : 'opacity-40 group-hover:opacity-70'
                }`}
                style={{ background: 'currentColor' }}
              />
              {!collapsed && <span>{item.label}</span>}
              {collapsed && (
                <span className="absolute left-full ml-3 px-2 py-1 text-[11px] rounded-[8px] opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50" style={{ background: '#ededed', color: '#0a0a0a' }}>
                  {item.label}
                </span>
              )}
            </Link>
          );
        })}

        {/* Credits indicator */}
        {!collapsed && (
          <div className="mt-2 px-[11px] py-[9px] border border-[#1f1f1f] rounded-[8px]" style={{ background: '#0d0d0d' }}>
            <div className="flex items-center justify-between mb-[6px]">
              <span className="text-[11px] font-semibold text-[#8a8a8a] flex items-center gap-[5px]">
                <Zap size={10} style={{ color: '#4ade80' }} />
                Credits
              </span>
              <span className="text-[11px] font-bold text-[#ededed] font-tabular">47 / 200</span>
            </div>
            <div className="h-[3px] rounded-full overflow-hidden" style={{ background: '#1f1f1f' }}>
              <div className="h-full rounded-full" style={{ width: '23.5%', background: '#ededed' }} />
            </div>
            <p className="text-[10px] mt-[5px]" style={{ color: '#8a8a8a' }}>153 credits left</p>
          </div>
        )}
      </div>

      {/* Collapse toggle */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3 top-20 w-6 h-6 rounded-full flex items-center justify-center z-30 transition-all duration-150 hover:scale-110"
        style={{ background: '#0d0d0d', border: '1px solid #1f1f1f', color: '#8a8a8a' }}
        aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
      >
        {collapsed ? <ChevronRight size={11} /> : <ChevronLeft size={11} />}
      </button>
    </aside>
  );
}