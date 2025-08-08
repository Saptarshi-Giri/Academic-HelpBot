"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Bot, User, Loader2 } from "lucide-react"

export interface Message {
  id: string
  content: string
  sender: "user" | "ai"
  timestamp: Date
}

interface ChatBoxProps {
  messages: Message[]
  isLoading?: boolean
}

export function ChatBox({ messages, isLoading = false }: ChatBoxProps) {

  return (
    <div className="bg-card rounded-xl shadow-lg border flex flex-col">
      <div className="p-4 border-b">
        <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
          <Bot className="h-5 w-5 text-primary" />
          Academic Q&A Assistant
        </h3>
        <p className="text-sm text-muted-foreground">Ask me anything about your studies!</p>
      </div>
      
      <div className="p-4 space-y-4 min-h-[200px]">
        <AnimatePresence>
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
            >
              <div className={`max-w-[80%] ${message.sender === "user" ? "order-2" : "order-1"}`}>
                <div className={`flex items-center gap-2 mb-1 ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
                  {message.sender === "ai" && <Bot className="h-4 w-4 text-primary" />}
                  <span className="text-xs font-medium text-muted-foreground">
                    {message.sender === "user" ? "You" : "AI Assistant"}
                  </span>
                  {message.sender === "user" && <User className="h-4 w-4 text-blue-500" />}
                </div>
                <div
                  className={`rounded-2xl px-4 py-3 shadow-sm ${
                    message.sender === "user"
                      ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white ml-4"
                      : "bg-muted text-foreground mr-4"
                  }`}
                >
                  <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
                  <span className={`text-xs mt-1 block ${
                    message.sender === "user" ? "text-blue-100" : "text-muted-foreground"
                  }`}>
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
          
          {/* Loading indicator */}
          {isLoading && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="flex justify-start"
            >
              <div className="max-w-[80%]">
                <div className="flex items-center gap-2 mb-1">
                  <Bot className="h-4 w-4 text-primary" />
                  <span className="text-xs font-medium text-muted-foreground">AI Assistant</span>
                </div>
                <div className="rounded-2xl px-4 py-3 shadow-sm bg-muted text-foreground mr-4">
                  <div className="flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin text-primary" />
                    <span className="text-sm text-muted-foreground">Thinking...</span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        
        {messages.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center justify-center py-12 text-muted-foreground"
          >
            <div className="text-center">
              <Bot className="h-12 w-12 mx-auto mb-4 text-primary/50" />
              <p className="text-lg font-medium mb-2">Welcome to Academic Q&A!</p>
              <p className="text-sm">Fill in your academic details above and start asking questions.</p>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}