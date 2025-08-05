// src/components/layout/header.tsx
'use client';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { UserNav } from './user-nav';
import { useAuth } from '@/hooks/useAuth';

export function Header() {
  const { user } = useAuth();
  
  return (
    <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
      <SidebarTrigger className="md:hidden" />
      <div className="flex w-full items-center justify-end gap-4">
        {user && <UserNav />}
      </div>
    </header>
  );
}
