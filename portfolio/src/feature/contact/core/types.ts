export interface ContactPayload {
  name: string;
  subject: string;
  message: string;
}

export interface ContactResponse {
  success: boolean;
  message?: string;
}
