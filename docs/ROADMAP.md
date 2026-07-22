# 노션 기반 견적서 관리 시스템 개발 로드맵

노션(Notion)을 데이터베이스로 활용해 견적서를 관리하고, 클라이언트가 웹에서 조회 및 PDF로 다운로드할 수 있는 견적서 관리 시스템 MVP.

## 개요

**invoice_ex_2**는 견적서를 발행하는 프리랜서/소규모 기업과 그 견적서를 받는 클라이언트를 위한 노션 기반 견적서 조회/다운로드 서비스로, 다음 기능을 제공합니다:

- **노션 데이터베이스 연동 (F001)**: Notion API를 통해 견적서 데이터를 실시간으로 조회합니다.
- **견적서 웹 조회 (F002)**: 고유 URL(`/invoice/[notionPageId]`)로 특정 견적서 내용을 화면에 표시합니다.
- **PDF 다운로드 (F003)**: 견적서를 PDF 파일로 변환하여 저장/인쇄할 수 있게 합니다.

부가적으로 견적서 URL 생성(F010), 유효성 검증 및 404 처리(F011), 반응형 레이아웃(F012)을 MVP 필수 지원 기능으로 제공합니다.

## 개발 워크플로우

1. **작업 계획**
   - 기존 코드베이스를 학습하고 현재 상태를 파악
   - 새로운 작업을 포함하도록 `ROADMAP.md` 업데이트
   - 우선순위 작업은 마지막 완료된 작업 다음에 삽입

2. **작업 생성**
   - 기존 코드베이스를 학습하고 현재 상태를 파악
   - `/tasks` 디렉토리에 새 작업 파일 생성
   - 명명 형식: `XXX-description.md` (예: `001-setup.md`)
   - 고수준 명세서, 관련 파일, 수락 기준, 구현 단계 포함
   - **API/비즈니스 로직 작업 시 "## 테스트 체크리스트" 섹션 필수 포함 (Playwright MCP 테스트 시나리오 작성)**
   - 예시를 위해 `/tasks` 디렉토리의 마지막 완료된 작업 참조. 예를 들어, 현재 작업이 `012`라면 `011`과 `010`을 예시로 참조.
   - 이러한 예시들은 완료된 작업이므로 내용이 완료된 작업의 최종 상태를 반영함 (체크된 박스와 변경 사항 요약). 새 작업의 경우, 문서에는 빈 박스와 변경 사항 요약이 없어야 함. 초기 상태의 샘플로 `000-sample.md` 참조.

3. **작업 구현**
   - 작업 파일의 명세서를 따름
   - 기능과 기능성 구현
   - **API 연동 및 비즈니스 로직 구현 시 Playwright MCP로 테스트 수행 필수 (예외 없음)**
   - 각 단계 후 작업 파일 내 단계 진행 상황 업데이트
   - 구현 완료 후 Playwright MCP를 사용한 E2E 테스트 실행 (정상/실패/엣지 케이스 포함)
   - **테스트를 건너뛰고 다음 단계로 진행 금지** — 테스트 통과 확인 후에만 다음 단계로 진행
   - 테스트 실패 시 원인을 수정하고 재테스트한 뒤에만 완료로 표시
   - 각 단계 완료 후 중단하고 추가 지시를 기다림 (한 번에 여러 단계를 이어서 진행하지 않음)

4. **로드맵 업데이트**
   - 로드맵에서 완료된 작업을 ✅로 표시

## 기술 스택

- **Framework**: Next.js 15.5.3 (App Router + Turbopack)
- **Runtime**: React 19.1.0 + TypeScript 5
- **Styling**: TailwindCSS v4 + shadcn/ui (new-york style)
- **Data Source**: Notion API (`@notionhq/client`)
- **PDF**: `@react-pdf/renderer` (우선 검토) 또는 Puppeteer(서버사이드 HTML→PDF)
- **Deploy**: Vercel
- **환경 변수**: `NOTION_API_KEY`, `NOTION_DATABASE_ID`

