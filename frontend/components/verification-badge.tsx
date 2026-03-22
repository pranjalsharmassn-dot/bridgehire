import React from 'react'
import { Check } from 'lucide-react'
import { cn } from '@/lib/utils'

interface VerificationBadgeProps {
  verified: boolean
  className?: string
}

export function VerificationBadge({ verified, className }: VerificationBadgeProps) {
  if (!verified) {
    return (
      <div className={cn('flex items-center gap-1.5 px-2.5 py-1 bg-muted rounded-full', className)}>
        <div className="w-2 h-2 bg-muted-foreground rounded-full" />
        <span className="text-xs font-medium text-muted-foreground">Pending</span>
      </div>
    )
  }

  return (
    <div className={cn('flex items-center gap-1.5 px-2.5 py-1 bg-accent/10 rounded-full border border-accent', className)}>
      <Check className="w-3.5 h-3.5 text-accent" strokeWidth={3} />
      <span className="text-xs font-semibold text-accent">Verified</span>
    </div>
  )
}
