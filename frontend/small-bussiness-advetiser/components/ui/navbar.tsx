"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import SignInModal from "@/components/SignInModal";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  async function checkAuth() {
    try {
      const res = await fetch("/api/me", {
        cache: "no-store",
      });

      setLoggedIn(res.ok);
    } catch {
      setLoggedIn(false);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    checkAuth();
  }, []);

  async function handleLogout() {
    await fetch("/api/logout", { method: "POST" });

    setLoggedIn(false);
    setOpen(false);
  }

  async function handleLoginSuccess() {
    setOpen(false);
    await checkAuth(); // re-check session after login
  }

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

        {loading ? null : loggedIn ? (
          <Button onClick={handleLogout}>
            Logout
          </Button>
        ) : (
          <Button onClick={() => setOpen(true)}>
            Sign In
          </Button>
        )}

        <SignInModal
          open={open}
          onClose={() => setOpen(false)}
          onSuccess={handleLoginSuccess}
        />
      </div>
    </header>
  );
}