---

## 개발 단계

### Phase 1: 애플리케이션 골격 구축 ✅ (완료: 2026-07-21)

- **Task 001: 프로젝트 구조 및 라우팅 설정** ✅ - 완료
  - See: `/tasks/001-project-structure-routing.md`
  - ✅ Next.js App Router 기반 견적서 조회 라우트(`/invoice/[notionPageId]`) 골격 생성
  - ✅ 견적서 조회 페이지, `loading.tsx`, `error.tsx`, `not-found.tsx` 빈 껍데기 파일 생성
  - ✅ 루트 랜딩 페이지(`/`)를 견적서 시스템 안내용으로 정리 (스타터 잔재 제거 확인)
  - ✅ 견적서 조회용 최소 레이아웃(헤더/푸터 골격, 인증 없는 공개 접근) 구성

- **Task 002: 타입 정의 및 데이터 스키마 설계** ✅ - 완료
  - See: `/tasks/002-type-definitions-schema.md`
  - ✅ 견적서(Invoice) 및 견적 항목(InvoiceItem) TypeScript 인터페이스 정의 (`src/types/invoice.ts`)
  - ✅ Notion 속성 → 도메인 모델 매핑 타입 정의 (Notion property 타입 대응)
  - ✅ Notion 데이터베이스 스키마 문서화 (Invoices, Items 필드/관계 정의, 구현 제외)
  - ✅ PDF 생성 요청/응답 페이로드 타입 정의
  - ✅ `.env.example` 기준 환경 변수 타입(`src/lib/env.ts`) 검증 스키마 확장

### Phase 2: UI/UX 완성 (더미 데이터 활용) ✅ (완료: 2026-07-22)

- **Task 003: 견적서 뷰어 컴포넌트 라이브러리 구현** ✅ - 완료
  - See: `/tasks/003-invoice-viewer-components.md`
  - ✅ shadcn/ui 기반 견적서 표시용 공통 컴포넌트 구현 (Card, Table, Badge, Separator 등)
  - ✅ 견적서 헤더(발행자/클라이언트 정보), 항목 테이블, 합계 요약, 상태 배지 컴포넌트 작성
  - ✅ 더미 견적서 데이터 생성 유틸리티 작성 (`src/lib/mock/invoice.ts`)
  - ✅ 금액/날짜 포맷 유틸리티(통화, 로케일) 작성 (`src/lib/format.ts`)

- **Task 004: 견적서 조회 페이지 UI 완성 및 404 페이지** ✅ - 완료
  - See: `/tasks/004-invoice-page-ui-notfound.md`
  - ✅ 견적서 조회 페이지 UI 구현 (더미 데이터 렌더링: 발행일, 유효기간, 항목별 금액, 총액)
  - ✅ PDF 다운로드 버튼 UI 및 로딩/비활성 상태 배치 (F003 골격)
  - ✅ 404 에러 페이지 UI 구현 ("견적서를 찾을 수 없습니다" 안내, 발행자 문의 가이드) (F011)
  - ✅ 로딩 스켈레톤(`loading.tsx`) UI 구현
  - ✅ 반응형 디자인 적용 (모바일/태블릿/데스크톱, Playwright MCP로 375/768/1280px 검증) (F012)

### Phase 3: 핵심 기능 구현

- **Task 005: Notion API 연동 및 데이터 조회** - 우선순위
  - `@notionhq/client` 설치 및 Notion 클라이언트 초기화 (`src/lib/notion/client.ts`)
  - 환경 변수(`NOTION_API_KEY`, `NOTION_DATABASE_ID`) 설정 및 검증
  - 견적서 페이지 조회 함수 구현 (`pages.retrieve`, 항목 relation 조회) (F001)
  - Notion 속성 → 도메인 모델 파싱/매핑 레이어 구현
  - Server Component에서 실제 Notion 데이터로 더미 데이터 교체 (F002)
  - Playwright MCP로 실제 견적서 URL 조회 플로우 통합 테스트

