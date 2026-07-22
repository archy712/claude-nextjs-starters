import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { formatCurrency } from '@/lib/format'
import type { InvoiceItem } from '@/types/invoice'

interface InvoiceItemsTableProps {
  items: InvoiceItem[]
}

/**
 * 견적서 항목별 설명/수량/단가/금액을 보여주는 테이블.
 * Table 컴포넌트 자체가 `overflow-x-auto` 컨테이너를 감싸고 있어
 * 모바일 화면에서는 좌우 스크롤로 전체 열을 확인할 수 있다.
 */
export function InvoiceItemsTable({ items }: InvoiceItemsTableProps) {
  return (
    <div className="overflow-hidden rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="min-w-40">항목 설명</TableHead>
            <TableHead className="text-right">수량</TableHead>
            <TableHead className="text-right">단가</TableHead>
            <TableHead className="text-right">금액</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map(item => (
            <TableRow key={item.id}>
              <TableCell className="font-medium whitespace-normal">
                {item.description}
              </TableCell>
              <TableCell className="text-right">{item.quantity}</TableCell>
              <TableCell className="text-right">
                {formatCurrency(item.unitPrice)}
              </TableCell>
              <TableCell className="text-right font-medium">
                {formatCurrency(item.amount)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
