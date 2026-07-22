# Task 001: 프로젝트 구조 및 라우팅 설정

## 고수준 명세서

`docs/ROADMAP.md` Phase 1의 첫 번째 작업. 실제 노션 연동이나 PDF 생성 로직 없이, 견적서 조회 라우트(`/invoice/[notionPageId]`)의 App Router 골격과 루트 404 페이지를 구성한다. 인증 없는 공개 접근을 전제로 하며, 별도의 전역 헤더/푸터/내비게이션 컴포넌트는 만들지 않는다.

## 관련 파일

- `src/app/invoice/[notionPageId]/page.tsx` (생성) — 견적서 조회 페이지 골격
- `src/app/invoice/[notionPageId]/loading.tsx` (생성) — 로딩 스켈레톤
- `src/app/invoice/[notionPageId]/error.tsx` (생성) — 에러 UI
- `src/app/not-found.tsx` (생성) — 루트 404 페이지
- `src/app/page.tsx` (참조) — 스타터 잔재 재확인용
- `src/components/ui/skeleton.tsx`, `src/components/layout/container.tsx` (재사용)
- `docs/ROADMAP.md` (수정) — Task 001 완료 표시

## 수락 기준

- `/invoice/[notionPageId]` 경로 접속 시 견적서 ID를 포함한 placeholder 화면이 렌더된다.
- 라우트 로딩 중 스켈레톤 UI가, 에러 발생 시 에러 UI(재시도 버튼 포함)가 표시된다.
- 존재하지 않는 임의 경로 접속 시 루트 `not-found.tsx`가 표시된다.
- 로그인/회원가입/전역 헤더·푸터·내비게이션 컴포넌트가 새로 생성되지 않는다.
- `npm run check-all`이 통과한다.

## 구현 단계

- [x] `src/app/invoice/[notionPageId]/page.tsx` 생성 (async Server Component, `params`는 `Promise`로 받아 `await` 처리)
- [x] `src/app/invoice/[notionPageId]/loading.tsx` 생성 (`Skeleton` 재사용)
- [x] `src/app/invoice/[notionPageId]/error.tsx` 생성 (`'use client'`, `error`/`reset` props)
- [x] `src/app/not-found.tsx` 생성
- [x] `src/app/page.tsx` 스타터 잔재 재확인 (기존에 이미 정리되어 있어 변경 없이 유지)
- [x] `npm run check-all` 통과 확인
- [x] `docs/ROADMAP.md`의 Task 001 항목 완료 표시(✅)

## 테스트 체크리스트

> 순수 라우팅 골격 작업으로 API/비즈니스 로직이 없어 Playwright MCP 필수 대상은 아니나, 수동 확인 체크리스트를 남긴다.

- [x] `npm run dev` 후 `/invoice/test-id` 접속 → placeholder 렌더 확인 (HTTP 200, 견적서 ID 표시)
- [x] 존재하지 않는 임의 경로(`/nonexistent`) 접속 → `not-found.tsx` 표시 확인 (HTTP 404, 안내 문구 표시)
- [x] `git diff`로 신규 전역 컴포넌트(로그인/회원가입/헤더/푸터/내비게이션) 미생성 확인
- [ ] `page.tsx`에서 임시로 에러를 throw하여 `error.tsx` 표시 확인 (수동 브라우저 확인 필요 — 자동화된 curl 테스트로는 검증 불가, 후속 작업에서 Playwright MCP로 커버 예정)

## 변경 사항 요약

- `src/app/invoice/[notionPageId]/page.tsx`, `loading.tsx`, `error.tsx`, 루트 `src/app/not-found.tsx`를 신규 생성해 견적서 조회 라우트 골격을 구성했다.
- 기존 `Container`, `Skeleton`, `Button` 컴포넌트를 재사용했고 새로운 전역 헤더/푸터/내비게이션 컴포넌트는 만들지 않았다.
- `npm run check-all` 통과, dev 서버로 `/invoice/test-id`(200) 및 `/nonexistent`(404) 렌더링을 확인했다.
- 실제 노션 연동 및 PDF 생성 로직은 포함하지 않았다(Task 005/007 범위).
