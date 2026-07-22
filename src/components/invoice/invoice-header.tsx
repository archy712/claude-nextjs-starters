import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { InvoiceStatusBadge } from '@/components/invoice/invoice-status-badge'
import { formatDate } from '@/lib/format'
import type { Invoice } from '@/types/invoice'

interface InvoiceHeaderProps {
  invoice: Invoice
}

/**
 * 견적서 번호, 발행일, 유효기간, 클라이언트명, 상태 배지를 보여주는 헤더 카드.
 */
export function InvoiceHeader({ invoice }: InvoiceHeaderProps) {
  return (
    <Card>
      <CardHeader className="border-b [.border-b]:pb-6">
        <CardTitle className="text-xl sm:text-2xl">
          {invoice.invoiceNumber}
        </CardTitle>
        <CardDescription>견적서</CardDescription>
        <CardAction>
          <InvoiceStatusBadge status={invoice.status} />
        </CardAction>
      </CardHeader>
      <CardContent>
        <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div className="space-y-1">
            <dt className="text-muted-foreground text-xs">클라이언트</dt>
            <dd className="text-sm font-medium">{invoice.clientName}</dd>
          </div>
          <div className="space-y-1">
            <dt className="text-muted-foreground text-xs">발행일</dt>
            <dd className="text-sm font-medium">
              {formatDate(invoice.issueDate)}
            </dd>
          </div>
          <div className="space-y-1">
            <dt className="text-muted-foreground text-xs">유효기간</dt>
            <dd className="text-sm font-medium">
              {formatDate(invoice.validUntil)}
            </dd>
          </div>
        </dl>
      </CardContent>
    </Card>
  )
}
