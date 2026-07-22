/**
 * Notion 데이터베이스 스키마(Invoices/Items 필드 및 관계)는 docs/PRD.md의
 * "데이터 모델" 섹션을 참조. 이 파일은 그 스키마를 도메인 모델로 옮긴 타입만 정의한다.
 */

export type InvoiceStatus = 'pending' | 'approved' | 'rejected'

export interface InvoiceItem {
  id: string
  description: string
  quantity: number
  unitPrice: number
  amount: number
}

export interface Invoice {
  id: string
  invoiceNumber: string
  clientName: string
  issueDate: string
  validUntil: string
  items: InvoiceItem[]
  totalAmount: number
  status: InvoiceStatus
}

/**
 * Notion page.properties의 원본 형태 중 이 프로젝트가 사용하는 부분만 좁힌 타입.
 * 실제 @notionhq/client SDK 타입은 Task 005(Notion API 연동)에서 도입한다.
 *
 * `status`는 노션의 일반 Select가 아니라 내장 Status 속성(대기/거절/승인 그룹)으로
 * 구성되어 있어, API 응답이 `{ select: ... }`가 아닌 `{ status: ... }` 형태로 온다.
 */
export interface NotionInvoiceProperties {
  invoice_number: { title: Array<{ plain_text: string }> }
  client_name: { rich_text: Array<{ plain_text: string }> }
  issue_date: { date: { start: string } | null }
  valid_until: { date: { start: string } | null }
  status: { status: { name: string } | null }
  total_amount: { number: number | null }
}

/**
 * Notion 페이지 속성을 Invoice 도메인 모델로 매핑하는 함수의 시그니처.
 * 실제 구현(items relation 조회 포함)은 Task 005에서 수행한다.
 */
export type MapNotionPageToInvoice = (
  pageId: string,
  properties: NotionInvoiceProperties,
  items: InvoiceItem[]
) => Invoice
