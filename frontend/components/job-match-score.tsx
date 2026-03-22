import React from 'react'
import { cn } from '@/lib/utils'

interface JobMatchScoreProps {
  score: number
  className?: string
  size?: 'sm' | 'md' | 'lg'
}

export function JobMatchScore({ score, className, size = 'md' }: JobMatchScoreProps) {
  const percentage = Math.min(Math.max(score, 0), 100)
  const radius = size === 'sm' ? 35 : size === 'lg' ? 50 : 40
  const circumference = 2 * Math.PI * radius

  // Color based on match percentage
  let colorClass = 'text-destructive'
  if (percentage >= 75) colorClass = 'text-green-600'
  else if (percentage >= 50) colorClass = 'text-accent'
  else if (percentage >= 25) colorClass = 'text-yellow-600'

  const sizeClass = size === 'sm' ? 'w-20 h-20' : size === 'lg' ? 'w-28 h-28' : 'w-24 h-24'
  const textSize = size === 'sm' ? 'text-lg' : size === 'lg' ? 'text-4xl' : 'text-2xl'

  return (
    <div className={cn('flex items-center justify-center', sizeClass, className)}>
      <svg className="transform -rotate-90" viewBox={`0 0 ${radius * 2 + 20} ${radius * 2 + 20}`}>
        {/* Background circle */}
        <circle
          cx={radius + 10}
          cy={radius + 10}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth="4"
          className="text-muted"
        />
        {/* Progress circle */}
        <circle
          cx={radius + 10}
          cy={radius + 10}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth="4"
          strokeDasharray={circumference}
          strokeDashoffset={circumference - (percentage / 100) * circumference}
          className={cn('transition-all duration-500 stroke-linecap-round', colorClass)}
        />
      </svg>
      <div className={cn('absolute flex flex-col items-center', colorClass)}>
        <span className={cn('font-bold', textSize)}>{percentage}%</span>
        <span className="text-xs font-medium">Match</span>
      </div>
    </div>
  )
}
