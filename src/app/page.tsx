import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import {
  Database,
  FileText,
  Download,
  ShieldCheck,
  Smartphone,
  Link2,
  MailCheck,
  MousePointerClick,
} from 'lucide-react'

const features = [
  {
    icon: Database,
    title: '노션 데이터베이스 연동',
    description:
      'Notion API를 통해 견적서 데이터를 실시간으로 조회합니다. 별도의 관리자 페이지 없이 노션을 데이터베이스로 사용해요.',
  },
  {
    icon: FileText,
    title: '견적서 조회',
    description:
      '고유 URL로 접속하면 발행일, 유효기간, 항목별 금액, 총액 등 견적서 내용을 한눈에 확인할 수 있습니다.',
  },
  {
    icon: Download,
    title: 'PDF 다운로드',
    description:
      '버튼 클릭 한 번으로 견적서를 PDF로 즉시 생성하고 다운로드하여 저장하거나 인쇄할 수 있습니다.',
  },
  {
    icon: ShieldCheck,
    title: '견적서 유효성 검증',
    description:
      '존재하지 않는 견적서 ID로 접근하면 안내 메시지와 함께 404 에러 페이지를 표시합니다.',
  },
  {
    icon: Smartphone,
    title: '반응형 레이아웃',
    description:
      '모바일, 태블릿, 데스크톱 등 모든 디바이스에서 최적화된 화면을 제공합니다.',
  },
]

const journeySteps = [
  {
    icon: MailCheck,
    title: '링크 수신',
    description: '이메일이나 메신저로 고유 견적서 링크를 받습니다.',
  },
  {
    icon: MousePointerClick,
    title: '견적서 조회',
    description:
      '링크에 접속해 회사 정보, 항목, 금액 등 견적서 내용을 확인합니다.',
  },
  {
    icon: Download,
    title: 'PDF 다운로드',
    description: '다운로드 버튼을 눌러 PDF 파일로 저장하거나 인쇄합니다.',
  },
]

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <section className="flex flex-col items-center gap-4 px-4 pt-24 pb-16 text-center">
        <Badge variant="secondary" className="gap-1.5">
          <Link2 className="size-3.5" />
          노션 기반 견적서 관리 시스템
        </Badge>
        <h1 className="max-w-2xl text-3xl font-semibold tracking-tight sm:text-4xl">
          견적서 조회 시스템
        </h1>
        <p className="text-muted-foreground max-w-xl text-sm sm:text-base">
          노션을 데이터베이스로 활용해 견적서를 관리하고, 클라이언트가 웹에서
          조회하고 PDF로 다운로드할 수 있는 시스템입니다.
        </p>
        <p className="text-muted-foreground mt-2 text-xs">
          전달받은 견적서 링크(예:{' '}
          <code className="bg-muted rounded px-1.5 py-0.5">
            /invoice/[견적서ID]
          </code>
          )를 통해 접속해 주세요.
        </p>
      </section>

      <Separator className="mx-auto max-w-5xl" />

      <section className="mx-auto w-full max-w-5xl px-4 py-16">
        <div className="mb-10 text-center">
          <h2 className="text-xl font-semibold sm:text-2xl">
            클라이언트 이용 흐름
          </h2>
          <p className="text-muted-foreground mt-2 text-sm">
            별도의 로그인 없이 링크만으로 견적서를 확인할 수 있어요.
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-3">
          {journeySteps.map((step, index) => (
            <Card key={step.title} className="relative">
              <CardHeader>
                <div className="bg-primary/10 text-primary flex size-10 items-center justify-center rounded-full">
                  <step.icon className="size-5" />
                </div>
                <CardTitle className="mt-2">
                  {index + 1}. {step.title}
                </CardTitle>
                <CardDescription>{step.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>

      <Separator className="mx-auto max-w-5xl" />

      <section className="mx-auto w-full max-w-5xl px-4 py-16">
        <div className="mb-10 text-center">
          <h2 className="text-xl font-semibold sm:text-2xl">핵심 기능</h2>
          <p className="text-muted-foreground mt-2 text-sm">
            MVP에 포함된 견적서 조회 페이지의 주요 기능입니다.
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map(feature => (
            <Card key={feature.title}>
              <CardHeader>
                <div className="bg-primary/10 text-primary flex size-10 items-center justify-center rounded-full">
                  <feature.icon className="size-5" />
                </div>
                <CardTitle className="mt-2">{feature.title}</CardTitle>
                <CardDescription>{feature.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>

      <footer className="text-muted-foreground border-t px-4 py-8 text-center text-xs">
        견적서 발행자이신가요? 노션 데이터베이스에서 견적서를 작성하면 고유
        링크가 자동으로 생성됩니다.
      </footer>
    </div>
  )
}
