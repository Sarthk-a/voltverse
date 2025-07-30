"use client"

import type React from "react"

import { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  ArrowLeft,
  Zap,
  Fuel,
  Leaf,
  IndianRupee,
  Timer,
  Battery,
  Clock,
  TrendingDown,
  BarChart3,
  Calculator,
  Phone,
  Mail,
  MapPin,
  ArrowRight,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Send,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import {
  enhancedICECarData,
  enhancedEVData,
  calculateBreakEvenPoint,
  calculateAnnualSavings,
  calculateCO2Saved,
  calculateDailyBreakEvenKm,
  ANNUAL_KM,
  FUEL_PRICE_PETROL,
  ELECTRICITY_COST,
} from "@/lib/enhanced-data"

export default function EnhancedComparisonPage() {
  const [selectedICECar, setSelectedICECar] = useState<string>("")
  const [selectedEV, setSelectedEV] = useState<string>("")

  // Cost Calculator states
  const [dailyKm, setDailyKm] = useState<number>(30)
  const [calculatorICEPrice, setCalculatorICEPrice] = useState<number>(10)
  const [calculatorEVPrice, setCalculatorEVPrice] = useState<number>(15)
  const [fuelCost, setFuelCost] = useState<number>(100)
  const [chargingCost, setChargingCost] = useState<number>(7)

  // Contact form states
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    message: "",
  })

  const iceCar = useMemo(() => enhancedICECarData.find((car) => car.id === selectedICECar), [selectedICECar])
  const evCar = useMemo(() => enhancedEVData.find((ev) => ev.id === selectedEV), [selectedEV])

  const calculations = useMemo(() => {
    if (!iceCar || !evCar) return null

    const annualSavings = calculateAnnualSavings(iceCar, evCar)
    const breakEvenYears = calculateBreakEvenPoint(iceCar, evCar)
    const co2Saved = calculateCO2Saved(iceCar)
    const dailyBreakEvenKm = calculateDailyBreakEvenKm(iceCar, evCar)

    return {
      annualSavings,
      breakEvenYears,
      co2Saved,
      dailyBreakEvenKm,
      fuelSavings: (iceCar.runningCostPerKm - evCar.runningCostPerKm) * ANNUAL_KM,
      maintenanceSavings: iceCar.maintenanceCost - evCar.maintenanceCost,
    }
  }, [iceCar, evCar])

  // Cost Calculator calculations
  const costCalculatorResults = useMemo(() => {
    const annualKm = dailyKm * 365
    const iceRunningCost = (fuelCost / 20) * annualKm // Assuming 20 km/l average
    const evRunningCost = (chargingCost / 10) * annualKm // Assuming 10 km/kWh average
    const annualSavings = iceRunningCost - evRunningCost + 8000 // 8k maintenance savings
    const priceDifference = (calculatorEVPrice - calculatorICEPrice) * 100000
    const breakEvenYears = priceDifference / annualSavings
    const isWorthIt = breakEvenYears <= 5 && breakEvenYears > 0

    return {
      iceRunningCost,
      evRunningCost,
      annualSavings,
      breakEvenYears,
      isWorthIt,
      recommendedDailyKm: Math.ceil(priceDifference / (365 * 5 * (fuelCost / 20 - chargingCost / 10 + 8000 / 365))),
    }
  }, [dailyKm, calculatorICEPrice, calculatorEVPrice, fuelCost, chargingCost])

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log("Contact form submitted:", contactForm)
    alert("Thank you for your message! We'll get back to you soon.")
    setContactForm({ name: "", email: "", message: "" })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Header */}
      <div className="bg-white border-b shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center space-x-4">
            <Link href="/">
              <Button variant="ghost" size="sm" className="hover:bg-blue-50">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
            </Link>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">ComparEV</h1>
                <p className="text-gray-600 text-sm">Smart EV Comparison Platform</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 space-y-16">
        {/* Hero Section */}
        <div className="text-center">
          <div className="inline-flex items-center space-x-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Zap className="w-4 h-4" />
            <span>India's Most Trusted EV Comparison Platform</span>
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Make <span className="text-blue-600">Smart EV Decisions</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Compare your current car with electric vehicles, calculate real savings, and discover if EVs are right for
            your lifestyle.
          </p>
        </div>

        {/* Enhanced EV vs My Car Comparison */}
        <section className="space-y-8">
          <div className="text-center">
            <h3 className="text-3xl font-bold text-gray-900 mb-2">EV vs My Current Car</h3>
            <p className="text-gray-600">See real savings, break-even analysis, and environmental impact</p>
          </div>

          {/* Vehicle Selection */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="border-2 border-orange-200 hover:border-orange-300 transition-all duration-300 hover:shadow-lg">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Fuel className="w-8 h-8 text-orange-600" />
                </div>
                <CardTitle className="text-xl">Your Current Car</CardTitle>
                <p className="text-gray-600">Select your petrol/diesel vehicle</p>
              </CardHeader>
              <CardContent>
                <Select value={selectedICECar} onValueChange={setSelectedICECar}>
                  <SelectTrigger className="h-14 text-lg">
                    <SelectValue placeholder="Choose your current car" />
                  </SelectTrigger>
                  <SelectContent>
                    {enhancedICECarData.map((car) => (
                      <SelectItem key={car.id} value={car.id} className="py-4">
                        <div className="flex items-center space-x-4">
                          <Image
                            src={car.image || "/placeholder.svg"}
                            alt={`${car.brand} ${car.name}`}
                            width={60}
                            height={40}
                            className="rounded"
                          />
                          <div>
                            <div className="font-medium text-base">
                              {car.brand} {car.name}
                            </div>
                            <div className="text-sm text-gray-500">
                              ₹{car.price} Lakh • {car.fuelEfficiency} km/l • ₹{car.runningCostPerKm.toFixed(2)}/km
                            </div>
                          </div>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </CardContent>
            </Card>

            <Card className="border-2 border-blue-200 hover:border-blue-300 transition-all duration-300 hover:shadow-lg">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-8 h-8 text-blue-600" />
                </div>
                <CardTitle className="text-xl">Electric Vehicle</CardTitle>
                <p className="text-gray-600">Choose an EV to compare</p>
              </CardHeader>
              <CardContent>
                <Select value={selectedEV} onValueChange={setSelectedEV}>
                  <SelectTrigger className="h-14 text-lg">
                    <SelectValue placeholder="Choose an electric vehicle" />
                  </SelectTrigger>
                  <SelectContent>
                    {enhancedEVData.map((ev) => (
                      <SelectItem key={ev.id} value={ev.id} className="py-4">
                        <div className="flex items-center space-x-4">
                          <Image
                            src={ev.image || "/placeholder.svg"}
                            alt={`${ev.brand} ${ev.name}`}
                            width={60}
                            height={40}
                            className="rounded"
                          />
                          <div>
                            <div className="font-medium text-base">
                              {ev.brand} {ev.name}
                            </div>
                            <div className="text-sm text-gray-500">
                              ₹{ev.price} Lakh • {ev.range} km range • ₹{ev.runningCostPerKm.toFixed(2)}/km
                            </div>
                          </div>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </CardContent>
            </Card>
          </div>

          {/* Enhanced Comparison Results */}
          {iceCar && evCar && calculations && (
            <div className="space-y-8">
              {/* Side-by-side vehicle cards with images */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* ICE Car Card */}
                <Card className="overflow-hidden hover:shadow-xl transition-all duration-300">
                  <div className="bg-gradient-to-r from-orange-500 to-red-500 p-6 text-white">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="text-2xl font-bold">
                          {iceCar.brand} {iceCar.name}
                        </h3>
                        <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                          {iceCar.fuelType} Engine
                        </Badge>
                      </div>
                      <div className="text-right">
                        <div className="text-3xl font-bold">₹{iceCar.price}L</div>
                        <div className="text-orange-100">Initial Price</div>
                      </div>
                    </div>
                    <Image
                      src={iceCar.image || "/placeholder.svg"}
                      alt={`${iceCar.brand} ${iceCar.name}`}
                      width={400}
                      height={250}
                      className="w-full h-48 object-cover rounded-lg"
                    />
                  </div>
                  <CardContent className="p-6 space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                        <IndianRupee className="w-5 h-5 text-orange-600" />
                        <div>
                          <div className="text-sm text-gray-600">Running Cost/km</div>
                          <div className="font-bold text-lg">₹{iceCar.runningCostPerKm.toFixed(2)}</div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                        <IndianRupee className="w-5 h-5 text-red-600" />
                        <div>
                          <div className="text-sm text-gray-600">Yearly Cost</div>
                          <div className="font-bold text-lg">
                            ₹{Math.round(iceCar.runningCostPerKm * ANNUAL_KM).toLocaleString()}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                        <Fuel className="w-5 h-5 text-orange-600" />
                        <div>
                          <div className="text-sm text-gray-600">Fuel Efficiency</div>
                          <div className="font-bold text-lg">{iceCar.fuelEfficiency} km/l</div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                        <Leaf className="w-5 h-5 text-red-600" />
                        <div>
                          <div className="text-sm text-gray-600">CO₂ Emissions</div>
                          <div className="font-bold text-lg">{iceCar.co2Emissions} g/km</div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                        <Timer className="w-5 h-5 text-purple-600" />
                        <div>
                          <div className="text-sm text-gray-600">0-100 kmph</div>
                          <div className="font-bold text-lg">{iceCar.acceleration}s</div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                        <IndianRupee className="w-5 h-5 text-yellow-600" />
                        <div>
                          <div className="text-sm text-gray-600">Maintenance/Year</div>
                          <div className="font-bold text-lg">₹{iceCar.maintenanceCost.toLocaleString()}</div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* EV Card */}
                <Card className="overflow-hidden border-2 border-blue-200 hover:shadow-xl transition-all duration-300">
                  <div className="bg-gradient-to-r from-blue-500 to-cyan-500 p-6 text-white">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="text-2xl font-bold">
                          {evCar.brand} {evCar.name}
                        </h3>
                        <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                          Electric Vehicle
                        </Badge>
                      </div>
                      <div className="text-right">
                        <div className="text-3xl font-bold">₹{evCar.price}L</div>
                        <div className="text-blue-100">Initial Price</div>
                      </div>
                    </div>
                    <Image
                      src={evCar.image || "/placeholder.svg"}
                      alt={`${evCar.brand} ${evCar.name}`}
                      width={400}
                      height={250}
                      className="w-full h-48 object-cover rounded-lg"
                    />
                  </div>
                  <CardContent className="p-6 space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                        <IndianRupee className="w-5 h-5 text-green-600" />
                        <div>
                          <div className="text-sm text-gray-600">Running Cost/km</div>
                          <div className="font-bold text-lg text-green-600">₹{evCar.runningCostPerKm.toFixed(2)}</div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                        <IndianRupee className="w-5 h-5 text-green-600" />
                        <div>
                          <div className="text-sm text-gray-600">Yearly Cost</div>
                          <div className="font-bold text-lg text-green-600">
                            ₹{Math.round(evCar.runningCostPerKm * ANNUAL_KM).toLocaleString()}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                        <Battery className="w-5 h-5 text-blue-600" />
                        <div>
                          <div className="text-sm text-gray-600">Range</div>
                          <div className="font-bold text-lg">{evCar.range} km</div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                        <Leaf className="w-5 h-5 text-green-600" />
                        <div>
                          <div className="text-sm text-gray-600">CO₂ Emissions</div>
                          <div className="font-bold text-lg text-green-600">0 g/km</div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                        <Clock className="w-5 h-5 text-orange-600" />
                        <div>
                          <div className="text-sm text-gray-600">Charging Time</div>
                          <div className="font-bold text-lg">{evCar.chargingTime}</div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                        <IndianRupee className="w-5 h-5 text-green-600" />
                        <div>
                          <div className="text-sm text-gray-600">Maintenance/Year</div>
                          <div className="font-bold text-lg text-green-600">
                            ₹{evCar.maintenanceCost.toLocaleString()}
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Enhanced Infographics */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Cost Comparison Chart */}
                <Card className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <BarChart3 className="w-5 h-5 text-blue-600" />
                      <span>Annual Cost Breakdown</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <div className="flex justify-between items-center mb-3">
                        <span className="font-medium">Fuel vs Charging Cost</span>
                        <span className="text-sm text-gray-600">
                          ₹{Math.round(iceCar.runningCostPerKm * ANNUAL_KM).toLocaleString()} vs ₹
                          {Math.round(evCar.runningCostPerKm * ANNUAL_KM).toLocaleString()}
                        </span>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <div className="w-4 h-4 bg-orange-500 rounded"></div>
                          <div
                            className="bg-orange-500 h-8 rounded flex items-center justify-end pr-3 text-white text-sm font-medium"
                            style={{
                              width: `${Math.max(40, ((iceCar.runningCostPerKm * ANNUAL_KM) / Math.max(iceCar.runningCostPerKm * ANNUAL_KM, evCar.runningCostPerKm * ANNUAL_KM)) * 100)}%`,
                            }}
                          >
                            ICE: ₹{Math.round(iceCar.runningCostPerKm * ANNUAL_KM).toLocaleString()}
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="w-4 h-4 bg-blue-500 rounded"></div>
                          <div
                            className="bg-blue-500 h-8 rounded flex items-center justify-end pr-3 text-white text-sm font-medium"
                            style={{
                              width: `${Math.max(20, ((evCar.runningCostPerKm * ANNUAL_KM) / Math.max(iceCar.runningCostPerKm * ANNUAL_KM, evCar.runningCostPerKm * ANNUAL_KM)) * 100)}%`,
                            }}
                          >
                            EV: ₹{Math.round(evCar.runningCostPerKm * ANNUAL_KM).toLocaleString()}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-3">
                        <span className="font-medium">Maintenance Cost</span>
                        <span className="text-sm text-gray-600">
                          ₹{iceCar.maintenanceCost.toLocaleString()} vs ₹{evCar.maintenanceCost.toLocaleString()}
                        </span>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <div className="w-4 h-4 bg-orange-500 rounded"></div>
                          <div
                            className="bg-orange-500 h-8 rounded flex items-center justify-end pr-3 text-white text-sm font-medium"
                            style={{
                              width: `${Math.max(40, (iceCar.maintenanceCost / Math.max(iceCar.maintenanceCost, evCar.maintenanceCost)) * 100)}%`,
                            }}
                          >
                            ICE: ₹{iceCar.maintenanceCost.toLocaleString()}
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="w-4 h-4 bg-blue-500 rounded"></div>
                          <div
                            className="bg-blue-500 h-8 rounded flex items-center justify-end pr-3 text-white text-sm font-medium"
                            style={{
                              width: `${Math.max(20, (evCar.maintenanceCost / Math.max(iceCar.maintenanceCost, evCar.maintenanceCost)) * 100)}%`,
                            }}
                          >
                            EV: ₹{evCar.maintenanceCost.toLocaleString()}
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Break-even Timeline */}
                <Card className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <TrendingDown className="w-5 h-5 text-green-600" />
                      <span>Break-even Analysis</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {calculations.breakEvenYears && calculations.breakEvenYears > 0 ? (
                      <>
                        <div className="text-center">
                          <div className="text-4xl font-bold text-green-600 mb-2">
                            {calculations.breakEvenYears.toFixed(1)} years
                          </div>
                          <div className="text-gray-600">Break-even point</div>
                        </div>
                        <div className="space-y-3">
                          <div className="flex justify-between">
                            <span>Price Difference:</span>
                            <span className="font-semibold">
                              ₹{((evCar.price - iceCar.price) * 100000).toLocaleString()}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span>Annual Savings:</span>
                            <span className="font-semibold text-green-600">
                              ₹{calculations.annualSavings.toLocaleString()}
                            </span>
                          </div>
                          {calculations.dailyBreakEvenKm && (
                            <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                              <div className="text-sm text-blue-800 font-medium">
                                EV is cost-efficient if you drive more than {calculations.dailyBreakEvenKm} km/day
                              </div>
                            </div>
                          )}
                        </div>
                      </>
                    ) : (
                      <div className="text-center">
                        <div className="text-2xl font-bold text-red-600 mb-2">Not Cost Effective</div>
                        <div className="text-gray-600">EV costs more than savings over 10 years</div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>

              {/* Enhanced Savings Summary */}
              <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-2 border-green-200 hover:shadow-xl transition-shadow">
                <CardContent className="p-8">
                  <div className="text-center mb-8">
                    <div className="inline-flex items-center space-x-2 bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium mb-4">
                      <TrendingDown className="w-4 h-4" />
                      <span>Complete Savings Analysis</span>
                    </div>
                    <h3 className="text-3xl font-bold text-gray-900 mb-4">
                      Switching to {evCar.brand} {evCar.name} from your {iceCar.brand} {iceCar.name}
                    </h3>
                    <div className="text-5xl font-bold text-green-600 mb-2">
                      ₹{Math.abs(calculations.annualSavings).toLocaleString()}/year
                    </div>
                    <p className="text-xl text-gray-600">
                      {calculations.annualSavings > 0 ? "Total Annual Savings" : "Additional Annual Cost"}
                    </p>
                    {calculations.breakEvenYears && calculations.breakEvenYears > 0 && (
                      <p className="text-lg text-blue-600 mt-2">
                        Break-even point: {calculations.breakEvenYears.toFixed(1)} years of daily usage
                      </p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white rounded-xl p-6 text-center shadow-sm hover:shadow-md transition-shadow">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Fuel className="w-6 h-6 text-blue-600" />
                      </div>
                      <div className="text-2xl font-bold text-blue-600 mb-2">
                        ₹{Math.round(calculations.fuelSavings).toLocaleString()}
                      </div>
                      <div className="text-gray-600">Fuel vs Charging Savings</div>
                    </div>

                    <div className="bg-white rounded-xl p-6 text-center shadow-sm hover:shadow-md transition-shadow">
                      <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <IndianRupee className="w-6 h-6 text-yellow-600" />
                      </div>
                      <div className="text-2xl font-bold text-yellow-600 mb-2">
                        ₹{calculations.maintenanceSavings.toLocaleString()}
                      </div>
                      <div className="text-gray-600">Maintenance Savings</div>
                    </div>

                    <div className="bg-white rounded-xl p-6 text-center shadow-sm hover:shadow-md transition-shadow">
                      <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Leaf className="w-6 h-6 text-green-600" />
                      </div>
                      <div className="text-2xl font-bold text-green-600 mb-2">{calculations.co2Saved} kg</div>
                      <div className="text-gray-600">CO₂ Emissions Eliminated</div>
                    </div>
                  </div>

                  <div className="text-center text-sm text-gray-600 mb-6">
                    <p>
                      *Based on {ANNUAL_KM.toLocaleString()} km annual driving, ₹{FUEL_PRICE_PETROL}/litre fuel price,
                      and ₹{ELECTRICITY_COST}/kWh electricity cost
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </section>

        {/* Cost Efficiency Calculator */}
        <section className="space-y-8">
          <div className="text-center">
            <h3 className="text-3xl font-bold text-gray-900 mb-2">Cost Efficiency Calculator</h3>
            <p className="text-gray-600">Find out if buying an EV is worth the upfront investment for your usage</p>
          </div>

          <Card className="max-w-4xl mx-auto hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Calculator className="w-5 h-5 text-blue-600" />
                <span>Personalized EV Investment Analysis</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div>
                  <Label htmlFor="dailyKm">Daily Driving (km)</Label>
                  <Input
                    id="dailyKm"
                    type="number"
                    value={dailyKm}
                    onChange={(e) => setDailyKm(Number(e.target.value))}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="icePrice">ICE Car Price (₹ Lakh)</Label>
                  <Input
                    id="icePrice"
                    type="number"
                    value={calculatorICEPrice}
                    onChange={(e) => setCalculatorICEPrice(Number(e.target.value))}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="evPrice">EV Price (₹ Lakh)</Label>
                  <Input
                    id="evPrice"
                    type="number"
                    value={calculatorEVPrice}
                    onChange={(e) => setCalculatorEVPrice(Number(e.target.value))}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="fuelCost">Fuel Cost (₹/L)</Label>
                  <Input
                    id="fuelCost"
                    type="number"
                    value={fuelCost}
                    onChange={(e) => setFuelCost(Number(e.target.value))}
                    className="mt-1"
                  />
                </div>
              </div>

              <div className="border-t pt-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <h4 className="text-lg font-semibold">Analysis Results</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span>Annual ICE Running Cost:</span>
                        <span className="font-semibold">₹{costCalculatorResults.iceRunningCost.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Annual EV Running Cost:</span>
                        <span className="font-semibold text-green-600">
                          ₹{costCalculatorResults.evRunningCost.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Annual Savings:</span>
                        <span className="font-semibold text-green-600">
                          ₹{costCalculatorResults.annualSavings.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Break-even Time:</span>
                        <span className="font-semibold">
                          {costCalculatorResults.breakEvenYears > 0
                            ? `${costCalculatorResults.breakEvenYears.toFixed(1)} years`
                            : "Never"}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="text-lg font-semibold">Recommendation</h4>
                    <div
                      className={`p-4 rounded-lg ${costCalculatorResults.isWorthIt ? "bg-green-50 border border-green-200" : "bg-red-50 border border-red-200"}`}
                    >
                      <div
                        className={`text-lg font-bold mb-2 ${costCalculatorResults.isWorthIt ? "text-green-800" : "text-red-800"}`}
                      >
                        {costCalculatorResults.isWorthIt ? "✅ EV is Cost Efficient!" : "❌ EV May Not Be Worth It"}
                      </div>
                      <p className={`text-sm ${costCalculatorResults.isWorthIt ? "text-green-700" : "text-red-700"}`}>
                        {costCalculatorResults.isWorthIt
                          ? `Based on your usage, you'll break even in ${costCalculatorResults.breakEvenYears.toFixed(1)} years.`
                          : `You need to drive at least ${costCalculatorResults.recommendedDailyKm} km/day for EVs to be cost-effective.`}
                      </p>
                    </div>

                    {/* Gauge Meter Visualization */}
                    <div className="text-center">
                      <div className="text-sm text-gray-600 mb-2">Cost Efficiency Score</div>
                      <div className="relative w-32 h-16 mx-auto">
                        <div className="absolute inset-0 bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 rounded-t-full"></div>
                        <div
                          className="absolute w-1 h-12 bg-gray-800 origin-bottom transform -translate-x-0.5"
                          style={{
                            left: "50%",
                            bottom: "0",
                            transform: `rotate(${Math.min(180, Math.max(0, costCalculatorResults.isWorthIt ? 135 : 45))}deg) translateX(-50%)`,
                            transformOrigin: "bottom center",
                          }}
                        ></div>
                      </div>
                      <div className="text-xs text-gray-500 mt-2">
                        {costCalculatorResults.isWorthIt ? "Highly Efficient" : "Not Efficient"}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Resources Section */}
        <section className="space-y-8">
          <div className="text-center">
            <h3 className="text-3xl font-bold text-gray-900 mb-2">EV Learning Hub</h3>
            <p className="text-gray-600">Everything you need to know about electric vehicles</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Is EV Right for You?",
                excerpt: "Comprehensive guide to determine if electric vehicles suit your lifestyle and needs.",
                image: "/placeholder.svg?height=200&width=300&text=EV+Guide&bg=e0f2fe",
              },
              {
                title: "Understanding EV Range",
                excerpt: "Learn about real-world range, factors affecting it, and how to maximize efficiency.",
                image: "/placeholder.svg?height=200&width=300&text=EV+Range&bg=f0f9ff",
              },
              {
                title: "Charging Infrastructure",
                excerpt: "Complete guide to home charging, public networks, and charging costs in India.",
                image: "/placeholder.svg?height=200&width=300&text=Charging&bg=ecfdf5",
              },
              {
                title: "Govt Incentives 2024",
                excerpt: "Latest subsidies, tax benefits, and state-wise incentives for EV buyers.",
                image: "/placeholder.svg?height=200&width=300&text=Incentives&bg=fef3c7",
              },
            ].map((resource, index) => (
              <Card key={index} className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <div className="overflow-hidden">
                  <Image
                    src={resource.image || "/placeholder.svg"}
                    alt={resource.title}
                    width={300}
                    height={200}
                    className="w-full h-48 object-cover"
                  />
                </div>
                <CardContent className="p-6">
                  <h4 className="text-lg font-semibold mb-2">{resource.title}</h4>
                  <p className="text-gray-600 text-sm mb-4">{resource.excerpt}</p>
                  <Button variant="outline" size="sm" className="w-full group bg-transparent">
                    Read More
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Contact Section */}
        <section className="space-y-8">
          <div className="text-center">
            <h3 className="text-3xl font-bold text-gray-900 mb-2">Have Questions? Reach Out.</h3>
            <p className="text-gray-600">Our EV experts are here to help you make the right decision</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle>Send us a Message</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleContactSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      value={contactForm.name}
                      onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                      required
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={contactForm.email}
                      onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                      required
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      value={contactForm.message}
                      onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                      required
                      className="mt-1"
                      rows={4}
                    />
                  </div>
                  <Button type="submit" className="w-full">
                    <Send className="w-4 h-4 mr-2" />
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Contact Info & Map */}
            <div className="space-y-6">
              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <h4 className="text-lg font-semibold mb-4">Get in Touch</h4>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <Mail className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <div className="font-medium">Email</div>
                        <div className="text-gray-600">hello@comparev.in</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                        <Phone className="w-5 h-5 text-green-600" />
                      </div>
                      <div>
                        <div className="font-medium">WhatsApp</div>
                        <div className="text-gray-600">+91 98765 43210</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                        <MapPin className="w-5 h-5 text-red-600" />
                      </div>
                      <div>
                        <div className="font-medium">Office</div>
                        <div className="text-gray-600">Bangalore, Karnataka</div>
                      </div>
                    </div>
                  </div>
                  <Button className="w-full mt-6 bg-green-600 hover:bg-green-700">
                    <Phone className="w-4 h-4 mr-2" />
                    WhatsApp Us
                  </Button>
                </CardContent>
              </Card>

              {/* Embedded Map */}
              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="p-0">
                  <div className="w-full h-64 bg-gray-200 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                      <div className="text-gray-600">Interactive Map</div>
                      <div className="text-sm text-gray-500">Bangalore, Karnataka</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </div>

      {/* Enhanced Footer */}
      <footer className="bg-gray-900 text-white py-12 mt-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <span className="text-2xl font-bold">ComparEV</span>
              </div>
              <p className="text-gray-400 mb-4">
                India's most trusted platform for electric vehicle comparisons and insights.
              </p>
              <div className="flex space-x-4">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 cursor-pointer transition-colors">
                  <Facebook className="w-4 h-4" />
                </div>
                <div className="w-8 h-8 bg-blue-400 rounded-full flex items-center justify-center hover:bg-blue-500 cursor-pointer transition-colors">
                  <Twitter className="w-4 h-4" />
                </div>
                <div className="w-8 h-8 bg-pink-600 rounded-full flex items-center justify-center hover:bg-pink-700 cursor-pointer transition-colors">
                  <Instagram className="w-4 h-4" />
                </div>
                <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center hover:bg-red-700 cursor-pointer transition-colors">
                  <Youtube className="w-4 h-4" />
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Compare</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    All EVs
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    By Price
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    By Range
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    By Brand
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Resources</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    EV Guide
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Charging Map
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Reviews
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    News
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Newsletter</h3>
              <p className="text-gray-400 mb-4">Get the latest EV news and comparisons</p>
              <div className="flex space-x-2">
                <Input
                  placeholder="Enter your email"
                  className="bg-gray-800 border-gray-700 text-white placeholder-gray-400"
                />
                <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="text-gray-400 mb-4 md:mb-0">
                <p>&copy; {new Date().getFullYear()} ComparEV. All rights reserved.</p>
              </div>
              <div className="flex space-x-6 text-gray-400 text-sm">
                <Link href="#" className="hover:text-white transition-colors">
                  Privacy Policy
                </Link>
                <Link href="#" className="hover:text-white transition-colors">
                  Terms of Service
                </Link>
                <Link href="#" className="hover:text-white transition-colors">
                  About ComparEV
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
