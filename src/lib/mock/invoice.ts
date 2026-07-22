import type { Invoice, InvoiceItem } from '@/types/invoice'

/**
 * 견적서 화면 조립(Task 004)에서 바로 소비할 수 있는 더미 데이터 픽스처.
 *
 * 실제 Notion 연동(Task 005) 이전까지 화면을 채우기 위한 고정 값 데이터로,
 * 조건 분기 없이 항상 같은 형태의 견적서 객체를 반환한다.
 */

const baseItems: InvoiceItem[] = [
  {
    id: 'item-1',
    description: '웹사이트 리뉴얼 디자인',
    quantity: 1,
    unitPrice: 3_000_000,
    amount: 3_000_000,
  },
  {
    id: 'item-2',
    description: '프론트엔드 개발 (Next.js)',
    quantity: 1,
    unitPrice: 5_500_000,
    amount: 5_500_000,
  },
  {
    id: 'item-3',
    description: '백엔드 API 연동',
    quantity: 1,
    unitPrice: 4_000_000,
    amount: 4_000_000,
  },
  {
    id: 'item-4',
    description: '유지보수 (1개월)',
    quantity: 1,
    unitPrice: 800_000,
    amount: 800_000,
  },
]

const baseInvoice: Invoice = {
  id: 'mock-invoice-001',
  invoiceNumber: 'INV-2026-0001',
  clientName: '주식회사 아크로',
  issueDate: '2026-07-01',
  validUntil: '2026-07-31',
  items: baseItems,
  totalAmount: 13_300_000,
  status: 'pending',
}

/**
 * 기본 더미 견적서에 필요한 값만 덮어써 반환한다.
 * items/totalAmount를 함께 넘기지 않으면 기본 항목·합계가 그대로 유지된다.
 */
export function createMockInvoice(overrides?: Partial<Invoice>): Invoice {
  return {
    ...baseInvoice,
    ...overrides,
  }
}

/** 상태: 대기(pending) 프리셋 */
export const mockPendingInvoice: Invoice = createMockInvoice({
  id: 'mock-invoice-pending',
  invoiceNumber: 'INV-2026-0001',
  status: 'pending',
})

/** 상태: 승인(approved) 프리셋 */
export const mockApprovedInvoice: Invoice = createMockInvoice({
  id: 'mock-invoice-approved',
  invoiceNumber: 'INV-2026-0002',
  clientName: '주식회사 블루밍',
  status: 'approved',
})

/** 상태: 거절(rejected) 프리셋 */
export const mockRejectedInvoice: Invoice = createMockInvoice({
  id: 'mock-invoice-rejected',
  invoiceNumber: 'INV-2026-0003',
  clientName: '주식회사 그린필드',
  status: 'rejected',
})
