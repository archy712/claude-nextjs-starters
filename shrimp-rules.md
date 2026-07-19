# Development Guidelines

이 문서는 AI 코딩 에이전트가 **이 저장소(Notion 견적서 뷰어 MVP)** 에서 작업할 때 지켜야 할 프로젝트 전용 규칙이다. Next.js/React/TypeScript 일반 지식은 다루지 않는다.

## 프로젝트 개요

- **제품**: 노션(Notion)에 입력된 견적서를 관리자가 동기화하고, 클라이언트는 고유 링크로 로그인 없이 조회·PDF 다운로드하는 서비스.
- **원본 소스**: `docs/PRD.md`(기능/페이지 명세, 데이터 모델), `docs/ROADMAP.md`(현재 진행 단계, 작업 순서, 완료 여부).
- 두 문서와 실제 코드가 충돌하면 **먼저 `git log`/코드로 최신 상태를 확인**하고, 오래된 서술은 PRD/ROADMAP 쪽을 수정 대상으로 간주한다.

## 작업 시작 전 필수 확인 순서

- 페이지, 컴포넌트, Server Action, 데이터 모델 등 **새 기능을 추가·수정하기 전에 반드시**:
  1. `docs/PRD.md`의 "페이지별 상세 기능" 표에서 해당 기능 ID(F001~F011)와 페이지 역할을 확인한다.
  2. `docs/ROADMAP.md`의 "현재 상태 요약"과 "개발 단계"에서 **현재 어느 Phase/Task까지 완료됐는지** 확인한다.
- ✅ 하라: PRD에 없는 기능 요청을 받으면 PRD의 "MVP 이후 기능(제외)" 목록·"Phase 5" 목록에 있는지 먼저 대조한다.
- ❌ 하지 마라: PRD/ROADMAP에 없는 임의의 기능(예: 클라이언트 회원가입, 전자 서명, 다국어)을 사용자의 명시적 요청 없이 구현하지 않는다 — 이들은 Phase 5(MVP 범위 밖)로 확정되어 있다.

## ROADMAP Phase/Task 순서 강제

- `docs/ROADMAP.md`의 Task는 `001 → 002 → … → 012` 순으로 선행 조건이 있다. **아직 완료 표시(✅)되지 않은 이전 Task를 건너뛰고 이후 Task의 기능을 구현하지 않는다.**
- Task를 완료 처리(✅)하는 것은 **Playwright MCP로 해당 Task의 4개 테스트 카테고리(정상/에러·예외/엣지/회귀)를 모두 통과시킨 뒤에만** 한다. 테스트를 실행하지 않고 ROADMAP의 체크박스를 임의로 ✅로 바꾸지 않는다.
- ROADMAP을 갱신할 때는 `docs:update-roadmap` 스킬을 사용한다.

## 미설치 외부 패키지 — 지정된 Task 전까지 추가 금지

`docs/ROADMAP.md` "현재 상태 요약"에 따라 아래 패키지는 **현재 미설치** 상태이며, 명시된 Task에 도달하기 전까지 `package.json`에 추가하거나 import하지 않는다:

| 패키지                                   | 허용되는 시점                 |
| ---------------------------------------- | ----------------------------- |
| `@supabase/supabase-js`, `@supabase/ssr` | Task 007 (Supabase 연동) 이후 |
| `@notionhq/client`                       | Task 009 (노션 동기화) 이후   |
| `@react-pdf/renderer`                    | Task 011 (PDF 다운로드) 이후  |

- ✅ 하라: 위 패키지가 필요한 요청이 오면, 사용자에게 현재 ROADMAP 상 어느 Task 단계인지 먼저 확인하거나 해당 Task의 작업 범위로 안내한다.
- ❌ 하지 마라: "빠른 프로토타입"을 이유로 위 패키지를 조기 설치하지 않는다.

## 현재 라우트/컴포넌트 구조 (실측 기준)

- 실제 라우트: `src/app/page.tsx`(`/`), `src/app/login/page.tsx`, `src/app/signup/page.tsx`, `src/app/dashboard/page.tsx`, `src/app/quote/[slug]/page.tsx`.
- **스타터 템플릿의 범용 랜딩페이지 컴포넌트는 이미 제거되었다** — `src/components/layout/header.tsx`, `footer.tsx`, `src/components/navigation/*`, `src/components/sections/*`, `public/*.svg`. 이들을 부활시키거나 새 범용 랜딩 섹션을 그 경로에 만들지 않는다. 홈페이지(`src/app/page.tsx`)는 견적서 뷰어 전용 단일 파일 랜딩으로 유지한다(헤더/히어로/기능/CTA/푸터를 인라인 섹션으로 직접 작성하는 현재 패턴을 따른다).
- `src/app/dashboard/page.tsx`, `src/app/quote/[slug]/page.tsx`는 현재 플레이스홀더("준비 중입니다" 문구)다. 이 두 파일을 채울 때는 PRD의 "관리자 대시보드"/"견적서 상세 페이지" 표와 ROADMAP Task 005/006(UI, 더미 데이터)·Task 007/009/010(실 데이터 연동)의 범위를 구분해서 구현한다 — Phase 2(UI+더미)와 Phase 3(실 연동)를 한 번에 섞어 구현하지 않는다.
- 새 파일/폴더 배치, 네이밍(kebab-case 파일명, PascalCase 컴포넌트명), import 순서, 경로 별칭(`@/components`, `@/lib` 등) 규칙은 `docs/guides/project-structure.md`를 그대로 따른다. 이 문서에서 반복 설명하지 않는다.

