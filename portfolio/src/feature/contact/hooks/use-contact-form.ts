import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { contactApi } from '../core/api';

export function useContactForm() {
  const { data: session, status } = useSession();
  
  const [name, setName] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  
  const [isSending, setIsSending] = useState(false);
  const [sendSuccess, setSendSuccess] = useState<boolean | null>(null);
  const [sendError, setSendError] = useState<string | null>(null);

  useEffect(() => {
    if (session?.user?.name && !name) {
      setName(session.user.name);
    }
  }, [session, name]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const userEmail = session?.user?.email;
    if (!name || !userEmail || !subject || !message) return;

    setIsSending(true);
    setSendError(null);

    try {
      await contactApi.submitForm({
        name,
        subject,
        message,
      });

      setSendSuccess(true);
      setSubject('');
      setMessage('');
    } catch (error) {
      const errMsg = error instanceof Error ? error.message : 'contact.error_fallback';
      setSendError(errMsg);
    } finally {
      setIsSending(false);
    }
  };

  const resetSuccess = () => setSendSuccess(null);

  return {
    formData: { name, subject, message },
    formActions: { setName, setSubject, setMessage },
    formState: { isSending, sendSuccess, sendError },
    sessionState: { session, status },
    handleSubmit,
    resetSuccess,
  };
}
