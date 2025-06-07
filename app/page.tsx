"use client"

import type React from "react"

import { useState } from "react"
import { Upload, ImageIcon, Sparkles, ArrowRight, Wand2, Camera, Edit3, Palette, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ImageSlider } from "@/components/image-slider"
import { StyleSelector } from "@/components/style-selector"
import { Navigation } from "@/components/navigation"
import { useTheme } from "@/components/theme-provider"
import Image from "next/image"

export default function HomePage() {
  const { isDarkMode, toggleTheme, themeClasses } = useTheme()
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [resultImage, setResultImage] = useState<string | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [prompt, setPrompt] = useState("")
  const [activeTab, setActiveTab] = useState("edit")
  const [selectedStyle, setSelectedStyle] = useState("")
  const [selectedAvatarStyle, setSelectedAvatarStyle] = useState("")

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string)
        setResultImage(null)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleProcess = async () => {
    if (!selectedImage) return

    setIsProcessing(true)

    // 模拟处理过程
    setTimeout(() => {
      setResultImage(selectedImage) // 临时使用原图作为结果
      setIsProcessing(false)
    }, 2000)
  }

  const handleDownload = () => {
    if (resultImage) {
      const link = document.createElement("a")
      link.href = resultImage
      link.download = "edited-image.png"
      link.click()
    }
  }

  // 风格选项
  const styleOptions = [
    {
      id: "watercolor",
      name: "水彩画",
      description: "柔和的水彩风格",
      preview: "/placeholder.svg?height=80&width=120&text=水彩",
    },
    {
      id: "oil-painting",
      name: "油画",
      description: "经典油画质感",
      preview: "/placeholder.svg?height=80&width=120&text=油画",
    },
    {
      id: "sketch",
      name: "素描",
      description: "铅笔素描风格",
      preview: "/placeholder.svg?height=80&width=120&text=素描",
    },
    {
      id: "anime",
      name: "动漫",
      description: "日式动漫风格",
      preview: "/placeholder.svg?height=80&width=120&text=动漫",
    },
    {
      id: "ghibli",
      name: "吉卜力",
      description: "宫崎骏动画风格",
      preview: "/placeholder.svg?height=80&width=120&text=吉卜力",
    },
    {
      id: "cyberpunk",
      name: "赛博朋克",
      description: "未来科幻风格",
      preview: "/placeholder.svg?height=80&width=120&text=赛博朋克",
    },
  ]

  // 头像风格选项
  const avatarStyleOptions = [
    {
      id: "business",
      name: "商务正装",
      description: "专业商务形象",
      preview: "/placeholder.svg?height=80&width=120&text=商务",
    },
    {
      id: "casual",
      name: "休闲风格",
      description: "轻松自然风格",
      preview: "/placeholder.svg?height=80&width=120&text=休闲",
    },
    {
      id: "creative",
      name: "创意风格",
      description: "艺术创意形象",
      preview: "/placeholder.svg?height=80&width=120&text=创意",
    },
    {
      id: "academic",
      name: "学术风格",
      description: "学者专业形象",
      preview: "/placeholder.svg?height=80&width=120&text=学术",
    },
  ]

  return (
    <div className={`min-h-screen transition-colors duration-300 ${themeClasses.background}`}>
      <Navigation isDarkMode={isDarkMode} toggleTheme={toggleTheme} themeClasses={themeClasses} />

      <div className="p-4 md:p-8">
        <div className="max-w-6xl mx-auto">
          {/* 固定的标题区域 */}
          <div className="text-center mb-10">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-3">
              图然 Turan
            </h1>
            <p className={`${themeClasses.textSecondary} text-lg`}>每一次生成，都是用心呈现</p>
          </div>

          {/* 主要功能区 */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className={`grid grid-cols-3 w-full max-w-md mx-auto mb-8 ${themeClasses.tabsList}`}>
              <TabsTrigger value="edit" className={themeClasses.tabsTrigger}>
                图像编辑
              </TabsTrigger>
              <TabsTrigger value="style" className={themeClasses.tabsTrigger}>
                风格转换
              </TabsTrigger>
              <TabsTrigger value="avatar" className={themeClasses.tabsTrigger}>
                头像生成
              </TabsTrigger>
            </TabsList>

            {/* 固定高度的内容区域，避免抖动 */}
            <div className="min-h-[600px]">
              {/* 图像编辑功能 */}
              <TabsContent value="edit" className="mt-0">
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <Card className={`overflow-hidden border-0 transition-all duration-300 ${themeClasses.cardLarge}`}>
                      <CardContent className="p-0">
                        {/* 上传区域 */}
                        <div className={`${themeClasses.uploadArea} p-8 text-center`}>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="hidden"
                            id="image-upload"
                          />
                          <label htmlFor="image-upload" className="cursor-pointer block">
                            {selectedImage ? (
                              <div className="relative group">
                                <Image
                                  src={selectedImage || "/placeholder.svg"}
                                  alt="上传的图片"
                                  width={400}
                                  height={300}
                                  className="mx-auto rounded-lg object-contain max-h-[300px] shadow-lg"
                                />
                                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all rounded-lg flex items-center justify-center">
                                  <p className="text-white bg-black bg-opacity-70 px-4 py-2 rounded-full text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                                    点击更换图片
                                  </p>
                                </div>
                              </div>
                            ) : (
                              <div
                                className={`border-2 border-dashed ${themeClasses.uploadBorder} rounded-xl p-12 ${themeClasses.uploadBg} transition-all`}
                              >
                                <Upload className="w-12 h-12 mx-auto text-blue-400 mb-3" />
                                <p className={`${themeClasses.text} font-medium`}>点击上传图片</p>
                                <p className={`${themeClasses.textMuted} text-sm mt-1`}>支持 JPG, PNG, WebP 格式</p>
                              </div>
                            )}
                          </label>
                        </div>
                      </CardContent>
                    </Card>

                    {/* 编辑指令输入 */}
                    <div className="space-y-4">
                      <Textarea
                        placeholder="描述您想要的编辑效果，例如：'将背景换成蓝天白云'、'修改发型为短发'..."
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        rows={3}
                        className={`resize-none ${themeClasses.textarea} border-0 transition-all duration-300 focus:shadow-[0_8px_30px_rgba(59,130,246,0.15)]`}
                      />
                      <Button
                        onClick={handleProcess}
                        disabled={!selectedImage || isProcessing}
                        className={`w-full transition-all duration-300 ${themeClasses.buttonPrimary}`}
                        size="lg"
                      >
                        {isProcessing ? (
                          <>
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                            处理中...
                          </>
                        ) : (
                          <>
                            <Sparkles className="w-4 h-4 mr-2" />
                            开始编辑
                          </>
                        )}
                      </Button>
                    </div>
                  </div>

                  {/* 结果展示 */}
                  <div>
                    <Card
                      className={`overflow-hidden border-0 transition-all duration-300 ${themeClasses.cardLarge} h-full`}
                    >
                      <CardContent className="p-0 h-full">
                        <div className={`${themeClasses.resultArea} p-8 text-center h-full flex flex-col`}>
                          <div className="flex-1 flex items-center justify-center">
                            {resultImage ? (
                              <div className="space-y-4">
                                <Image
                                  src={resultImage || "/placeholder.svg"}
                                  alt="处理结果"
                                  width={400}
                                  height={300}
                                  className="mx-auto rounded-lg object-contain max-h-[300px] shadow-lg"
                                />
                                <div className="inline-flex items-center px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm font-medium">
                                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                                  处理完成
                                </div>
                              </div>
                            ) : isProcessing ? (
                              <div className="space-y-4">
                                <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-500 rounded-full animate-spin mx-auto"></div>
                                <p className={`${themeClasses.text} font-medium`}>AI正在处理您的图片...</p>
                              </div>
                            ) : (
                              <div className="space-y-3">
                                <ImageIcon className={`w-16 h-16 mx-auto ${themeClasses.textMuted}`} />
                                <p className={themeClasses.textMuted}>编辑结果将在这里显示</p>
                              </div>
                            )}
                          </div>

                          {resultImage && (
                            <Button
                              onClick={handleDownload}
                              variant="outline"
                              className={`mt-4 transition-all duration-300 ${themeClasses.buttonSecondary}`}
                            >
                              <ArrowRight className="w-4 h-4 mr-2" />
                              下载图片
                            </Button>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>

              {/* 风格转换功能 */}
              <TabsContent value="style" className="mt-0">
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <Card className={`overflow-hidden border-0 transition-all duration-300 ${themeClasses.cardLarge}`}>
                      <CardContent className="p-0">
                        {/* 上传区域 */}
                        <div className={`${themeClasses.uploadArea} p-8 text-center`}>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="hidden"
                            id="style-image-upload"
                          />
                          <label htmlFor="style-image-upload" className="cursor-pointer block">
                            {selectedImage ? (
                              <div className="relative group">
                                <Image
                                  src={selectedImage || "/placeholder.svg"}
                                  alt="上传的图片"
                                  width={400}
                                  height={300}
                                  className="mx-auto rounded-lg object-contain max-h-[300px] shadow-lg"
                                />
                                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all rounded-lg flex items-center justify-center">
                                  <p className="text-white bg-black bg-opacity-70 px-4 py-2 rounded-full text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                                    点击更换图片
                                  </p>
                                </div>
                              </div>
                            ) : (
                              <div
                                className={`border-2 border-dashed ${themeClasses.uploadBorder} rounded-xl p-12 ${themeClasses.uploadBg} transition-all`}
                              >
                                <Upload className="w-12 h-12 mx-auto text-blue-400 mb-3" />
                                <p className={`${themeClasses.text} font-medium`}>点击上传图片</p>
                                <p className={`${themeClasses.textMuted} text-sm mt-1`}>支持 JPG, PNG, WebP 格式</p>
                              </div>
                            )}
                          </label>
                        </div>
                      </CardContent>
                    </Card>

                    {/* 风格选择器 */}
                    <div className="space-y-4">
                      <StyleSelector
                        options={styleOptions}
                        value={selectedStyle}
                        onSelect={(style) => {
                          setSelectedStyle(style.id)
                          setPrompt(`将图片转换为${style.name}风格`)
                        }}
                        placeholder="选择艺术风格"
                        isDarkMode={isDarkMode}
                      />

                      <Button
                        onClick={handleProcess}
                        disabled={!selectedImage || isProcessing}
                        className={`w-full transition-all duration-300 ${themeClasses.buttonPrimary}`}
                        size="lg"
                      >
                        {isProcessing ? (
                          <>
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                            转换中...
                          </>
                        ) : (
                          <>
                            <Palette className="w-4 h-4 mr-2" />
                            开始转换
                          </>
                        )}
                      </Button>
                    </div>
                  </div>

                  {/* 结果展示 */}
                  <div>
                    <Card
                      className={`overflow-hidden border-0 transition-all duration-300 ${themeClasses.cardLarge} h-full`}
                    >
                      <CardContent className="p-0 h-full">
                        <div className={`${themeClasses.resultArea} p-8 text-center h-full flex flex-col`}>
                          <div className="flex-1 flex items-center justify-center">
                            {resultImage ? (
                              <div className="space-y-4">
                                <Image
                                  src={resultImage || "/placeholder.svg"}
                                  alt="处理结果"
                                  width={400}
                                  height={300}
                                  className="mx-auto rounded-lg object-contain max-h-[300px] shadow-lg"
                                />
                                <div className="inline-flex items-center px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm font-medium">
                                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                                  转换完成
                                </div>
                              </div>
                            ) : isProcessing ? (
                              <div className="space-y-4">
                                <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-500 rounded-full animate-spin mx-auto"></div>
                                <p className={`${themeClasses.text} font-medium`}>AI正在转换风格...</p>
                              </div>
                            ) : (
                              <div className="space-y-3">
                                <Palette className={`w-16 h-16 mx-auto ${themeClasses.textMuted}`} />
                                <p className={themeClasses.textMuted}>风格转换结果将在这里显示</p>
                              </div>
                            )}
                          </div>

                          {resultImage && (
                            <Button
                              onClick={handleDownload}
                              variant="outline"
                              className={`mt-4 transition-all duration-300 ${themeClasses.buttonSecondary}`}
                            >
                              <ArrowRight className="w-4 h-4 mr-2" />
                              下载图片
                            </Button>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>

              {/* 头像生成功能 */}
              <TabsContent value="avatar" className="mt-0">
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <Card className={`overflow-hidden border-0 transition-all duration-300 ${themeClasses.cardLarge}`}>
                      <CardContent className="p-0">
                        {/* 上传区域 */}
                        <div className={`${themeClasses.uploadArea} p-8 text-center`}>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="hidden"
                            id="avatar-image-upload"
                          />
                          <label htmlFor="avatar-image-upload" className="cursor-pointer block">
                            {selectedImage ? (
                              <div className="relative group">
                                <Image
                                  src={selectedImage || "/placeholder.svg"}
                                  alt="上传的图片"
                                  width={400}
                                  height={300}
                                  className="mx-auto rounded-lg object-contain max-h-[300px] shadow-lg"
                                />
                                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all rounded-lg flex items-center justify-center">
                                  <p className="text-white bg-black bg-opacity-70 px-4 py-2 rounded-full text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                                    点击更换图片
                                  </p>
                                </div>
                              </div>
                            ) : (
                              <div
                                className={`border-2 border-dashed ${themeClasses.uploadBorder} rounded-xl p-12 ${themeClasses.uploadBg} transition-all`}
                              >
                                <Upload className="w-12 h-12 mx-auto text-blue-400 mb-3" />
                                <p className={`${themeClasses.text} font-medium`}>点击上传照片</p>
                                <p className={`${themeClasses.textMuted} text-sm mt-1`}>支持 JPG, PNG, WebP 格式</p>
                              </div>
                            )}
                          </label>
                        </div>
                      </CardContent>
                    </Card>

                    {/* 头像风格选择器 */}
                    <div className="space-y-4">
                      <StyleSelector
                        options={avatarStyleOptions}
                        value={selectedAvatarStyle}
                        onSelect={(style) => {
                          setSelectedAvatarStyle(style.id)
                          setPrompt(`生成${style.name}的专业头像`)
                        }}
                        placeholder="选择头像风格"
                        isDarkMode={isDarkMode}
                      />

                      <Button
                        onClick={handleProcess}
                        disabled={!selectedImage || isProcessing}
                        className={`w-full transition-all duration-300 ${themeClasses.buttonPrimary}`}
                        size="lg"
                      >
                        {isProcessing ? (
                          <>
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                            生成中...
                          </>
                        ) : (
                          <>
                            <User className="w-4 h-4 mr-2" />
                            生成头像
                          </>
                        )}
                      </Button>
                    </div>
                  </div>

                  {/* 结果展示 */}
                  <div>
                    <Card
                      className={`overflow-hidden border-0 transition-all duration-300 ${themeClasses.cardLarge} h-full`}
                    >
                      <CardContent className="p-0 h-full">
                        <div className={`${themeClasses.resultArea} p-8 text-center h-full flex flex-col`}>
                          <div className="flex-1 flex items-center justify-center">
                            {resultImage ? (
                              <div className="space-y-4">
                                <Image
                                  src={resultImage || "/placeholder.svg"}
                                  alt="处理结果"
                                  width={400}
                                  height={300}
                                  className="mx-auto rounded-lg object-contain max-h-[300px] shadow-lg"
                                />
                                <div className="inline-flex items-center px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm font-medium">
                                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                                  生成完成
                                </div>
                              </div>
                            ) : isProcessing ? (
                              <div className="space-y-4">
                                <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-500 rounded-full animate-spin mx-auto"></div>
                                <p className={`${themeClasses.text} font-medium`}>AI正在生成您的专业头像...</p>
                              </div>
                            ) : (
                              <div className="space-y-3">
                                <User className={`w-16 h-16 mx-auto ${themeClasses.textMuted}`} />
                                <p className={themeClasses.textMuted}>头像将在这里显示</p>
                              </div>
                            )}
                          </div>

                          {resultImage && (
                            <Button
                              onClick={handleDownload}
                              variant="outline"
                              className={`mt-4 transition-all duration-300 ${themeClasses.buttonSecondary}`}
                            >
                              <ArrowRight className="w-4 h-4 mr-2" />
                              下载头像
                            </Button>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>
            </div>
          </Tabs>

          {/* 简约的精彩示例展示区域 */}
          <div className="mt-20">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
                精彩示例展示
              </h2>
              <p className={`${themeClasses.textSecondary} text-lg`}>看看我们的AI能为您创造什么样的惊喜</p>
            </div>

            {/* 图像编辑示例 */}
            <div className="mb-16">
              <div className="flex items-center mb-8">
                <Edit3 className="w-5 h-5 text-blue-500 mr-3" />
                <h3 className={`text-xl font-semibold ${themeClasses.text}`}>图像编辑</h3>
                <div className="flex-1 h-px bg-gray-200 dark:bg-gray-700 ml-4"></div>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { title: "背景替换", desc: "智能识别主体，完美替换背景" },
                  { title: "物体移除", desc: "无痕移除不需要的物体" },
                  { title: "颜色调整", desc: "精准调整图片色彩和饱和度" },
                  { title: "细节增强", desc: "AI增强图片清晰度和细节" },
                ].map((example, index) => (
                  <Card key={index} className={`border-0 transition-all duration-300 group ${themeClasses.card}`}>
                    <CardContent className="p-0">
                      <div className="relative h-40 overflow-hidden rounded-t-lg">
                        <Image
                          src={`/placeholder.svg?height=160&width=300&text=${example.title}`}
                          alt={example.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="p-4">
                        <h4 className={`font-medium ${themeClasses.text} mb-2`}>{example.title}</h4>
                        <p className={`text-sm ${themeClasses.textSecondary}`}>{example.desc}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* 风格转换示例 */}
            <div className="mb-16">
              <div className="flex items-center mb-8">
                <Palette className="w-5 h-5 text-purple-500 mr-3" />
                <h3 className={`text-xl font-semibold ${themeClasses.text}`}>风格转换</h3>
                <div className="flex-1 h-px bg-gray-200 dark:bg-gray-700 ml-4"></div>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  { style: "水彩画", before: "人像照片", after: "水彩风格" },
                  { style: "油画", before: "风景照片", after: "油画风格" },
                  { style: "素描", before: "建筑照片", after: "素描风格" },
                  { style: "动漫", before: "人物照片", after: "动漫风格" },
                  { style: "吉卜力", before: "风景照片", after: "吉卜力风格" },
                  { style: "赛博朋克", before: "城市照片", after: "赛博朋克风格" },
                ].map((example, index) => (
                  <Card key={index} className={`border-0 transition-all duration-300 ${themeClasses.card}`}>
                    <CardContent className="p-0">
                      <div className="relative h-40">
                        <ImageSlider
                          beforeImage={`/placeholder.svg?height=160&width=400&text=${example.before}`}
                          afterImage={`/placeholder.svg?height=160&width=400&text=${example.after}`}
                          beforeLabel="原图"
                          afterLabel={example.style}
                          className="h-full rounded-t-lg"
                        />
                      </div>
                      <div className="p-4">
                        <h4 className={`font-medium ${themeClasses.text} mb-1`}>{example.style}风格转换</h4>
                        <p className={`text-sm ${themeClasses.textSecondary}`}>拖动滑块查看转换效果</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* 头像生成示例 */}
            <div className="mb-16">
              <div className="flex items-center mb-8">
                <Camera className="w-5 h-5 text-green-500 mr-3" />
                <h3 className={`text-xl font-semibold ${themeClasses.text}`}>头像生成</h3>
                <div className="flex-1 h-px bg-gray-200 dark:bg-gray-700 ml-4"></div>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { style: "商务正装", desc: "专业商务形象，适合职场" },
                  { style: "休闲风格", desc: "轻松自然，日常社交必备" },
                  { style: "创意风格", desc: "艺术创意，展现个性魅力" },
                  { style: "学术风格", desc: "知识分子形象，专业权威" },
                ].map((example, index) => (
                  <Card key={index} className={`border-0 transition-all duration-300 group ${themeClasses.card}`}>
                    <CardContent className="p-0">
                      <div className="relative h-40 overflow-hidden rounded-t-lg">
                        <Image
                          src={`/placeholder.svg?height=160&width=300&text=${example.style}头像`}
                          alt={example.style}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="p-4">
                        <h4 className={`font-medium ${themeClasses.text} mb-2`}>{example.style}</h4>
                        <p className={`text-sm ${themeClasses.textSecondary}`}>{example.desc}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* 更多示例按钮 */}
            <div className="text-center">
              <Button
                variant="outline"
                size="lg"
                className={`transition-all duration-300 ${themeClasses.buttonOutline}`}
              >
                <Wand2 className="w-4 h-4 mr-2" />
                查看更多示例
              </Button>
            </div>
          </div>

          {/* 简单的使用步骤 */}
          <div className="mt-16 mb-8">
            <h2
              className={`text-2xl font-bold text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-8`}
            >
              简单三步，轻松编辑
            </h2>
            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <Card className={`text-center border-0 transition-all duration-300 ${themeClasses.cardSubtle}`}>
                <CardContent className="pt-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Upload className="w-5 h-5 text-white" />
                  </div>
                  <h3 className={`font-semibold mb-2 ${themeClasses.text}`}>1. 上传图片</h3>
                  <p className={`text-sm ${themeClasses.textSecondary}`}>选择您想要编辑的图片</p>
                </CardContent>
              </Card>
              <Card className={`text-center border-0 transition-all duration-300 ${themeClasses.cardSubtle}`}>
                <CardContent className="pt-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Sparkles className="w-5 h-5 text-white" />
                  </div>
                  <h3 className={`font-semibold mb-2 ${themeClasses.text}`}>2. 选择功能</h3>
                  <p className={`text-sm ${themeClasses.textSecondary}`}>描述您想要的编辑效果</p>
                </CardContent>
              </Card>
              <Card className={`text-center border-0 transition-all duration-300 ${themeClasses.cardSubtle}`}>
                <CardContent className="pt-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <ArrowRight className="w-5 h-5 text-white" />
                  </div>
                  <h3 className={`font-semibold mb-2 ${themeClasses.text}`}>3. 获取结果</h3>
                  <p className={`text-sm ${themeClasses.textSecondary}`}>下载编辑后的图片</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
