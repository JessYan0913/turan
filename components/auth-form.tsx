import Form from 'next/form';

import { useScopedI18n } from '@/locales/client';

import { Input } from './ui/input';
import { Label } from './ui/label';

export function AuthForm({
  action,
  children,
  defaultEmail = '',
}: {
  action: NonNullable<string | ((formData: FormData) => void | Promise<void>) | undefined>;
  children: React.ReactNode;
  defaultEmail?: string;
}) {
  const t = useScopedI18n('auth');

  return (
    <Form action={action} className="flex flex-col gap-4 px-4 sm:px-16">
      <div className="flex flex-col gap-2">
        <Label htmlFor="email" className="font-normal text-zinc-600 dark:text-zinc-400">
          {t('email')}
        </Label>

        <Input
          id="email"
          name="email"
          className="text-md bg-muted md:text-sm"
          type="email"
          placeholder={t('emailPlaceholder')}
          autoComplete="email"
          required
          autoFocus
          defaultValue={defaultEmail}
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="password" className="font-normal text-zinc-600 dark:text-zinc-400">
          {t('password')}
        </Label>

        <Input id="password" name="password" className="text-md bg-muted md:text-sm" type="password" required />
      </div>

      {children}
    </Form>
  );
}
