'use client'

import React, { useState } from 'react'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { VerificationBadge } from '@/components/verification-badge'
import { RankTierBadge } from '@/components/rank-tier-badge'
import { Plus, Eye, MessageSquare, CheckCircle2, Clock, Users } from 'lucide-react'

interface PostedJob {
  id: string
  title: string
  status: 'active' | 'closed'
  applications: number
  posted: string
  views: number
}

interface Candidate {
  id: string
  name: string
  rank: string
  verified: boolean
  matchScore: number
  applicationDate: string
  status: 'new' | 'reviewed' | 'rejected' | 'shortlisted'
}

export default function RecruiterDashboard() {
  const [postedJobs] = useState<PostedJob[]>([
    { id: '1', title: 'Strategic Operations Director', status: 'active', applications: 12, posted: '2024-03-01', views: 234 },
    { id: '2', title: 'Security Consultant', status: 'active', applications: 8, posted: '2024-02-28', views: 156 },
    { id: '3', title: 'Operations Manager', status: 'closed', applications: 15, posted: '2024-02-20', views: 289 },
  ])

  const [candidates] = useState<Candidate[]>([
    {
      id: '1',
      name: 'Major Rajesh Kumar',
      rank: 'Major',
      verified: true,
      matchScore: 92,
      applicationDate: '2024-03-10',
      status: 'shortlisted',
    },
    {
      id: '2',
      name: 'Colonel Amit Singh',
      rank: 'Colonel',
      verified: true,
      matchScore: 88,
      applicationDate: '2024-03-09',
      status: 'reviewed',
    },
    {
      id: '3',
      name: 'Captain Priya Patel',
      rank: 'Captain',
      verified: false,
      matchScore: 82,
      applicationDate: '2024-03-08',
      status: 'new',
    },
  ])

  const activeJobs = postedJobs.filter((j) => j.status === 'active')
  const totalApplications = postedJobs.reduce((sum, j) => sum + j.applications, 0)
  const totalViews = postedJobs.reduce((sum, j) => sum + j.views, 0)

  const getStatusBadge = (status: Candidate['status']) => {
    const colors = {
      new: 'bg-blue-100 text-blue-800',
      reviewed: 'bg-yellow-100 text-yellow-800',
      shortlisted: 'bg-green-100 text-green-800',
      rejected: 'bg-red-100 text-red-800',
    }
    return colors[status]
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar currentUser={{ name: 'Recruiter User', type: 'recruiter' }} />

      <main className="flex-1 bg-muted/30 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="text-4xl font-serif font-bold mb-2">Recruiter Dashboard</h1>
              <p className="text-muted-foreground">Manage your job postings and candidates</p>
            </div>
            <Button className="bg-primary hover:bg-primary/90 self-start sm:self-auto">
              <Plus className="w-4 h-4 mr-2" />
              Post Job
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            {[
              { label: 'Active Jobs', value: activeJobs.length, icon: Users },
              { label: 'Total Applications', value: totalApplications, icon: Clock },
              { label: 'Profile Views', value: totalViews, icon: Eye },
              { label: 'Shortlisted', value: candidates.filter((c) => c.status === 'shortlisted').length, icon: CheckCircle2 },
            ].map((stat) => (
              <Card key={stat.label} className="p-6 border border-border">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-accent/10 rounded-lg">
                    <stat.icon className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                    <p className="text-3xl font-bold">{stat.value}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Active Jobs */}
          <div className="mb-8">
            <h2 className="text-2xl font-serif font-bold mb-4">Active Job Postings</h2>
            <div className="space-y-4">
              {postedJobs.map((job) => (
                <Card key={job.id} className="p-6 border border-border hover:shadow-lg transition-shadow">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-serif font-bold">{job.title}</h3>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${job.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                          {job.status === 'active' ? 'Active' : 'Closed'}
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-6 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <MessageSquare className="w-4 h-4" />
                          {job.applications} Applications
                        </div>
                        <div className="flex items-center gap-2">
                          <Eye className="w-4 h-4" />
                          {job.views} Views
                        </div>
                        <div className="text-xs">Posted: {new Date(job.posted).toLocaleDateString()}</div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" className="border-border">
                        View
                      </Button>
                      <Button variant="outline" className="border-border">
                        Edit
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Recent Candidates */}
          <div>
            <h2 className="text-2xl font-serif font-bold mb-4">Recent Candidates</h2>
            <Card className="border border-border overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border bg-muted/30">
                      <th className="px-6 py-3 text-left text-sm font-semibold">Candidate</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold">Rank</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold">Match</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold">Status</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold">Applied</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {candidates.map((candidate) => (
                      <tr key={candidate.id} className="hover:bg-muted/20 transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-accent/20 rounded-lg flex items-center justify-center font-bold text-accent">
                              {candidate.name.split(' ')[0][0]}
                              {candidate.name.split(' ')[1][0]}
                            </div>
                            <div>
                              <p className="font-medium">{candidate.name}</p>
                              {candidate.verified && <VerificationBadge verified className="mt-1" />}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <RankTierBadge rank={candidate.rank} />
                        </td>
                        <td className="px-6 py-4">
                          <span className="font-bold text-accent">{candidate.matchScore}%</span>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusBadge(candidate.status)}`}>
                            {candidate.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-muted-foreground">
                          {new Date(candidate.applicationDate).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4">
                          <Button variant="ghost" size="sm" className="text-primary hover:bg-primary/10">
                            View Profile
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
