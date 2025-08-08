"use client"

import { motion } from "framer-motion"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface FormSectionProps {
  year: string
  semester: string
  subject: string
  onYearChange: (value: string) => void
  onSemesterChange: (value: string) => void
  onSubjectChange: (value: string) => void
}

export function FormSection({
  year,
  semester,
  subject,
  onYearChange,
  onSemesterChange,
  onSubjectChange,
}: FormSectionProps) {
  const yearOptions = [
    { value: "1", label: "1st Year" },
    { value: "2", label: "2nd Year" },
    { value: "3", label: "3rd Year" },
    { value: "4", label: "4th Year" },
  ]

  const semesterOptions = [
    { value: "1", label: "Semester 1" },
    { value: "2", label: "Semester 2" },
    { value: "3", label: "Semester 3" },
    { value: "4", label: "Semester 4" },
    { value: "5", label: "Semester 5" },
    { value: "6", label: "Semester 6" },
    { value: "7", label: "Semester 7" },
    { value: "8", label: "Semester 8" },
  ]

  const subjectOptions = [
    { value: "mathematics", label: "Mathematics" },
    { value: "physics", label: "Physics" },
    { value: "computer-science", label: "Computer Science" },
    { value: "mechanical-engineering", label: "Mechanical Engineering" },
    { value: "electrical-engineering", label: "Electrical Engineering" },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-card rounded-xl shadow-lg border p-6 mb-6"
    >
      <h2 className="text-xl font-semibold text-foreground mb-4">Academic Information</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-muted-foreground">
            Current Year in College
          </label>
          <Select value={year} onValueChange={onYearChange}>
            <SelectTrigger className="w-full transition-all duration-200 hover:border-primary/50 focus:border-primary">
              <SelectValue placeholder="Select year" />
            </SelectTrigger>
            <SelectContent>
              {yearOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-muted-foreground">
            Semester
          </label>
          <Select value={semester} onValueChange={onSemesterChange}>
            <SelectTrigger className="w-full transition-all duration-200 hover:border-primary/50 focus:border-primary">
              <SelectValue placeholder="Select semester" />
            </SelectTrigger>
            <SelectContent>
              {semesterOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-muted-foreground">
            Subject
          </label>
          <Select value={subject} onValueChange={onSubjectChange}>
            <SelectTrigger className="w-full transition-all duration-200 hover:border-primary/50 focus:border-primary">
              <SelectValue placeholder="Select subject" />
            </SelectTrigger>
            <SelectContent>
              {subjectOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </motion.div>
  )
}