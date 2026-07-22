'use client'

import { Container } from '@/components/layout/container'
import { Button } from '@/components/ui/button'

export default function InvoiceError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <main className="flex flex-1 items-center justify-center py-12">
      <Container size="sm" className="space-y-4 text-center">
        <h1 className="text-lg font-semibold">
          견적서를 불러오는 중 문제가 발생했습니다
        </h1>
        <p className="text-muted-foreground text-sm">{error.message}</p>
        <Button onClick={reset}>다시 시도</Button>
      </Container>
    </main>
  )
}
