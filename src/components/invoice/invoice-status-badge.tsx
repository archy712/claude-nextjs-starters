import { CheckCircle2, Clock, XCircle } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import type { InvoiceStatus } from '@/types/invoice'

interface InvoiceStatusBadgeProps {
  status: InvoiceStatus
  className?: string
}

/**
 * 견적서 상태(대기/승인/거절)를 서로 다른 Badge variant와 아이콘, 한글 라벨로 표시한다.
 */
const statusConfig: Record<
  InvoiceStatus,
  {
    label: string
    variant: 'secondary' | 'default' | 'destructive'
    icon: typeof Clock
  }
> = {
  pending: {
    label: '대기',
    variant: 'secondary',
    icon: Clock,
  },
  approved: {
    label: '승인',
    variant: 'default',
    icon: CheckCircle2,
  },
  rejected: {
    label: '거절',
    variant: 'destructive',
    icon: XCircle,
  },
}

export function InvoiceStatusBadge({
  status,
  className,
}: InvoiceStatusBadgeProps) {
  const { label, variant, icon: Icon } = statusConfig[status]

  return (
    <Badge variant={variant} className={cn(className)}>
      <Icon aria-hidden="true" />
      {label}
    </Badge>
  )
}
