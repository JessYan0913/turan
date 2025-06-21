'use client';

import { useState } from 'react';

import { CreateAvatar } from '@/components/create-avatar';
import { ImageEdit } from '@/components/image-edit';
import { StyleTransfer } from '@/components/style-transfer';
import { TextToImage } from '@/components/text-to-image';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useScopedI18n } from '@/locales/client';

export function MainTabs() {
  const [activeTab, setActiveTab] = useState('generate');
  const t = useScopedI18n('home');

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
      <div className="mx-auto mb-8 max-w-3xl px-4">
        <TabsList className="tabs-list grid h-auto w-full grid-cols-4 gap-0.5 overflow-hidden rounded-xl bg-gray-100 p-1 dark:bg-gray-800">
          <TabsTrigger
            value="generate"
            className="relative flex-1 rounded-lg px-3 py-2.5 text-center text-sm font-medium transition-all duration-200 data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-sm dark:data-[state=active]:bg-gray-700 dark:data-[state=active]:text-blue-400"
          >
            <span className="relative z-10">{t('tabs.generate')}</span>
          </TabsTrigger>
          <TabsTrigger
            value="edit"
            className="relative flex-1 rounded-lg px-3 py-2.5 text-center text-sm font-medium transition-all duration-200 data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-sm dark:data-[state=active]:bg-gray-700 dark:data-[state=active]:text-blue-400"
          >
            <span className="relative z-10">{t('tabs.edit')}</span>
          </TabsTrigger>
          <TabsTrigger
            value="style"
            className="relative flex-1 rounded-lg px-3 py-2.5 text-center text-sm font-medium transition-all duration-200 data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-sm dark:data-[state=active]:bg-gray-700 dark:data-[state=active]:text-blue-400"
          >
            <span className="relative z-10">{t('tabs.style')}</span>
          </TabsTrigger>
          <TabsTrigger
            value="avatar"
            className="relative flex-1 rounded-lg px-3 py-2.5 text-center text-sm font-medium transition-all duration-200 data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-sm dark:data-[state=active]:bg-gray-700 dark:data-[state=active]:text-blue-400"
          >
            <span className="relative z-10">{t('tabs.avatar')}</span>
          </TabsTrigger>
        </TabsList>
      </div>

      {/* Fixed height content area to prevent layout shift */}
      <div className="min-h-[600px] rounded-xl p-4 md:p-6">
        <TabsContent value="edit" className="mt-0">
          <ImageEdit />
        </TabsContent>

        <TabsContent value="style" className="mt-0">
          <StyleTransfer />
        </TabsContent>

        <TabsContent value="avatar" className="mt-0">
          <CreateAvatar />
        </TabsContent>

        <TabsContent value="generate" className="mt-0">
          <TextToImage />
        </TabsContent>
      </div>
    </Tabs>
  );
}
