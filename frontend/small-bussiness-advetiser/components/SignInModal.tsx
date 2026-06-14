"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Card, CardContent } from "./ui/card";

export default function SignInModal({ open, onClose, onSuccess, }: {
  open: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  if (!open) return null;

  async function handleLogin() {
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (res.ok) {
        setLoading(false);

        onClose();      // close modal
        onSuccess?.();  // notify navbar to refresh auth state
      } else {
        const data = await res.json().catch(() => null);
        setError(data?.message || "Invalid login");
        setLoading(false);
      }
    } catch (err) {
      setError("Something went wrong");
      setLoading(false);
    }
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter") {
      handleLogin();
    }
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
    <Card className="w-[400px]">
      <CardContent className="p-6" onKeyDown={handleKeyDown}>
        <h1 className="text-xl font-bold mb-4 text-center">Sign In</h1>

        <Input
          placeholder="Email"
          className="mb-2"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <Input
          type="password"
          placeholder="Password"
          className="mb-2"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && (
          <p className="text-red-500 mb-2">{error}</p>
        )}

        <div className="flex flex-col gap-2 mt-4">

          <Button className="w-full" onClick={handleLogin} disabled={loading}>
            {loading ? "Signing in..." : "Sign In"}
          </Button>

          <Button variant="outline" className="w-full" onClick={onClose}>
            Cancel
          </Button>
        </div>
      </CardContent>
    </Card>
  </div>
  );
}