import Link from "next/link"

import { cn } from "@/lib/utils"

export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <nav
      className={cn("flex items-center space-x-4 lg:space-x-6", className)}
      {...props}
    >
      <Link
        href="/dashboard"
        className="text-sm font-medium transition-colors hover:text-primary"
      >
        Overview
      </Link>
      <Link
        href="/dashboard/residents"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Residents
      </Link>
      <Link
        href="/dashboard/homes"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Properties
      </Link>
      <Link
        href="/dashboard/chapters"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Chapters
      </Link>
      <Link
        href="/dashboard/activity"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Activity
      </Link>
    </nav>
  )
}