'use client'

export const dynamic = 'force-dynamic'

import { Suspense } from 'react'
import nextDynamic from 'next/dynamic'

const CheckContent = nextDynamic(() => import('./CheckContent'), { ssr: false })

export default function CheckPage() {
  return (
    <Suspense fallback={<div>読み込み中...</div>}>
      <CheckContent />
    </Suspense>
  )
}
