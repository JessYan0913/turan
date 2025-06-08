'use client';

import { Check, Crown, Star, Zap } from 'lucide-react';

import { useTheme } from '@/components/theme-provider';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function PricingPage() {
  const { isDarkMode, themeClasses } = useTheme();

  const plans = [
    {
      name: '免费版',
      price: '¥0',
      period: '/月',
      description: '适合个人用户体验',
      icon: <Zap className="size-6" />,
      features: ['每月 10 次图像处理', '基础风格转换', '标准画质输出', '社区支持', '水印输出'],
      limitations: ['处理时间较长', '功能有限'],
      buttonText: '免费开始',
      popular: false,
    },
    {
      name: '专业版',
      price: '¥29',
      period: '/月',
      description: '适合专业创作者',
      icon: <Crown className="size-6" />,
      features: [
        '每月 500 次图像处理',
        '所有风格转换',
        '高清画质输出',
        '优先处理队列',
        '无水印输出',
        '批量处理',
        'API 访问',
        '邮件支持',
      ],
      buttonText: '立即升级',
      popular: true,
    },
    {
      name: '企业版',
      price: '¥99',
      period: '/月',
      description: '适合团队和企业',
      icon: <Star className="size-6" />,
      features: [
        '无限次图像处理',
        '所有高级功能',
        '4K 超高清输出',
        '专属处理服务器',
        '自定义风格训练',
        '团队协作功能',
        '完整 API 套件',
        '专属客服支持',
        'SLA 保障',
      ],
      buttonText: '联系销售',
      popular: false,
    },
  ];

  return (
    <div className={`min-h-screen transition-colors duration-300 ${themeClasses.background} pt-16`}>
      <div className="mx-auto max-w-7xl px-4 py-12">
        {/* 标题区域 */}
        <div className="mb-16 text-center">
          <h1 className="mb-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-4xl font-bold text-transparent">
            选择适合您的套餐
          </h1>
          <p className={`${themeClasses.textSecondary} mx-auto max-w-2xl text-lg`}>
            无论您是个人创作者还是企业用户，我们都有适合您的解决方案
          </p>
        </div>

        {/* 价格卡片 */}
        <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-3">
          {plans.map((plan, index) => (
            <Card
              key={plan.name}
              className={`relative border-0 transition-all duration-300 ${
                plan.popular ? 'scale-105 ring-2 ring-blue-500' : ''
              } ${themeClasses.cardLarge}`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <Badge className="bg-gradient-to-r from-blue-500 to-purple-600 px-4 py-1 text-white">最受欢迎</Badge>
                </div>
              )}

              <CardHeader className="pb-4 text-center">
                <div
                  className={`mx-auto mb-4 size-16 rounded-full bg-gradient-to-r ${
                    index === 0
                      ? 'from-gray-400 to-gray-600'
                      : index === 1
                        ? 'from-blue-500 to-purple-600'
                        : 'from-purple-500 to-pink-600'
                  } flex items-center justify-center text-white shadow-[0_4px_20px_rgba(59,130,246,0.3)]`}
                >
                  {plan.icon}
                </div>
                <CardTitle className={`text-2xl font-bold ${themeClasses.text}`}>{plan.name}</CardTitle>
                <p className={`${themeClasses.textSecondary} text-sm`}>{plan.description}</p>
                <div className="mt-4">
                  <span className={`text-4xl font-bold ${themeClasses.text}`}>{plan.price}</span>
                  <span className={`${themeClasses.textSecondary} text-lg`}>{plan.period}</span>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <Button
                  className={`w-full ${
                    plan.popular
                      ? 'bg-gradient-to-r from-blue-500 to-purple-600 shadow-[0_4px_20px_rgba(59,130,246,0.3)] hover:from-blue-600 hover:to-purple-700 hover:shadow-[0_8px_30px_rgba(59,130,246,0.4)]'
                      : isDarkMode
                        ? 'bg-gray-700 text-white hover:bg-gray-600'
                        : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                  } transition-all duration-300`}
                  size="lg"
                >
                  {plan.buttonText}
                </Button>

                <div className="space-y-3">
                  <h4 className={`font-semibold ${themeClasses.text}`}>功能包含：</h4>
                  <ul className="space-y-2">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center space-x-3">
                        <Check className="size-4 shrink-0 text-green-500" />
                        <span className={`text-sm ${themeClasses.textSecondary}`}>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {plan.limitations && (
                    <div className="pt-2">
                      <h4 className={`font-semibold ${themeClasses.textMuted} text-sm`}>限制：</h4>
                      <ul className="mt-1 space-y-1">
                        {plan.limitations.map((limitation, limitIndex) => (
                          <li key={limitIndex} className="flex items-center space-x-3">
                            <div className="flex size-4 shrink-0 items-center justify-center">
                              <div className="size-1 rounded-full bg-gray-400"></div>
                            </div>
                            <span className={`text-xs ${themeClasses.textMuted}`}>{limitation}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* FAQ 区域 */}
        <div className="mt-20">
          <h2 className={`text-center text-2xl font-bold ${themeClasses.text} mb-8`}>常见问题</h2>
          <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-2">
            {[
              {
                question: '可以随时取消订阅吗？',
                answer: '是的，您可以随时取消订阅，取消后将在当前计费周期结束时生效。',
              },
              {
                question: '支持哪些支付方式？',
                answer: '我们支持支付宝、微信支付、银行卡等多种支付方式。',
              },
              {
                question: '处理的图片会被保存吗？',
                answer: '我们严格保护用户隐私，处理完成后会自动删除您的图片。',
              },
              {
                question: '企业版有什么特殊服务？',
                answer: '企业版提供专属客服、SLA保障、自定义功能开发等服务。',
              },
            ].map((faq, index) => (
              <Card key={index} className={`border-0 transition-all duration-300 ${themeClasses.card}`}>
                <CardContent className="p-6">
                  <h3 className={`font-semibold ${themeClasses.text} mb-2`}>{faq.question}</h3>
                  <p className={`${themeClasses.textSecondary} text-sm`}>{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
