import * as React from "react"
import { Menu } from "@/components/ui/icons"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/Sheet"
import { Button } from "@/components/ui/button"

interface NavLink {
  href: string
  label: string
}

interface MobileMenuProps {
  links: NavLink[]
  currentPath?: string
}

export default function MobileMenu({ links, currentPath }: MobileMenuProps) {
  const [open, setOpen] = React.useState(false)

  const handleLinkClick = () => {
    setOpen(false)
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          aria-label="Open mobile menu"
        >
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[300px] sm:w-[400px]">
        <SheetHeader>
          <SheetTitle>Navigation</SheetTitle>
          <SheetDescription>
            Navigate to different sections of our website
          </SheetDescription>
        </SheetHeader>
        <nav className="flex flex-col space-y-4 mt-6">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={handleLinkClick}
              className={`text-lg font-medium transition-colors hover:text-primary ${
                currentPath === link.href
                  ? "text-primary"
                  : "text-muted-foreground"
              }`}
            >
              {link.label}
            </a>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  )
}