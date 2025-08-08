"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { GraduationCap } from "lucide-react"
import { FormSection } from "@/components/FormSection"
import { ChatBox, Message } from "@/components/ChatBox"
import { MessageInput } from "@/components/MessageInput"
import { ChatActions } from "@/components/ChatActions"
import { ThemeToggle } from "@/components/ThemeToggle"

export default function Home() {
  // Form state
  const [year, setYear] = useState("")
  const [semester, setSemester] = useState("")
  const [subject, setSubject] = useState("")

  // Chat state
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Hello! I'm your academic assistant. I can help you with questions related to your studies. What would you like to know?",
      sender: "ai",
      timestamp: new Date(Date.now() - 60000), // 1 minute ago
    },
    {
      id: "2", 
      content: "Hi! Can you help me understand calculus derivatives?",
      sender: "user",
      timestamp: new Date(Date.now() - 30000), // 30 seconds ago
    },
    {
      id: "3",
      content: "Absolutely! Derivatives measure the rate of change of a function. Think of it as the slope of a curve at any given point. For example, if f(x) = x², then f'(x) = 2x. This means at x = 3, the slope would be 2(3) = 6. Would you like me to explain any specific derivative rules?",
      sender: "ai", 
      timestamp: new Date(),
    }
  ])
  const [isLoading, setIsLoading] = useState(false)

  // Check if form is complete
  const isFormComplete = year && semester && subject

  // Auto-scroll to bottom when new messages are added
  useEffect(() => {
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })
  }, [messages])
  // Handle sending messages
  const handleSendMessage = async (content: string) => {
    if (!isFormComplete) return

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages(prev => [...prev, userMessage])
    setIsLoading(true)

    // Simulate AI response (replace with actual API call later)
    // TODO: Replace this with your actual backend API call
    // Example: const response = await fetch('/api/chat', { method: 'POST', body: JSON.stringify({ message: content, year, semester, subject }) })
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: `Thank you for your question about ${subject}! As a ${year} year student in semester ${semester}, I understand this topic can be challenging. Here's my response: [This is where the AI response would be generated based on your question and academic context. Connect your backend API here to get real AI responses.]`,
        sender: "ai",
        timestamp: new Date(),
      }
      
      setMessages(prev => [...prev, aiMessage])
      setIsLoading(false)
    }, 1500)
  }

  // Handle clearing chat
  const handleClearChat = () => {
    setMessages([])
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-between mb-8"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl">
              <GraduationCap className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">Academic Q&A</h1>
              <p className="text-muted-foreground">AI-powered learning assistant</p>
            </div>
          </div>
          <ThemeToggle />
        </motion.header>

        {/* Form Section */}
        <FormSection
          year={year}
          semester={semester}
          subject={subject}
          onYearChange={setYear}
          onSemesterChange={setSemester}
          onSubjectChange={setSubject}
        />

        {/* Chat Actions */}
        <ChatActions
          messages={messages}
          onClearChat={handleClearChat}
          disabled={!isFormComplete}
        />
        {/* Chat Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <ChatBox messages={messages} isLoading={isLoading} />
        </motion.div>

        {/* Message Input */}
        <MessageInput
          onSendMessage={handleSendMessage}
          disabled={!isFormComplete}
          isLoading={isLoading}
        />

        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center mt-8 text-sm text-muted-foreground"
        >
          <p>
            Built with Next.js, TypeScript, and Tailwind CSS • 
            <span className="ml-1">Ready for backend integration</span>
          </p>
        </motion.footer>
      </div>
    </div>
  )
}