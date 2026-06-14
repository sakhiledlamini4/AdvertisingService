"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import SignInModal from "@/app/login/page";

export function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <header className="border-b">
      <div className="container mx-auto flex h-16 items-center justify-between">
        <Link href="/" className="font-bold">
          SB Advertiser
        </Link>

        <nav className="flex gap-4">
          <Link href="/dashboard">Dashboard</Link>
          <Link href="/pricing">Pricing</Link>
          <Link href="/about">About</Link>
        </nav>

        <Button onClick={() => setOpen(true)}>
          Sign In
        </Button>
        <SignInModal open={open} onClose={() => setOpen(false)} />
      </div>
    </header>
  );
}