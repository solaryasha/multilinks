"use client"
import Link from 'next/link'
import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, X } from 'lucide-react'
import { Logo } from './icons/logo'


export function HeaderLayout ({ children }: { children: React.ReactNode }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-background border-b">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="text-2xl font-bold text-primary">
              <Logo />
            </Link>
            <nav className="hidden md:flex space-x-4">
              <Link href='/login'>
                <Button size='lg'>Login</Button>
              </Link>
              <Link href='/register'>
                <Button size='lg'>Get started</Button>
              </Link>
            </nav>
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" className="md:hidden" aria-label="Open menu">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[240px] sm:w-[300px]">
                <div className="flex flex-col space-y-4 mt-4">
                  <Link href='/login'>
                    <Button>Log in</Button>
                  </Link>
                </div>
                <Button
                  variant="ghost"
                  className="absolute top-4 right-4"
                  onClick={() => setIsMobileMenuOpen(false)}
                  aria-label="Close menu"
                >
                  <X className="h-6 w-6" />
                </Button>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>
      <main className="flex-grow container mx-auto px-4 py-8">
        {children}
      </main>
      <footer className="bg-background border-t py-4">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          © {new Date().getFullYear()} Your Company Name. All rights reserved.
        </div>
      </footer>
    // </div>
  )
}