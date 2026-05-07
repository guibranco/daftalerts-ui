import React, { useState } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { 
  Home, 
  CheckCircle, 
  Trash2, 
  Settings, 
  Menu, 
  Search, 
  RefreshCw, 
  ChevronLeft, 
  ChevronRight,
  House
} from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet';
import { Badge } from './ui/badge';
import { useStats } from '../hooks/useProperties';
import { ThemeToggle } from './ThemeToggle';
import { LanguageToggle } from './LanguageToggle';
import { useFilters } from '../hooks/useFilters';
import { cn } from '../lib/utils';
import { useKeyboardShortcuts } from '../hooks/useKeyboardShortcuts';

interface AppShellProps {
  children: React.ReactNode;
}

export const AppShell: React.FC<AppShellProps> = ({ children }) => {
  const { t } = useTranslation();
  const { data: stats } = useStats();
  const { filters, setFilter } = useFilters();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const searchInputRef = React.useRef<HTMLInputElement>(null);

  useKeyboardShortcuts(() => searchInputRef.current?.focus());

  const navItems = [
    { to: '/inbox', label: t('nav.inbox'), icon: Home, badge: stats?.inboxCount },
    { to: '/approved', label: t('nav.approved'), icon: CheckCircle, badge: stats?.approvedCount },
    { to: '/recycled', label: t('nav.recycled'), icon: Trash2, badge: stats?.recycledCount },
    { to: '/settings', label: t('nav.settings'), icon: Settings },
  ];

  return (
    <div className="flex h-screen bg-background text-foreground overflow-hidden">
      {/* Sidebar Desktop */}
      <aside className={cn(
        "hidden md:flex flex-col border-r bg-white transition-all duration-300 ease-in-out dark:bg-card",
        isSidebarCollapsed ? "w-16" : "w-[240px]"
      )}>
        <div className="p-6 flex items-center gap-3 h-16 mb-4">
          <House className="w-6 h-6 text-primary shrink-0" strokeWidth={2.5} />
          {!isSidebarCollapsed && (
            <span className="font-bold text-xl tracking-tight text-primary">DaftAlerts</span>
          )}
        </div>
        
        <nav className="flex-1 px-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) => cn(
                "flex items-center gap-3 px-3 py-3 rounded-lg font-medium transition-all duration-200",
                isActive 
                  ? "bg-[#F1F5FE] text-primary dark:bg-primary/20" 
                  : "hover:bg-gray-50 text-foreground/80 hover:text-foreground dark:hover:bg-muted/50",
                isSidebarCollapsed && "justify-center px-0"
              )}
            >
              <item.icon className="w-5 h-5 shrink-0" />
              {!isSidebarCollapsed && (
                <>
                  <span className="flex-1">{item.label}</span>
                  {item.badge !== undefined && (
                    <Badge className={cn(
                      "px-2 py-0.5 text-[11px] rounded-full",
                      item.badge > 0 ? "bg-primary text-white" : "bg-gray-200 text-gray-500"
                    )}>
                      {item.badge}
                    </Badge>
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        <Button 
          variant="ghost" 
          size="icon" 
          className="m-2 self-end"
          onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        >
          {isSidebarCollapsed ? <ChevronRight /> : <ChevronLeft />}
        </Button>
      </aside>

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Topbar */}
        <header className="h-16 border-b bg-card flex items-center justify-between px-4 gap-4 sticky top-0 z-30">
          <div className="flex items-center gap-4 flex-1">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="w-6 h-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-64 p-0">
                <div className="p-4 border-b flex items-center gap-2">
                  <House className="w-6 h-6 text-primary" />
                  <span className="font-bold text-lg">DaftAlerts</span>
                </div>
                <nav className="p-2 space-y-1">
                  {navItems.map((item) => (
                    <NavLink
                      key={item.to}
                      to={item.to}
                      className={({ isActive }) => cn(
                        "flex items-center gap-3 px-3 py-2 rounded-md transition-colors",
                        isActive ? "bg-primary text-primary-foreground" : "hover:bg-muted"
                      )}
                    >
                      <item.icon className="w-5 h-5" />
                      <span className="flex-1">{item.label}</span>
                      {item.badge !== undefined && (
                        <Badge variant="secondary">{item.badge}</Badge>
                      )}
                    </NavLink>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>

            <div className="hidden sm:flex relative max-w-[200px] w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input 
                ref={searchInputRef}
                placeholder={t('common.search')} 
                className="pl-9 bg-[#F3F4F6] border-none rounded-full h-9 text-[13px] focus-visible:ring-1 focus-visible:ring-primary/20"
                value={filters.search}
                onChange={(e) => setFilter('search', e.target.value)}
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={() => window.location.reload()}>
              <RefreshCw className="w-5 h-5" />
            </Button>
            <LanguageToggle />
            <ThemeToggle />
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto bg-background p-4 md:p-6">
          <div className="max-w-7xl mx-auto h-full">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};
