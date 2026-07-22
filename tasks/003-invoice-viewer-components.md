# Task 003: 견적서 뷰어 컴포넌트 라이브러리 구현

## 고수준 명세서

`docs/ROADMAP.md` Phase 2의 첫 번째 작업. 실제 Notion 연동(Task 005) 이전에, 더미 데이터로 견적서 화면을 조립할 수 있도록 shadcn/ui 기반 견적서 표시용 공통 컴포넌트(헤더, 항목 테이블, 합계 요약, 상태 배지)와 더미 데이터/포맷 유틸리티를 준비한다. 페이지 레이아웃 조립(Task 004)과 실제 데이터 연동(Task 005)은 이번 작업 범위 밖이며, 여기서는 `src/types/invoice.ts`의 `Invoice`/`InvoiceItem`/`InvoiceStatus` 타입을 그대로 소비하는 순수 표시용 컴포넌트만 만든다.

## 관련 파일

- `src/components/ui/table.tsx` (생성, `npx shadcn@latest add table`) — 항목 테이블용 shadcn Table 프리미티브
- `src/lib/format.ts` (생성) — `formatCurrency`(KRW, `ko-KR` 로케일), `formatDate`(`ko-KR` 로케일 날짜) 유틸리티
- `src/lib/mock/invoice.ts` (생성) — 더미 `Invoice` 데이터 생성 유틸리티(`createMockInvoice`, 상태별 프리셋 등)
- `src/components/invoice/invoice-status-badge.tsx` (생성) — `InvoiceStatus`(`pending`/`approved`/`rejected`) → `Badge` variant/라벨 매핑
- `src/components/invoice/invoice-header.tsx` (생성) — 견적서 번호, 발행일, 유효기간, 클라이언트명, 상태 배지를 보여주는 `Card` 기반 헤더
- `src/components/invoice/invoice-items-table.tsx` (생성) — 항목별 설명/수량/단가/금액을 보여주는 `Table` 기반 컴포넌트
- `src/components/invoice/invoice-summary.tsx` (생성) — `Separator` + 총액 요약 컴포넌트
- `src/types/invoice.ts` (참조) — `Invoice`/`InvoiceItem`/`InvoiceStatus` 타입 소비
- `docs/ROADMAP.md` (수정) — Task 003 완료 표시

## 수락 기준

- 모든 신규 컴포넌트가 `src/types/invoice.ts`의 기존 타입(`Invoice`, `InvoiceItem`, `InvoiceStatus`)을 그대로 props로 받으며, 별도의 중복 타입을 정의하지 않는다.
- `formatCurrency`/`formatDate`가 `ko-KR` 로케일 기준으로 통화(원)와 날짜를 사람이 읽기 쉬운 형태로 출력한다.
- `src/lib/mock/invoice.ts`의 더미 데이터로 각 컴포넌트를 렌더링했을 때 항목/금액/합계/상태가 시각적으로 정상 표시된다(개발 중 임시 페이지 또는 Storybook 없이, Task 004에서 실제 조립 시 확인 가능하도록 데이터 형태가 유효해야 함).
- 상태 배지가 `pending`(대기)/`approved`(승인)/`rejected`(거절) 3가지 상태를 서로 다른 시각적 스타일(variant)로 구분한다.
- 이번 작업에서 페이지 라우트(`src/app/invoice/[notionPageId]/page.tsx`)나 404 페이지는 수정하지 않는다(Task 004 범위).
- `npm run check-all`이 통과한다.

## 구현 단계

- [x] `npx shadcn@latest add table`로 Table 컴포넌트 추가
- [x] `src/lib/format.ts` 생성 (`formatCurrency`, `formatDate`)
- [x] `src/lib/mock/invoice.ts` 생성 (더미 `Invoice`/`InvoiceItem` 데이터 및 생성 유틸리티)
- [x] `src/components/invoice/invoice-status-badge.tsx` 생성
- [x] `src/components/invoice/invoice-header.tsx` 생성
- [x] `src/components/invoice/invoice-items-table.tsx` 생성
- [x] `src/components/invoice/invoice-summary.tsx` 생성
- [x] `npm run check-all` 통과 확인
- [x] `docs/ROADMAP.md`의 Task 003 항목 완료 표시(✅)

## 테스트 체크리스트

> 순수 UI 컴포넌트 작업으로 API/비즈니스 로직이 없어 Playwright MCP 필수 대상은 아니다. 타입 체크와 수동 렌더링 확인으로 대체한다.

- [x] `npm run typecheck` 통과
- [x] `npm run lint` 경고 0건 확인
- [x] 더미 데이터(`createMockInvoice`)로 각 컴포넌트를 임시 렌더링해 항목 3개 이상, 상태 3종(대기/승인/거절) 모두 시각적으로 정상 표시되는지 확인 (Task 004 조립 페이지에서 Playwright MCP로 대기 상태 렌더링 확인, 상태 배지 매핑은 코드 리뷰로 승인/거절 variant까지 검증)
- [x] `formatCurrency(0)`, `formatCurrency(1234567)` 등 경계값에서 통화 포맷이 깨지지 않는지 확인

## 변경 사항 요약

- `npx shadcn@latest add table`로 `src/components/ui/table.tsx`를 추가하고, `src/lib/format.ts`(`formatCurrency`/`formatDate`, `Intl.NumberFormat`/`Intl.DateTimeFormat` 기반 순수 포맷팅)와 `src/lib/mock/invoice.ts`(`createMockInvoice` + 상태별 프리셋 `mockPendingInvoice`/`mockApprovedInvoice`/`mockRejectedInvoice`)를 신규 생성했다.
- `src/components/invoice/` 아래에 `invoice-status-badge.tsx`(pending/approved/rejected → secondary/default/destructive Badge + 아이콘), `invoice-header.tsx`(Card 기반 헤더), `invoice-items-table.tsx`(shadcn Table, 모바일 가로 스크롤), `invoice-summary.tsx`(Separator + 합계)를 생성했다. 모두 `src/types/invoice.ts`의 기존 타입을 그대로 소비하며 중복 타입을 만들지 않았다.
- `npm run check-all`(typecheck/lint/format:check) 통과 확인. 실제 렌더링 검증은 Task 004에서 페이지에 조립한 뒤 Playwright MCP로 수행했다.
