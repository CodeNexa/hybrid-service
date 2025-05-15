"use client"

import { Suspense, useState } from "react"
import Link from "next/link"
import { Canvas } from "@react-three/fiber"
import { Environment, OrbitControls, PresentationControls } from "@react-three/drei"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Download, Share } from "lucide-react"
import { ProductModel } from "./product-model"

export default function ConfiguratorPage() {
  const [color, setColor] = useState("#6366f1")
  const [size, setSize] = useState(1)
  const [variant, setVariant] = useState("standard")

  return (
    <div className="flex min-h-screen flex-col">
      <div className="container py-4">
        <Button variant="ghost" size="sm" asChild className="mb-4">
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
        </Button>
        <h1 className="text-3xl font-bold mb-6">3D Product Configurator</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2 h-[500px] md:h-[600px]">
            <CardContent className="p-0 h-full">
              <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
                <Suspense fallback={null}>
                  <PresentationControls
                    global
                    zoom={0.8}
                    rotation={[0, 0, 0]}
                    polar={[-Math.PI / 4, Math.PI / 4]}
                    azimuth={[-Math.PI / 4, Math.PI / 4]}
                  >
                    <ProductModel color={color} scale={size} variant={variant} />
                  </PresentationControls>
                  <OrbitControls enableZoom={false} />
                  <Environment preset="studio" />
                </Suspense>
              </Canvas>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <Tabs defaultValue="appearance" className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-4">
                  <TabsTrigger value="appearance">Appearance</TabsTrigger>
                  <TabsTrigger value="specs">Specifications</TabsTrigger>
                </TabsList>

                <TabsContent value="appearance" className="space-y-6">
                  <div className="space-y-2">
                    <Label>Color</Label>
                    <div className="flex gap-2">
                      {["#6366f1", "#ec4899", "#14b8a6", "#f59e0b", "#64748b"].map((c) => (
                        <button
                          key={c}
                          className="w-8 h-8 rounded-full border-2 transition-all"
                          style={{
                            backgroundColor: c,
                            borderColor: color === c ? "white" : c,
                            outline: color === c ? `2px solid ${c}` : "none",
                            outlineOffset: 2,
                          }}
                          onClick={() => setColor(c)}
                        />
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Size</Label>
                    <Slider
                      value={[size]}
                      min={0.5}
                      max={1.5}
                      step={0.1}
                      onValueChange={(value) => setSize(value[0])}
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Small</span>
                      <span>Large</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Variant</Label>
                    <RadioGroup value={variant} onValueChange={setVariant}>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="standard" id="standard" />
                        <Label htmlFor="standard">Standard</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="premium" id="premium" />
                        <Label htmlFor="premium">Premium</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="enterprise" id="enterprise" />
                        <Label htmlFor="enterprise">Enterprise</Label>
                      </div>
                    </RadioGroup>
                  </div>
                </TabsContent>

                <TabsContent value="specs" className="space-y-4">
                  <div>
                    <h3 className="font-medium">Processing Power</h3>
                    <p className="text-sm text-muted-foreground">
                      {variant === "standard"
                        ? "Dual-core processor"
                        : variant === "premium"
                          ? "Quad-core processor"
                          : "Octa-core processor"}
                    </p>
                  </div>
                  <div>
                    <h3 className="font-medium">Memory</h3>
                    <p className="text-sm text-muted-foreground">
                      {variant === "standard" ? "4GB RAM" : variant === "premium" ? "8GB RAM" : "16GB RAM"}
                    </p>
                  </div>
                  <div>
                    <h3 className="font-medium">Storage</h3>
                    <p className="text-sm text-muted-foreground">
                      {variant === "standard" ? "128GB SSD" : variant === "premium" ? "512GB SSD" : "1TB SSD"}
                    </p>
                  </div>
                  <div>
                    <h3 className="font-medium">Connectivity</h3>
                    <p className="text-sm text-muted-foreground">
                      {variant === "standard"
                        ? "Wi-Fi 6, Bluetooth 5.0"
                        : variant === "premium"
                          ? "Wi-Fi 6E, Bluetooth 5.2, Ethernet"
                          : "Wi-Fi 7, Bluetooth 5.3, Ethernet, 5G"}
                    </p>
                  </div>
                </TabsContent>
              </Tabs>

              <div className="mt-6 space-y-2">
                <Button className="w-full">Add to Cart</Button>
                <div className="flex gap-2">
                  <Button variant="outline" className="flex-1">
                    <Download className="mr-2 h-4 w-4" />
                    Save
                  </Button>
                  <Button variant="outline" className="flex-1">
                    <Share className="mr-2 h-4 w-4" />
                    Share
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
