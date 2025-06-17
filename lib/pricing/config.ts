export type PlanId = 'free' | 'pro' | 'enterprise' | 'basic';

export type PlanPeriod = 'Month' | 'Year';

export interface Plan {
  id: PlanId;
  price: string;
  period: PlanPeriod;
  amount: number;
  features: string[];
  limitations?: string[];
  popular: boolean;
}

export const PLANS: Plan[] = [
  {
    id: 'free',
    price: '¥0',
    period: 'Month',
    amount: 30,
    features: [
      '30 credits per montxh',
      'Generate Image: 1 credit per image',
      'Image Edit/Style Transform: 15 credits per operation',
      'Standard quality output',
      'Community support',
      'Watermark output',
    ],
    limitations: ['Limited processing speed', 'Basic features only', 'Credits expire monthly'],
    popular: false,
  },
  {
    id: 'basic',
    price: '¥19',
    period: 'Month',
    amount: 300,
    features: [
      '300 credits per month',
      'Generate Image: 1 credit per image',
      'Image Edit/Style Transform: 15 credits per operation',
      'High quality output',
      'Normal processing speed',
      'No watermark',
      'Email support',
    ],
    popular: true,
  },
  {
    id: 'pro',
    price: '¥49',
    period: 'Month',
    amount: 1000,
    features: [
      '1000 credits per month',
      'Generate Image: 1 credit per image',
      'Image Edit/Style Transform: 15 credits per operation',
      'High quality output',
      'Priority processing',
      'Batch processing (up to 10 images)',
      'API access',
      'Email support',
    ],
    popular: false,
  },
  {
    id: 'enterprise',
    price: '¥99',
    period: 'Month',
    amount: 2500,
    features: [
      '2500 credits per month',
      'Generate Image: 1 credit per image',
      'Image Edit/Style Transform: 15 credits per operation',
      '4K ultra HD output',
      'Exclusive processing server',
      'Batch processing (unlimited)',
      'Team collaboration features',
      'Complete API suite',
      'Dedicated customer support',
      'SLA guarantee',
    ],
    popular: false,
  },
];
