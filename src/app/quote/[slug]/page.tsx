import { Metadata } from 'next'

export const metadata: Metadata = {
  title: '견적서',
}

interface QuotePageProps {
  params: Promise<{ slug: string }>
}

export default async function QuotePage({ params }: QuotePageProps) {
  const { slug } = await params

  return (
    <div className="bg-background flex min-h-screen items-center justify-center px-4">
      <p className="text-muted-foreground text-sm">
        견적서({slug}) 상세 페이지 준비 중입니다.
      </p>
    </div>
  )
}
