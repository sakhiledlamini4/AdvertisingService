"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import SignInModal from "@/components/SignInModal";
import SignUpModal from "@/components/SignUpModal";

export function Navbar() {
  const [signInOpen, setSignInOpen] = useState(false);
  const [signUpOpen, setSignUpOpen] = useState(false);
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
    setSignInOpen(false);
  }

  async function handleLoginSuccess() {
    setSignInOpen(false);
    await checkAuth(); // re-check session after login
  }

  return (
    <header className="border-b">
      <div className="max-w-8xl mx-auto px-6 flex h-16 items-center justify-between">
        <Link href="/" className="font-bold">
          SB Advertiser
        </Link>

        <nav className="flex gap-4">
          <Link href="/dashboard">Dashboard</Link>
          <Link href="/pricing">Pricing</Link>
          <Link href="/about">About</Link>
        </nav>

        <div className="flex items-center gap-2">
          {loading ? null : loggedIn ? (
            <Button onClick={handleLogout}>
              Logout
            </Button>
          ) : (
            <>
              <Button
                variant="outline"
                onClick={() => setSignInOpen(true)}
              >
                Sign In
              </Button>

              <Button onClick={() => setSignUpOpen(true)}>
                Sign Up
              </Button>
            </>
          )}
        </div>

        <SignInModal
          open={signInOpen}
          onClose={() => setSignInOpen(false)}
          onSuccess={handleLoginSuccess}
        />
        <SignUpModal
          open={signUpOpen}
          onClose={() => setSignUpOpen(false)}
          onSuccess={handleLoginSuccess}
        />
      </div>
    </header>
  );
}