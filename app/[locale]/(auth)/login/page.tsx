'use client';

import { useActionState, useEffect, useState } from 'react';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { AuthForm } from '@/components/auth-form';
import { SubmitButton } from '@/components/submit-button';
import { toast } from '@/components/toast';
import { login, type LoginActionState } from '@/lib/actions/auth';
import { useScopedI18n } from '@/locales/client';

export default function Page() {
  const router = useRouter();
  const t = useScopedI18n('login');

  const [email, setEmail] = useState('');
  const [isSuccessful, setIsSuccessful] = useState(false);

  const [state, formAction] = useActionState<LoginActionState, FormData>(login, {
    status: 'idle',
  });

  useEffect(() => {
    if (state.status === 'failed') {
      toast({
        type: 'error',
        description: t('errors.invalidCredentials'),
      });
    } else if (state.status === 'invalid_data') {
      toast({
        type: 'error',
        description: t('errors.validationFailed'),
      });
    } else if (state.status === 'success') {
      setIsSuccessful(true);
      // 刷新页面以更新认证状态
      router.refresh();
      // 重定向到首页
      router.push('/');
    }
  }, [router, state.status, t]);

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
          <SubmitButton isSuccessful={isSuccessful}>{t('title')}</SubmitButton>
          <p className="mt-4 text-center text-sm text-gray-600 dark:text-zinc-400">
            {t('noAccount')}{' '}
            <Link href="/register" className="font-semibold text-gray-800 hover:underline dark:text-zinc-200">
              {t('signUpLink')}
            </Link>{' '}
            {t('signUpSuffix')}
          </p>
        </AuthForm>
      </div>
    </div>
  );
}
