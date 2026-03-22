'use client'

import React, { useState } from 'react'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { ArrowRight, CheckCircle2 } from 'lucide-react'

export default function PostJob() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    jobTitle: '',
    department: '',
    yearsExperience: '',
    salary: '',
    location: '',
    description: '',
    requirements: '',
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (step < 3) {
      setStep(step + 1)
    } else {
      console.log('Job posted:', formData)
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar currentUser={{ name: 'Recruiter', type: 'recruiter' }} />

      <main className="flex-1 bg-muted/30 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-serif font-bold mb-2">Post a New Job</h1>
            <p className="text-muted-foreground">Find the perfect veteran candidate for your role</p>
          </div>

          {/* Progress */}
          <div className="mb-12">
            <div className="flex justify-between mb-4">
              {[1, 2, 3].map((i) => (
                <React.Fragment key={i}>
                  <div
                    className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all ${
                      i <= step ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                    }`}
                  >
                    {i < step ? <CheckCircle2 className="w-5 h-5" /> : i}
                  </div>
                  {i < 3 && <div className={`flex-1 h-0.5 mx-2 mt-5 ${i < step ? 'bg-primary' : 'bg-muted'}`} />}
                </React.Fragment>
              ))}
            </div>
            <div className="text-sm text-muted-foreground text-center">
              Step {step} of 3
            </div>
          </div>

          {/* Form */}
          <Card className="p-8 border border-border shadow-lg">
            <form onSubmit={handleSubmit} className="space-y-6">
              {step === 1 && (
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Job Title</label>
                    <Input
                      name="jobTitle"
                      value={formData.jobTitle}
                      onChange={handleInputChange}
                      placeholder="e.g., Strategic Operations Director"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Department</label>
                    <select
                      name="department"
                      value={formData.department}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-border rounded-md bg-background"
                      required
                    >
                      <option value="">Select a department</option>
                      <option value="Operations">Operations</option>
                      <option value="Security">Security</option>
                      <option value="Management">Management</option>
                      <option value="Consulting">Consulting</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Years of Experience Required</label>
                    <Input
                      name="yearsExperience"
                      type="number"
                      value={formData.yearsExperience}
                      onChange={handleInputChange}
                      placeholder="e.g., 15"
                      required
                    />
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Salary Range (Annual)</label>
                    <Input
                      name="salary"
                      value={formData.salary}
                      onChange={handleInputChange}
                      placeholder="e.g., 18-25 LPA"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Location</label>
                    <Input
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      placeholder="e.g., Delhi NCR"
                      required
                    />
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Job Description</label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      placeholder="Describe the role, responsibilities, and ideal candidate..."
                      className="w-full h-32 px-3 py-2 border border-border rounded-md bg-background resize-none"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Key Requirements</label>
                    <textarea
                      name="requirements"
                      value={formData.requirements}
                      onChange={handleInputChange}
                      placeholder="List the key skills and requirements (one per line)..."
                      className="w-full h-32 px-3 py-2 border border-border rounded-md bg-background resize-none"
                      required
                    />
                  </div>
                </div>
              )}

              {/* Navigation */}
              <div className="flex justify-between pt-6 border-t border-border">
                <Button
                  type="button"
                  onClick={() => setStep(Math.max(1, step - 1))}
                  disabled={step === 1}
                  variant="outline"
                >
                  Previous
                </Button>
                <Button type="submit" className="bg-primary hover:bg-primary/90">
                  {step === 3 ? 'Post Job' : 'Next'}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </form>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  )
}
