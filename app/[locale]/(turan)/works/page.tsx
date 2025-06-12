import { Calendar, Download, Eye, ImageIcon, Share2, Trash2 } from 'lucide-react';
import Image from 'next/image';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { WorksFilter } from '@/components/works-filter';
import { auth } from '@/lib/auth';
import { getWorks } from '@/lib/db/queries';
import { type Work, type WorkType } from '@/lib/db/schema';

// 扩展 Work 类型，添加前端需要的额外字段
export interface WorkInfo extends Omit<Work, 'createdAt'> {
  createdAt: string; // 日期格式化为字符串
  status: string; // 添加状态字段
  originalImage: string; // 确保不为 null
  processedImage: string; // 确保不为 null
}

export default async function MyWorksPage({
  searchParams,
}: {
  searchParams: Promise<{ search?: string; type?: string }>;
}) {
  // 从 URL 参数中获取筛选条件
  const { search, type } = await searchParams;
  const searchTerm = search || '';
  const filterType = type || 'all';

  // 获取当前用户会话
  const session = await auth();
  const userId = session?.user?.id;

  // 直接从数据库查询作品数据
  let works: WorkInfo[] = [];

  try {
    if (userId) {
      // 如果用户已登录，查询其作品
      const result = await getWorks({
        userId,
        searchTerm,
        ...(filterType !== 'all' ? { type: filterType as WorkType } : {}),
        limit: 50,
        offset: 0,
      });

      // 处理作品数据，确保前端需要的字段都存在
      works = result.items.map((work) => ({
        ...work,
        // 确保日期格式化为字符串
        createdAt: work.createdAt instanceof Date ? work.createdAt.toISOString().split('T')[0] : String(work.createdAt),
        // 添加状态字段，根据completedAt判断
        status: work.completedAt ? 'completed' : 'processing',
        // 确保图片路径有效，如果为空则使用占位图
        originalImage: work.originalImage || '/placeholder.svg?text=原图',
        processedImage: work.processedImage || '/placeholder.svg?text=处理中',
      })) as WorkInfo[];
    } else {
      console.log('用户未登录，无法获取作品数据');
    }
  } catch (error) {
    console.error('获取作品数据时发生错误:', error);
    // 出错时返回空数组，而不是抛出错误
  }

  // 不再需要在服务器组件中定义客户端回调函数

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'style-transfer':
        return '风格转换';
      case 'avatar':
        return '头像生成';
      case 'edit':
        return '图像编辑';
      default:
        return type;
    }
  };

  return (
    <div className={`min-h-screen pt-16 transition-colors duration-300`}>
      <div className="mx-auto max-w-7xl px-4 py-8">
        {/* 标题和统计 */}
        <div className="mb-8">
          <h1 className="mb-2 text-3xl font-bold">我的作品</h1>
        </div>

        {/* 搜索和筛选 */}
        <WorksFilter searchTerm={searchTerm} filterType={filterType} />

        {/* 作品瀑布流 */}
        {works.length > 0 ? (
          <div className="columns-1 gap-4 space-y-4 sm:columns-2 md:columns-3 lg:columns-4">
            {works.map((work: WorkInfo) => (
              <div
                key={work.id}
                className="group relative mb-4 break-inside-avoid overflow-hidden rounded-lg bg-white shadow-sm transition-all duration-300 hover:shadow-md dark:bg-gray-800"
              >
                {/* 图片展示 - 主图片 */}
                <div className="relative aspect-[4/3] w-full overflow-hidden">
                  <Image
                    src={work.processedImage || '/placeholder.svg'}
                    alt={work.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                {/* 悬停时显示的信息层 */}
                <div className="absolute inset-0 flex flex-col justify-between bg-gradient-to-t from-black/80 via-black/30 to-black/50 opacity-0 backdrop-blur-[2px] transition-all duration-300 group-hover:opacity-100">
                  {/* 顶部区域：标签和删除按钮 */}
                  <div className="flex items-start justify-between p-4">
                    <div className="flex gap-2">
                      <Badge variant="outline" className="border-white/20 bg-white/20 text-white backdrop-blur-sm">
                        {getTypeLabel(work.type)}
                      </Badge>
                      <Badge variant="outline" className="border-white/20 bg-white/20 text-white backdrop-blur-sm">
                        {work.style}
                      </Badge>
                    </div>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="size-8 rounded-full bg-red-500/20 text-red-200 transition-colors hover:bg-red-500/40 hover:text-white"
                    >
                      <Trash2 className="size-4" />
                    </Button>
                  </div>

                  {/* 底部区域：标题、日期和操作按钮 */}
                  <div className="bg-gradient-to-t from-black/90 to-transparent p-4">
                    <h3 className="mb-2 text-lg font-medium text-white drop-shadow-md">{work.title}</h3>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-xs text-gray-200">
                        <Calendar className="mr-1 size-3" />
                        {work.createdAt}
                      </div>

                      {/* 操作按钮组 */}
                      <div className="flex space-x-2">
                        <Button
                          size="icon"
                          variant="ghost"
                          className="size-8 rounded-full bg-white/20 backdrop-blur-sm transition-colors hover:bg-white/40 hover:text-white"
                        >
                          <Eye className="size-4 text-white" />
                        </Button>
                        <Button
                          size="icon"
                          variant="ghost"
                          className="size-8 rounded-full bg-white/20 backdrop-blur-sm transition-colors hover:bg-white/40 hover:text-white"
                        >
                          <Download className="size-4 text-white" />
                        </Button>
                        <Button
                          size="icon"
                          variant="ghost"
                          className="size-8 rounded-full bg-white/20 backdrop-blur-sm transition-colors hover:bg-white/40 hover:text-white"
                        >
                          <Share2 className="size-4 text-white" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-16 text-center">
            <div className="mx-auto mb-6 flex size-24 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800">
              <ImageIcon className="text-muted-foreground size-12" />
            </div>
            <h3 className="mb-3 text-xl font-semibold">暂无作品</h3>
            <p className="text-muted-foreground mx-auto mb-6 max-w-md">
              {searchTerm || filterType !== 'all'
                ? '没有找到匹配的作品'
                : '开始创作您的第一个作品，展示您的创意和才华吧'}
            </p>
            <Button
              size="lg"
              className="bg-gradient-to-r from-blue-500 to-purple-600 shadow-[0_4px_20px_rgba(59,130,246,0.3)] transition-all duration-300 hover:from-blue-600 hover:to-purple-700 hover:shadow-[0_8px_30px_rgba(59,130,246,0.4)]"
            >
              开始创作
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
