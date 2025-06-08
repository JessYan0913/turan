'use client';

import { useState } from 'react';

import { Calendar, Download, Eye, Filter, ImageIcon, Search, Share2, Trash2 } from 'lucide-react';
import Image from 'next/image';

import { Navigation } from '@/components/navigation';
import { useTheme } from '@/components/theme-provider';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function MyWorksPage() {
  const { isDarkMode, toggleTheme, themeClasses } = useTheme();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');

  // 模拟作品数据
  const works = [
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
    <div className={`min-h-screen transition-colors duration-300 ${themeClasses.background}`}>
      <Navigation isDarkMode={isDarkMode} toggleTheme={toggleTheme} themeClasses={themeClasses} />

      <div className="mx-auto max-w-7xl px-4 py-8">
        {/* 标题和统计 */}
        <div className="mb-8">
          <h1 className={`text-3xl font-bold ${themeClasses.text} mb-2`}>我的作品</h1>
          <p className={`${themeClasses.textSecondary}`}>
            共 {works.length} 个作品，{works.filter((w) => w.status === 'completed').length} 个已完成
          </p>
        </div>

        {/* 搜索和筛选 */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="搜索作品标题或风格..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`pl-10 ${themeClasses.textarea}`}
            />
          </div>
          <Select value={filterType} onValueChange={setFilterType}>
            <SelectTrigger className={`w-full sm:w-48 ${isDarkMode ? 'border-gray-700 bg-gray-800 text-white' : ''}`}>
              <Filter className="mr-2 size-4" />
              <SelectValue placeholder="筛选类型" />
            </SelectTrigger>
            <SelectContent className={isDarkMode ? 'border-gray-700 bg-gray-800' : ''}>
              <SelectItem value="all" className={isDarkMode ? 'text-white hover:bg-gray-700' : ''}>
                全部类型
              </SelectItem>
              <SelectItem value="style-transfer" className={isDarkMode ? 'text-white hover:bg-gray-700' : ''}>
                风格转换
              </SelectItem>
              <SelectItem value="avatar" className={isDarkMode ? 'text-white hover:bg-gray-700' : ''}>
                头像生成
              </SelectItem>
              <SelectItem value="edit" className={isDarkMode ? 'text-white hover:bg-gray-700' : ''}>
                图像编辑
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* 作品网格 */}
        {filteredWorks.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredWorks.map((work) => (
              <Card key={work.id} className={`group border-0 transition-all duration-300 ${themeClasses.card}`}>
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
                      <Button
                        size="sm"
                        variant="secondary"
                        className={`${
                          isDarkMode
                            ? 'border-gray-600/50 bg-gray-800/90 text-white hover:bg-gray-700'
                            : 'bg-white/90 text-gray-800 hover:bg-white'
                        } backdrop-blur-sm`}
                      >
                        <Eye className="size-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="secondary"
                        className={`${
                          isDarkMode
                            ? 'border-gray-600/50 bg-gray-800/90 text-white hover:bg-gray-700'
                            : 'bg-white/90 text-gray-800 hover:bg-white'
                        } backdrop-blur-sm`}
                      >
                        <Download className="size-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="secondary"
                        className={`${
                          isDarkMode
                            ? 'border-gray-600/50 bg-gray-800/90 text-white hover:bg-gray-700'
                            : 'bg-white/90 text-gray-800 hover:bg-white'
                        } backdrop-blur-sm`}
                      >
                        <Share2 className="size-4" />
                      </Button>
                    </div>
                  </div>

                  {/* 作品信息 */}
                  <div className="p-4">
                    <div className="mb-2 flex items-start justify-between">
                      <h3 className={`font-semibold ${themeClasses.text} line-clamp-1`}>{work.title}</h3>
                      {getStatusBadge(work.status)}
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline" className={isDarkMode ? 'border-gray-600 text-gray-300' : ''}>
                          {getTypeLabel(work.type)}
                        </Badge>
                      </div>
                      <div className={`flex items-center space-x-1 ${themeClasses.textMuted}`}>
                        <Calendar className="size-3" />
                        <span className="text-xs">{work.createdAt}</span>
                      </div>
                    </div>

                    {/* 操作按钮 */}
                    <div className="mt-4 flex items-center justify-between border-t border-gray-200 pt-3 dark:border-gray-700">
                      <div className="flex space-x-2">
                        <Button
                          size="sm"
                          variant="outline"
                          className={`transition-all duration-300 ${
                            isDarkMode
                              ? 'border-gray-600/50 bg-gray-700/60 text-gray-200 shadow-[0_2px_12px_rgba(0,0,0,0.2)] hover:border-gray-500/70 hover:bg-gray-600/80 hover:text-white hover:shadow-[0_4px_20px_rgba(0,0,0,0.3)]'
                              : 'border-gray-200/60 bg-white/80 text-gray-600 shadow-[0_1px_8px_rgba(0,0,0,0.05)] hover:border-gray-300/80 hover:bg-white hover:text-gray-800 hover:shadow-[0_2px_16px_rgba(0,0,0,0.1)]'
                          }`}
                        >
                          <Download className="mr-1 size-3" />
                          下载
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className={`transition-all duration-300 ${
                            isDarkMode
                              ? 'border-gray-600/50 bg-gray-700/60 text-gray-200 shadow-[0_2px_12px_rgba(0,0,0,0.2)] hover:border-gray-500/70 hover:bg-gray-600/80 hover:text-white hover:shadow-[0_4px_20px_rgba(0,0,0,0.3)]'
                              : 'border-gray-200/60 bg-white/80 text-gray-600 shadow-[0_1px_8px_rgba(0,0,0,0.05)] hover:border-gray-300/80 hover:bg-white hover:text-gray-800 hover:shadow-[0_2px_16px_rgba(0,0,0,0.1)]'
                          }`}
                        >
                          <Share2 className="mr-1 size-3" />
                          分享
                        </Button>
                      </div>
                      <Button
                        size="sm"
                        variant="ghost"
                        className={`transition-all duration-300 ${
                          isDarkMode
                            ? 'text-red-400 hover:bg-red-900/20 hover:text-red-300'
                            : 'text-red-500 hover:bg-red-50 hover:text-red-600'
                        }`}
                      >
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
            <ImageIcon className={`mx-auto size-16 ${themeClasses.textMuted} mb-4`} />
            <h3 className={`text-lg font-semibold ${themeClasses.text} mb-2`}>暂无作品</h3>
            <p className={`${themeClasses.textSecondary} mb-4`}>
              {searchTerm || filterType !== 'all' ? '没有找到匹配的作品' : '开始创作您的第一个作品吧'}
            </p>
            <Button
              className={`transition-all duration-300 ${
                isDarkMode
                  ? 'bg-gradient-to-r from-blue-600 to-purple-700 shadow-[0_4px_24px_rgba(59,130,246,0.4)] hover:from-blue-700 hover:to-purple-800 hover:shadow-[0_8px_32px_rgba(59,130,246,0.5)]'
                  : 'bg-gradient-to-r from-blue-500 to-purple-600 shadow-[0_4px_20px_rgba(59,130,246,0.3)] hover:from-blue-600 hover:to-purple-700 hover:shadow-[0_8px_30px_rgba(59,130,246,0.4)]'
              }`}
            >
              开始创作
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
