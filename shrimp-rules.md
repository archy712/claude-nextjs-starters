# 개발 지침 — invoice_ex_2

이 저장소를 위한 AI Agent 운영 규칙입니다. 이 문서는 Next.js/React 튜토리얼이 **아니며**, 이 프로젝트에 특화된 내용만 다룹니다. 프레임워크 관련 일반 지식은 이미 알고 있다고 전제합니다.

## 프로젝트 개요

- **무엇을 만드는가**: 노션(Notion) 기반 견적서 조회 MVP입니다. 프리랜서/소규모 기업이 노션 데이터베이스에 견적 정보를 입력하면, 각 견적서마다 고유 URL `/invoice/[notionPageId]`이 생성되고, 클라이언트는 이 URL로 접속해 견적서를 확인하고 PDF로 다운로드합니다. 로그인, 관리자 UI, 클라이언트 계정은 없습니다.
- **상세 명세**: `docs/PRD.md`. **단계별 작업 목록**: `docs/ROADMAP.md`. 작업을 시작하기 전 두 문서를 반드시 읽으세요 — 앱의 대부분이 아직 구현되지 않았으므로 코드만 보고 범위를 추측하지 마세요.
- **현재 저장소 상태**: `src/app/` 아래에는 마케팅/소개 랜딩 페이지(`src/app/page.tsx`)와 루트 레이아웃만 존재합니다. `/invoice/[notionPageId]` 라우트, `src/types/invoice.ts`, `src/lib/notion/`은 **아직 존재하지 않습니다** — 존재한다고 가정하지 마세요.

## 금지 사항 (MVP 범위)

- 로그인, 회원가입, 그 어떤 인증 사용자 흐름도 **절대** 추가하지 마세요. 이 앱은 공개적이며 읽기 전용입니다. `src/app/login/`, `src/app/signup/`, `src/components/login-form.tsx`, `src/components/signup-form.tsx`를 다시 만들지 마세요 — 이들은 스타터 킷에서 의도적으로 삭제된 것입니다.
- 일반적인 마케팅용 헤더/푸터/내비게이션(`components/layout/header.tsx`, `components/layout/footer.tsx`, `components/navigation/*`, `components/sections/*`, `components/theme-toggle.tsx`)을 **절대** 다시 만들지 마세요. 이들은 이 프로젝트가 아닌 마케팅 사이트를 위한 스타터 킷 보일러플레이트였으며 의도적으로 삭제되었습니다. 사용자가 `docs/ROADMAP.md`의 Phase 5(`Task 009: 관리자 대시보드`)를 명시적으로 구현하는 경우에만 이 카테고리를 다시 만드세요.
- Pages Router API(`getServerSideProps`, `getStaticProps`, `pages/`)를 **절대** 사용하지 마세요. App Router만 사용합니다.
- PDF 라이브러리를 임의로 단독 결정하지 **마세요**. `docs/ROADMAP.md`의 Task 007에서는 `@react-pdf/renderer`를 먼저 검토하고, 필요한 경우에만 Puppeteer로 대체하도록 명시되어 있습니다 — 둘 중 하나를 설치하기 전에 `docs/ROADMAP.md`에서 Task 007의 현재 체크박스 상태를 확인하세요.
- 노션 API 연동이나 PDF 생성 로직을 구현할 때 Playwright MCP 테스트를 **절대** 건너뛰지 마세요. `docs/ROADMAP.md`의 워크플로우 섹션에 따라 모든 API/비즈니스 로직 작업은 완료 처리 전에 정상/실패/엣지 케이스를 포함한 E2E 검증이 예외 없이 필요합니다.
- `docs/ROADMAP.md`의 여러 작업 단계를 한 번에 끊김 없이 이어서 진행하지 **마세요**. `docs/ROADMAP.md`에 따라 각 단계 완료 후 멈추고 추가 지시를 기다리세요.

## 아키텍처 및 파일 배치

- 경로 별칭: `tsconfig.json`에는 `"@/*": ["./src/*"]` 단 하나의 별칭만 정의되어 있습니다. `@/ui`, `@/utils`, `@/hooks` 같은 별도의 tsconfig 항목은 존재하지 않으며, 이는 `@/*`를 통해 접근하는 관례적인 하위 폴더일 뿐입니다(예: `@/components/ui/button`, `@/lib/utils`). `docs/guides/project-structure.md`에서 이를 다르게 암시하는 표현은 무시하세요.
- 새로운 라우트 작업은 PRD의 URL 구조에 따라 `src/app/invoice/[notionPageId]/` 아래에 위치합니다: `page.tsx`, `loading.tsx`, `error.tsx`, 그리고 잘못된 ID를 위한 루트 `src/app/not-found.tsx`.
- 도메인 타입은 `src/types/invoice.ts`(`Invoice`, `InvoiceItem`, 노션 속성 → 도메인 모델 매핑 타입)에 작성합니다 — 이 파일은 아직 존재하지 않으므로, 견적서 관련 타입에 의존하는 코드를 작성하기 전에 ROADMAP Task 002에 따라 먼저 생성하세요.
- 노션 연동은 `src/lib/notion/` 아래에 위치합니다(예: `@notionhq/client` 인스턴스를 위한 `client.ts`, 노션 속성 → 도메인 모델 파싱/매핑을 위한 별도 모듈). 페이지 컴포넌트에 노션 API 호출을 직접 인라인으로 작성하지 말고, 파싱 로직이 한 곳에 모이도록 이 레이어를 거치도록 하세요.
- Phase 2 UI 작업을 위한 목업/더미 견적서 데이터는 ROADMAP Task 003에 따라 `src/lib/mock/invoice.ts`에 작성합니다. Task 005에서 실제 노션 호출로 교체하되, 더미 유틸리티 자체를 완전히 삭제하지는 마세요(이후 작업에서 테스트/스토리북 형태의 검증에 계속 참조할 수 있습니다).
- shadcn/ui 컴포넌트는 항상 `npx shadcn@latest add <name>`으로 추가하세요(레지스트리 관리 방식이며 `components.json`의 `new-york` 스타일 / `neutral` 베이스 컬러 / `lucide` 아이콘을 따릅니다). `src/components/ui/`에 프리미티브를 직접 작성하지 마세요.
- 단 하나의 라우트에서만 쓰이는 페이지 전용 컴포넌트는 해당 라우트 폴더 내에 함께 배치하세요. 2개 이상의 라우트에서 쓰이면 `src/components/` 아래 기존 카테고리(`layout/`, `providers/`) 중 가장 가까운 곳에 배치하세요. 진짜 Phase 5+ 관리자 대시보드 작업이 아니라면 `navigation/`이나 `sections/` 카테고리를 되살리지 마세요.

