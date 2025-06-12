'use client';

import { Calendar, Download, Eye, Filter, ImageIcon, Search, Share2, Trash2 } from 'lucide-react';
import Image from 'next/image';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import useSWR from 'swr';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { fetcher } from '@/lib/utils';

export interface WorkInfo {
  id: number;
  title: string;
  type: string;
  originalImage: string;
  processedImage: string;
  style: string;
  createdAt: string;
  status: string;
}

export default function MyWorksPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  // 从 URL 参数中获取筛选条件
  const searchTerm = searchParams.get('search') || '';
  const filterType = searchParams.get('type') || 'all';

  // 更新 URL 参数的函数
  const createQueryString = (name: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(name, value);
    } else {
      params.delete(name);
    }
    return params.toString();
  };

  // 模拟作品数据
  const { data: works = [] } = useSWR<WorkInfo[]>('/api/works', fetcher);

  const filteredWorks = works.filter((work) => {
    const matchesSearch =
      work.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      work.style.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === 'all' || work.type === filterType;
    return matchesSearch && matchesFilter;
  });

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

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-green-100 text-green-700 hover:bg-green-100">已完成</Badge>;
      case 'processing':
        return <Badge className="bg-yellow-100 text-yellow-700 hover:bg-yellow-100">处理中</Badge>;
      case 'failed':
        return <Badge className="bg-red-100 text-red-700 hover:bg-red-100">失败</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return (
    <div className={`min-h-screen pt-16 transition-colors duration-300`}>
      <div className="mx-auto max-w-7xl px-4 py-8">
        {/* 标题和统计 */}
        <div className="mb-8">
          <h1 className="mb-2 text-3xl font-bold">我的作品</h1>
          <p className="text-secondary">
            共 {works.length} 个作品，{works.filter((w) => w.status === 'completed').length} 个已完成
          </p>
        </div>

        {/* 搜索和筛选 */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="搜索作品标题或风格..."
              defaultValue={searchTerm}
              onChange={(e) => {
                const newValue = e.target.value;
                router.push(`${pathname}?${createQueryString('search', newValue)}`, { scroll: false });
              }}
              className="pl-10"
            />
          </div>
          <Select
            value={filterType}
            onValueChange={(value) => {
              router.push(`${pathname}?${createQueryString('type', value)}`, { scroll: false });
            }}
          >
            <SelectTrigger className={`w-full sm:w-48`}>
              <Filter className="mr-2 size-4" />
              <SelectValue placeholder="筛选类型" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">全部类型</SelectItem>
              <SelectItem value="style-transfer">风格转换</SelectItem>
              <SelectItem value="avatar">头像生成</SelectItem>
              <SelectItem value="edit">图像编辑</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* 作品网格 */}
        {filteredWorks.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredWorks.map((work) => (
              <Card key={work.id} className="group border-0 transition-all duration-300">
                <CardContent className="p-0">
                  {/* 图片预览 */}
                  <div className="relative h-48 overflow-hidden rounded-t-lg">
                    <div className="grid h-full grid-cols-2">
                      <div className="relative">
                        <Image
                          src={work.originalImage || '/placeholder.svg'}
                          alt="原图"
                          fill
                          className="object-cover"
                        />
                        <div className="absolute bottom-2 left-2 rounded bg-black/70 px-2 py-1 text-xs text-white">
                          原图
                        </div>
                      </div>
                      <div className="relative">
                        <Image
                          src={work.processedImage || '/placeholder.svg'}
                          alt="处理后"
                          fill
                          className="object-cover"
                        />
                        <div className="absolute bottom-2 right-2 rounded bg-black/70 px-2 py-1 text-xs text-white">
                          {work.style}
                        </div>
                      </div>
                    </div>

                    {/* 悬停操作按钮 */}
                    <div className="absolute inset-0 flex items-center justify-center space-x-2 bg-black/50 opacity-0 transition-opacity group-hover:opacity-100">
                      <Button size="sm" variant="secondary" className="backdrop-blur-sm">
                        <Eye className="size-4" />
                      </Button>
                      <Button size="sm" variant="secondary" className="backdrop-blur-sm">
                        <Download className="size-4" />
                      </Button>
                      <Button size="sm" variant="secondary" className="backdrop-blur-sm">
                        <Share2 className="size-4" />
                      </Button>
                    </div>
                  </div>

                  {/* 作品信息 */}
                  <div className="p-4">
                    <div className="mb-2 flex items-start justify-between">
                      <h3 className="line-clamp-1 font-semibold">{work.title}</h3>
                      {getStatusBadge(work.status)}
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline">{getTypeLabel(work.type)}</Badge>
                      </div>
                      <div className="text-muted-foreground flex items-center space-x-1">
                        <Calendar className="size-3" />
                        <span className="text-xs">{work.createdAt}</span>
                      </div>
                    </div>

                    {/* 操作按钮 */}
                    <div className="mt-4 flex items-center justify-between border-t border-gray-200 pt-3 dark:border-gray-700">
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline" className="transition-all duration-300">
                          <Download className="mr-1 size-3" />
                          下载
                        </Button>
                        <Button size="sm" variant="outline" className={`transition-all duration-300`}>
                          <Share2 className="mr-1 size-3" />
                          分享
                        </Button>
                      </div>
                      <Button size="sm" variant="ghost" className={`transition-all duration-300 `}>
                        <Trash2 className="size-3" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="py-12 text-center">
            <ImageIcon className="text-muted-foreground mx-auto mb-4 size-16" />
            <h3 className="mb-2 text-lg font-semibold">暂无作品</h3>
            <p className="text-muted-foreground mb-4">
              {searchTerm || filterType !== 'all' ? '没有找到匹配的作品' : '开始创作您的第一个作品吧'}
            </p>
            <Button
              className={`'bg-gradient-to-r from-blue-500 to-purple-600 shadow-[0_4px_20px_rgba(59,130,246,0.3)] transition-all duration-300 hover:from-blue-600 hover:to-purple-700 hover:shadow-[0_8px_30px_rgba(59,130,246,0.4)]`}
            >
              开始创作
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
