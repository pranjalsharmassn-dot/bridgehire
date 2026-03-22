'use client'

import React, { useState } from 'react'
import { Globe, Menu, X, LogOut } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { useLanguage } from '@/context/language-context'

interface NavbarProps {
  currentUser?: { name: string; type: 'veteran' | 'recruiter' | 'admin' }
  onLogout?: () => void
}

export function Navbar({ currentUser, onLogout }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { language, setLanguage } = useLanguage()

  const navItems = currentUser
    ? currentUser.type === 'veteran'
      ? [
          { label: 'Dashboard', href: '/dashboard' },
          { label: 'Jobs', href: '/jobs' },
          { label: 'Profile', href: '/profile' },
          { label: 'Translate', href: '/translate' },
        ]
      : currentUser.type === 'recruiter'
      ? [
          { label: 'Dashboard', href: '/recruiter/dashboard' },
          { label: 'Post Job', href: '/recruiter/post-job' },
          { label: 'Candidates', href: '/recruiter/candidates' },
        ]
      : [
          { label: 'Dashboard', href: '/admin/dashboard' },
          { label: 'Verifications', href: '/admin/verifications' },
        ]
    : [
        { label: 'Home', href: '/' },
        { label: 'Features', href: '/#features' },
        { label: 'About', href: '/#about' },
      ]

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border bg-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 font-serif font-bold text-xl text-primary">
            <div className="w-8 h-8 bg-gradient-to-br from-accent to-secondary rounded-lg flex items-center justify-center text-white text-sm font-bold">
              BH
            </div>
            <span className="hidden sm:inline">BridgeHire</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="px-3 py-2 text-sm font-medium text-foreground hover:bg-muted rounded-md transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-3">
            {/* Language Selector */}
            <div className="hidden sm:flex items-center border border-border rounded-lg p-1">
              <button
                onClick={() => setLanguage('en')}
                className={cn('px-2.5 py-1.5 text-xs font-medium rounded transition-colors', language === 'en' ? 'bg-primary text-primary-foreground' : 'text-foreground hover:bg-muted')}
              >
                EN
              </button>
              <div className="w-px h-4 bg-border mx-1" />
              <button
                onClick={() => setLanguage('hi')}
                className={cn('px-2.5 py-1.5 text-xs font-medium rounded transition-colors', language === 'hi' ? 'bg-primary text-primary-foreground' : 'text-foreground hover:bg-muted')}
              >
                हिंदी
              </button>
            </div>

            {/* User Menu or Auth Buttons */}
            {currentUser ? (
              <div className="flex items-center gap-2">
                <span className="hidden sm:inline text-sm text-muted-foreground">{currentUser.name}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onLogout}
                  className="text-foreground hover:bg-muted"
                >
                  <LogOut className="w-4 h-4" />
                  <span className="hidden sm:inline ml-1">Logout</span>
                </Button>
              </div>
            ) : (
              <div className="hidden sm:flex items-center gap-2">
                <Link href="/login">
                  <Button variant="ghost" size="sm">
                    Login
                  </Button>
                </Link>
                <Link href="/signup">
                  <Button size="sm" className="bg-primary hover:bg-primary/90">
                    Sign Up
                  </Button>
                </Link>
              </div>
            )}

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-muted transition-colors"
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-border py-4 space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block px-4 py-2 text-sm text-foreground hover:bg-muted rounded-md transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            {!currentUser && (
              <div className="pt-2 border-t border-border flex gap-2">
                <Link href="/login" className="flex-1">
                  <Button variant="outline" size="sm" className="w-full">
                    Login
                  </Button>
                </Link>
                <Link href="/signup" className="flex-1">
                  <Button size="sm" className="w-full bg-primary hover:bg-primary/90">
                    Sign Up
                  </Button>
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  )
}
