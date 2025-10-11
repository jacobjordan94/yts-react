import * as React from "react"
import { Link } from "react-router"
import { Slot } from "@radix-ui/react-slot"

import { cn } from "@/lib/utils"

export interface DownloadLinkProps
  extends Omit<React.ComponentProps<typeof Link>, "to"> {
  href: string
  asChild?: boolean
}

const DownloadLink = React.forwardRef<HTMLAnchorElement, DownloadLinkProps>(
  ({ className, href, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : Link

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault()
      props.onClick?.(e)

      // Trigger download without navigation
      const link = document.createElement("a")
      link.href = href
      link.download = ""
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }

    return (
      <Comp
        ref={ref}
        to={href}
        className={cn(className)}
        onClick={handleClick}
        {...props}
      />
    )
  }
)

DownloadLink.displayName = "DownloadLink"

export { DownloadLink }
