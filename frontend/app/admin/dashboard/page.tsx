'use client'

import React, { useState } from 'react'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Plus, Search } from 'lucide-react'

export default function AdminDashboard() {
  const [verifications] = useState([
    { id: '1', name: 'Major Rajesh Kumar', rank: 'Major', status: 'verified', date: '2024-03-10' },
    { id: '2', name: 'Colonel Amit Singh', rank: 'Colonel', status: 'pending', date: '2024-03-09' },
    { id: '3', name: 'Captain Priya Patel', rank: 'Captain', status: 'reviewing', date: '2024-03-08' },
  ])

  const [companies] = useState([
    { id: '1', name: 'IndTech Solutions', verified: true, jobs: 5, users: 12 },
    { id: '2', name: 'SafeGuard India', verified: true, jobs: 3, users: 8 },
    { id: '3', name: 'Global Logistics Ltd', verified: false, jobs: 2, users: 5 },
  ])

  const stats = {
    totalUsers: 1240,
    verifiedUsers: 985,
    totalJobs: 156,
    activeCompanies: 34,
    pendingVerifications: 23,
    reviewingApplications: 45,
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'verified':
        return 'bg-green-100 text-green-800'
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'reviewing':
        return 'bg-blue-100 text-blue-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar currentUser={{ name: 'Admin', type: 'admin' }} />

      <main className="flex-1 bg-muted/30 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-serif font-bold mb-2">Admin Dashboard</h1>
            <p className="text-muted-foreground">Manage platform users, companies, and verifications</p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {[
              { label: 'Total Users', value: stats.totalUsers, color: 'text-primary' },
              { label: 'Verified Users', value: stats.verifiedUsers, color: 'text-green-600' },
              { label: 'Total Jobs Posted', value: stats.totalJobs, color: 'text-blue-600' },
              { label: 'Active Companies', value: stats.activeCompanies, color: 'text-purple-600' },
              { label: 'Pending Verifications', value: stats.pendingVerifications, color: 'text-yellow-600' },
              { label: 'Reviewing Applications', value: stats.reviewingApplications, color: 'text-orange-600' },
            ].map((stat) => (
              <Card key={stat.label} className="p-6 border border-border">
                <p className="text-sm text-muted-foreground mb-2">{stat.label}</p>
                <p className={`text-4xl font-bold ${stat.color}`}>{stat.value}</p>
              </Card>
            ))}
          </div>

          {/* Verification Queue */}
          <div className="mb-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
              <h2 className="text-2xl font-serif font-bold">Verification Queue</h2>
              <p className="text-sm text-muted-foreground">{stats.pendingVerifications} Pending Reviews</p>
            </div>

            <Card className="border border-border overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border bg-muted/30">
                      <th className="px-6 py-3 text-left text-sm font-semibold">Name</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold">Rank</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold">Status</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold">Submitted</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {verifications.map((verification) => (
                      <tr key={verification.id} className="hover:bg-muted/20 transition-colors">
                        <td className="px-6 py-4 font-medium">{verification.name}</td>
                        <td className="px-6 py-4 text-sm">{verification.rank}</td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(verification.status)}`}>
                            {verification.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-muted-foreground">
                          {new Date(verification.date).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4">
                          {verification.status === 'pending' && (
                            <div className="flex gap-2">
                              <Button size="sm" className="bg-green-600 hover:bg-green-700">
                                Approve
                              </Button>
                              <Button size="sm" variant="outline" className="border-red-300">
                                Reject
                              </Button>
                            </div>
                          )}
                          {verification.status !== 'pending' && (
                            <Button size="sm" variant="ghost">
                              View Details
                            </Button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>

          {/* Company Management */}
          <div>
            <h2 className="text-2xl font-serif font-bold mb-4">Company Management</h2>
            <Card className="border border-border overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border bg-muted/30">
                      <th className="px-6 py-3 text-left text-sm font-semibold">Company Name</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold">Status</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold">Jobs Posted</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold">Recruiters</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {companies.map((company) => (
                      <tr key={company.id} className="hover:bg-muted/20 transition-colors">
                        <td className="px-6 py-4 font-medium">{company.name}</td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${company.verified ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                            {company.verified ? 'Verified' : 'Pending'}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm">{company.jobs} Jobs</td>
                        <td className="px-6 py-4 text-sm">{company.users} Users</td>
                        <td className="px-6 py-4">
                          <Button variant="ghost" size="sm" className="text-primary">
                            Manage
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
