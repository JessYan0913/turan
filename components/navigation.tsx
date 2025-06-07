"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, Globe, User, Crown, Home, Palette, Moon, Sun, ImageIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface NavigationProps {
  isDarkMode: boolean
  toggleTheme: () => void
  themeClasses: any
}

export function Navigation({ isDarkMode, toggleTheme, themeClasses }: NavigationProps) {
  const pathname = usePathname()

  const isActive = (path: string) => {
    if (path === "/" && pathname === "/") return true
    if (path !== "/" && pathname.startsWith(path)) return true
    return false
  }

  return (
    <nav className={`${themeClasses.navBar} border-b sticky top-0 z-50 transition-colors duration-300`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 cursor-pointer">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <Palette className="w-5 h-5 text-white" />
            </div>
            <span
              className={`text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent`}
            >
              图然
            </span>
          </Link>

          {/* 桌面端导航菜单 */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/">
              <Button
                variant="ghost"
                className={`flex items-center space-x-2 transition-all duration-300 ${
                  isActive("/")
                    ? isDarkMode
                      ? "bg-gray-700/40 text-gray-200"
                      : "bg-gray-100/60 text-gray-800"
                    : isDarkMode
                      ? "text-gray-300 hover:text-gray-100 hover:bg-gray-700/30"
                      : "text-gray-600 hover:text-gray-800 hover:bg-gray-100/40"
                }`}
              >
                <Home className="w-4 h-4" />
                <span>首页</span>
              </Button>
            </Link>
            <Link href="/pricing">
              <Button
                variant="ghost"
                className={`flex items-center space-x-2 transition-all duration-300 ${
                  isActive("/pricing")
                    ? isDarkMode
                      ? "bg-gray-700/40 text-gray-200"
                      : "bg-gray-100/60 text-gray-800"
                    : isDarkMode
                      ? "text-gray-300 hover:text-gray-100 hover:bg-gray-700/30"
                      : "text-gray-600 hover:text-gray-800 hover:bg-gray-100/40"
                }`}
              >
                <Crown className="w-4 h-4" />
                <span>价格套餐</span>
              </Button>
            </Link>
            <Link href="/works">
              <Button
                variant="ghost"
                className={`flex items-center space-x-2 transition-all duration-300 ${
                  isActive("/works")
                    ? isDarkMode
                      ? "bg-gray-700/40 text-gray-200"
                      : "bg-gray-100/60 text-gray-800"
                    : isDarkMode
                      ? "text-gray-300 hover:text-gray-100 hover:bg-gray-700/30"
                      : "text-gray-600 hover:text-gray-800 hover:bg-gray-100/40"
                }`}
              >
                <ImageIcon className="w-4 h-4" />
                <span>我的作品</span>
              </Button>
            </Link>

            {/* 国际化下拉菜单 */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className={`flex items-center space-x-2 transition-all duration-300 ${
                    isDarkMode
                      ? "text-gray-300 hover:text-white hover:bg-gray-700/50"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-100/50"
                  }`}
                >
                  <Globe className="w-4 h-4" />
                  <span>中文</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className={isDarkMode ? "bg-gray-800 border-gray-700" : ""}>
                <DropdownMenuItem className={isDarkMode ? "text-white hover:bg-gray-700" : ""}>中文</DropdownMenuItem>
                <DropdownMenuItem className={isDarkMode ? "text-white hover:bg-gray-700" : ""}>
                  English
                </DropdownMenuItem>
                <DropdownMenuItem className={isDarkMode ? "text-white hover:bg-gray-700" : ""}>日本語</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* 主题切换按钮 */}
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleTheme}
              className={`transition-all duration-300 ${
                isDarkMode
                  ? "text-gray-300 hover:text-white hover:bg-gray-700/50 shadow-[0_2px_12px_rgba(0,0,0,0.2)]"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-100/50 shadow-[0_1px_8px_rgba(0,0,0,0.05)]"
              }`}
            >
              {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </Button>

            {/* 用户头像 */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar className="w-8 h-8 cursor-pointer">
                  <AvatarImage src="/placeholder.svg?height=32&width=32" />
                  <AvatarFallback className={isDarkMode ? "bg-gray-700 text-white" : ""}>
                    <User className="w-4 h-4" />
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className={isDarkMode ? "bg-gray-800 border-gray-700" : ""}>
                <Link href="/profile">
                  <DropdownMenuItem className={isDarkMode ? "text-white hover:bg-gray-700" : ""}>
                    个人中心
                  </DropdownMenuItem>
                </Link>
                <DropdownMenuItem className={isDarkMode ? "text-white hover:bg-gray-700" : ""}>设置</DropdownMenuItem>
                <DropdownMenuItem className={isDarkMode ? "text-white hover:bg-gray-700" : ""}>
                  退出登录
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* 移动端菜单 */}
          <div className="md:hidden flex items-center space-x-2">
            <Button variant="ghost" size="sm" onClick={toggleTheme} className={`${themeClasses.text}`}>
              {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className={themeClasses.text}>
                  <Menu className="w-5 h-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className={`w-48 ${isDarkMode ? "bg-gray-800 border-gray-700" : ""}`}>
                <Link href="/">
                  <DropdownMenuItem className={isDarkMode ? "text-white hover:bg-gray-700" : ""}>首页</DropdownMenuItem>
                </Link>
                <Link href="/pricing">
                  <DropdownMenuItem className={isDarkMode ? "text-white hover:bg-gray-700" : ""}>
                    价格套餐
                  </DropdownMenuItem>
                </Link>
                <Link href="/works">
                  <DropdownMenuItem className={isDarkMode ? "text-white hover:bg-gray-700" : ""}>
                    我的作品
                  </DropdownMenuItem>
                </Link>
                <DropdownMenuItem className={isDarkMode ? "text-white hover:bg-gray-700" : ""}>
                  语言设置
                </DropdownMenuItem>
                <Link href="/profile">
                  <DropdownMenuItem className={isDarkMode ? "text-white hover:bg-gray-700" : ""}>
                    个人中心
                  </DropdownMenuItem>
                </Link>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </nav>
  )
}
