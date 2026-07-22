import { Container } from '@/components/layout/container'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

/**
 * 실제 견적서 페이지 구조(헤더 카드 / 항목 테이블 / 합계)에 맞춘 로딩 스켈레톤.
 */
export default function InvoiceLoading() {
  return (
    <main className="flex-1 py-12">
      <Container size="md" className="space-y-6">
        {/* 헤더 카드 영역 */}
        <Card>
          <CardHeader className="border-b [.border-b]:pb-6">
            <Skeleton className="h-6 w-40" />
            <Skeleton className="h-4 w-16" />
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <div className="space-y-2">
                <Skeleton className="h-3 w-16" />
                <Skeleton className="h-4 w-28" />
              </div>
              <div className="space-y-2">
                <Skeleton className="h-3 w-16" />
                <Skeleton className="h-4 w-28" />
              </div>
              <div className="space-y-2">
                <Skeleton className="h-3 w-16" />
                <Skeleton className="h-4 w-28" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 항목 테이블 영역 */}
        <div className="space-y-4">
          <div className="overflow-hidden rounded-md border">
            <div className="space-y-3 p-4">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          </div>

          {/* 합계 영역 */}
          <div className="flex items-center justify-between gap-4">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-7 w-32" />
          </div>
        </div>

        {/* PDF 다운로드 버튼 영역 */}
        <div className="flex justify-end">
          <Skeleton className="h-9 w-36" />
        </div>
      </Container>
    </main>
  )
}
