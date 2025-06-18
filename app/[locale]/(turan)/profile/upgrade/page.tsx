'use client';

import { useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowLeft, CheckCircle, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { Button, buttonVariants } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { upgrade, validationRedeemCode } from '@/lib/actions/upgrade';
import { cn } from '@/lib/utils';
import { useScopedI18n } from '@/locales/client';

// Define the schema for the form validation
const redeemCodeSchema = z.object({
  code: z.string().min(22, { message: 'Redeem code must be at least 22 characters' }),
});

type RedeemCodeFormValues = z.infer<typeof redeemCodeSchema>;

export default function UpgradePage() {
  const router = useRouter();
  const { toast } = useToast();
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
  });

  const handleVerify = async (data: RedeemCodeFormValues) => {
    try {
      setIsVerifying(true);
      const response = await validationRedeemCode(data.code);
      setVerificationResult({
        code: data.code,
        planName: response.id || '',
        value: response.amount || 0,
        expiresAt: response.expiresAt.toISOString() || '',
      });
    } catch (error) {
      console.log('====> error');

      toast({
        title: 'Verification failed',
        description: error instanceof Error ? error.message : 'Failed to verify code',
        variant: 'destructive',
      });
    } finally {
      setIsVerifying(false);
    }
  };

  const handleRedeem = async () => {
    if (!verificationResult) return;

    try {
      setIsRedeeming(true);
      const response = await upgrade(verificationResult.code);

      if (response.success) {
        toast({
          title: 'Redeemed successfully',
          description: `Your ${verificationResult.planName} plan has been activated!`,
        });
        router.push('/profile/billing');
      }
    } catch (error) {
      toast({
        title: 'Redemption failed',
        description: error instanceof Error ? error.message : 'Failed to redeem code',
        variant: 'destructive',
      });
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
              <form onSubmit={form.handleSubmit(handleVerify)} className="space-y-4">
                <div className="space-y-2">
                  <Input
                    {...form.register('code')}
                    placeholder={t('codePlaceholder')}
                    className="h-12 text-center font-mono text-lg tracking-wider"
                    disabled={isVerifying}
                    autoComplete="off"
                    autoFocus
                  />
                  {form.formState.errors.code && (
                    <p className="text-destructive text-sm">{form.formState.errors.code.message}</p>
                  )}
                </div>
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
                      <p>{new Date(verificationResult.expiresAt).toLocaleDateString()}</p>
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
