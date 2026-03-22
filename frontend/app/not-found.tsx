'use client'

import React from 'react'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { AlertCircle } from 'lucide-react'
import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-1 bg-muted/30 py-16 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
        <div className="max-w-2xl mx-auto text-center">
          <Card className="p-12 border border-border shadow-lg">
            <AlertCircle className="w-20 h-20 text-destructive mx-auto mb-6" />
            <h1 className="text-6xl font-serif font-bold mb-4">404</h1>
            <h2 className="text-2xl font-serif font-bold mb-4">Page Not Found</h2>
            <p className="text-muted-foreground mb-8 max-w-md mx-auto">
              The page you're looking for doesn't exist or has been moved. Don't worry, we can help you find what you're looking for.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/">
                <Button size="lg" className="bg-primary hover:bg-primary/90">
                  Go to Home
                </Button>
              </Link>
              <Link href="/jobs">
                <Button size="lg" variant="outline" className="border-border">
                  Browse Jobs
                </Button>
              </Link>
            </div>
          </Card>

          {/* Quick Links */}
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'Dashboard', href: '/dashboard' },
              { label: 'Jobs', href: '/jobs' },
              { label: 'Profile', href: '/profile' },
              { label: 'Translate', href: '/translate' },
            ].map((link) => (
              <Link key={link.href} href={link.href}>
                <Button variant="ghost" className="w-full text-primary hover:bg-primary/10">
                  {link.label}
                </Button>
              </Link>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
