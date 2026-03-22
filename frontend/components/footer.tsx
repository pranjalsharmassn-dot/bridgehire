import React from 'react'
import { Facebook, Twitter, Linkedin, Mail } from 'lucide-react'
import Link from 'next/link'

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center text-primary text-sm font-bold">
                BH
              </div>
              <span className="font-serif font-bold text-lg">BridgeHire</span>
            </div>
            <p className="text-sm opacity-90">Connecting Indian veterans with meaningful careers through AI-powered matching.</p>
          </div>

          <div>
            <h3 className="font-serif font-semibold mb-4">For Veterans</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/jobs" className="hover:opacity-75 transition-opacity">
                  Browse Jobs
                </Link>
              </li>
              <li>
                <Link href="/profile" className="hover:opacity-75 transition-opacity">
                  My Profile
                </Link>
              </li>
              <li>
                <Link href="/translate" className="hover:opacity-75 transition-opacity">
                  AI Translator
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-serif font-semibold mb-4">For Recruiters</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/recruiter/post-job" className="hover:opacity-75 transition-opacity">
                  Post a Job
                </Link>
              </li>
              <li>
                <Link href="/recruiter/dashboard" className="hover:opacity-75 transition-opacity">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="hover:opacity-75 transition-opacity">
                  Pricing
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-serif font-semibold mb-4">Connect</h3>
            <div className="flex items-center gap-3 mb-4">
              <a href="#" className="p-2 bg-primary-foreground/10 rounded-lg hover:bg-primary-foreground/20 transition-colors">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 bg-primary-foreground/10 rounded-lg hover:bg-primary-foreground/20 transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 bg-primary-foreground/10 rounded-lg hover:bg-primary-foreground/20 transition-colors">
                <Mail className="w-4 h-4" />
              </a>
            </div>
            <p className="text-xs opacity-75">contact@bridgehire.com</p>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 pt-8 flex flex-col md:flex-row justify-between items-center text-sm opacity-75 gap-6">
          <p>&copy; 2024 BridgeHire. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:opacity-100 transition-opacity">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:opacity-100 transition-opacity">
              Terms of Service
            </Link>
            <Link href="/accessibility" className="hover:opacity-100 transition-opacity">
              Accessibility
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
