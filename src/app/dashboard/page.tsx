import { Metadata } from 'next'

export const metadata: Metadata = {
  title: '대시보드',
  description: '노션 견적서 동기화 및 클라이언트 전달용 링크 관리',
}

export default function DashboardPage() {
  return (
    <div className="bg-background flex min-h-screen items-center justify-center px-4">
      <p className="text-muted-foreground text-sm">
        관리자 대시보드 준비 중입니다. (노션 동기화, 견적서 목록, 링크 복사)
      </p>
    </div>
  )
}
