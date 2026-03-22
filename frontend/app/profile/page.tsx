'use client'

import React, { useState } from 'react'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { VerificationBadge } from '@/components/verification-badge'
import { RankTierBadge } from '@/components/rank-tier-badge'
import { Edit2, Upload, MapPin, Phone, Calendar, Briefcase } from 'lucide-react'

export default function VeteranProfile() {
  const [isEditing, setIsEditing] = useState(false)
  const [profile, setProfile] = useState({
    name: 'Major Rajesh Kumar',
    rank: 'Major',
    bio: 'Dedicated military professional with 20 years of service in the Indian Army',
    location: 'New Delhi, India',
    phone: '+91 98765 43210',
    joinDate: 'March 2024',
    verified: true,
    experience: [
      {
        title: 'Defense Operations',
        duration: '2004-2024',
        description: 'Led tactical operations and strategic planning for 20 years',
      },
      {
        title: 'Team Leadership',
        duration: '2010-2024',
        description: 'Managed teams of 50+ personnel across multiple deployments',
      },
    ],
    skills: ['Leadership', 'Strategic Planning', 'Operations Management', 'Team Coordination', 'Risk Assessment'],
  })

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar currentUser={{ name: 'Rajesh Kumar', type: 'veteran' }} />

      <main className="flex-1 bg-muted/30 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Profile Header */}
          <Card className="border border-border shadow-lg mb-6 overflow-hidden">
            <div className="h-32 bg-gradient-to-r from-primary to-secondary" />

            <div className="px-6 pb-6 -mt-16 relative">
              <div className="flex flex-col sm:flex-row gap-6 items-start">
                {/* Avatar */}
                <div className="relative">
                  <div className="w-32 h-32 rounded-lg bg-accent text-white flex items-center justify-center text-4xl font-bold border-4 border-card shadow-lg">
                    RK
                  </div>
                  <button className="absolute bottom-2 right-2 p-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
                    <Upload className="w-4 h-4" />
                  </button>
                </div>

                {/* Info */}
                <div className="flex-1 pt-4">
                  <div className="flex flex-col sm:flex-row sm:items-start gap-4 mb-4">
                    <div>
                      <h1 className="text-3xl font-serif font-bold">{profile.name}</h1>
                      <RankTierBadge rank={profile.rank} className="mt-2" />
                    </div>
                    <VerificationBadge verified={profile.verified} />
                  </div>
                  <p className="text-muted-foreground mb-4 max-w-2xl">{profile.bio}</p>

                  <div className="flex flex-col sm:flex-row gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      {profile.location}
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4" />
                      {profile.phone}
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      Joined {profile.joinDate}
                    </div>
                  </div>
                </div>

                {/* Edit Button */}
                <Button
                  onClick={() => setIsEditing(!isEditing)}
                  className="bg-primary hover:bg-primary/90"
                >
                  <Edit2 className="w-4 h-4 mr-2" />
                  {isEditing ? 'Save' : 'Edit Profile'}
                </Button>
              </div>
            </div>
          </Card>

          {/* Experience Section */}
          <div className="mb-6">
            <h2 className="text-2xl font-serif font-bold mb-4">Military Experience</h2>
            <div className="space-y-4">
              {profile.experience.map((exp, i) => (
                <Card key={i} className="p-6 border border-border hover:shadow-lg transition-shadow">
                  <div className="flex items-start gap-4">
                    <Briefcase className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-serif font-bold text-lg">{exp.title}</h3>
                      <p className="text-sm text-accent font-semibold mb-2">{exp.duration}</p>
                      <p className="text-muted-foreground">{exp.description}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Skills Section */}
          <div className="mb-6">
            <h2 className="text-2xl font-serif font-bold mb-4">Skills & Expertise</h2>
            <Card className="p-6 border border-border">
              <div className="flex flex-wrap gap-3">
                {profile.skills.map((skill) => (
                  <div key={skill} className="px-4 py-2 bg-secondary/10 border border-secondary rounded-full text-sm font-medium text-secondary">
                    {skill}
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Profile Completion */}
          <Card className="p-6 border border-accent bg-accent/5">
            <h3 className="font-serif font-bold text-lg mb-4">Profile Completion</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Profile Strength: 85%</span>
                <div className="w-32 h-2 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-accent w-[85%]" />
                </div>
              </div>
              <p className="text-xs text-muted-foreground">
                Complete your education details and certifications to reach 100% and increase job match accuracy.
              </p>
            </div>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  )
}
