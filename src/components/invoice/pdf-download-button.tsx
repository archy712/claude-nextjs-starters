'use client'

import { Download, Loader2 } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface PdfDownloadButtonProps {
  /** 다운로드 진행 중 로딩 상태 표시 여부. 실제 상태 관리는 상위(Task 007)에서 연결한다. */
  isLoading?: boolean
  className?: string
}

/**
 * 견적서 PDF 다운로드 버튼 골격.
 * 실제 PDF 생성/다운로드 로직은 Task 007에서 구현하며, 여기서는
 * 버튼 UI와 로딩/비활성 상태의 시각적 표현만 담당한다.
 */
export function PdfDownloadButton({
  isLoading = false,
  className,
}: PdfDownloadButtonProps) {
  return (
    <Button
      type="button"
      disabled={isLoading}
      className={cn('w-full sm:w-auto', className)}
      onClick={() => {
        // TODO(Task 007): 실제 PDF 생성 및 다운로드 로직 구현
      }}
    >
      {isLoading ? (
        <Loader2 className="animate-spin" aria-hidden="true" />
      ) : (
        <Download aria-hidden="true" />
      )}
      {isLoading ? 'PDF 생성 중...' : 'PDF 다운로드'}
    </Button>
  )
}
