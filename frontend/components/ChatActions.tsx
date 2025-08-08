"use client"

import { motion } from "framer-motion"
import { Trash2, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Message } from "@/components/ChatBox"

interface ChatActionsProps {
  messages: Message[]
  onClearChat: () => void
  disabled?: boolean
}

export function ChatActions({ messages, onClearChat, disabled = false }: ChatActionsProps) {
  const exportChatHistory = () => {
    if (messages.length === 0) return

    // Format messages for export
    const chatContent = messages
      .map((message) => {
        const timestamp = message.timestamp.toLocaleString()
        const sender = message.sender === "user" ? "You" : "AI Assistant"
        return `[${timestamp}] ${sender}: ${message.content}`
      })
      .join('\n\n')

    // Add header information
    const header = `Academic Q&A Chat History\nExported on: ${new Date().toLocaleString()}\n${'='.repeat(50)}\n\n`
    const fullContent = header + chatContent

    // Create and download file
    const blob = new Blob([fullContent], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `academic-chat-${new Date().toISOString().split('T')[0]}.txt`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="flex gap-3 justify-end mb-4"
    >
      <Button
        variant="outline"
        size="sm"
        onClick={exportChatHistory}
        disabled={disabled || messages.length === 0}
        className="flex items-center gap-2 hover:bg-green-50 hover:border-green-200 dark:hover:bg-green-950 dark:hover:border-green-800 transition-colors"
      >
        <Download className="h-4 w-4" />
        Export Chat
      </Button>
      
      <Button
        variant="outline"
        size="sm"
        onClick={onClearChat}
        disabled={disabled || messages.length === 0}
        className="flex items-center gap-2 hover:bg-red-50 hover:border-red-200 dark:hover:bg-red-950 dark:hover:border-red-800 transition-colors"
      >
        <Trash2 className="h-4 w-4" />
        Clear Chat
      </Button>
    </motion.div>
  )
}