import { Metadata } from 'next'
import Link from 'next/link'
import {
  ArrowRight,
  Copy,
  Download,
  FileText,
  LayoutList,
  Link2,
  RefreshCw,
  Send,
} from 'lucide-react'

import { Container } from '@/components/layout/container'
import { ThemeToggle } from '@/components/theme-toggle'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'

export const metadata: Metadata = {
  title: '홈',
  description:
    '노션에 입력한 견적서를 클라이언트가 고유 링크로 확인하고 PDF로 다운로드할 수 있는 서비스',
}

// 핵심 기능 카드 데이터 (PRD F001~F005 기반)
const features = [
  {
    icon: RefreshCw,
    title: '노션 데이터 동기화',
    description:
      '"동기화" 버튼 클릭 한 번으로 노션 데이터베이스의 견적서 항목을 그대로 가져옵니다.',
  },
  {
    icon: LayoutList,
    title: '견적서 목록 조회',
    description:
      '동기화된 견적서를 카드/테이블 형태로 한눈에 확인하고 관리할 수 있습니다.',
  },
  {
    icon: FileText,
    title: '고유 링크로 상세 조회',
    description:
      '클라이언트는 별도 가입 없이 고유 링크만으로 품목·수량·단가·합계를 확인합니다.',
  },
  {
    icon: Download,
    title: 'PDF 다운로드',
    description:
      '견적서 상세 페이지에서 내용을 즉시 PDF 파일로 다운로드합니다.',
  },
  {
    icon: Link2,
    title: '고유 링크 발급 & 복사',
    description:
      '추측 불가능한 토큰 기반 링크를 자동 발급하고 버튼 클릭으로 바로 복사합니다.',
  },
] as const

// 사용자 여정 단계 데이터
const steps = [
  {
    icon: RefreshCw,
    title: '노션 동기화',
    description: '관리자가 대시보드에서 노션 견적서를 동기화합니다.',
  },
  {
    icon: Send,
    title: '링크 전달',
    description: '견적서별 고유 링크를 복사해 카카오톡·이메일로 전달합니다.',
  },
  {
    icon: Download,
    title: '확인 & 다운로드',
    description: '클라이언트가 링크로 접속해 견적서를 확인하고 PDF로 받습니다.',
  },
] as const

export default function Home() {
  return (
    <div className="bg-background min-h-screen">
      {/* 헤더: 서비스 로고 + 테마 토글 */}
      <header className="border-b">
        <Container>
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="bg-primary text-primary-foreground flex size-8 items-center justify-center rounded-md">
                <FileText className="size-4" />
              </div>
              <span className="text-base font-semibold">
                Notion 견적서 뷰어
              </span>
            </div>
            <div className="flex items-center gap-2">
              <ThemeToggle />
              <Button variant="ghost" size="sm" asChild>
                <Link href="/login">로그인</Link>
              </Button>
              <Button size="sm" asChild>
                <Link href="/signup">회원가입</Link>
              </Button>
            </div>
          </div>
        </Container>
      </header>

      <main>
        {/* 히어로 섹션 */}
        <section className="py-16 sm:py-24">
          <Container size="md">
            <div className="flex flex-col items-center gap-6 text-center">
              <Badge variant="secondary" className="px-3 py-1">
                Notion 견적서 뷰어 MVP
              </Badge>
              <h1 className="text-3xl font-bold tracking-tight text-balance sm:text-5xl">
                노션 견적서를,
                <br className="sm:hidden" /> 링크 하나로 클라이언트에게
              </h1>
              <p className="text-muted-foreground max-w-2xl text-base text-balance sm:text-lg">
                노션에 입력한 견적서를 동기화하고, 고유 링크를 전달하면
                클라이언트는 별도 가입 없이 바로 견적서를 확인하고 PDF로
                다운로드할 수 있습니다.
              </p>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Button size="lg" asChild>
                  <Link href="/signup">
                    무료로 시작하기
                    <ArrowRight className="size-4" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/login">로그인</Link>
                </Button>
              </div>
            </div>
          </Container>
        </section>

        <Separator />

        {/* 핵심 기능 섹션 */}
        <section className="py-16 sm:py-24">
          <Container>
            <div className="mb-10 flex flex-col items-center gap-2 text-center">
              <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
                핵심 기능
              </h2>
              <p className="text-muted-foreground max-w-xl text-sm sm:text-base">
                견적서 관리부터 클라이언트 전달까지, 꼭 필요한 기능만
                담았습니다.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {features.map(feature => (
                <Card key={feature.title} className="gap-3">
                  <CardHeader>
                    <div className="bg-primary/10 text-primary mb-2 flex size-10 items-center justify-center rounded-lg">
                      <feature.icon className="size-5" />
                    </div>
                    <CardTitle className="text-base">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground text-sm">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </Container>
        </section>

        <Separator />

        {/* 작동 흐름 섹션 */}
        <section className="py-16 sm:py-24">
          <Container size="md">
            <div className="mb-10 flex flex-col items-center gap-2 text-center">
              <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
                이렇게 동작합니다
              </h2>
              <p className="text-muted-foreground max-w-xl text-sm sm:text-base">
                관리자의 동기화부터 클라이언트의 PDF 다운로드까지 3단계면
                충분합니다.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
              {steps.map((step, index) => (
                <div
                  key={step.title}
                  className="relative flex flex-col items-center gap-3 text-center"
                >
                  <div className="bg-primary text-primary-foreground flex size-12 items-center justify-center rounded-full">
                    <step.icon className="size-5" />
                  </div>
                  <Badge variant="outline" className="text-xs">
                    STEP {index + 1}
                  </Badge>
                  <h3 className="font-semibold">{step.title}</h3>
                  <p className="text-muted-foreground text-sm">
                    {step.description}
                  </p>
                  {index < steps.length - 1 && (
                    <ArrowRight className="text-muted-foreground absolute top-5 -right-3 hidden size-5 sm:block" />
                  )}
                </div>
              ))}
            </div>
          </Container>
        </section>

        <Separator />

        {/* 하단 CTA 섹션 */}
        <section className="py-16 sm:py-24">
          <Container size="sm">
            <Card className="items-center gap-4 px-6 py-10 text-center">
              <div className="bg-primary/10 text-primary flex size-12 items-center justify-center rounded-full">
                <Copy className="size-6" />
              </div>
              <h2 className="text-xl font-bold sm:text-2xl">
                지금 바로 견적서 링크를 만들어보세요
              </h2>
              <p className="text-muted-foreground max-w-md text-sm">
                회원가입 후 노션을 연동하면 몇 분 안에 첫 견적서 링크를 발급할
                수 있습니다.
              </p>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Button size="lg" asChild>
                  <Link href="/signup">
                    무료로 시작하기
                    <ArrowRight className="size-4" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/login">이미 계정이 있어요</Link>
                </Button>
              </div>
            </Card>
          </Container>
        </section>
      </main>

      {/* 푸터 */}
      <footer className="border-t py-8">
        <Container>
          <p className="text-muted-foreground text-center text-xs">
            © 2026 Notion 견적서 뷰어. All rights reserved.
          </p>
        </Container>
      </footer>
    </div>
  )
}
