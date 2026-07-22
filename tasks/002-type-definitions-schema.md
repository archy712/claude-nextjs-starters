# Task 002: 타입 정의 및 데이터 스키마 설계

## 고수준 명세서

`docs/ROADMAP.md` Phase 1의 두 번째 작업. 견적서(Invoice)/견적 항목(InvoiceItem) 도메인 타입, Notion 속성 매핑 타입, PDF 생성 요청/응답 타입을 정의하고, `src/lib/env.ts`의 환경 변수 검증 스키마에 `NOTION_API_KEY`/`NOTION_DATABASE_ID`를 추가한다. 실제 Notion 클라이언트 코드나 PDF 생성 로직은 이번 작업 범위 밖(Task 005/007).

## 관련 파일

- `src/types/invoice.ts` (생성) — `Invoice`, `InvoiceItem`, `InvoiceStatus`, `NotionInvoiceProperties`, `MapNotionPageToInvoice`
- `src/types/pdf.ts` (생성) — `GeneratePdfRequest`, `GeneratePdfResponse`
- `src/lib/env.ts` (수정) — `NOTION_API_KEY`/`NOTION_DATABASE_ID` optional 검증 추가
- `.env.example` (참조) — 이미 두 변수 존재, 스키마와 동기화 확인
- `docs/PRD.md` (참조) — Notion 데이터 모델 필드 정의 근거
- `docs/ROADMAP.md` (수정) — Task 002 완료 표시

## 수락 기준

- `Invoice`/`InvoiceItem` 타입이 `docs/PRD.md` 데이터 모델 표의 필드를 빠짐없이 반영한다.
- `src/lib/env.ts`가 `NOTION_API_KEY`/`NOTION_DATABASE_ID` 미설정 상태에서도 `env.parse()`를 통과한다(optional).
- `npm run check-all`이 통과한다(경고 없이).
- `@notionhq/client` 등 미설치 SDK 타입에 의존하지 않는다.

## 구현 단계

- [x] `src/types/invoice.ts` 생성 (`InvoiceStatus`, `InvoiceItem`, `Invoice`, `NotionInvoiceProperties`, `MapNotionPageToInvoice` 타입)
- [x] `src/types/pdf.ts` 생성 (`GeneratePdfRequest`, `GeneratePdfResponse`)
- [x] `src/lib/env.ts`에 `NOTION_API_KEY`/`NOTION_DATABASE_ID` optional 필드 추가 및 `parse()` 호출부 동기화
- [x] `npm run check-all` 통과 확인
- [x] `docs/ROADMAP.md`의 Task 002 항목 완료 표시(✅)

## 테스트 체크리스트

> 타입 정의 작업으로 API/비즈니스 로직이 없어 Playwright MCP 필수 대상은 아니다. 타입 체크와 런타임 파싱 확인으로 대체한다.

- [x] `npm run typecheck` 통과
- [x] `npm run lint` 경고 0건 확인 (최초 stub 함수 구현에서 `no-unused-vars` 경고 3건 발생 → 타입 시그니처로 전환해 해결)
- [x] `NOTION_API_KEY`/`NOTION_DATABASE_ID` 미설정 상태(`.env.local` 없음)에서 `npm run dev` 정상 기동 확인 (env.parse 실패로 크래시하지 않음)

## 변경 사항 요약

- `src/types/invoice.ts`, `src/types/pdf.ts`를 신규 생성해 견적서/PDF 도메인 타입을 정의했다.
- `mapNotionPageToInvoice`는 실제 함수 스텁 대신 `MapNotionPageToInvoice` 타입 시그니처로 정의해 미사용 매개변수 lint 경고를 없앴다(Task 005에서 이 시그니처를 구현체로 채운다).
- `src/lib/env.ts`의 `envSchema`에 `NOTION_API_KEY`/`NOTION_DATABASE_ID`를 optional로 추가했다. Notion 클라이언트가 아직 없어 필수로 지정하면 `.env.local` 미설정 시 로컬 개발 서버가 즉시 크래시하므로, Task 005(Notion 연동)에서 필수로 전환할 예정임을 주석으로 남겼다.
- `npm run check-all`(typecheck/lint/format:check)이 경고 없이 통과했다.
