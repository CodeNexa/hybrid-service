"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  AlertTriangle,
  ArrowLeft,
  Battery,
  CheckCircle,
  Clock,
  Cpu,
  HardDrive,
  RefreshCw,
  Signal,
  Thermometer,
  Wifi,
} from "lucide-react"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts"

// Mock data for the dashboard
const devices = [
  {
    id: 1,
    name: "Living Room Sensor",
    status: "online",
    battery: 78,
    signal: 92,
    temperature: 24.5,
    lastUpdate: "2 min ago",
  },
  { id: 2, name: "Kitchen Hub", status: "online", battery: 100, signal: 87, temperature: 26.2, lastUpdate: "Just now" },
  {
    id: 3,
    name: "Garage Monitor",
    status: "warning",
    battery: 32,
    signal: 45,
    temperature: 18.7,
    lastUpdate: "5 min ago",
  },
  {
    id: 4,
    name: "Bedroom Controller",
    status: "offline",
    battery: 0,
    signal: 0,
    temperature: 0,
    lastUpdate: "3 hours ago",
  },
  {
    id: 5,
    name: "Bathroom Sensor",
    status: "online",
    battery: 65,
    signal: 78,
    temperature: 22.3,
    lastUpdate: "10 min ago",
  },
]

// Mock data for charts
const generateChartData = (days = 7) => {
  return Array.from({ length: days }).map((_, i) => {
    const date = new Date()
    date.setDate(date.getDate() - (days - 1 - i))
    const dateStr = date.toLocaleDateString("en-US", { month: "short", day: "numeric" })

    return {
      date: dateStr,
      temperature: Math.floor(Math.random() * 10) + 20,
      humidity: Math.floor(Math.random() * 30) + 40,
      battery: Math.floor(Math.random() * 20) + 70,
      signal: Math.floor(Math.random() * 15) + 80,
    }
  })
}

