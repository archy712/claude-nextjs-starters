import { FileQuestion } from 'lucide-react'

import { Container } from '@/components/layout/container'

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <Container size="sm" className="space-y-4 text-center">
        <div className="bg-muted mx-auto flex size-16 items-center justify-center rounded-full">
          <FileQuestion
            className="text-muted-foreground size-8"
            aria-hidden="true"
          />
        </div>
        <h1 className="text-lg font-semibold">견적서를 찾을 수 없습니다</h1>
        <p className="text-muted-foreground text-sm">
          요청하신 견적서가 존재하지 않거나 링크가 잘못되었습니다. 견적서
          발행자에게 올바른 링크를 다시 요청해 주세요.
        </p>
      </Container>
    </div>
  )
}
