"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";

export function Navbar() {
  const pathname = usePathname() || "/";
  const [open, setOpen] = useState(false);

  const links = [
    { href: "/dashboard", label: "Dashboard" },
    { href: "/pricing", label: "Pricing" },
  ];

  const isActive = (href: string) => href === pathname;

  return (
    <header className="border-b bg-white">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="font-bold text-lg">
          MyApp
        </Link>

        {/* Desktop nav using shadcn NavigationMenu for richer behavior */}
        <div className="hidden md:flex items-center">
          <NavigationMenu>
            <NavigationMenuList>
              {links.map((l) => (
                <NavigationMenuItem key={l.href}>
                  <NavigationMenuLink asChild>
                    <Link
                      href={l.href}
                      className={"px-2 py-1 rounded " + (isActive(l.href) ? "text-primary font-semibold" : "text-muted-foreground")}
                    >
                      {l.label}
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        <div className="hidden md:block">
          <Button>Sign In</Button>
        </div>

        {/* Mobile controls */}
        <div className="md:hidden flex items-center">
          <Button onClick={() => setOpen((v) => !v)} aria-expanded={open}>
            {open ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3 5h14a1 1 0 010 2H3a1 1 0 110-2zm0 4h14a1 1 0 010 2H3a1 1 0 110-2zm0 4h14a1 1 0 010 2H3a1 1 0 110-2z" clipRule="evenodd" />
              </svg>
            )}
          </Button>
        </div>

        {/* Mobile menu with scale and slide animations */}
        <div
          className={`absolute top-16 left-0 right-0 bg-white border-t md:hidden transform origin-top transition-all duration-200 ease-out ${
            open ? "opacity-100 translate-y-0 scale-100" : "opacity-0 -translate-y-2 scale-95 pointer-events-none"
          }`}
        >
          <div className="flex flex-col p-4 gap-2">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className={"px-2 py-2 rounded " + (isActive(l.href) ? "text-primary font-semibold" : "text-muted-foreground")}
              >
                {l.label}
              </Link>
            ))}

            <div className="pt-2">
              <Button onClick={() => setOpen(false)} className="w-full">
                Sign In
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
