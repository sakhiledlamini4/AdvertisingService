import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Navbar() {
  return (
    <header className="border-b">
      <div className="container mx-auto flex h-16 items-center justify-between">
        <Link href="/" className="font-bold">
          SB Advertiser
        </Link>

        <nav className="flex gap-4">
          <Link href="/dashboard">Home</Link>
          <Link href="/dashboard">Dashboard</Link>
          <Link href="/pricing">Pricing</Link>
        </nav>

        <Button>Sign In</Button>
      </div>
    </header>
  );
}