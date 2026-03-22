'use client'

import React, { useState } from 'react'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { JobMatchScore } from '@/components/job-match-score'
import { VerificationBadge } from '@/components/verification-badge'
import { Search, MapPin, Briefcase, DollarSign, Bookmark, BookmarkCheck, ChevronDown } from 'lucide-react'

interface Job {
  id: string
  title: string
  company: string
  location: string
  salary: string
  type: 'Full-time' | 'Contract'
  matchScore: number
  description: string
  verified: boolean
  saved: boolean
}

const mockJobs: Job[] = [
  {
    id: '1',
    title: 'Strategic Operations Director',
    company: 'IndTech Solutions',
    location: 'Delhi NCR',
    salary: '18-25 LPA',
    type: 'Full-time',
    matchScore: 92,
    description: 'Lead strategic operations for a fast-growing tech company. Experience in military operations directly translates to corporate strategy.',
    verified: true,
    saved: false,
  },
  {
    id: '2',
    title: 'Security Consultant',
    company: 'SafeGuard India',
    location: 'Mumbai',
    salary: '15-20 LPA',
    type: 'Contract',
    matchScore: 88,
    description: 'Advise on security infrastructure and risk management for enterprise clients.',
    verified: true,
    saved: false,
  },
  {
    id: '3',
    title: 'Operations Manager',
    company: 'Global Logistics Ltd',
    location: 'Bangalore',
    salary: '16-22 LPA',
    type: 'Full-time',
    matchScore: 85,
    description: 'Manage complex logistics operations across India. Leadership experience required.',
    verified: true,
    saved: false,
  },
  {
    id: '4',
    title: 'Risk Management Lead',
    company: 'FinSecure Bank',
    location: 'Pune',
    salary: '20-28 LPA',
    type: 'Full-time',
    matchScore: 82,
    description: 'Head risk management initiatives for a leading financial institution.',
    verified: false,
    saved: false,
  },
]

export default function JobBoard() {
  const [jobs, setJobs] = useState(mockJobs)
  const [searchQuery, setSearchQuery] = useState('')
  const [filters, setFilters] = useState({
    location: '',
    type: 'all',
    verified: false,
    minMatch: 0,
  })
  const [showFilters, setShowFilters] = useState(false)

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.company.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesLocation = !filters.location || job.location.toLowerCase().includes(filters.location.toLowerCase())
    const matchesType = filters.type === 'all' || job.type === filters.type
    const matchesVerified = !filters.verified || job.verified
    const matchesScore = job.matchScore >= filters.minMatch

    return matchesSearch && matchesLocation && matchesType && matchesVerified && matchesScore
  })

  const handleSaveJob = (jobId: string) => {
    setJobs((prev) => prev.map((job) => (job.id === jobId ? { ...job, saved: !job.saved } : job)))
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar currentUser={{ name: 'Rajesh Kumar', type: 'veteran' }} />

      <main className="flex-1 bg-muted/30 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-serif font-bold mb-2">Explore Opportunities</h1>
            <p className="text-muted-foreground">Discover jobs matched to your military experience</p>
          </div>

          {/* Search & Filters */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
            {/* Search Bar */}
            <div className="lg:col-span-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  placeholder="Search jobs, companies..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Filters Toggle */}
            <Button
              onClick={() => setShowFilters(!showFilters)}
              variant="outline"
              className="border-border w-full lg:w-auto justify-center"
            >
              Filters
              <ChevronDown className={`w-4 h-4 ml-2 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
            </Button>
          </div>

          {/* Detailed Filters */}
          {showFilters && (
            <Card className="p-6 border border-border mb-8">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Location</label>
                  <Input
                    placeholder="e.g., Delhi, Mumbai"
                    value={filters.location}
                    onChange={(e) => setFilters({ ...filters, location: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Job Type</label>
                  <select
                    value={filters.type}
                    onChange={(e) => setFilters({ ...filters, type: e.target.value })}
                    className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground"
                  >
                    <option value="all">All Types</option>
                    <option value="Full-time">Full-time</option>
                    <option value="Contract">Contract</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Minimum Match</label>
                  <select
                    value={filters.minMatch}
                    onChange={(e) => setFilters({ ...filters, minMatch: Number(e.target.value) })}
                    className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground"
                  >
                    <option value="0">Any Match %</option>
                    <option value="70">70% or higher</option>
                    <option value="80">80% or higher</option>
                    <option value="90">90% or higher</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={filters.verified}
                      onChange={(e) => setFilters({ ...filters, verified: e.target.checked })}
                      className="w-4 h-4 rounded border border-border"
                    />
                    <span className="text-sm font-medium">Verified Only</span>
                  </label>
                </div>
              </div>
            </Card>
          )}

          {/* Results Summary */}
          <div className="mb-6">
            <p className="text-sm text-muted-foreground">
              Showing {filteredJobs.length} of {jobs.length} jobs
            </p>
          </div>

          {/* Job Listings */}
          <div className="space-y-4">
            {filteredJobs.length > 0 ? (
              filteredJobs.map((job) => (
                <Card key={job.id} className="border border-border hover:shadow-lg transition-shadow overflow-hidden">
                  <div className="p-6">
                    <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center">
                      {/* Job Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start gap-3 mb-3">
                          <div>
                            <h3 className="text-xl font-serif font-bold mb-1">{job.title}</h3>
                            <p className="text-muted-foreground font-medium">{job.company}</p>
                          </div>
                          {job.verified && <VerificationBadge verified className="flex-shrink-0" />}
                        </div>

                        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-3">
                          <div className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            {job.location}
                          </div>
                          <div className="flex items-center gap-1">
                            <DollarSign className="w-4 h-4" />
                            {job.salary}
                          </div>
                          <div className="flex items-center gap-1">
                            <Briefcase className="w-4 h-4" />
                            {job.type}
                          </div>
                        </div>

                        <p className="text-sm text-muted-foreground line-clamp-2">{job.description}</p>
                      </div>

                      {/* Match Score & Actions */}
                      <div className="flex flex-col items-center gap-4 w-full lg:w-auto">
                        <JobMatchScore score={job.matchScore} size="md" />

                        <div className="flex gap-2 w-full lg:w-auto">
                          <Button variant="outline" className="flex-1 border-border">
                            View Details
                          </Button>
                          <Button
                            onClick={() => handleSaveJob(job.id)}
                            variant="outline"
                            size="icon"
                            className={job.saved ? 'bg-accent text-accent-foreground border-accent' : 'border-border'}
                          >
                            {job.saved ? (
                              <BookmarkCheck className="w-5 h-5" />
                            ) : (
                              <Bookmark className="w-5 h-5" />
                            )}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              ))
            ) : (
              <Card className="p-12 border border-border text-center">
                <Briefcase className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
                <h3 className="font-serif font-bold text-lg mb-2">No jobs found</h3>
                <p className="text-muted-foreground mb-6">Try adjusting your filters or search query</p>
                <Button
                  onClick={() => {
                    setSearchQuery('')
                    setFilters({ location: '', type: 'all', verified: false, minMatch: 0 })
                  }}
                  variant="outline"
                >
                  Reset Filters
                </Button>
              </Card>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
