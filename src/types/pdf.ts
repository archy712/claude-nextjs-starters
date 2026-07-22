export interface GeneratePdfRequest {
  invoiceId: string
}

export interface GeneratePdfResponse {
  success: boolean
  url?: string
  message?: string
}
