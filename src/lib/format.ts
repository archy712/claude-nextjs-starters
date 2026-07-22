/**
 * 견적서 화면 표시용 포맷팅 유틸리티.
 *
 * `Intl.NumberFormat`/`Intl.DateTimeFormat` 기반 순수 포맷팅 함수만 포함하며,
 * 조건 분기나 비즈니스 로직은 담지 않는다.
 */

/**
 * 금액을 `ko-KR` 로케일 기준 원화(KRW) 형식으로 변환한다.
 *
 * @example formatCurrency(1234567) // "₩1,234,567"
 */
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('ko-KR', {
    style: 'currency',
    currency: 'KRW',
    maximumFractionDigits: 0,
  }).format(amount)
}

/**
 * ISO 형식(예: "2026-07-22") 날짜 문자열을 `ko-KR` 로케일의
 * 사람이 읽기 쉬운 형태(예: "2026년 7월 22일")로 변환한다.
 */
export function formatDate(dateString: string): string {
  return new Intl.DateTimeFormat('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(dateString))
}
