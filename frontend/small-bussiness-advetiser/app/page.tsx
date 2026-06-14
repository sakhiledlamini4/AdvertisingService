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
    </>
  )
}