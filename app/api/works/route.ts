import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  // 获取查询参数
  const searchParams = request.nextUrl.searchParams;
  const searchTerm = searchParams.get('search') || '';
  const filterType = searchParams.get('type') || 'all';

  // 模拟数据库中的作品数据
  const allWorks = [
    {
      id: 1,
      title: '风景照片风格转换',
      type: 'style-transfer',
      originalImage: '/placeholder.svg?height=200&width=300&text=原图1',
      processedImage: '/placeholder.svg?height=200&width=300&text=水彩风格',
      style: '水彩画',
      createdAt: '2024-01-15',
      status: 'completed',
    },
    {
      id: 2,
      title: '商务头像生成',
      type: 'avatar',
      originalImage: '/placeholder.svg?height=200&width=300&text=原图2',
      processedImage: '/placeholder.svg?height=200&width=300&text=商务头像',
      style: '商务正装',
      createdAt: '2024-01-14',
      status: 'completed',
    },
    {
      id: 3,
      title: '背景替换编辑',
      type: 'edit',
      originalImage: '/placeholder.svg?height=200&width=300&text=原图3',
      processedImage: '/placeholder.svg?height=200&width=300&text=新背景',
      style: '背景替换',
      createdAt: '2024-01-13',
      status: 'processing',
    },
    {
      id: 4,
      title: '人像油画风格',
      type: 'style-transfer',
      originalImage: '/placeholder.svg?height=200&width=300&text=原图4',
      processedImage: '/placeholder.svg?height=200&width=300&text=油画风格',
      style: '油画',
      createdAt: '2024-01-12',
      status: 'completed',
    },
    {
      id: 5,
      title: '创意头像设计',
      type: 'avatar',
      originalImage: '/placeholder.svg?height=200&width=300&text=原图5',
      processedImage: '/placeholder.svg?height=200&width=300&text=创意头像',
      style: '创意风格',
      createdAt: '2024-01-11',
      status: 'completed',
    },
    {
      id: 6,
      title: '物体移除编辑',
      type: 'edit',
      originalImage: '/placeholder.svg?height=200&width=300&text=原图6',
      processedImage: '/placeholder.svg?height=200&width=300&text=移除物体',
      style: '物体移除',
      createdAt: '2024-01-10',
      status: 'completed',
    },
  ];

  // 根据查询参数过滤作品
  const filteredWorks = allWorks.filter((work) => {
    const matchesSearch =
      searchTerm === '' ||
      work.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      work.style.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === 'all' || work.type === filterType;
    return matchesSearch && matchesFilter;
  });

  return NextResponse.json(filteredWorks, { status: 200 });
}
