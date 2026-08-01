import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Navbar } from "@/components/ui/navbar"
import { StatsCards } from "@/components/ui/statsCards";

function Hero() {
  return (
    <section className="relative bg-cover bg-center text-white" style={{ backgroundImage: `url('https://source.unsplash.com/1600x900/?small%20business,shop,owner,interior')` }}>
      <div className="backdrop-blur-[2px] bg-black/45">
        <div className="max-w-7xl mx-auto px-6 py-32">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-4 leading-tight">Find Trusted Businesses for Every Service You Need</h1>
          <p className="text-xl md:text-2xl text-white/90 mb-8">Browse verified professionals, compare services, read reviews, and connect with businesses in minutes.</p>

          <div className="flex flex-col md:flex-row gap-3 items-center">
            <Input placeholder="What service are you looking for?" className="flex-1 md:flex-auto" />
            <Input placeholder="Enter location" className="w-full md:w-[320px]" />
            <Button className="whitespace-nowrap">Search Services</Button>
          </div>

          <div className="mt-4 text-sm text-white/80">Popular: <span className="ml-2 space-x-2">
            <button className="px-3 py-1 bg-white/10 rounded-full">Home Cleaning</button>
            <button className="px-3 py-1 bg-white/10 rounded-full">Plumbing</button>
            <button className="px-3 py-1 bg-white/10 rounded-full">Electrician</button>
            <button className="px-3 py-1 bg-white/10 rounded-full">Web Design</button>
          </span></div>
        </div>
      </div>
    </section>
  )
}

function CategoriesRow() {
  const cats = ["Home Cleaning","Plumbing","Electrical","Construction","Marketing","Web Design","Beauty","Healthcare","Legal","Moving Services"]
  return (
    <section className="max-w-7xl mx-auto px-6 py-8">
      <div className="grid grid-cols-2 md:grid-cols-5 lg:grid-cols-10 gap-4">
        {cats.map((c) => (
          <div key={c} className="flex flex-col items-center gap-2 p-4 bg-white rounded-lg shadow-sm">
            <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center">🔧</div>
            <div className="text-sm text-center">{c}</div>
            <div className="text-xs text-gray-500">1,234 businesses</div>
          </div>
        ))}
      </div>
    </section>
  )
}

function Features() {
  const items = [
    {title: 'Verified Businesses', desc: 'Every listing is reviewed before publication.'},
    {title: 'Genuine Reviews', desc: 'Real customer ratings help you choose confidently.'},
    {title: 'Local & National Listings', desc: 'Find businesses near you or anywhere.'},
    {title: 'Fast Quotes', desc: 'Contact multiple businesses with one request.'}
  ]
  return (
    <section className="bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-4">
        {items.map(i=> (
          <Card key={i.title}>
            <CardContent>
              <h3 className="font-semibold">{i.title}</h3>
              <p className="text-sm text-gray-600 mt-2">{i.desc}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}

async function FeaturedBusinesses(){
  // server-side fetch from proxy API
  const base = process.env.NEXT_PUBLIC_BASE_URL ?? `http://localhost:${process.env.PORT ?? 3000}`;
  const res = await fetch(`${base}/api/backend/services`, { cache: 'no-store' });
  const payload = await res.json().catch(()=>({ success: false, data: [] }));
  const cards = (payload?.data ?? []).slice(0,5);

  return (
    <section className="max-w-7xl mx-auto px-6 py-10">
      <h2 className="text-2xl font-bold mb-6">Featured Businesses</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {cards.map((c:any)=> (
          <Card key={c.id}>
            <img src={c.imageUrl ?? '/thumb.svg'} alt={c.name} className="w-full h-36 object-cover rounded-t-lg" />
            <CardContent>
              <h4 className="font-semibold">{c.name}</h4>
              <div className="text-xs text-gray-500">{c.category} · {c.location}</div>
              <div className="mt-3">
                <Button>View Profile</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}

function HowItWorks(){
  const steps = ['Search','Compare','Connect']
  const desc = ['Find the service you need.','Read reviews and compare providers.','Contact the business directly.']
  return (
    <section className="max-w-7xl mx-auto px-6 py-12">
      <h2 className="text-2xl font-bold text-center mb-8">How It Works</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {steps.map((s,i)=>(
          <div key={s} className="p-6 bg-white rounded-lg text-center shadow-sm">
            <div className="w-12 h-12 mx-auto mb-4 bg-blue-50 rounded-full flex items-center justify-center">{i+1}</div>
            <h3 className="font-semibold">{s}</h3>
            <p className="text-sm text-gray-600 mt-2">{desc[i]}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

function Testimonials(){
  const t = [
    {name:'Sarah L.', text:'The cleaning service was fantastic! Will book again.', city:'Los Angeles, CA'},
    {name:'James T.', text:'Found a great electrician within an hour. Highly recommend!', city:'New York, NY'},
    {name:'Michael R.', text:'Got multiple quotes and saved time and money.', city:'Chicago, IL'}
  ]
  return (
    <section className="bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-2xl font-bold text-center mb-8">What Our Customers Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {t.map(item => (
            <div key={item.name} className="p-6 bg-white rounded-lg shadow-sm">
              <div className="text-yellow-400">★★★★★</div>
              <p className="mt-3 text-gray-700">{item.text}</p>
              <div className="mt-4 text-sm text-gray-500">{item.name} · {item.city}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function CtaStrip(){
  return (
    <section className="py-12 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <h3 className="text-2xl font-bold">Grow Your Business Today</h3>
          <p className="mt-2 text-white/90">Reach thousands of customers actively searching for your services.</p>
        </div>
        <Button>Advertise Your Business</Button>
      </div>
    </section>
  )
}

async function LatestBusinesses(){
  const base = process.env.NEXT_PUBLIC_BASE_URL ?? `http://localhost:${process.env.PORT ?? 3000}`;
  const res = await fetch(`${base}/api/backend/services`, { cache: 'no-store' });
  const payload = await res.json().catch(()=>({ success: false, data: [] }));
  const latest = (payload?.data ?? []).slice(0,5);
  return (
    <section className="max-w-7xl mx-auto px-6 py-10">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold">Latest Businesses</h2>
        <a className="text-sm text-blue-600">View all →</a>
      </div>
      <div className="flex gap-4 overflow-x-auto">
        {latest.map((l:any)=> (
          <div key={l.id} className="min-w-[200px] p-4 bg-white rounded-lg shadow-sm">
            <img src={l.imageUrl ?? '/thumb.svg'} className="h-20 w-full object-cover rounded mb-3" />
            <div className="font-semibold">{l.name}</div>
            <div className="text-xs text-gray-500">{l.category}</div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="pt-6">
        <Hero />
        <CategoriesRow />
        <Features />
        <FeaturedBusinesses />
        <HowItWorks />
        <Testimonials />
        <StatsCards />
        <CtaStrip />
        <LatestBusinesses />
      </main>
    </>
  )
}