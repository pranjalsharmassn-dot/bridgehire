import React from 'react'
import { cn } from '@/lib/utils'

interface RankTierBadgeProps {
  rank: string
  className?: string
}

// Map Indian military/government ranks to color codes
const rankColors: Record<string, string> = {
  'Field Marshal': 'bg-accent text-accent-foreground',
  'General': 'bg-primary text-primary-foreground',
  'Lieutenant General': 'bg-primary/90 text-primary-foreground',
  'Major General': 'bg-primary/80 text-primary-foreground',
  'Brigadier': 'bg-secondary text-secondary-foreground',
  'Colonel': 'bg-secondary/90 text-secondary-foreground',
  'Lieutenant Colonel': 'bg-secondary/80 text-secondary-foreground',
  'Major': 'bg-blue-600 text-white',
  'Captain': 'bg-blue-500 text-white',
  'Lieutenant': 'bg-blue-400 text-white',
  'Subedar Major': 'bg-purple-600 text-white',
  'Subedar': 'bg-purple-500 text-white',
  'Naib Subedar': 'bg-purple-400 text-white',
  'Havildar Major': 'bg-indigo-600 text-white',
  'Havildar': 'bg-indigo-500 text-white',
  'Secretary': 'bg-primary text-primary-foreground',
  'Joint Secretary': 'bg-primary/80 text-primary-foreground',
  'Additional Secretary': 'bg-secondary text-secondary-foreground',
  'Director General': 'bg-secondary/90 text-secondary-foreground',
}

export function RankTierBadge({ rank, className }: RankTierBadgeProps) {
  const colorClass = rankColors[rank] || 'bg-muted text-muted-foreground'

  return (
    <div className={cn('inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold', colorClass, className)}>
      {rank}
    </div>
  )
}
