'use client'

import React, { useState } from 'react'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { CheckCircle2, User, Mail, Lock, Eye, EyeOff } from 'lucide-react'
import Link from 'next/link'

export default function Signup() {
  const [userType, setUserType] = useState<'veteran' | 'recruiter' | null>(null)
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  })
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!userType) return
    setIsLoading(true)
    // Simulate signup
    setTimeout(() => {
      setIsLoading(false)
      console.log('Signup:', userType, formData)
    }, 1500)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-1 bg-muted/30 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-serif font-bold mb-2">Join BridgeHire</h1>
            <p className="text-muted-foreground">Start your new career journey today</p>
          </div>

          {/* Role Selection */}
          {!userType ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {[
                {
                  type: 'veteran' as const,
                  title: 'I'm a Veteran',
                  description: 'Retired government official or armed forces personnel',
                  benefits: ['Browse job opportunities', 'AI Translation support', 'Verified status'],
                },
                {
                  type: 'recruiter' as const,
                  title: 'I'm a Recruiter',
                  description: 'Looking to hire experienced professionals',
                  benefits: ['Post job openings', 'Access veteran talent pool', 'Verified candidates'],
                },
              ].map((option) => (
                <Card
                  key={option.type}
                  className="p-8 border-2 border-border cursor-pointer hover:border-primary transition-colors"
                  onClick={() => setUserType(option.type)}
                >
                  <h3 className="font-serif font-bold text-xl mb-2">{option.title}</h3>
                  <p className="text-sm text-muted-foreground mb-6">{option.description}</p>
                  <ul className="space-y-2">
                    {option.benefits.map((benefit) => (
                      <li key={benefit} className="flex items-center gap-2 text-sm">
                        <CheckCircle2 className="w-4 h-4 text-accent flex-shrink-0" />
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </Card>
              ))}
            </div>
          ) : (
            <div className="mb-6">
              <Button
                variant="ghost"
                onClick={() => setUserType(null)}
                className="text-primary hover:bg-muted"
              >
                ← Change role
              </Button>
            </div>
          )}

          {/* Signup Form */}
          {userType && (
            <Card className="p-8 border border-border shadow-lg">
              <form onSubmit={handleSignup} className="space-y-6">
                {/* Full Name */}
                <div className="space-y-2">
                  <label htmlFor="fullName" className="block text-sm font-medium">
                    {userType === 'veteran' ? 'Full Name' : 'Organization Name'}
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      id="fullName"
                      name="fullName"
                      placeholder={userType === 'veteran' ? 'John Doe' : 'Your Company'}
                      value={formData.fullName}
                      onChange={handleInputChange}
                      required
                      className="pl-10"
                    />
                  </div>
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <label htmlFor="email" className="block text-sm font-medium">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="your.email@example.com"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="pl-10"
                    />
                  </div>
                </div>

                {/* Password */}
                <div className="space-y-2">
                  <label htmlFor="password" className="block text-sm font-medium">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Create a strong password"
                      value={formData.password}
                      onChange={handleInputChange}
                      required
                      className="pl-10 pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                {/* Confirm Password */}
                <div className="space-y-2">
                  <label htmlFor="confirmPassword" className="block text-sm font-medium">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Confirm your password"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      required
                      className="pl-10 pr-10"
                    />
                  </div>
                </div>

                {/* Terms Agreement */}
                <label className="flex items-start gap-3 text-sm cursor-pointer">
                  <input type="checkbox" required className="w-4 h-4 rounded border border-border mt-1" />
                  <span className="text-muted-foreground">
                    I agree to the{' '}
                    <Link href="/terms" className="text-primary hover:underline">
                      Terms of Service
                    </Link>{' '}
                    and{' '}
                    <Link href="/privacy" className="text-primary hover:underline">
                      Privacy Policy
                    </Link>
                  </span>
                </label>

                {/* Signup Button */}
                <Button type="submit" disabled={isLoading} className="w-full bg-primary hover:bg-primary/90">
                  {isLoading ? 'Creating account...' : 'Create Account'}
                </Button>
              </form>

              {/* Sign In Link */}
              <div className="mt-6 text-center text-sm">
                <span className="text-muted-foreground">Already have an account? </span>
                <Link href="/login" className="font-medium text-primary hover:underline">
                  Sign in
                </Link>
              </div>
            </Card>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}
