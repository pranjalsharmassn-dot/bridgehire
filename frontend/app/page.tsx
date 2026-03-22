'use client'

import React, { useState } from 'react'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { CheckCircle2, Zap, Users, Globe } from 'lucide-react'
import Link from 'next/link'

export default function Landing() {
  const [email, setEmail] = useState('')

  const handleEarlyAccess = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle email signup
    console.log('Early access signup:', email)
    setEmail('')
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="flex-1 bg-gradient-to-b from-primary/5 to-secondary/5 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-accent/10 border border-accent rounded-full">
                <span className="text-xs font-semibold text-accent">New Career Path Ahead</span>
              </div>
              <h1 className="text-5xl lg:text-6xl font-serif font-bold text-foreground">
                Your Service. Your Second Chapter.
              </h1>
              <p className="text-lg text-muted-foreground max-w-xl leading-relaxed">
                BridgeHire connects retired Indian government officials and armed forces veterans with meaningful career opportunities that value their experience and expertise.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link href="/signup">
                  <Button size="lg" className="w-full sm:w-auto bg-primary hover:bg-primary/90">
                    Start Your Journey
                  </Button>
                </Link>
                <Link href="#features">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto">
                    Learn More
                  </Button>
                </Link>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground pt-4">
                <div className="flex -space-x-2">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="w-8 h-8 rounded-full bg-accent/20 border-2 border-card flex items-center justify-center text-xs font-bold text-accent"
                    >
                      V{i}
                    </div>
                  ))}
                </div>
                <span>Join 500+ veterans on BridgeHire</span>
              </div>
            </div>

            {/* Hero Visual */}
            <div className="relative h-96 lg:h-full min-h-96 bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/10 rounded-2xl border border-border overflow-hidden flex items-center justify-center">
              <div className="absolute inset-0 flex flex-col items-center justify-center p-8 space-y-8">
                <div className="text-center space-y-2">
                  <div className="text-6xl font-serif font-bold text-accent">98%</div>
                  <p className="text-muted-foreground">Match Accuracy</p>
                </div>
                <div className="w-full max-w-xs space-y-3">
                  {['Profile Match', 'AI Translation', 'Verified Badge'].map((item) => (
                    <div key={item} className="flex items-center gap-3 p-3 bg-card/50 rounded-lg border border-border">
                      <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0" />
                      <span className="text-sm font-medium">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-serif font-bold mb-4">Why BridgeHire?</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Purpose-built for veterans seeking meaningful employment with dignity and respect
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Zap,
                title: 'AI-Powered Matching',
                description: 'Our AI engine matches your military experience with relevant job opportunities across industries.',
              },
              {
                icon: Globe,
                title: 'Language Support',
                description: 'AI translation feature helps you understand and apply for jobs in your preferred language.',
              },
              {
                icon: Users,
                title: 'Verified Opportunities',
                description: 'All job postings are verified. Work with recruiters who respect your background.',
              },
              {
                icon: CheckCircle2,
                title: 'Rank Recognition',
                description: 'Your military rank and achievements are prominently displayed and valued.',
              },
              {
                icon: Zap,
                title: 'Career Coaching',
                description: 'Access resources to bridge your military experience to civilian employment.',
              },
              {
                icon: Users,
                title: 'Veteran Community',
                description: 'Connect with fellow veterans, share experiences, and grow together.',
              },
            ].map((feature, i) => (
              <Card key={i} className="p-6 border border-border hover:shadow-lg transition-shadow">
                <feature.icon className="w-12 h-12 text-accent mb-4" />
                <h3 className="font-serif font-bold text-lg mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary text-primary-foreground py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl font-serif font-bold mb-4">Ready to Start Your Next Chapter?</h2>
          <p className="text-lg opacity-90 mb-8">
            Join thousands of veterans finding meaningful careers on BridgeHire
          </p>

          <form onSubmit={handleEarlyAccess} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="bg-primary-foreground/20 border-primary-foreground/30 text-primary-foreground placeholder:text-primary-foreground/50"
            />
            <Button type="submit" variant="secondary" size="lg" className="whitespace-nowrap">
              Get Started
            </Button>
          </form>

          <p className="text-xs opacity-75 mt-4">
            No credit card required. Free access to browse jobs and build your profile.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  )
}