## 폼 구현 규칙

- `src/components/login-form.tsx`는 현재 `useState` 기반 수동 검증(더미)이다. `docs/ROADMAP.md` Task 004에서 React Hook Form + Zod로 교체 예정이며, 스키마/패턴은 `docs/guides/forms-react-hook-form.md`를 따른다.
- Task 004 이전에 로그인/회원가입 폼의 검증 로직을 변경해야 한다면, 기존 `useState` 패턴을 유지한 채 최소 수정만 하고, RHF+Zod 전환은 Task 004에서 한 번에 수행한다(양쪽 패턴을 부분적으로 섞지 않는다).
- 폼 제출을 실제 백엔드에 연결하는 작업(로그인/회원가입/노션 동기화)은 Server Actions로 구현한다(`docs/guides/forms-react-hook-form.md`의 Server Actions 패턴 참조) — 클라이언트 사이드 `fetch`로 우회하지 않는다.

## 주요 파일 동시 수정 규칙

- `docs/PRD.md`의 "기능 명세" 표(F001~F011) 또는 페이지 구성을 변경하면, `docs/ROADMAP.md`의 "기능 ID 매핑 요약" 표와 해당 Task 설명을 함께 갱신한다.
- `docs/ROADMAP.md`의 "현재 상태 요약"은 실제 코드 상태(설치된 패키지, 완성된 UI, 연동 여부)와 항상 일치시킨다 — Task를 완료할 때마다 이 섹션도 함께 갱신한다.
- `README.md`의 "주요 페이지"/"핵심 기능"/기술 스택 섹션은 `docs/PRD.md`와 내용을 일치시킨다. 한쪽만 수정하고 다른 쪽을 방치하지 않는다.
- `CLAUDE.md`에 나열된 `docs/guides/*.md` 참조 목록에 새 가이드 문서를 추가하면 `CLAUDE.md`의 "개발 가이드" 목록에도 링크를 추가한다.

## AI 의사결정 우선순위 (모호한 요청 처리)

요청이 모호하거나 범위가 불명확할 때 다음 순서로 판단한다:

1. `docs/PRD.md` — 이 기능이 MVP 핵심(F001~F005)/필수 지원(F010~F011)/제외(MVP 이후) 중 어디에 속하는지 확인.
2. `docs/ROADMAP.md` — 현재 Phase/Task 순서상 지금 구현해도 되는 범위인지 확인.
3. `docs/guides/*.md` — 구현 패턴(폼, 스타일링, 컴포넌트, Next.js 15 관련)이 이미 문서화되어 있는지 확인 후 그 패턴을 따름.
4. 위 세 가지로도 판단이 서지 않으면 추측으로 구현하지 말고 사용자에게 범위를 확인한다.

## 금지사항

- `shrimp_data/` 디렉터리 내부 파일을 직접 편집하지 않는다 — `shrimp-task-manager` MCP가 관리하는 작업 데이터이며, 반드시 해당 MCP 도구를 통해서만 변경한다.
- ROADMAP에서 아직 도달하지 않은 Task의 외부 서비스 연동(Notion API, Supabase Auth/DB, PDF 렌더링)을 미리 구현하지 않는다.
- 스타터 템플릿의 범용 마케팅 컴포넌트(`layout/header.tsx`, `layout/footer.tsx`, `navigation/*`, `sections/*`)를 되살리지 않는다 — 이 프로젝트는 견적서 뷰어 단일 목적 서비스다.
- `docs/PRD.md`/`docs/ROADMAP.md`의 내용과 실제 구현이 어긋난 상태로 커밋하지 않는다 — 기능을 구현했으면 두 문서 중 관련 섹션을 함께 갱신한다.
- Playwright MCP E2E 테스트(4개 카테고리: 정상/에러·예외/엣지/회귀)를 실행하지 않은 채 API 연동·비즈니스 로직 Task를 완료(✅) 처리하지 않는다.
