import { Building2, Check, Crown, Star, Zap } from 'lucide-react';
import Link from 'next/link';

import { Badge } from '@/components/ui/badge';
import { Button, buttonVariants } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getPlans, type Plan } from '@/lib/actions/pricing';
import { cn } from '@/lib/utils';
import { getScopedI18n } from '@/locales/server';

const getPlanIcon = (id: Plan['id']) => {
  switch (id) {
    case 'basic':
      return <Star className="size-6" />;
    case 'free':
      return <Zap className="size-6" />;
    case 'pro':
      return <Crown className="size-6" />;
    case 'enterprise':
      return <Building2 className="size-6" />;
    default:
      return null;
  }
};

interface PlanWithTranslations extends Plan {
  name: string;
  description: string;
  buttonText: string;
  icon: React.ReactNode;
}

export default async function PricingPage() {
  const t = await getScopedI18n('pricing');

  const plans = (await getPlans()).map((plan) => {
    const name = t(`plans.${plan.id}.name`);
    const description = t(`plans.${plan.id}.description`);
    const buttonText = t(`plans.${plan.id}.buttonText`);
    const icon = getPlanIcon(plan.id);

    return {
      ...plan,
      name,
      description,
      buttonText,
      icon,
    } as PlanWithTranslations;
  });

  return (
    <div className="min-h-screen py-8 transition-colors duration-300 md:py-12 lg:py-16">
      <div className="container px-4 md:px-6 lg:px-8">
        {/* 标题区域 */}
        <div className="mb-12 space-y-6 text-center">
          <h1 className="leading-heading-sm md:leading-heading lg:leading-heading-lg bg-gradient-to-r from-blue-600 to-cyan-400 bg-clip-text text-4xl font-bold tracking-tight text-transparent md:text-6xl lg:text-6xl">
            {t('title')}
          </h1>
          <p className="text-muted-foreground mx-auto max-w-3xl text-lg md:text-xl">{t('subtitle')}</p>
        </div>

        {/* 价格卡片 */}
        <div className="mx-auto grid max-w-7xl gap-6 px-4 sm:px-6 md:grid-cols-4 md:px-8 lg:px-12">
          {plans.map((plan, index) => (
            <div key={plan.name} className="relative">
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 z-10 -translate-x-1/2">
                  <Badge className="bg-gradient-to-r from-blue-600 to-cyan-500 px-4 py-1 text-xs font-medium text-white shadow-lg">
                    {t('popularBadge')}
                  </Badge>
                </div>
              )}
              <Card
                className={`card-base h-full transition-all duration-300 hover:shadow-lg ${
                  plan.popular
                    ? 'ring-offset-background ring-2 ring-cyan-500 ring-offset-2 dark:shadow-[0_0_0_4px_#22d3ee] dark:ring-cyan-500'
                    : ''
                }`}
              >
                <CardHeader className="pb-4 text-center">
                  <div
                    className={`mx-auto mb-4 flex size-16 items-center justify-center rounded-full bg-gradient-to-r ${
                      index === 0
                        ? 'from-blue-600 to-cyan-500'
                        : index === 1
                          ? 'from-blue-500 to-cyan-400'
                          : 'from-blue-400 to-cyan-300'
                    } text-white shadow-lg`}
                  >
                    {plan.icon}
                  </div>
                  <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
                  <p className="text-muted-foreground text-sm">{plan.description}</p>
                  <div className="mt-4">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    <span>/</span>
                    <span className="text-muted-foreground text-lg">{plan.period}</span>
                  </div>
                </CardHeader>

                <CardContent className="space-y-6">
                  <Link
                    href={`/profile/upgrade`}
                    className={cn(
                      buttonVariants({
                        variant: plan.popular ? 'default' : 'outline',
                        className: 'w-full',
                      }),
                      plan.popular && 'bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600'
                    )}
                  >
                    {plan.buttonText}
                  </Link>

                  <div className="space-y-4">
                    <h4 className="font-semibold">{t('features')}</h4>
                    <ul className="space-y-3">
                      {plan.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-start gap-3">
                          <Check className="mt-0.5 size-4 shrink-0 text-cyan-500" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    {Number(plan.limitations?.length) > 0 && (
                      <div className="pt-2">
                        <h4 className="text-sm font-semibold">{t('limitations')}</h4>
                        <ul className="mt-2 space-y-2">
                          {plan.limitations?.map((limitation, limitIndex) => (
                            <li key={limitIndex} className="flex items-start gap-3">
                              <div className="mt-1.5 size-1.5 shrink-0 rounded-full bg-gray-400" />
                              <span className="text-muted-foreground text-xs">{limitation}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>

        {/* FAQ 区域 */}
        <div className="mt-20">
          <h2 className="mb-8 text-center text-3xl font-bold tracking-tight md:text-4xl">{t('faq.title')}</h2>
          <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-2">
            {[
              {
                question: t('faq.cancelSubscription.question'),
                answer: t('faq.cancelSubscription.answer'),
              },
              {
                question: t('faq.paymentMethods.question'),
                answer: t('faq.paymentMethods.answer'),
              },
              {
                question: t('faq.imageStorage.question'),
                answer: t('faq.imageStorage.answer'),
              },
              {
                question: t('faq.enterpriseFeatures.question'),
                answer: t('faq.enterpriseFeatures.answer'),
              },
            ].map((faq, index) => (
              <Card key={index} className="card-base overflow-hidden transition-all duration-300 hover:shadow-md">
                <CardContent className="p-6">
                  <h3 className="mb-2 font-semibold">{faq.question}</h3>
                  <p className="text-muted-foreground text-sm">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
