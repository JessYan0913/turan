'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

import { Filter, Search } from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useScopedI18n } from '@/locales/client';

interface WorksFilterProps {
  searchTerm: string;
  filterType: string;
}

export function WorksFilter({ searchTerm: initialSearchTerm, filterType }: WorksFilterProps) {
  const t = useScopedI18n('works');
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const debounceTimer = useRef<NodeJS.Timeout | null>(null);
  // 使用本地状态来管理输入框的值，确保输入框立即响应
  const [searchTerm, setSearchTerm] = useState(initialSearchTerm);

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value) {
        params.set(name, value);
      } else {
        params.delete(name);
      }
      return params.toString();
    },
    [searchParams]
  );

  // 防抖函数
  const debouncedSearch = useCallback(
    (value: string) => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
      debounceTimer.current = setTimeout(() => {
        router.push(`${pathname}?${createQueryString('search', value)}`, { scroll: false });
      }, 300);
    },
    [createQueryString, pathname, router]
  );

  // 组件卸载时清除定时器
  useEffect(() => {
    return () => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
    };
  }, []);

  // 当初始搜索词变化时更新本地状态
  useEffect(() => {
    setSearchTerm(initialSearchTerm);
  }, [initialSearchTerm, setSearchTerm]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    // 立即更新输入框的值，使其跟手
    setSearchTerm(newValue);
    // 对路由更新进行防抖
    debouncedSearch(newValue);
  };

  const handleTypeChange = (value: string) => {
    router.push(`${pathname}?${createQueryString('type', value)}`, { scroll: false });
  };

  return (
    <div className="flex flex-col gap-4 sm:flex-row">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-gray-400" />
        <Input
          placeholder={t('filter.inputPlaceholder')}
          value={searchTerm}
          onChange={handleSearchChange}
          className="pl-10"
        />
      </div>
      <Select value={filterType} onValueChange={handleTypeChange}>
        <SelectTrigger className="w-full sm:w-48">
          <Filter className="mr-2 size-4" />
          <SelectValue placeholder={t('filter.selectPlaceholder')} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">{t('filter.type.all')}</SelectItem>
          <SelectItem value="style-transfer">{t('filter.type.style-transfer')}</SelectItem>
          <SelectItem value="avatar">{t('filter.type.avatar')}</SelectItem>
          <SelectItem value="edit">{t('filter.type.edit')}</SelectItem>
          <SelectItem value="generate">{t('filter.type.generate')}</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
