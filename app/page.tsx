import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Cpu, Settings, Wrench } from "lucide-react"

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2 font-bold">
            <Cpu className="h-5 w-5" />
            <span>Dipark Tech Solutions</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/" className="text-sm font-medium">
              Home
            </Link>
            <Link href="/configurator" className="text-sm font-medium">
              Product Configurator
            </Link>
            <Link href="/dashboard" className="text-sm font-medium">
              Device Dashboard
            </Link>
            <Link href="/schedule" className="text-sm font-medium">
              Schedule Visit
            </Link>
          </nav>
          <Button asChild>
            <Link href="/schedule">Contact Us</Link>
          </Button>
        </div>
      </header>
      <main className="flex-1">
        <section className="py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Integrated Hardware & Software Solutions
                </h1>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  Customizable devices with real-time monitoring and professional on-site support.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button asChild>
                  <Link href="/configurator">
                    Configure Your Device <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href="/dashboard">View Dashboard</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
        <section className="py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-3 lg:gap-12">
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="rounded-full bg-primary/10 p-4">
                  <Settings className="h-6 w-6 text-primary" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">3D Product Configurator</h3>
                  <p className="text-muted-foreground">
                    Customize your hardware solution with our interactive 3D configurator.
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="rounded-full bg-primary/10 p-4">
                  <Cpu className="h-6 w-6 text-primary" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">IoT Device Dashboard</h3>
                  <p className="text-muted-foreground">
                    Monitor your devices in real-time with our comprehensive dashboard.
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="rounded-full bg-primary/10 p-4">
                  <Wrench className="h-6 w-6 text-primary" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">On-Site Support</h3>
                  <p className="text-muted-foreground">
                    Schedule professional on-site visits with timezone-aware scheduling.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t py-6 md:py-8">
        <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="flex items-center gap-2 text-sm">
            <Cpu className="h-4 w-4" />
            <span>© 2025 Dipark Tech Solutions. All rights reserved.</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="#" className="text-sm underline underline-offset-4">
              Terms
            </Link>
            <Link href="#" className="text-sm underline underline-offset-4">
              Privacy
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
