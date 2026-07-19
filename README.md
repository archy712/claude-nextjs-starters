# Notion 견적서 뷰어 MVP

사업자가 노션(Notion)에 입력한 견적서를, 클라이언트가 별도 가입 없이 고유 링크로 웹에서 확인하고 PDF로 다운로드할 수 있게 하는 서비스입니다.

## 🎯 프로젝트 개요

- **목적**: 노션이 원본 소스인 견적서 데이터를 앱과 동기화하고, 클라이언트에게는 로그인 없이 고유 링크로 열람·PDF 다운로드 경험을 제공합니다.
- **사용자**: 노션으로 견적서를 작성·관리하는 1인/소규모 사업자(관리자)와, 사업자로부터 견적서 링크를 전달받는 고객(클라이언트).

## 📱 주요 페이지

1. **로그인 (`/login`)** - 관리자 인증 전용 페이지
2. **회원가입 (`/signup`)** - 관리자 계정 최초 생성 전용 페이지 (최초 1회만 사용)
3. **홈 (`/`)** - 인증 상태에 따라 로그인 페이지 또는 대시보드로 자동 리디렉션
4. **대시보드 (`/dashboard`)** - 노션 동기화, 견적서 목록 조회, 링크 복사 (로그인 필요)
5. **견적서 상세 (`/quote/[slug]`)** - 고유 링크로 접근하는 클라이언트용 견적서 조회 + PDF 다운로드 (로그인 불필요)

## ⚡ 핵심 기능

- **노션 데이터 동기화**: Notion API로 노션 데이터베이스의 견적서 항목을 가져와 앱 DB에 저장/갱신
- **견적서 목록 조회**: 동기화된 견적서를 목록으로 표시
- **견적서 상세 조회**: 클라이언트가 고유 링크로 로그인 없이 견적서 내용 확인
- **PDF 다운로드**: 견적서 내용을 PDF 파일로 즉시 다운로드
- **고유 링크 발급/복사**: 견적서마다 추측 불가능한 고유 토큰 기반 링크 발급 및 복사
- **기본 인증**: 관리자 회원가입/로그인/로그아웃

## 🛠️ 기술 스택

- **Framework**: Next.js 15.5.3 (App Router + Turbopack)
- **Runtime**: React 19.1.0 + TypeScript 5
- **Styling**: TailwindCSS v4 + shadcn/ui (new-york style)
- **Forms**: React Hook Form + Zod + Server Actions
- **외부 연동**: @notionhq/client (Notion API), @react-pdf/renderer (PDF 생성)
- **백엔드**: Supabase (인증 + PostgreSQL)
- **배포**: Vercel

## 🚀 시작하기

```bash
# 의존성 설치
npm install

# 개발 서버 실행 (Turbopack)
npm run dev

# 프로덕션 빌드
npm run build

# 코드 품질 검사 (타입체크 + lint + format)
npm run check-all
```

개발 서버 실행 후 [http://localhost:3000](http://localhost:3000) 에서 확인할 수 있습니다.

## 📋 개발 상태

- ✅ 기본 프로젝트 구조 설정 (스타터킷 초기화 완료)
- ✅ 로그인/회원가입 UI, 라우트 스캐폴딩(`/`, `/dashboard`, `/quote/[slug]`)
- 🔄 Notion 연동, Supabase 인증/DB 연동
- ⏳ 견적서 동기화, 목록 조회, 링크 발급/복사, PDF 다운로드

## 📖 문서

- [PRD 문서](./docs/PRD.md) - 상세 요구사항
- [개발 가이드](./CLAUDE.md) - 개발 지침