## 다중 파일 연동 규칙 (함께 변경해야 하는 파일)

- **환경 변수**: `.env.example`과 `src/lib/env.ts`의 Zod 스키마는 함께 업데이트해야 합니다. `src/lib/env.ts`는 현재 `NODE_ENV`, `VERCEL_URL`, `NEXT_PUBLIC_APP_URL`만 검증하며, `.env.example`에 이미 나열되어 있음에도 `NOTION_API_KEY` / `NOTION_DATABASE_ID`는 아직 검증하지 않습니다. 노션 연동(Task 005)을 구현할 때는 노션 클라이언트를 연결하는 것과 같은 변경 안에서 `src/lib/env.ts`의 `envSchema`에 이 두 변수를 추가하세요 — `.env.example`과 `env.ts`가 서로 어긋난 상태로 방치하지 마세요.
- **노션 데이터 필드**: 노션 데이터베이스에서 가져오는 필드를 추가/변경할 때는 같은 변경 안에서 `src/types/invoice.ts`와 `src/lib/notion/` 아래의 노션 속성-매핑/파싱 모듈을 함께 업데이트하세요. 이 둘 사이의 불일치는 이 코드베이스에서 가장 발생하기 쉬운 조용한 런타임 버그의 원인입니다(노션은 느슨하게 타입이 지정된 속성 객체를 반환하며, 매핑 레이어만이 이를 좁혀주는 유일한 곳입니다).
- **로드맵 추적**: `docs/ROADMAP.md`에 설명된 단계를 완료하면 같은 세션 내에서 그곳에 완료 표시를 하세요 — 로드맵이 실제 구현된 코드와 조용히 어긋난 채로 남지 않도록 하세요.
- **작업 파일**: `/tasks/XXX-description.md` 작업 파일을 생성한다면, 일반적인 설명문이 아니라 `/tasks/`의 가장 최근에 완료된 작업 파일 2개를 기준으로 구조를 잡아 형식의 일관성을 유지하세요. 초기 빈 상태의 형태를 확인할 때만 `/tasks/000-sample.md`를 참고하세요. API/비즈니스 로직 작업 파일에는 Playwright MCP 테스트 시나리오를 나열하는 `## 테스트 체크리스트` 섹션을 반드시 포함해야 합니다.

## 코드 스타일 (설명 문서가 아닌 실제 설정 기준)

- Prettier(`.prettierrc`): 세미콜론 없음, 작은따옴표 사용, `trailingComma: es5`, `arrowParens: avoid`, `printWidth: 80`, `prettier-plugin-tailwindcss` 적용 — Tailwind 클래스 순서를 수동으로 정렬하지 마세요, 플러그인이 저장/커밋 시 자동으로 정렬합니다.
- ESLint(`eslint.config.mjs`): `next/core-web-vitals`, `next/typescript`, `prettier`를 확장합니다.
- Husky + lint-staged는 커밋 시 스테이징된 `.ts/.tsx`에 `eslint --fix` + `prettier --write`를, 스테이징된 `.json/.css/.md`에 `prettier --write`를 실행합니다 — 이를 통과하지 못하면 pre-commit 단계에서 커밋이 실패합니다. `--no-verify`로 우회하지 마세요.
- 파일 네이밍: 파일은 kebab-case(`invoice-viewer.tsx`), 컴포넌트 식별자는 PascalCase를 사용하며, `src/components/`의 기존 방식과 일치시킵니다.

## AI 의사결정 기준

1. 견적서/견적 렌더링이나 노션 연동 코드를 작성하기 전, `docs/ROADMAP.md`에서 현재 어떤 작업/단계인지, 그리고 선행 작업(예: Task 005의 노션 클라이언트보다 먼저 Task 002의 타입)이 실제로 코드베이스에 완료되어 있는지 다시 확인하세요 — 로드맵의 체크박스는 실제 상태보다 뒤처져 있을 수 있으므로 체크박스만 보지 말고 파일을 직접 확인해 검증하세요.
2. `package.json`에 없는 새 의존성을 추가하기 전, 선호하는 대체재를 임의로 쓰지 말고 해당 기능에 대해 `docs/PRD.md` / `docs/ROADMAP.md`에서 지정한 것(예: 노션용 `@notionhq/client`, PDF용으로 먼저 검토할 `@react-pdf/renderer`)이 맞는지 확인하세요.
3. 어떤 구현 작업이든 완료로 선언하기 전에 `CLAUDE.md`에 따라 `npm run check-all`(typecheck + lint + format:check)과 `npm run build`를 실행하세요.
