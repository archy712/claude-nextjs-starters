import { Container } from '@/components/layout/container'

/**
 * 견적서 조회 세그먼트(`/invoice/[notionPageId]`) 전용 레이아웃.
 *
 * 헤더/푸터 프레임만 담당하며, 실제 콘텐츠(page.tsx / loading.tsx / error.tsx)는
 * {children}으로 전달된다. Next.js 파일 컨벤션 계층상 error.tsx와 loading.tsx는
 * 같은 세그먼트의 layout.tsx 안쪽에 중첩되므로, 로딩/에러 상태에서도 이 프레임은
 * 그대로 유지되고 {children} 영역만 교체된다.
 */
export default function InvoiceLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b py-6">
        <Container size="md">
          <h1 className="text-lg font-semibold">견적서 조회</h1>
        </Container>
      </header>

      {children}

      <footer className="text-muted-foreground border-t py-6 text-center text-xs">
        <Container size="md">
          본 견적서 조회 페이지는 별도의 로그인 없이 고유 링크로 접근합니다.
        </Container>
      </footer>
    </div>
  )
}
