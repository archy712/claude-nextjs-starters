# Task 004: 견적서 조회 페이지 UI 완성 및 404 페이지

## 고수준 명세서

`docs/ROADMAP.md` Phase 2의 두 번째 작업. Task 003에서 만든 견적서 뷰어 컴포넌트(헤더, 항목 테이블, 합계 요약, 상태 배지)와 더미 데이터 유틸리티를 실제 라우트(`src/app/invoice/[notionPageId]/page.tsx`)에 조립하고, 로딩 스켈레톤과 404 안내 페이지를 완성한다. 실제 Notion API 연동은 이번 작업 범위 밖이며(Task 005), `src/lib/mock/invoice.ts`의 더미 데이터로 렌더링한다.

## 관련 파일

- `src/app/invoice/[notionPageId]/page.tsx` (수정) — 더미 `Invoice` 데이터로 헤더/항목 테이블/합계/PDF 다운로드 버튼 조립
- `src/app/invoice/[notionPageId]/loading.tsx` (수정) — 실제 페이지 구조(헤더/테이블/합계 영역)에 맞춘 스켈레톤으로 교체
- `src/app/not-found.tsx` (수정) — 기존 안내 문구 유지하며 시각적 완성도 보강(아이콘 등, 문구 골격은 Task 001에서 이미 확정)
- `src/components/invoice/invoice-header.tsx`, `invoice-items-table.tsx`, `invoice-summary.tsx`, `invoice-status-badge.tsx` (재사용, Task 003 산출물)
- `src/lib/mock/invoice.ts`, `src/lib/format.ts` (재사용, Task 003 산출물)
- `src/components/invoice/pdf-download-button.tsx` (생성) — PDF 다운로드 버튼 골격(클릭 핸들러 미구현, `disabled`/로딩 상태 UI만, F003 실제 로직은 Task 007)
- `docs/ROADMAP.md` (수정) — Task 004 완료 표시

## 수락 기준

- `/invoice/[notionPageId]` 접속 시 더미 데이터 기준으로 발행일, 유효기간, 클라이언트명, 항목별 금액, 총액, 상태 배지가 모두 화면에 표시된다.
- PDF 다운로드 버튼이 보이며, 클릭해도 아직 실제 PDF가 생성되지 않는다(비활성 또는 로딩 상태 UI만 확인, 실제 생성 로직은 Task 007에서 구현).
- `loading.tsx`가 실제 페이지 레이아웃(헤더 영역/테이블 영역/합계 영역)과 유사한 형태의 스켈레톤을 보여준다(기존 범용 스켈레톤에서 개선).
- 404 페이지가 모바일/데스크톱 뷰포트 모두에서 레이아웃이 깨지지 않는다.
- 페이지가 모바일(375px)/태블릿(768px)/데스크톱(1280px) 뷰포트에서 항목 테이블이 가로 스크롤 또는 반응형 축약 형태로 정상 표시된다(F012).
- 실제 Notion API 호출 코드가 추가되지 않는다(더미 데이터만 사용).
- `npm run check-all`이 통과한다.

## 구현 단계

- [x] `src/components/invoice/pdf-download-button.tsx` 생성 (버튼 UI + 로딩/비활성 상태, 클릭 핸들러는 no-op 또는 콘솔 로그)
- [x] `src/app/invoice/[notionPageId]/page.tsx` 수정 — 더미 `Invoice` 조회(`createMockInvoice` 등) 후 헤더/항목 테이블/합계/PDF 버튼 조립
- [x] `src/app/invoice/[notionPageId]/loading.tsx` 수정 — 실제 페이지 구조에 맞춘 스켈레톤으로 교체
- [x] `src/app/not-found.tsx` 시각적 보강 (아이콘 등, 기존 안내 문구 유지)
- [x] 반응형 레이아웃 적용 및 확인 (모바일/태블릿/데스크톱, F012)
- [x] `npm run check-all` 통과 확인
- [x] `docs/ROADMAP.md`의 Task 004 항목 완료 표시(✅)

## 테스트 체크리스트

> 실제 API 연동이나 비즈니스 로직 없이 더미 데이터를 렌더링하는 UI 작업이라 Playwright MCP 필수 대상은 아니나, 반응형/시각 확인을 위한 체크리스트를 남긴다.

- [x] `npm run typecheck` / `npm run lint` 통과
- [x] `npm run dev` 후 `/invoice/test-id` 접속 → 더미 견적서 헤더/항목/합계/PDF 버튼 정상 렌더 확인 (포트 충돌로 3001에서 확인, Playwright MCP 스크린샷으로 검증)
- [x] 브라우저 뷰포트를 375px(모바일)/768px(태블릿)/1280px(데스크톱)로 각각 조정하여 레이아웃 깨짐 없는지 확인 (F012) — Playwright MCP로 3개 뷰포트 스크린샷 확인, 모바일은 항목 테이블이 의도대로 가로 스크롤됨(`scrollWidth 393 > clientWidth 326` 확인)
- [x] `/nonexistent` 접속 → 보강된 404 페이지 정상 표시 확인 (Playwright MCP로 스크린샷 확인)
- [x] PDF 다운로드 버튼 클릭 시 에러 없이 로딩/비활성 상태만 표시되고 실제 파일 다운로드는 발생하지 않음을 확인(Task 007에서 실제 구현 예정임을 인지) — `onClick={() => {}}` placeholder로 코드 리뷰 확인

## 변경 사항 요약

- `src/components/invoice/pdf-download-button.tsx`를 신규 생성했다(`'use client'`, `isLoading` prop으로 스피너/비활성 상태 전환, 실제 다운로드 로직은 Task 007 TODO로 남김).
- `src/app/invoice/[notionPageId]/page.tsx`를 `createMockInvoice({ id: notionPageId })`로 더미 데이터를 만들어 `InvoiceHeader`/`InvoiceItemsTable`/`InvoiceSummary`/`PdfDownloadButton`을 조립하도록 교체했다. async Server Component와 `params: Promise<...>` 구조는 유지했다.
- `src/app/invoice/[notionPageId]/loading.tsx`를 범용 Skeleton 3개짜리에서 실제 헤더 카드/테이블/합계/버튼 구조를 반영한 스켈레톤으로 교체했다.
- `src/app/not-found.tsx`에 lucide `FileQuestion` 아이콘을 원형 배지로 추가했다(기존 한글 안내 문구는 그대로 유지).
- `src/app/invoice/[notionPageId]/layout.tsx`는 지시대로 수정하지 않았다.
- `npm run check-all`/`npm run build` 통과 확인. Playwright MCP로 데스크톱(1280px)/태블릿(768px)/모바일(375px) 3개 뷰포트와 404 페이지를 스크린샷으로 직접 검증했다. 로컬 포트 3000이 다른 프로젝트(`modern_app_ex_1`)에서 사용 중이어서 이 프로젝트는 포트 3001에서 개발 서버를 띄워 테스트했다.
- 실제 Notion API 연동 코드는 추가하지 않았다(Task 005 범위).