- **Task 006: 견적서 유효성 검증 및 에러 처리**
  - 존재하지 않는 `notionPageId` 접근 시 `notFound()` 처리 (F011)
  - Notion API 오류(권한/네트워크/레이트리밋) 핸들링 및 `error.tsx` 연동
  - 잘못된 ID 포맷 방어 로직 및 안전한 에러 메시지 노출
  - Playwright MCP로 404/에러 경로 E2E 테스트 수행

- **Task 007: PDF 다운로드 기능 구현**
  - PDF 라이브러리 선정 및 설치 (`@react-pdf/renderer` 우선, 한글 폰트 임베딩 검토)
  - 견적서 PDF 템플릿 컴포넌트 구현 (웹 뷰어와 시각적 일관성 유지)
  - PDF 생성 API Route 구현 (`app/api/generate-pdf/route.ts`) (F003)
  - 다운로드 버튼 연동 (클릭 시 PDF 생성 및 즉시 다운로드, 재다운로드 지원)
  - Playwright MCP로 PDF 다운로드 플로우 및 파일 생성 검증

- **Task 007-1: 핵심 기능 통합 테스트**
  - Playwright MCP로 전체 사용자 플로우 테스트 (URL 접속 → 조회 → PDF 다운로드)
  - Notion 데이터 연동 및 렌더링 정확성 검증 (항목/금액/합계 일치)
  - 에러 핸들링 및 엣지 케이스 테스트 (빈 항목, 만료 견적서, 잘못된 ID, API 실패)
  - 반응형/모바일 디바이스 뷰포트 검증 (F012)
  - MVP 성공 기준 5개 항목 최종 검증

- **Task 008: 배포 및 환경 구성**
  - Vercel 배포 설정 및 환경 변수(`NOTION_API_KEY`, `NOTION_DATABASE_ID`) 구성
  - 프로덕션 빌드 검증 (`npm run build`, `npm run check-all`)
  - 고유 URL(`https://yourdomain.com/invoice/[notionPageId]`) 접근 최종 확인
  - 캐싱/재검증(revalidate) 전략 및 기본 SEO/메타데이터 구성
  - Playwright MCP로 배포된 프로덕션 URL 대상 회귀 테스트(regression test) 수행 후 배포 확정

---

## Phase 4 이후: MVP 이후 로드맵 (PRD 향후 개선 방향)

> 아래 항목은 MVP 범위에서 **제외**되며, 사용자 피드백 기반으로 후속 진행합니다.

### Phase 5: 관리 기능

- **Task 009: 관리자 대시보드**
  - 발행한 견적서 목록 조회 화면
  - 견적서 검색 및 필터링
- **Task 010: 견적서 상태 관리**
  - 승인/거절/대기 상태 추적 및 표시

### Phase 6: 자동화

- **Task 011: 이메일 자동 발송**
  - SendGrid/Resend 연동 견적서 링크 발송
- **Task 012: 알림 및 트래킹**
  - 견적서 만료 알림, 클라이언트 응답(열람/응답) 트래킹

### Phase 7: 고급 기능

- **Task 013: 템플릿 및 다국어**
  - 다중 견적서 템플릿 지원, 다국어 견적서
- **Task 014: 전자 서명 및 버전 관리**
  - 전자 서명 기능, 견적서 버전 관리 및 히스토리

---

## MVP 성공 기준 (완료 판정)

1. 노션 데이터베이스에서 견적서 정보를 정상적으로 가져옴 (F001)
2. 고유 URL로 접근 시 견적서가 웹에서 정확하게 표시됨 (F002)
3. PDF 다운로드 버튼 클릭 시 견적서가 PDF로 다운로드됨 (F003)
4. 모바일/태블릿/데스크톱에서 정상 작동 (F012)
5. 잘못된 URL 접근 시 적절한 에러 메시지 표시 (F011)
