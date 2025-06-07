"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import Image from "next/image"

interface StyleOption {
  id: string
  name: string
  description: string
  preview: string
}

interface StyleSelectorProps {
  options: StyleOption[]
  value?: string
  onSelect: (style: StyleOption) => void
  placeholder?: string
  isDarkMode?: boolean
}

export function StyleSelector({
  options,
  value,
  onSelect,
  placeholder = "选择风格",
  isDarkMode = false,
}: StyleSelectorProps) {
  const [open, setOpen] = useState(false)
  const selectedOption = options.find((option) => option.id === value)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={`w-full justify-between h-auto py-3 ${
            isDarkMode
              ? "bg-gray-800/70 border-gray-700/50 text-white hover:bg-gray-700"
              : "bg-white/70 border-gray-200/50 hover:bg-gray-50"
          }`}
        >
          <div className="flex items-center space-x-3">
            {selectedOption ? (
              <>
                <div className="w-8 h-8 rounded-md overflow-hidden flex-shrink-0">
                  <Image
                    src={selectedOption.preview || "/placeholder.svg"}
                    alt={selectedOption.name}
                    width={32}
                    height={32}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="text-left">
                  <div className="font-medium">{selectedOption.name}</div>
                  <div className={`text-xs ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
                    {selectedOption.description}
                  </div>
                </div>
              </>
            ) : (
              <span className={isDarkMode ? "text-gray-400" : "text-gray-500"}>{placeholder}</span>
            )}
          </div>
          <ChevronDown className="w-4 h-4 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className={`w-80 p-2 ${isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"}`}
        align="start"
      >
        <div className="grid grid-cols-2 gap-2">
          {options.map((option) => (
            <button
              key={option.id}
              onClick={() => {
                onSelect(option)
                setOpen(false)
              }}
              className={`p-3 rounded-lg text-left transition-all hover:scale-105 ${
                selectedOption?.id === option.id
                  ? isDarkMode
                    ? "bg-blue-900/50 border-2 border-blue-500"
                    : "bg-blue-50 border-2 border-blue-500"
                  : isDarkMode
                    ? "bg-gray-700/50 border-2 border-transparent hover:bg-gray-600/50"
                    : "bg-gray-50 border-2 border-transparent hover:bg-gray-100"
              }`}
            >
              <div className="w-full h-20 rounded-md overflow-hidden mb-2">
                <Image
                  src={option.preview || "/placeholder.svg"}
                  alt={option.name}
                  width={120}
                  height={80}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className={`font-medium text-sm ${isDarkMode ? "text-white" : "text-gray-900"}`}>{option.name}</div>
              <div className={`text-xs ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>{option.description}</div>
            </button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  )
}
