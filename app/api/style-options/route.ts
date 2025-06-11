import { NextResponse } from 'next/server';

export interface StyleOption {
  id: string;
  name: string;
  description: string;
  preview: string;
  prompt: string;
}

// Style options for image editing
const styleOptions: StyleOption[] = [
  {
    id: 'watercolor',
    name: '水彩画',
    description: '柔和的水彩风格',
    preview: 'https://2hav3s1paktcascm.public.blob.vercel-storage.com/watercolor-Z8JH4ZSxghGP6sLe52NWv7Bx4vHEvt.jpg',
    prompt: 'watercolor style',
  },
  {
    id: 'oil-painting',
    name: '油画',
    description: '经典油画质感',
    preview: 'https://2hav3s1paktcascm.public.blob.vercel-storage.com/oil_painting-AYBJF8kmuP2EJNF2gaD9qKSJi9SYZq.jpg',
    prompt: 'oil painting style',
  },
  {
    id: 'sketch',
    name: '素描',
    description: '铅笔素描风格',
    preview: 'https://2hav3s1paktcascm.public.blob.vercel-storage.com/sketch-6oXiC1pkS2IESTeBTP7pUAHNjwfaHa.jpg',
    prompt: 'sketch style',
  },
  {
    id: 'anime',
    name: '动漫',
    description: '日式动漫风格',
    preview:
      'https://2hav3s1paktcascm.public.blob.vercel-storage.com/japanese_anime-e5mmAcpzirq73IYmNgmNUNw6waN57A.jpg',
    prompt: 'japanese anime style',
  },
  {
    id: 'ghibli',
    name: '吉卜力',
    description: '宫崎骏动画风格',
    preview: 'https://2hav3s1paktcascm.public.blob.vercel-storage.com/ghibli-HXo6xKMUTK9PYLrhIMW5YZpbadrI0Q.jpg',
    prompt: 'ghibli style',
  },
  {
    id: 'cyberpunk',
    name: '赛博朋克',
    description: '未来科幻风格',
    preview: 'https://2hav3s1paktcascm.public.blob.vercel-storage.com/cyberpunk-lrumHLuIWlhLfhCf82TQopwq4JZiuB.jpg',
    prompt: 'cyberpunk style',
  },
];

// Avatar style options
const avatarStyleOptions: StyleOption[] = [
  {
    id: 'business',
    name: '商务正装',
    description: '专业商务形象',
    preview: '/placeholder.svg?height=80&width=120&text=商务',
    prompt: 'business style',
  },
  {
    id: 'casual',
    name: '休闲风格',
    description: '轻松自然风格',
    preview: '/placeholder.svg?height=80&width=120&text=休闲',
    prompt: 'casual style',
  },
  {
    id: 'creative',
    name: '创意风格',
    description: '艺术创意形象',
    preview: '/placeholder.svg?height=80&width=120&text=创意',
    prompt: 'creative style',
  },
  {
    id: 'academic',
    name: '学术风格',
    description: '学者专业形象',
    preview: '/placeholder.svg?height=80&width=120&text=学术',
    prompt: 'academic style',
  },
];

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const tab = searchParams.get('tab') || 'style'; // Default to 'style' if no tab specified

  // Validate tab parameter
  if (tab !== 'style' && tab !== 'avatar') {
    return NextResponse.json(
      {
        success: false,
        message: 'Invalid tab parameter. Must be either "style" or "avatar"',
      },
      { status: 400 }
    );
  }
  try {
    // Return only the requested style options based on tab
    return NextResponse.json(tab === 'style' ? styleOptions : avatarStyleOptions);
  } catch (error) {
    console.error('Error fetching style options:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to load style options',
      },
      { status: 500 }
    );
  }
}
