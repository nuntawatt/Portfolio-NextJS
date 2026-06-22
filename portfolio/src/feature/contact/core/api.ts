import { apiClient } from '@/lib/api-client';
import { ContactPayload, ContactResponse } from './types';

export const contactApi = {
  submitForm: async (payload: ContactPayload): Promise<ContactResponse> => {
    const response = await apiClient.post<ContactResponse>('/contact', payload);
    return response.data;
  },
};
