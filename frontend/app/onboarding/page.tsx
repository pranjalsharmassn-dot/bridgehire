'use client'

import React, { useState } from 'react'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { CheckCircle2, ArrowRight } from 'lucide-react'

export default function Onboarding() {
  const [currentStep, setCurrentStep] = useState(1)
  const totalSteps = 4

  const steps = [
    {
      title: 'Military Information',
      description: 'Tell us about your military service',
      fields: [
        { label: 'Branch of Service', placeholder: 'Indian Army, Navy, Air Force, etc.' },
        { label: 'Rank', placeholder: 'Your final rank' },
        { label: 'Years of Service', placeholder: 'e.g., 20' },
      ],
    },
    {
      title: 'Professional Experience',
      description: 'Share your key achievements and responsibilities',
      fields: [
        { label: 'Primary Role/Specialization', placeholder: 'e.g., Operations Commander' },
        { label: 'Key Achievements', placeholder: 'Major accomplishments in your service' },
        { label: 'Team Size Managed', placeholder: 'Approximate number of personnel' },
      ],
    },
    {
      title: 'Skills & Languages',
      description: 'What are your core competencies?',
      fields: [
        { label: 'Professional Skills', placeholder: 'Leadership, Strategy, etc.' },
        { label: 'Languages Spoken', placeholder: 'English, Hindi, etc.' },
        { label: 'Certifications', placeholder: 'Any relevant certifications' },
      ],
    },
    {
      title: 'Preferences',
      description: 'Tell us about your ideal next role',
      fields: [
        { label: 'Preferred Industries', placeholder: 'Security, Consulting, etc.' },
        { label: 'Preferred Location', placeholder: 'Where do you want to work?' },
        { label: 'Salary Expectations', placeholder: 'Annual salary range' },
      ],
    },
  ]

  const currentStepData = steps[currentStep - 1]

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar currentUser={{ name: 'New Veteran', type: 'veteran' }} />

      <main className="flex-1 bg-gradient-to-b from-primary/5 to-secondary/5 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-serif font-bold mb-2">Complete Your Profile</h1>
            <p className="text-muted-foreground">Help us match you with the right opportunities</p>
          </div>

          {/* Progress Bar */}
          <div className="mb-12">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-semibold text-foreground">Step {currentStep} of {totalSteps}</span>
              <span className="text-sm text-muted-foreground">{Math.round((currentStep / totalSteps) * 100)}% Complete</span>
            </div>
            <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-500"
                style={{ width: `${(currentStep / totalSteps) * 100}%` }}
              />
            </div>
          </div>

          {/* Step Indicators */}
          <div className="mb-12 hidden sm:flex items-center justify-between">
            {steps.map((step, i) => (
              <React.Fragment key={i}>
                <button
                  onClick={() => setCurrentStep(i + 1)}
                  className={`flex flex-col items-center gap-2 text-xs font-medium transition-all ${
                    i + 1 <= currentStep ? 'opacity-100' : 'opacity-50 cursor-not-allowed'
                  }`}
                >
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all ${
                      i + 1 === currentStep
                        ? 'bg-primary text-primary-foreground'
                        : i + 1 < currentStep
                        ? 'bg-accent text-accent-foreground'
                        : 'bg-muted text-muted-foreground'
                    }`}
                  >
                    {i + 1 < currentStep ? <CheckCircle2 className="w-5 h-5" /> : i + 1}
                  </div>
                  <span className="text-center">{step.title}</span>
                </button>
                {i < steps.length - 1 && <div className="flex-1 h-0.5 bg-muted mx-2" />}
              </React.Fragment>
            ))}
          </div>

          {/* Form Card */}
          <Card className="p-8 border border-border shadow-lg mb-8">
            <div className="mb-8">
              <h2 className="text-2xl font-serif font-bold mb-2">{currentStepData.title}</h2>
              <p className="text-muted-foreground">{currentStepData.description}</p>
            </div>

            {/* Form Fields */}
            <form className="space-y-6 mb-8">
              {currentStepData.fields.map((field, i) => (
                <div key={i} className="space-y-2">
                  <label className="block text-sm font-medium">{field.label}</label>
                  <Input placeholder={field.placeholder} className="bg-muted/30" />
                </div>
              ))}
            </form>

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between pt-6 border-t border-border">
              <Button
                onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
                disabled={currentStep === 1}
                variant="outline"
              >
                Previous
              </Button>

              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                Step {currentStep} of {totalSteps}
              </div>

              <Button
                onClick={() => {
                  if (currentStep === totalSteps) {
                    // Submit
                    console.log('Profile complete!')
                  } else {
                    setCurrentStep(Math.min(totalSteps, currentStep + 1))
                  }
                }}
                className="bg-primary hover:bg-primary/90"
              >
                {currentStep === totalSteps ? (
                  'Complete Profile'
                ) : (
                  <>
                    Next
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </>
                )}
              </Button>
            </div>
          </Card>

          {/* Completion Info */}
          <Card className="p-6 bg-accent/10 border border-accent">
            <p className="text-sm text-muted-foreground text-center">
              <CheckCircle2 className="w-4 h-4 inline-block mr-2 text-accent" />
              Completing your profile will improve job matching accuracy by up to 40%
            </p>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  )
}
