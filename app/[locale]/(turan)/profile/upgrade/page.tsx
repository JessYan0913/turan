'use client';

import { useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowLeft, CheckCircle, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import * as z from 'zod';

import { Button, buttonVariants } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { validationRedeemCode } from '@/lib/actions/pricing';
import { cn } from '@/lib/utils';
import { useScopedI18n } from '@/locales/client';

// Define the schema for the form validation
const redeemCodeSchema = z.object({
  code: z.string().min(21, { message: 'Redeem code must be at least 22 characters' }),
});

type RedeemCodeFormValues = z.infer<typeof redeemCodeSchema>;

export default function UpgradePage() {
  const router = useRouter();
  const t = useScopedI18n('upgrade');
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationResult, setVerificationResult] = useState<{
    code: string;
    planName: string;
    value: number;
    expiresAt: string;
  } | null>(null);
  const [isRedeeming, setIsRedeeming] = useState(false);

  const form = useForm<RedeemCodeFormValues>({
    resolver: zodResolver(redeemCodeSchema),
    defaultValues: {
      code: '',
    },
    mode: 'onBlur',
  });

  const handleVerify = async (data: RedeemCodeFormValues) => {
    try {
      setIsVerifying(true);
      const response = await validationRedeemCode(data.code);
      setVerificationResult({
        code: data.code,
        planName: response.id || '',
        value: response.points || 0,
        expiresAt: response.period,
      });
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to verify code');
    } finally {
      setIsVerifying(false);
    }
  };

  const handleRedeem = async () => {
    if (!verificationResult) return;

    try {
      setIsRedeeming(true);
      const response = await fetch('/api/upgrade', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code: verificationResult.code }),
      });
      const result = await response.json();

      if (result.success) {
        toast.success(`Your ${verificationResult.planName} plan has been activated!`);
        router.push('/profile/billing');
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to redeem code');
    } finally {
      setIsRedeeming(false);
    }
  };

  const resetVerification = () => {
    setVerificationResult(null);
    form.reset();
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="space-y-6">
        <div className="flex items-center">
          <Link href="/profile" className={cn(buttonVariants({ variant: 'ghost' }), 'flex items-center gap-2')}>
            <ArrowLeft className="size-4" />
            {t('profile')}
          </Link>
        </div>

        <div>
          <h1 className="text-3xl font-bold tracking-tight">{t('title')}</h1>
          <p className="text-muted-foreground mt-2">{t('description')}</p>
        </div>

        <Card className="mx-auto max-w-2xl">
          <CardHeader>
            <CardTitle>{t('redeemCode')}</CardTitle>
            <CardDescription>{t('redeemDescription')}</CardDescription>
          </CardHeader>
          <CardContent>
            {!verificationResult ? (
              <Form {...form}>
                <form onSubmit={form.handleSubmit(handleVerify)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="code"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder={t('codePlaceholder')}
                            className="h-12 text-center font-mono text-lg tracking-wider"
                            disabled={isVerifying}
                            autoComplete="off"
                            autoFocus
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" className="w-full" disabled={isVerifying || !form.formState.isDirty}>
                    {isVerifying ? (
                      <>
                        <Loader2 className="mr-2 size-4 animate-spin" />
                        {t('verifying')}
                      </>
                    ) : (
                      t('verify')
                    )}
                  </Button>
                </form>
              </Form>
            ) : (
              <div className="space-y-6">
                <div className="rounded-lg border p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">{verificationResult.planName}</h3>
                      <p className="text-muted-foreground text-sm">
                        {verificationResult.value} {t('credits')}
                      </p>
                    </div>
                    <CheckCircle className="size-6 text-green-500" />
                  </div>

                  <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">{t('code')}</p>
                      <p className="font-mono">{verificationResult.code}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">{t('expiresAt')}</p>
                      <p>{verificationResult.expiresAt}</p>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end space-x-3 pt-2">
                  <Button variant="outline" onClick={resetVerification} disabled={isRedeeming}>
                    {t('cancel')}
                  </Button>
                  <Button onClick={handleRedeem} disabled={isRedeeming}>
                    {isRedeeming ? (
                      <>
                        <Loader2 className="mr-2 size-4 animate-spin" />
                        {t('redeeming')}
                      </>
                    ) : (
                      t('redeem')
                    )}
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
