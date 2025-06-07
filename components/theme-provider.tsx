"use client"

import type React from "react"

import { createContext, useContext, useState, useEffect } from "react"

interface ThemeContextType {
  isDarkMode: boolean
  toggleTheme: () => void
  themeClasses: any
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [isDarkMode, setIsDarkMode] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem("theme")
    if (saved) {
      setIsDarkMode(saved === "dark")
    }
  }, [])

  const toggleTheme = () => {
    const newMode = !isDarkMode
    setIsDarkMode(newMode)
    localStorage.setItem("theme", newMode ? "dark" : "light")
  }

  // 优化后的主题样式类
  const themeClasses = {
    background: isDarkMode
      ? "bg-gradient-to-br from-gray-900 via-slate-900 to-gray-800"
      : "bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50",
    navBar: isDarkMode
      ? "bg-gray-900/90 backdrop-blur-md border-gray-700/30 shadow-[0_1px_3px_rgba(0,0,0,0.1)]"
      : "bg-white/90 backdrop-blur-md border-gray-200/30 shadow-[0_1px_3px_rgba(0,0,0,0.05)]",
    text: isDarkMode ? "text-white" : "text-gray-900",
    textSecondary: isDarkMode ? "text-gray-300" : "text-gray-600",
    textMuted: isDarkMode ? "text-gray-400" : "text-gray-400",
    // 优化后的卡片阴影效果
    card: isDarkMode
      ? "bg-gray-800/80 backdrop-blur-sm border border-gray-700/50 shadow-[0_8px_32px_rgba(0,0,0,0.3)] hover:shadow-[0_16px_48px_rgba(0,0,0,0.4)] hover:border-gray-600/60"
      : "bg-white/80 backdrop-blur-sm border border-gray-200/50 shadow-[0_4px_24px_rgba(0,0,0,0.08)] hover:shadow-[0_8px_32px_rgba(0,0,0,0.12)] hover:border-gray-300/60",
    cardLarge: isDarkMode
      ? "bg-gray-800/90 backdrop-blur-sm border border-gray-700/50 shadow-[0_12px_48px_rgba(0,0,0,0.4)] hover:shadow-[0_20px_64px_rgba(0,0,0,0.5)] hover:border-gray-600/70"
      : "bg-white/90 backdrop-blur-sm border border-gray-200/50 shadow-[0_6px_32px_rgba(0,0,0,0.1)] hover:shadow-[0_12px_48px_rgba(0,0,0,0.15)] hover:border-gray-300/70",
    cardSubtle: isDarkMode
      ? "bg-gray-800/60 backdrop-blur-sm border border-gray-700/30 shadow-[0_4px_24px_rgba(0,0,0,0.2)] hover:shadow-[0_8px_32px_rgba(0,0,0,0.3)] hover:border-gray-600/50"
      : "bg-white/60 backdrop-blur-sm border border-gray-200/30 shadow-[0_2px_16px_rgba(0,0,0,0.05)] hover:shadow-[0_4px_24px_rgba(0,0,0,0.08)] hover:border-gray-300/50",
    // 新增按钮样式
    buttonPrimary: isDarkMode
      ? "bg-gradient-to-r from-blue-600 to-purple-700 hover:from-blue-700 hover:to-purple-800 text-white shadow-[0_4px_24px_rgba(59,130,246,0.4)] hover:shadow-[0_8px_32px_rgba(59,130,246,0.5)] border-0"
      : "bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-[0_4px_20px_rgba(59,130,246,0.3)] hover:shadow-[0_8px_30px_rgba(59,130,246,0.4)] border-0",
    buttonSecondary: isDarkMode
      ? "bg-gray-700/80 hover:bg-gray-600/90 text-gray-200 border border-gray-600/50 hover:border-gray-500/60 shadow-[0_2px_16px_rgba(0,0,0,0.3)] hover:shadow-[0_4px_24px_rgba(0,0,0,0.4)]"
      : "bg-white/80 hover:bg-white/90 text-gray-700 border border-gray-200/60 hover:border-gray-300/70 shadow-[0_2px_12px_rgba(0,0,0,0.08)] hover:shadow-[0_4px_20px_rgba(0,0,0,0.12)]",
    buttonOutline: isDarkMode
      ? "bg-transparent hover:bg-gray-700/50 text-gray-300 hover:text-white border border-gray-600/60 hover:border-gray-500/80 shadow-[0_2px_12px_rgba(0,0,0,0.2)] hover:shadow-[0_4px_20px_rgba(0,0,0,0.3)]"
      : "bg-transparent hover:bg-gray-50/80 text-gray-600 hover:text-gray-800 border border-gray-300/60 hover:border-gray-400/80 shadow-[0_1px_8px_rgba(0,0,0,0.05)] hover:shadow-[0_2px_16px_rgba(0,0,0,0.1)]",
    uploadArea: isDarkMode
      ? "bg-gradient-to-br from-gray-700 to-slate-700"
      : "bg-gradient-to-br from-blue-50 to-indigo-50",
    resultArea: isDarkMode
      ? "bg-gradient-to-br from-gray-700 to-slate-700"
      : "bg-gradient-to-br from-blue-50 to-indigo-50",
    uploadBorder: isDarkMode ? "border-blue-400 hover:border-blue-300" : "border-blue-300 hover:border-blue-400",
    uploadBg: isDarkMode ? "hover:bg-blue-900/20" : "hover:bg-blue-50/50",
    textarea: isDarkMode
      ? "bg-gray-800/70 backdrop-blur-sm border-gray-700/50 text-white placeholder:text-gray-400"
      : "bg-white/70 backdrop-blur-sm border-gray-200/50",
    tabsList: isDarkMode ? "bg-gray-800/60 backdrop-blur-sm" : "bg-white/60 backdrop-blur-sm",
    tabsTrigger: isDarkMode
      ? "data-[state=active]:bg-gray-700 data-[state=active]:shadow-sm data-[state=active]:text-white"
      : "data-[state=active]:bg-white data-[state=active]:shadow-sm",
  }

  return <ThemeContext.Provider value={{ isDarkMode, toggleTheme, themeClasses }}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider")
  }
  return context
}
