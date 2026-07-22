import type { Metadata } from 'next'
import { Container } from '@/components/layout/container'
import { InvoiceHeader } from '@/components/invoice/invoice-header'
import { InvoiceItemsTable } from '@/components/invoice/invoice-items-table'
import { InvoiceSummary } from '@/components/invoice/invoice-summary'
import { PdfDownloadButton } from '@/components/invoice/pdf-download-button'
import { createMockInvoice } from '@/lib/mock/invoice'

type InvoicePageProps = {
  params: Promise<{ notionPageId: string }>
}

/**
 * 견적서별 동적 메타데이터.
 * TODO(Task 005): Notion API 연동 후 실제 견적서 번호/클라이언트명으로 title을 대체한다.
 */
export async function generateMetadata({
  params,
}: InvoicePageProps): Promise<Metadata> {
  const { notionPageId } = await params

  return {
    title: `견적서 조회 - ${notionPageId}`,
  }
}

export default async function InvoicePage({ params }: InvoicePageProps) {
  // TODO(Task 005): notionPageId로 실제 Notion 데이터를 조회하도록 대체
  const { notionPageId } = await params
  const invoice = createMockInvoice({ id: notionPageId })

  return (
    <main className="flex-1 py-12">
      <Container size="md" className="space-y-6">
        <InvoiceHeader invoice={invoice} />

        <div className="space-y-4">
          <InvoiceItemsTable items={invoice.items} />
          <InvoiceSummary totalAmount={invoice.totalAmount} />
        </div>

        <div className="flex justify-end">
          <PdfDownloadButton />
        </div>
      </Container>
    </main>
  )
}