export default function DashboardPage() {
  const [chartData, setChartData] = useState(generateChartData())
  const [lastRefresh, setLastRefresh] = useState(new Date())

  const refreshData = () => {
    setChartData(generateChartData())
    setLastRefresh(new Date())
  }

  // Auto refresh every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      refreshData()
    }, 30000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex min-h-screen flex-col">
      <div className="container py-4">
        <Button variant="ghost" size="sm" asChild className="mb-4">
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
        </Button>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <div>
            <h1 className="text-3xl font-bold">IoT Device Dashboard</h1>
            <p className="text-muted-foreground">Monitor and manage your connected devices</p>
          </div>
          <div className="flex items-center gap-2">
            <p className="text-sm text-muted-foreground">Last updated: {lastRefresh.toLocaleTimeString()}</p>
            <Button size="sm" variant="outline" onClick={refreshData}>
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Devices</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{devices.length}</div>
              <p className="text-xs text-muted-foreground">
                {devices.filter((d) => d.status === "online").length} online
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">System Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                <div className="text-lg font-medium">Operational</div>
              </div>
              <p className="text-xs text-muted-foreground">All systems normal</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Average Battery</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {Math.round(devices.reduce((acc, device) => acc + device.battery, 0) / devices.length)}%
              </div>
              <Progress
                value={Math.round(devices.reduce((acc, device) => acc + device.battery, 0) / devices.length)}
                className="h-2 mt-2"
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Average Signal</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {Math.round(devices.reduce((acc, device) => acc + device.signal, 0) / devices.length)}%
              </div>
              <Progress
                value={Math.round(devices.reduce((acc, device) => acc + device.signal, 0) / devices.length)}
                className="h-2 mt-2"
              />
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Performance Metrics</CardTitle>
              <CardDescription>Device metrics over the past week</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="temperature">
                <TabsList className="mb-4">
                  <TabsTrigger value="temperature">Temperature</TabsTrigger>
                  <TabsTrigger value="humidity">Humidity</TabsTrigger>
                  <TabsTrigger value="battery">Battery</TabsTrigger>
                  <TabsTrigger value="signal">Signal</TabsTrigger>
                </TabsList>

                <TabsContent value="temperature">
                  <div className="h-[300px]">
                    <ChartContainer
                      config={{
                        temperature: {
                          label: "Temperature",
                          color: "hsl(var(--chart-1))",
                        },
                      }}
                    >
                      <AreaChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                        <defs>
                          <linearGradient id="colorTemp" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="var(--color-temperature)" stopOpacity={0.8} />
                            <stop offset="95%" stopColor="var(--color-temperature)" stopOpacity={0} />
                          </linearGradient>
                        </defs>
                        <XAxis dataKey="date" />
                        <YAxis />
                        <CartesianGrid strokeDasharray="3 3" />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Area
                          type="monotone"
                          dataKey="temperature"
                          stroke="var(--color-temperature)"
                          fillOpacity={1}
                          fill="url(#colorTemp)"
                        />
                      </AreaChart>
                    </ChartContainer>
                  </div>
                </TabsContent>

                <TabsContent value="humidity">
                  <div className="h-[300px]">
                    <ChartContainer
                      config={{
                        humidity: {
                          label: "Humidity",
                          color: "hsl(var(--chart-2))",
                        },
                      }}
                    >
                      <AreaChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                        <defs>
                          <linearGradient id="colorHumid" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="var(--color-humidity)" stopOpacity={0.8} />
                            <stop offset="95%" stopColor="var(--color-humidity)" stopOpacity={0} />
                          </linearGradient>
                        </defs>
                        <XAxis dataKey="date" />
                        <YAxis />
                        <CartesianGrid strokeDasharray="3 3" />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Area
                          type="monotone"
                          dataKey="humidity"
                          stroke="var(--color-humidity)"
                          fillOpacity={1}
                          fill="url(#colorHumid)"
                        />
                      </AreaChart>
                    </ChartContainer>
                  </div>
                </TabsContent>

                <TabsContent value="battery">
                  <div className="h-[300px]">
                    <ChartContainer
                      config={{
                        battery: {
                          label: "Battery",
                          color: "hsl(var(--chart-3))",
                        },
                      }}
                    >
                      <AreaChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                        <defs>
                          <linearGradient id="colorBatt" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="var(--color-battery)" stopOpacity={0.8} />
                            <stop offset="95%" stopColor="var(--color-battery)" stopOpacity={0} />
                          </linearGradient>
                        </defs>
                        <XAxis dataKey="date" />
                        <YAxis />
                        <CartesianGrid strokeDasharray="3 3" />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Area
                          type="monotone"
                          dataKey="battery"
                          stroke="var(--color-battery)"
                          fillOpacity={1}
                          fill="url(#colorBatt)"
                        />
                      </AreaChart>
                    </ChartContainer>
                  </div>
                </TabsContent>

                <TabsContent value="signal">
                  <div className="h-[300px]">
                    <ChartContainer
                      config={{
                        signal: {
                          label: "Signal",
                          color: "hsl(var(--chart-4))",
                        },
                      }}
                    >
                      <AreaChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                        <defs>
                          <linearGradient id="colorSignal" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="var(--color-signal)" stopOpacity={0.8} />
                            <stop offset="95%" stopColor="var(--color-signal)" stopOpacity={0} />
                          </linearGradient>
                        </defs>
                        <XAxis dataKey="date" />
                        <YAxis />
                        <CartesianGrid strokeDasharray="3 3" />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Area
                          type="monotone"
                          dataKey="signal"
                          stroke="var(--color-signal)"
                          fillOpacity={1}
                          fill="url(#colorSignal)"
                        />
                      </AreaChart>
                    </ChartContainer>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Device Status</CardTitle>
              <CardDescription>Current status of all devices</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {devices.map((device) => (
                  <div key={device.id} className="flex items-start justify-between">
                    <div className="space-y-1">
                      <div className="flex items-center">
                        {device.status === "online" && <CheckCircle className="h-4 w-4 text-green-500 mr-1.5" />}
                        {device.status === "warning" && <AlertTriangle className="h-4 w-4 text-amber-500 mr-1.5" />}
                        {device.status === "offline" && <AlertTriangle className="h-4 w-4 text-red-500 mr-1.5" />}
                        <p className="font-medium">{device.name}</p>
                      </div>
                      <div className="flex items-center text-xs text-muted-foreground">
                        <Clock className="h-3 w-3 mr-1" />
                        <span>{device.lastUpdate}</span>
                      </div>
                    </div>
                    <div className="flex gap-1.5">
                      {device.status !== "offline" && (
                        <>
                          <div className="flex flex-col items-center text-xs">
                            <Battery className="h-3 w-3 mb-0.5" />
                            <span>{device.battery}%</span>
                          </div>
                          <div className="flex flex-col items-center text-xs">
                            <Signal className="h-3 w-3 mb-0.5" />
                            <span>{device.signal}%</span>
                          </div>
                          <div className="flex flex-col items-center text-xs">
                            <Thermometer className="h-3 w-3 mb-0.5" />
                            <span>{device.temperature}°C</span>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" size="sm" className="w-full">
                View All Devices
              </Button>
            </CardFooter>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium">System CPU</CardTitle>
                <Cpu className="h-4 w-4 text-muted-foreground" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">24%</div>
              <Progress value={24} className="h-2 mt-2" />
              <p className="text-xs text-muted-foreground mt-1">Normal operation</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium">Memory Usage</CardTitle>
                <HardDrive className="h-4 w-4 text-muted-foreground" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">42%</div>
              <Progress value={42} className="h-2 mt-2" />
              <p className="text-xs text-muted-foreground mt-1">3.4 GB / 8 GB</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium">Network</CardTitle>
                <Wifi className="h-4 w-4 text-muted-foreground" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">87%</div>
              <Progress value={87} className="h-2 mt-2" />
              <p className="text-xs text-muted-foreground mt-1">Strong connection</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium">Temperature</CardTitle>
                <Thermometer className="h-4 w-4 text-muted-foreground" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">38°C</div>
              <Progress value={38} max={100} className="h-2 mt-2" />
              <p className="text-xs text-muted-foreground mt-1">Normal operating range</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
