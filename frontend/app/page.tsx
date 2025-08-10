"use client";
import axios from "axios";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { CloudCog, GraduationCap } from "lucide-react";
import { FormSection } from "@/components/FormSection";
import { ChatBox, Message } from "@/components/ChatBox";
import { MessageInput } from "@/components/MessageInput";
import { ChatActions } from "@/components/ChatActions";
import { ThemeToggle } from "@/components/ThemeToggle";

export default function Home() {
  // Form state
  const [year, setYear] = useState("");
  const [semester, setSemester] = useState("");
  const [subject, setSubject] = useState("");

  // Chat state
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content:
        "Hello! I'm your academic assistant. I can help you with questions related to your studies. What would you like to know?",
      sender: "ai",
      timestamp: new Date(Date.now() - 60000),
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);

  // Check if form is complete
  const isFormComplete = year && semester && subject;

  // Auto-scroll to bottom when new messages are added
  useEffect(() => {
    window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
  }, [messages]);

  // Handle sending messages
  const handleSendMessage = async (content: string) => {
    if (!isFormComplete) return;

    // Add user message immediately
    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      sender: "user",
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const res = await axios.post("http://127.0.0.1:8000/ask", {
        question: content,
      });

      const data = res.data;

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: data.answer || "No answer received from the server.",
        sender: "ai",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error("Error fetching AI response:", error);
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          content: "Sorry, something went wrong while getting a response.",
          sender: "ai",
          timestamp: new Date(),
        },
      ]);
    } finally {
      setIsLoading(false);
    }


  // Handle clearing chat
  const handleClearChat = () => setMessages([]);

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
              <h1 className="text-3xl font-bold text-foreground">
                Academic Q&A
              </h1>
              <p className="text-muted-foreground">
                AI-powered learning assistant
              </p>
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
            <span className="ml-1">Now connected to backend API</span>
          </p>
        </motion.footer>
      </div>
    </div>
  );
}
}
