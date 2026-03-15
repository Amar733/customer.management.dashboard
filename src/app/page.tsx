"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function RootPage() {
  const router = useRouter()

  useEffect(() => {
    router.push("/dashboard")
  }, [router])

  return (
    <div className="flex h-screen w-full items-center justify-center bg-background">
      <div className="animate-pulse text-muted-foreground">Redirecting to dashboard...</div>
    </div>
  )
}
