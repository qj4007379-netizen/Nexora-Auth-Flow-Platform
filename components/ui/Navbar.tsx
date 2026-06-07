"use client";

import React from 'react';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { User } from 'next-auth';
import { ThemeToggle } from './ThemeToggle';
import { Button } from './button';

function Navbar() {
  const { data: session } = useSession();

  const user: User = session?.user as User;

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo Section */}
          <div className="flex-shrink-0">
            <Link 
              href="/" 
              className="text-xl font-bold text-foreground hover:text-foreground/80 transition-colors duration-200"
            >
              <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                Mestry Message
              </span>
            </Link>
          </div>

          {/* Navigation Section */}
          <div className="flex items-center space-x-4">
            {/* Theme Toggle */}
            <ThemeToggle />
            
            {session ? (
              <>
                <span className="text-sm text-muted-foreground hidden sm:block">
                  Welcome, <span className="font-medium text-foreground">{user?.username || user?.email}</span>
                </span>
                <Link
                  href="/dashboard"
                  className="px-4 py-2 text-sm font-medium text-foreground hover:bg-accent hover:text-accent-foreground rounded-md transition-all duration-200"
                >
                  Dashboard
                </Link>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => signOut()}
                  className="border-destructive/30 text-destructive hover:bg-destructive/10 hover:text-destructive transition-all duration-200"
                >
                  Logout
                </Button>
              </>
            ) : (
              <Button
                variant="default"
                size="sm"
                asChild
                className="transition-all duration-200 hover:shadow-md"
              >
                <Link href="/sign-in">
                  Login
                </Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;