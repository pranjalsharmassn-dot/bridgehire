'use client'

import React, { useState } from 'react'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Wand2, ArrowRightLeft, Globe, Zap, CheckCircle2 } from 'lucide-react'
import { useLanguage } from '@/context/language-context'

export default function TranslatePage() {
  const [sourceText, setSourceText] = useState('')
  const [translatedText, setTranslatedText] = useState('')
  const [sourceLang, setSourceLang] = useState('en')
  const [targetLang, setTargetLang] = useState('hi')
  const [isTranslating, setIsTranslating] = useState(false)
  const { language } = useLanguage()

  const handleTranslate = async () => {
    setIsTranslating(true)
    try {
      const response = await fetch('http://localhost:5000/api/translate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: sourceText })
      })
      const data = await response.json()
      setTranslatedText(data.translated_profile || data.error || 'Translation failed')
    } catch (error) {
      setTranslatedText('Error connecting to backend. Make sure Flask is running!')
    }
    setIsTranslating(false)
  }

  React.useEffect(() => {
    // Sync targetLang with global language context
    setTargetLang(language)
  }, [language])

  const swapLanguages = () => {
    setSourceLang(targetLang)
    setTargetLang(sourceLang)
    setSourceText(translatedText)
    setTranslatedText(sourceText)
  }

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'hi', name: 'Hindi (हिंदी)' },
    { code: 'ta', name: 'Tamil (தமிழ்)' },
    { code: 'te', name: 'Telugu (తెలుగు)' },
    { code: 'ml', name: 'Malayalam (മലയാളം)' },
    { code: 'kn', name: 'Kannada (ಕನ್ನಡ)' },
    { code: 'mr', name: 'Marathi (मराठी)' },
    { code: 'gu', name: 'Gujarati (ગુજરાતી)' },
  ]

  const benefits = [
    { icon: Zap, title: 'Instant Translation', description: 'AI-powered translation in real-time' },
    { icon: Globe, title: 'Multi-Language', description: '8+ Indian languages supported' },
    { icon: CheckCircle2, title: 'Accurate', description: 'Context-aware translations' },
  ]

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar currentUser={{ name: 'Rajesh Kumar', type: 'veteran' }} />

      <main className="flex-1 bg-gradient-to-b from-accent/10 via-secondary/5 to-muted/30 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 border border-accent rounded-full mb-4">
              <Wand2 className="w-4 h-4 text-accent" />
              <span className="text-sm font-semibold text-accent">AI-Powered</span>
            </div>
            <h1 className="text-5xl lg:text-6xl font-serif font-bold mb-4">
              Language is <span className="text-accent">No Barrier</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Understand job descriptions, applications, and communications in your preferred language. Our AI translator bridges the language gap seamlessly.
            </p>
          </div>

          {/* Translation Tool */}
          <div className="mb-12">
            <Card className="p-8 border-2 border-accent shadow-2xl">
              {/* Language Selectors */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {/* Source Language */}
                <div>
                  <label className="block text-sm font-semibold mb-3">From</label>
                  <select
                    value={sourceLang}
                    onChange={(e) => setSourceLang(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-border rounded-lg bg-background text-foreground font-medium"
                  >
                    {languages.map((lang) => (
                      <option key={lang.code} value={lang.code}>
                        {lang.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Target Language */}
                <div>
                  <label className="block text-sm font-semibold mb-3">To</label>
                  <select
                    value={targetLang}
                    onChange={(e) => setTargetLang(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-border rounded-lg bg-background text-foreground font-medium"
                  >
                    {languages.map((lang) => (
                      <option key={lang.code} value={lang.code}>
                        {lang.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Text Areas */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {/* Source Text */}
                <div>
                  <textarea
                    value={sourceText}
                    onChange={(e) => setSourceText(e.target.value)}
                    placeholder="Enter text to translate..."
                    className="w-full h-64 p-4 border-2 border-border rounded-lg bg-background text-foreground resize-none focus:outline-none focus:border-primary"
                  />
                  <div className="text-xs text-muted-foreground mt-2 text-right">{sourceText.length} characters</div>
                </div>

                {/* Translation Result */}
                <div>
                  <div className="w-full h-64 p-4 border-2 border-accent rounded-lg bg-accent/5 text-foreground overflow-auto">
                    {isTranslating ? (
                      <div className="flex items-center justify-center h-full">
                        <div className="flex flex-col items-center gap-3">
                          <div className="w-8 h-8 border-4 border-accent/30 border-t-accent rounded-full animate-spin" />
                          <span className="text-sm text-muted-foreground">Translating...</span>
                        </div>
                      </div>
                    ) : (
                      <p className={translatedText ? 'text-foreground' : 'text-muted-foreground'}>{translatedText || 'Translation will appear here...'}</p>
                    )}
                  </div>
                  <div className="text-xs text-muted-foreground mt-2 text-right">{translatedText.length} characters</div>
                </div>
              </div>

              {/* Controls */}
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button onClick={swapLanguages} variant="outline" className="border-border">
                  <ArrowRightLeft className="w-4 h-4 mr-2" />
                  Swap Languages
                </Button>
                <Button
                  onClick={handleTranslate}
                  disabled={!sourceText || isTranslating}
                  className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold"
                >
                  <Wand2 className="w-4 h-4 mr-2" />
                  {isTranslating ? 'Translating...' : 'Translate'}
                </Button>
              </div>
            </Card>
          </div>

          {/* Benefits */}
          <div className="mb-12">
            <h2 className="text-3xl font-serif font-bold text-center mb-8">Why Use AI Translation?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {benefits.map((benefit) => (
                <Card key={benefit.title} className="p-8 border border-border hover:shadow-lg transition-shadow text-center">
                  <benefit.icon className="w-12 h-12 text-accent mx-auto mb-4" />
                  <h3 className="font-serif font-bold text-lg mb-2">{benefit.title}</h3>
                  <p className="text-muted-foreground text-sm">{benefit.description}</p>
                </Card>
              ))}
            </div>
          </div>

          {/* Use Cases */}
          <Card className="p-8 border-2 border-secondary bg-secondary/5 mb-12">
            <h2 className="text-2xl font-serif font-bold mb-6 text-center">Common Use Cases</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { title: 'Job Descriptions', icon: '📋' },
                { title: 'Application Forms', icon: '📝' },
                { title: 'Company Profiles', icon: '🏢' },
                { title: 'Communications', icon: '💬' },
              ].map((useCase) => (
                <div key={useCase.title} className="p-4 bg-card border border-border rounded-lg text-center">
                  <div className="text-3xl mb-2">{useCase.icon}</div>
                  <p className="font-medium text-sm">{useCase.title}</p>
                </div>
              ))}
            </div>
          </Card>

          {/* CTA */}
          <div className="text-center">
            <h2 className="text-3xl font-serif font-bold mb-4">Ready to Explore More?</h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Browse job opportunities and use AI translation to understand requirements in any language.
            </p>
            <Button size="lg" className="bg-primary hover:bg-primary/90">
              Explore Jobs
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
