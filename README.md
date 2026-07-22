# 노션 기반 견적서 관리 시스템 (invoice_ex_2)

노션(Notion)을 데이터베이스로 활용하여 견적서를 관리하고, 클라이언트가 별도 로그인 없이 웹에서 견적서를 조회하고 PDF로 다운로드할 수 있는 MVP 서비스입니다.

## 🎯 프로젝트 개요

**목적**: 노션을 데이터베이스로 활용하여 견적서를 관리하고, 클라이언트가 웹에서 조회 및 PDF 다운로드할 수 있는 시스템
**범위**: 견적서 조회 및 PDF 다운로드 (관리자 대시보드, 로그인/인증, 견적서 상태 관리 등은 MVP 범위 제외)
**사용자**: 견적서를 발행하는 프리랜서/소규모 기업과 견적서를 받는 클라이언트

## 📱 주요 페이지

1. **견적서 조회 페이지** (`/invoice/[notionPageId]`) - 노션 API로 견적서 데이터를 조회해 렌더링하고, PDF 다운로드 버튼을 제공하는 공개 페이지 (로그인 불필요)
2. **404 에러 페이지** - 존재하지 않거나 잘못된 견적서 ID로 접근 시 안내 메시지를 표시

## ⚡ 핵심 기능

- **노션 데이터베이스 연동**: Notion API를 통해 견적서 데이터 실시간 조회
- **견적서 조회**: 고유 URL로 특정 견적서(발행일, 유효기간, 항목별 금액, 총액 등) 표시
- **PDF 다운로드**: 조회한 견적서를 PDF 파일로 즉시 생성 및 다운로드
- **견적서 유효성 검증**: 존재하지 않는 견적서 접근 시 404 에러 처리
- **반응형 레이아웃**: 모바일/태블릿/데스크톱 대응

## 🛠️ 기술 스택

- **Framework**: Next.js 15.5.3 (App Router + Turbopack)
- **Runtime**: React 19.1.0 + TypeScript 5
- **Styling**: TailwindCSS v4 + shadcn/ui (new-york style)
- **UI Components**: Radix UI + Lucide Icons
- **외부 API**: `@notionhq/client` (Notion API) — 예정
- **PDF 생성**: `@react-pdf/renderer` 또는 Puppeteer — 예정
- **배포**: Vercel

## 🚀 시작하기

```bash
# 의존성 설치
npm install

# 환경 변수 설정 (.env.example 참고)
cp .env.example .env.local

# 개발 서버 실행
npm run dev

# 빌드
npm run build
```

개발 서버 실행 후 [http://localhost:3000](http://localhost:3000)에서 확인할 수 있습니다.

### 환경 변수

Notion 연동을 위해 다음 환경 변수가 필요합니다 (`.env.example` 참고).

```env
NOTION_API_KEY=secret_xxxxxxxxxxxxx
NOTION_DATABASE_ID=xxxxxxxxxxxxx
```

## 📋 개발 상태

- ✅ 기본 프로젝트 구조 설정 (스타터킷 정리 완료)
- ⏳ Notion API 연동 (`@notionhq/client`)
- ⏳ 견적서 조회 페이지 (`/invoice/[notionPageId]`)
- ⏳ PDF 다운로드 기능
- ⏳ 404 에러 페이지

## 📖 문서

- [PRD 문서](./docs/PRD.md) - 상세 요구사항
- [개발 가이드](./CLAUDE.md) - 개발 지침
- [프로젝트 구조 가이드](./docs/guides/project-structure.md)
- [스타일링 가이드](./docs/guides/styling-guide.md)
- [컴포넌트 패턴 가이드](./docs/guides/component-patterns.md)
- [Next.js 15.5.3 가이드](./docs/guides/nextjs-15.md)
