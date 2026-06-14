import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Navbar } from "@/components/ui/navbar"
import { StatsCards } from "@/components/ui/statsCards";


export default function Home() {
  return (
    <>
      <Navbar />
      <StatsCards />
      <main className="flex min-h-screen items-center justify-center">
        <Card className="w-[400px]">
        <CardContent className="space-y-4 p-6">
          <h1 className="text-2xl font-bold">
            Login
          </h1>

          <Input placeholder="Email" />

          <Input
            type="password"
            placeholder="Password"
          />

          <Button className="w-full">
            Sign In
          </Button>
        </CardContent>
      </Card>
      </main>
    </>
  )
}