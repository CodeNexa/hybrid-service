"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, CalendarIcon, Clock, Globe, MapPin } from "lucide-react"
import { format } from "date-fns"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"

export default function SchedulePage() {
  const [date, setDate] = useState<Date>()
  const [timeSlot, setTimeSlot] = useState<string>("")
  const [timezone, setTimezone] = useState<string>("")
  const [location, setLocation] = useState<{ lat: number; lng: number; address: string } | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  // Detect user's timezone on component mount
  useEffect(() => {
    const userTimezone = Intl.DateTimeFormat().resolvedOptions().timezone
    setTimezone(userTimezone)

    // Get user's location if they allow it
    if (navigator.geolocation) {
      setIsLoading(true)
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords

          // In a real app, you would use a geocoding service to get the address
          // For this demo, we'll just use the coordinates
          setLocation({
            lat: latitude,
            lng: longitude,
            address: `Latitude: ${latitude.toFixed(4)}, Longitude: ${longitude.toFixed(4)}`,
          })
          setIsLoading(false)
        },
        (error) => {
          console.error("Error getting location:", error)
          setIsLoading(false)
        },
      )
    }
  }, [])

  // Available time slots
  const timeSlots = ["9:00 AM - 11:00 AM", "11:00 AM - 1:00 PM", "2:00 PM - 4:00 PM", "4:00 PM - 6:00 PM"]

  // Common timezones
  const timezones = [
    "America/New_York",
    "America/Chicago",
    "America/Denver",
    "America/Los_Angeles",
    "Europe/London",
    "Europe/Paris",
    "Asia/Tokyo",
    "Australia/Sydney",
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, you would submit this data to your backend
    alert("Visit scheduled successfully!")
  }

  return (
    <div className="flex min-h-screen flex-col">
      <div className="container py-4">
        <Button variant="ghost" size="sm" asChild className="mb-4">
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
        </Button>

        <div className="flex flex-col md:flex-row gap-6">
          <div className="md:w-1/2">
            <h1 className="text-3xl font-bold mb-2">Schedule an On-Site Visit</h1>
            <p className="text-muted-foreground mb-6">
              Our technicians will visit your location to install, maintain, or repair your devices.
            </p>

            <form onSubmit={handleSubmit}>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" placeholder="John Doe" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" type="email" placeholder="john@example.com" required />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" placeholder="(123) 456-7890" required />
                  </div>
                  <div className="space-y-2">
                    <Label>Service Type</Label>
                    <RadioGroup defaultValue="installation">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="installation" id="installation" />
                        <Label htmlFor="installation">Installation</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="maintenance" id="maintenance" />
                        <Label htmlFor="maintenance">Maintenance</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="repair" id="repair" />
                        <Label htmlFor="repair">Repair</Label>
                      </div>
                    </RadioGroup>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Preferred Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP") : "Select a date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        initialFocus
                        disabled={(date) => {
                          // Disable past dates and weekends
                          const now = new Date()
                          now.setHours(0, 0, 0, 0)
                          const day = date.getDay()
                          return date < now || day === 0 || day === 6
                        }}
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="timeSlot">Preferred Time</Label>
                  <Select value={timeSlot} onValueChange={setTimeSlot}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a time slot" />
                    </SelectTrigger>
                    <SelectContent>
                      {timeSlots.map((slot) => (
                        <SelectItem key={slot} value={slot}>
                          {slot}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <div className="flex items-center text-xs text-muted-foreground mt-1">
                    <Clock className="h-3 w-3 mr-1" />
                    <span>All times are in your local timezone: {timezone}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Textarea
                    id="address"
                    placeholder="Enter your full address"
                    value={location?.address || ""}
                    onChange={(e) => setLocation({ ...location!, address: e.target.value })}
                    required
                  />
                  {isLoading && <div className="text-xs text-muted-foreground">Detecting your location...</div>}
                  {location && !isLoading && (
                    <div className="flex items-center text-xs text-muted-foreground">
                      <MapPin className="h-3 w-3 mr-1" />
                      <span>Location detected</span>
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="notes">Additional Notes</Label>
                  <Textarea id="notes" placeholder="Any special instructions or details about your service needs" />
                </div>

                <Button type="submit" className="w-full">
                  Schedule Visit
                </Button>
              </div>
            </form>
          </div>

          <div className="md:w-1/2">
            <Card>
              <CardHeader>
                <CardTitle>What to Expect</CardTitle>
                <CardDescription>Information about our on-site service visits</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-medium">Professional Technicians</h3>
                  <p className="text-sm text-muted-foreground">
                    Our certified technicians are experts in hardware and software integration.
                  </p>
                </div>
                <div>
                  <h3 className="font-medium">Service Duration</h3>
                  <p className="text-sm text-muted-foreground">
                    Most service visits take 1-2 hours depending on the complexity of your setup.
                  </p>
                </div>
                <div>
                  <h3 className="font-medium">Preparation</h3>
                  <p className="text-sm text-muted-foreground">
                    Please ensure access to your devices and clear the surrounding area before our arrival.
                  </p>
                </div>
                <div>
                  <h3 className="font-medium">Confirmation</h3>
                  <p className="text-sm text-muted-foreground">
                    You'll receive a confirmation email with your appointment details and a reminder 24 hours before the
                    scheduled visit.
                  </p>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col items-start">
                <div className="flex items-center mb-2">
                  <Globe className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span className="text-sm font-medium">Service Areas</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  We currently provide on-site services in major metropolitan areas. Our system has detected your
                  timezone as {timezone}, which is within our service area.
                </p>
              </CardFooter>
            </Card>

            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Frequently Asked Questions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-medium">How much does an on-site visit cost?</h3>
                  <p className="text-sm text-muted-foreground">
                    Service costs vary depending on the type of service. Installation is included with new device
                    purchases. Maintenance and repairs are covered under warranty or service plans.
                  </p>
                </div>
                <div>
                  <h3 className="font-medium">Can I reschedule my appointment?</h3>
                  <p className="text-sm text-muted-foreground">
                    Yes, you can reschedule up to 24 hours before your appointment without any penalty.
                  </p>
                </div>
                <div>
                  <h3 className="font-medium">What if I'm not available during the listed time slots?</h3>
                  <p className="text-sm text-muted-foreground">
                    Please contact our customer support team to arrange a custom appointment time.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
