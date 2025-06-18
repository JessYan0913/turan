'use server';

export interface StyleOption {
  id: string;
  name: string;
  description: string;
  preview: string;
  prompt: string;
}

export async function getStyleOptions(): Promise<StyleOption[]> {
  return [
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
      preview:
        'https://2hav3s1paktcascm.public.blob.vercel-storage.com/oil_painting-AYBJF8kmuP2EJNF2gaD9qKSJi9SYZq.jpg',
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
}

export async function getAvatarStyleOptions(): Promise<StyleOption[]> {
  return [
    {
      id: 'business',
      name: '办公室',
      description: '办公室背景',
      preview:
        'https://2hav3s1paktcascm.public.blob.vercel-storage.com/office_avatar-yNQWPgDzMMkSiQKXIYwm1UYJ6HIGMP.png',
      prompt: '',
    },
    {
      id: 'white',
      name: '白墙',
      description: '白墙背景',
      preview:
        'https://2hav3s1paktcascm.public.blob.vercel-storage.com/white_avatar-JvRwOQfcHHbfZPx59uP8rxSYUkgQ2r.png',
      prompt: '',
    },
    {
      id: 'black',
      name: '黑色',
      description: '黑色背景',
      preview:
        'https://2hav3s1paktcascm.public.blob.vercel-storage.com/black_avatar-eYtanXGd6DlkY49rsAeDTUKKo1ODI8.png',
      prompt: '',
    },
    {
      id: 'gray',
      name: '灰色',
      description: '灰色背景',
      preview: 'https://2hav3s1paktcascm.public.blob.vercel-storage.com/gray_avatar-lF72k0HPKpynoHNBPplvVBiDVAUKj1.png',
      prompt: '',
    },
  ];
}
