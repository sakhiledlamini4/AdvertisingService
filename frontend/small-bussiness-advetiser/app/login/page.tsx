"use client";
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Navbar } from "@/components/ui/navbar"
import { StatsCards } from "@/components/ui/statsCards";
import { useState } from "react";

export default function SignInModal({open, onClose}: any) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  if (!open) return null;

  async function handleLogin() {
    setError("");

    const res = await fetch("/api/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });

    if (res.ok) {
      onClose(); // ✅ close modal on success
      window.location.reload(); // refresh UI state (simple version)
    } else {
      setError("Invalid login");
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg w-96">
        <h2 className="text-xl font-bold mb-4">Sign In</h2>

        <Input
          className="border p-2 w-full mb-2"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <Input
          className="border p-2 w-full mb-4"
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && <p className="text-red-500">{error}</p>}

        <div className="flex justify-between">
          <Button
            className="px-4 py-2 bg-gray-300 rounded"
            onClick={onClose}
          >
            Cancel
          </Button>

          <Button className="px-4 py-2 bg-blue-600 text-white rounded" onClick={handleLogin}>
            Sign In
          </Button>
        </div>
      </div>
    </div>
  )
}