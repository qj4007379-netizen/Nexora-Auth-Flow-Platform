import * as React from "react"
import * as Sonner from "sonner"

import { cn } from "@/lib/utils"

const Toaster = Sonner.Toaster

const toast = (
  title: React.ReactNode,
  options?: { description?: React.ReactNode }
): string | number => {
  return Sonner.toast(
    <div className="grid gap-1">
      {title && <p className="font-medium">{title}</p>}
      {options?.description && <p className="text-sm text-muted-foreground">{options.description}</p>}
    </div>,
    {
      classNames: {
        toast:
          "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
        description: "group-[.toast]:text-muted-foreground",
        actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
        cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
      },
      ...options,
    }
  )
}

export { Toaster, toast }
