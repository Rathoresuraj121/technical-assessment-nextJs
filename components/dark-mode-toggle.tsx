"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Moon, Sun } from "lucide-react"

export function DarkModeToggle() {
  const [isDark, setIsDark] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    // Check system preference and localStorage
    const isDarkMode =
      localStorage.getItem("darkMode") === "true" ||
      (localStorage.getItem("darkMode") === null && window.matchMedia("(prefers-color-scheme: dark)").matches)

    setIsDark(isDarkMode)
    document.documentElement.classList.toggle("dark", isDarkMode)
  }, [])

  const toggleDarkMode = () => {
    const newDarkMode = !isDark
    setIsDark(newDarkMode)
    localStorage.setItem("darkMode", String(newDarkMode))
    document.documentElement.classList.toggle("dark", newDarkMode)
  }

  if (!mounted) return null

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleDarkMode}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      {isDark ? <Sun size={18} /> : <Moon size={18} />}
    </Button>
  )
}
