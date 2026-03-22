'use client'

import React from 'react'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { JobMatchScore } from '@/components/job-match-score'
import { VerificationBadge } from '@/components/verification-badge'
import { Heart, Share2, MessageSquare, Clock, MapPin, DollarSign } from 'lucide-react'
import Link from 'next/link'

export default function VeteranDashboard() {
  const savedJobs = [
    {
      id: '1',
      title: 'Strategic Operations Director',
      company: 'IndTech Solutions',
      location: 'Delhi NCR',
      salary: '18-25 LPA',
      matchScore: 92,
      verified: true,
    },
    {
      id: '2',
      title: 'Security Consultant',
      company: 'SafeGuard India',
      location: 'Mumbai',
      salary: '15-20 LPA',
      matchScore: 88,
      verified: true,
    },
  ]

  const applications = [
    { id: '1', company: 'IndTech Solutions', role: 'Strategic Operations Director', status: 'submitted', date: '2024-03-10' },
    { id: '2', company: 'SafeGuard India', role: 'Security Consultant', status: 'under_review', date: '2024-03-08' },
    { id: '3', company: 'Global Logistics', role: 'Operations Manager', status: 'interview', date: '2024-03-05' },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'submitted':
        return 'bg-blue-100 text-blue-800'
      case 'under_review':
        return 'bg-yellow-100 text-yellow-800'
      case 'interview':
        return 'bg-green-100 text-green-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'submitted':
        return 'Application Submitted'
      case 'under_review':
        return 'Under Review'
      case 'interview':
        return 'Interview Scheduled'
      default:
        return status
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar currentUser={{ name: 'Rajesh Kumar', type: 'veteran' }} />

      <main className="flex-1 bg-muted/30 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Welcome Section */}
          <div className="mb-8">
            <h1 className="text-4xl font-serif font-bold mb-2">Welcome back, Major Kumar</h1>
            <p className="text-muted-foreground">Your profile is 85% complete. Complete it to increase match accuracy.</p>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            {[
              { label: 'Active Applications', value: '3', icon: MessageSquare },
              { label: 'Profile Views', value: '12', icon: Heart },
              { label: 'Saved Jobs', value: '5', icon: Clock },
              { label: 'Profile Match', value: '85%', icon: Share2 },
            ].map((stat) => (
              <Card key={stat.label} className="p-6 border border-border">
                <stat.icon className="w-6 h-6 text-accent mb-2" />
                <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
                <p className="text-2xl font-bold">{stat.value}</p>
              </Card>
            ))}
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Recent Applications */}
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-serif font-bold mb-4">Your Applications</h2>
              <div className="space-y-4">
                {applications.map((app) => (
                  <Card key={app.id} className="p-6 border border-border hover:shadow-lg transition-shadow">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                      <div className="flex-1">
                        <h3 className="font-serif font-bold text-lg mb-1">{app.role}</h3>
                        <p className="text-sm text-muted-foreground mb-3">{app.company}</p>
                        <p className="text-xs text-muted-foreground">Applied: {new Date(app.date).toLocaleDateString()}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(app.status)}`}>
                          {getStatusLabel(app.status)}
                        </span>
                        <Button variant="ghost" size="sm" className="text-primary">
                          View
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {/* Right Column - Saved Jobs */}
            <div>
              <h2 className="text-2xl font-serif font-bold mb-4">Saved Jobs</h2>
              <div className="space-y-4">
                {savedJobs.map((job) => (
                  <Card key={job.id} className="p-4 border border-border hover:shadow-lg transition-shadow">
                    <div className="flex items-start gap-3 mb-3">
                      <div className="flex-1 min-w-0">
                        <h3 className="font-serif font-bold text-sm line-clamp-2">{job.title}</h3>
                        <p className="text-xs text-muted-foreground">{job.company}</p>
                      </div>
                      {job.verified && <VerificationBadge verified className="flex-shrink-0 text-xs" />}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
                      <MapPin className="w-3 h-3" />
                      {job.location}
                    </div>
                    <JobMatchScore score={job.matchScore} size="sm" className="mb-3" />
                    <Button size="sm" className="w-full bg-primary hover:bg-primary/90">
                      View Job
                    </Button>
                  </Card>
                ))}
                <Link href="/jobs" className="w-full">
                  <Button variant="outline" className="w-full border-border">
                    Browse More Jobs
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
