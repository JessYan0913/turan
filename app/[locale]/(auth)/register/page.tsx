'use client';

import { useActionState, useEffect, useState } from 'react';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import { AuthForm } from '@/components/auth-form';
import { SubmitButton } from '@/components/submit-button';
import { register, type RegisterActionState } from '@/lib/actions/auth';
import { useScopedI18n } from '@/locales/client';

export default function Page() {
  const t = useScopedI18n('register');
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [isSuccessful, setIsSuccessful] = useState(false);

  const [state, formAction] = useActionState<RegisterActionState, FormData>(register, {
    status: 'idle',
  });

  useEffect(() => {
    if (state.status === 'user_exists') {
      toast.error(t('errors.userExists'));
    } else if (state.status === 'failed') {
      toast.error(t('errors.createFailed'));
    } else if (state.status === 'invalid_data') {
      toast.error(t('errors.validationFailed'));
    } else if (state.status === 'success') {
      toast.success(t('errors.success'));

      setIsSuccessful(true);
      router.refresh();
    }
  }, [state, router, t]);

  const handleSubmit = (formData: FormData) => {
    setEmail(formData.get('email') as string);
    formAction(formData);
  };

  return (
    <div className="bg-background flex h-dvh w-screen items-start justify-center pt-12 md:items-center md:pt-0">
      <div className="flex w-full max-w-md flex-col gap-12 overflow-hidden rounded-2xl">
        <div className="flex flex-col items-center justify-center gap-2 px-4 text-center sm:px-16">
          <h3 className="text-xl font-semibold dark:text-zinc-50">{t('title')}</h3>
          <p className="text-sm text-gray-500 dark:text-zinc-400">{t('subtitle')}</p>
        </div>
        <AuthForm action={handleSubmit} defaultEmail={email}>
          <SubmitButton isSuccessful={isSuccessful}>{t('submit')}</SubmitButton>
          <p className="mt-4 text-center text-sm text-gray-600 dark:text-zinc-400">
            {t('alreadyHaveAccount')}{' '}
            <Link href="/login" className="font-semibold text-gray-800 hover:underline dark:text-zinc-200">
              {t('signInLink')}
            </Link>{' '}
            {t('signInSuffix')}
          </p>
        </AuthForm>
      </div>
    </div>
  );
}
