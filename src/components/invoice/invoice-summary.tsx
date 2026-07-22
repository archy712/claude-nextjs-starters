import { Separator } from '@/components/ui/separator'
import { formatCurrency } from '@/lib/format'

interface InvoiceSummaryProps {
  totalAmount: number
}

/**
 * 견적서 총액 요약. Separator로 항목 테이블과 구분한 뒤 합계 금액을 강조 표시한다.
 */
export function InvoiceSummary({ totalAmount }: InvoiceSummaryProps) {
  return (
    <div className="space-y-4">
      <Separator />
      <div className="flex items-center justify-between gap-4">
        <span className="text-sm font-medium sm:text-base">합계 금액</span>
        <span className="text-xl font-bold tabular-nums sm:text-2xl">
          {formatCurrency(totalAmount)}
        </span>
      </div>
    </div>
  )
}
