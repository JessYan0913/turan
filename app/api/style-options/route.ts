import { NextResponse } from 'next/server';

export interface StyleOption {
  id: string;
  name: string;
  description: string;
  preview: string;
}

// Style options for image editing
const styleOptions: StyleOption[] = [
  {
    id: 'watercolor',
    name: '水彩画',
    description: '柔和的水彩风格',
    preview: '/placeholder.svg?height=80&width=120&text=水彩',
  },
  {
    id: 'oil-painting',
    name: '油画',
    description: '经典油画质感',
    preview: '/placeholder.svg?height=80&width=120&text=油画',
  },
  {
    id: 'sketch',
    name: '素描',
    description: '铅笔素描风格',
    preview: '/placeholder.svg?height=80&width=120&text=素描',
  },
  {
    id: 'anime',
    name: '动漫',
    description: '日式动漫风格',
    preview: '/placeholder.svg?height=80&width=120&text=动漫',
  },
  {
    id: 'ghibli',
    name: '吉卜力',
    description: '宫崎骏动画风格',
    preview: '/placeholder.svg?height=80&width=120&text=吉卜力',
  },
  {
    id: 'cyberpunk',
    name: '赛博朋克',
    description: '未来科幻风格',
    preview: '/placeholder.svg?height=80&width=120&text=赛博朋克',
  },
];

// Avatar style options
const avatarStyleOptions: StyleOption[] = [
  {
    id: 'business',
    name: '商务正装',
    description: '专业商务形象',
    preview: '/placeholder.svg?height=80&width=120&text=商务',
  },
  {
    id: 'casual',
    name: '休闲风格',
    description: '轻松自然风格',
    preview: '/placeholder.svg?height=80&width=120&text=休闲',
  },
  {
    id: 'creative',
    name: '创意风格',
    description: '艺术创意形象',
    preview: '/placeholder.svg?height=80&width=120&text=创意',
  },
  {
    id: 'academic',
    name: '学术风格',
    description: '学者专业形象',
    preview: '/placeholder.svg?height=80&width=120&text=学术',
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
