"use client"

import { useState } from "react"
import { User, Calendar, Camera, Edit3, Save, X, Crown, Zap, BarChart3 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

interface ProfilePageProps {
  isDarkMode: boolean
  themeClasses: any
}

export function ProfilePage({ isDarkMode, themeClasses }: ProfilePageProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [userInfo, setUserInfo] = useState({
    name: "张三",
    email: "zhangsan@example.com",
    phone: "138****8888",
    bio: "热爱AI艺术创作的设计师，专注于数字艺术和创意设计。",
    joinDate: "2023-06-15",
    avatar: "/placeholder.svg?height=120&width=120",
  })

  const [editForm, setEditForm] = useState(userInfo)

  const handleSave = () => {
    setUserInfo(editForm)
    setIsEditing(false)
  }

  const handleCancel = () => {
    setEditForm(userInfo)
    setIsEditing(false)
  }

  // 模拟用户统计数据
  const stats = {
    totalWorks: 156,
    thisMonthWorks: 23,
    totalProcessingTime: "12.5小时",
    favoriteStyle: "水彩画",
    plan: "专业版",
    planExpiry: "2024-03-15",
    usageThisMonth: 234,
    planLimit: 500,
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="grid lg:grid-cols-3 gap-8">
        {/* 左侧：个人信息 */}
        <div className="lg:col-span-1 space-y-6">
          {/* 头像和基本信息 */}
          <Card className={`${themeClasses.card} border-0 shadow-lg`}>
            <CardContent className="p-6 text-center">
              <div className="relative inline-block mb-4">
                <Avatar className="w-24 h-24">
                  <AvatarImage src={userInfo.avatar || "/placeholder.svg"} />
                  <AvatarFallback className={isDarkMode ? "bg-gray-700 text-white" : ""}>
                    <User className="w-12 h-12" />
                  </AvatarFallback>
                </Avatar>
                <Button
                  size="sm"
                  className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-blue-500 hover:bg-blue-600"
                >
                  <Camera className="w-4 h-4" />
                </Button>
              </div>

              {!isEditing ? (
                <>
                  <h2 className={`text-xl font-bold ${themeClasses.text} mb-1`}>{userInfo.name}</h2>
                  <p className={`${themeClasses.textSecondary} text-sm mb-3`}>{userInfo.email}</p>
                  <p className={`${themeClasses.textSecondary} text-sm mb-4`}>{userInfo.bio}</p>
                  <Button
                    onClick={() => setIsEditing(true)}
                    variant="outline"
                    size="sm"
                    className={isDarkMode ? "border-gray-600 text-gray-300 hover:bg-gray-700" : ""}
                  >
                    <Edit3 className="w-4 h-4 mr-2" />
                    编辑资料
                  </Button>
                </>
              ) : (
                <div className="space-y-4 text-left">
                  <div>
                    <Label className={themeClasses.text}>姓名</Label>
                    <Input
                      value={editForm.name}
                      onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                      className={themeClasses.textarea}
                    />
                  </div>
                  <div>
                    <Label className={themeClasses.text}>邮箱</Label>
                    <Input
                      value={editForm.email}
                      onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                      className={themeClasses.textarea}
                    />
                  </div>
                  <div>
                    <Label className={themeClasses.text}>手机</Label>
                    <Input
                      value={editForm.phone}
                      onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                      className={themeClasses.textarea}
                    />
                  </div>
                  <div>
                    <Label className={themeClasses.text}>个人简介</Label>
                    <Textarea
                      value={editForm.bio}
                      onChange={(e) => setEditForm({ ...editForm, bio: e.target.value })}
                      className={themeClasses.textarea}
                      rows={3}
                    />
                  </div>
                  <div className="flex space-x-2">
                    <Button onClick={handleSave} size="sm" className="flex-1">
                      <Save className="w-4 h-4 mr-2" />
                      保存
                    </Button>
                    <Button onClick={handleCancel} variant="outline" size="sm" className="flex-1">
                      <X className="w-4 h-4 mr-2" />
                      取消
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* 套餐信息 */}
          <Card className={`${themeClasses.card} border-0 shadow-lg`}>
            <CardHeader>
              <CardTitle className={`flex items-center ${themeClasses.text}`}>
                <Crown className="w-5 h-5 mr-2 text-yellow-500" />
                当前套餐
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className={themeClasses.textSecondary}>套餐类型</span>
                <Badge className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">{stats.plan}</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className={themeClasses.textSecondary}>到期时间</span>
                <span className={`text-sm ${themeClasses.text}`}>{stats.planExpiry}</span>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className={themeClasses.textSecondary}>本月使用量</span>
                  <span className={`text-sm ${themeClasses.text}`}>
                    {stats.usageThisMonth}/{stats.planLimit}
                  </span>
                </div>
                <Progress value={(stats.usageThisMonth / stats.planLimit) * 100} className="h-2" />
              </div>
              <Button variant="outline" size="sm" className="w-full">
                升级套餐
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* 右侧：统计和活动 */}
        <div className="lg:col-span-2 space-y-6">
          {/* 统计卡片 */}
          <div className="grid md:grid-cols-2 gap-6">
            <Card className={`${themeClasses.card} border-0 shadow-lg`}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className={`${themeClasses.textSecondary} text-sm`}>总作品数</p>
                    <p className={`text-2xl font-bold ${themeClasses.text}`}>{stats.totalWorks}</p>
                  </div>
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                    <BarChart3 className="w-6 h-6 text-blue-500" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className={`${themeClasses.card} border-0 shadow-lg`}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className={`${themeClasses.textSecondary} text-sm`}>本月作品</p>
                    <p className={`text-2xl font-bold ${themeClasses.text}`}>{stats.thisMonthWorks}</p>
                  </div>
                  <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                    <Zap className="w-6 h-6 text-green-500" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className={`${themeClasses.card} border-0 shadow-lg`}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className={`${themeClasses.textSecondary} text-sm`}>处理时长</p>
                    <p className={`text-2xl font-bold ${themeClasses.text}`}>{stats.totalProcessingTime}</p>
                  </div>
                  <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
                    <Calendar className="w-6 h-6 text-purple-500" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className={`${themeClasses.card} border-0 shadow-lg`}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className={`${themeClasses.textSecondary} text-sm`}>偏好风格</p>
                    <p className={`text-2xl font-bold ${themeClasses.text}`}>{stats.favoriteStyle}</p>
                  </div>
                  <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex items-center justify-center">
                    <User className="w-6 h-6 text-orange-500" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* 最近活动 */}
          <Card className={`${themeClasses.card} border-0 shadow-lg`}>
            <CardHeader>
              <CardTitle className={themeClasses.text}>最近活动</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { action: "完成风格转换", target: "风景照片", time: "2小时前", type: "success" },
                  { action: "生成专业头像", target: "商务形象", time: "5小时前", type: "success" },
                  { action: "背景替换", target: "人像照片", time: "1天前", type: "success" },
                  { action: "升级到专业版", target: "套餐升级", time: "3天前", type: "info" },
                ].map((activity, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-800/50"
                  >
                    <div
                      className={`w-2 h-2 rounded-full ${
                        activity.type === "success"
                          ? "bg-green-500"
                          : activity.type === "info"
                            ? "bg-blue-500"
                            : "bg-gray-400"
                      }`}
                    ></div>
                    <div className="flex-1">
                      <p className={`text-sm ${themeClasses.text}`}>
                        <span className="font-medium">{activity.action}</span>
                        <span className={themeClasses.textSecondary}> - {activity.target}</span>
                      </p>
                      <p className={`text-xs ${themeClasses.textMuted}`}>{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
