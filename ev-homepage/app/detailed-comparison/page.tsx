"use client"

import { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import {
  ArrowLeft,
  Zap,
  Fuel,
  Leaf,
  IndianRupee,
  Timer,
  Gauge,
  Battery,
  Clock,
  TrendingDown,
  BarChart3,
  Car,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import {
  iceCarData,
  detailedEVData,
  calculateAnnualFuelCost,
  calculateAnnualChargingCost,
  calculateAnnualCO2,
  calculateTotalAnnualCost,
} from "@/lib/detailed-data"

export default function DetailedComparisonPage() {
  const [selectedICECar, setSelectedICECar] = useState<string>("")
  const [selectedEV, setSelectedEV] = useState<string>("")

  const iceCar = useMemo(() => iceCarData.find((car) => car.id === selectedICECar), [selectedICECar])
  const evCar = useMemo(() => detailedEVData.find((ev) => ev.id === selectedEV), [selectedEV])

  const calculations = useMemo(() => {
    if (!iceCar || !evCar) return null

    const iceAnnualFuelCost = calculateAnnualFuelCost(iceCar)
    const evAnnualChargingCost = calculateAnnualChargingCost(evCar)
    const iceTotalAnnualCost = calculateTotalAnnualCost(iceAnnualFuelCost, iceCar.maintenanceCost)
    const evTotalAnnualCost = calculateTotalAnnualCost(evAnnualChargingCost, evCar.maintenanceCost)
    const annualSavings = iceTotalAnnualCost - evTotalAnnualCost
    const co2Saved = calculateAnnualCO2(iceCar)
    const fuelSavings = iceAnnualFuelCost - evAnnualChargingCost
    const maintenanceSavings = iceCar.maintenanceCost - evCar.maintenanceCost

    return {
      iceAnnualFuelCost,
      evAnnualChargingCost,
      iceTotalAnnualCost,
      evTotalAnnualCost,
      annualSavings,
      co2Saved,
      fuelSavings,
      maintenanceSavings,
    }
  }, [iceCar, evCar])

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
            <div>
              <h1 className="text-2xl font-bold text-gray-900">EV vs My Current Car</h1>
              <p className="text-gray-600 text-sm">Discover your potential savings and environmental impact</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Zap className="w-4 h-4" />
            <span>Smart Comparison Tool</span>
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            See How Much You Can <span className="text-blue-600">Save</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Compare your current petrol/diesel car with electric vehicles and discover potential annual savings,
            environmental benefits, and performance differences.
          </p>
        </div>

        {/* Selection Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* ICE Car Selection */}
          <Card className="border-2 border-gray-200 hover:border-gray-300 transition-colors">
            <CardHeader className="text-center pb-4">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Fuel className="w-8 h-8 text-orange-600" />
              </div>
              <CardTitle className="text-xl">Your Current Car</CardTitle>
              <p className="text-gray-600">Select your petrol/diesel vehicle</p>
            </CardHeader>
            <CardContent>
              <Select value={selectedICECar} onValueChange={setSelectedICECar}>
                <SelectTrigger className="h-12 text-lg">
                  <SelectValue placeholder="Choose your current car" />
                </SelectTrigger>
                <SelectContent>
                  {iceCarData.map((car) => (
                    <SelectItem key={car.id} value={car.id} className="py-3">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-gray-100 rounded flex items-center justify-center">
                          <Car className="w-4 h-4 text-gray-600" />
                        </div>
                        <div>
                          <div className="font-medium">
                            {car.brand} {car.name}
                          </div>
                          <div className="text-sm text-gray-500">
                            ₹{car.price} Lakh • {car.fuelEfficiency} km/l
                          </div>
                        </div>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          {/* EV Selection */}
          <Card className="border-2 border-blue-200 hover:border-blue-300 transition-colors">
            <CardHeader className="text-center pb-4">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-blue-600" />
              </div>
              <CardTitle className="text-xl">Electric Vehicle</CardTitle>
              <p className="text-gray-600">Choose an EV to compare</p>
            </CardHeader>
            <CardContent>
              <Select value={selectedEV} onValueChange={setSelectedEV}>
                <SelectTrigger className="h-12 text-lg">
                  <SelectValue placeholder="Choose an electric vehicle" />
                </SelectTrigger>
                <SelectContent>
                  {detailedEVData.map((ev) => (
                    <SelectItem key={ev.id} value={ev.id} className="py-3">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-blue-100 rounded flex items-center justify-center">
                          <Zap className="w-4 h-4 text-blue-600" />
                        </div>
                        <div>
                          <div className="font-medium">
                            {ev.brand} {ev.name}
                          </div>
                          <div className="text-sm text-gray-500">
                            ₹{ev.price} Lakh • {ev.range} km range
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

        {/* Comparison Results */}
        {iceCar && evCar && calculations && (
          <div className="space-y-8">
            {/* Vehicle Comparison Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* ICE Car Card */}
              <Card className="overflow-hidden">
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
                      <div className="text-orange-100">Ex-showroom</div>
                    </div>
                  </div>
                  <Image
                    src={iceCar.image || "/placeholder.svg"}
                    alt={`${iceCar.brand} ${iceCar.name}`}
                    width={400}
                    height={300}
                    className="w-full h-48 object-cover rounded-lg"
                  />
                </div>
                <CardContent className="p-6 space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                        <Fuel className="w-5 h-5 text-orange-600" />
                      </div>
                      <div>
                        <div className="text-sm text-gray-600">Fuel Efficiency</div>
                        <div className="font-semibold">{iceCar.fuelEfficiency} km/l</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                        <IndianRupee className="w-5 h-5 text-red-600" />
                      </div>
                      <div>
                        <div className="text-sm text-gray-600">Annual Fuel Cost</div>
                        <div className="font-semibold">₹{calculations.iceAnnualFuelCost.toLocaleString()}</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                        <Leaf className="w-5 h-5 text-gray-600" />
                      </div>
                      <div>
                        <div className="text-sm text-gray-600">CO₂ Emissions</div>
                        <div className="font-semibold">{iceCar.co2Emissions} g/km</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                        <Timer className="w-5 h-5 text-purple-600" />
                      </div>
                      <div>
                        <div className="text-sm text-gray-600">0-100 kmph</div>
                        <div className="font-semibold">{iceCar.acceleration}s</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <Gauge className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <div className="text-sm text-gray-600">Range</div>
                        <div className="font-semibold">{iceCar.range} km</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                        <IndianRupee className="w-5 h-5 text-yellow-600" />
                      </div>
                      <div>
                        <div className="text-sm text-gray-600">Maintenance/Year</div>
                        <div className="font-semibold">₹{iceCar.maintenanceCost.toLocaleString()}</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* EV Card */}
              <Card className="overflow-hidden border-2 border-blue-200">
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
                      <div className="text-blue-100">Ex-showroom</div>
                    </div>
                  </div>
                  <Image
                    src={evCar.image || "/placeholder.svg"}
                    alt={`${evCar.brand} ${evCar.name}`}
                    width={400}
                    height={300}
                    className="w-full h-48 object-cover rounded-lg"
                  />
                </div>
                <CardContent className="p-6 space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <Zap className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <div className="text-sm text-gray-600">Efficiency</div>
                        <div className="font-semibold">{evCar.efficiency} km/kWh</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                        <IndianRupee className="w-5 h-5 text-green-600" />
                      </div>
                      <div>
                        <div className="text-sm text-gray-600">Annual Charging Cost</div>
                        <div className="font-semibold text-green-600">
                          ₹{calculations.evAnnualChargingCost.toLocaleString()}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                        <Leaf className="w-5 h-5 text-green-600" />
                      </div>
                      <div>
                        <div className="text-sm text-gray-600">CO₂ Emissions</div>
                        <div className="font-semibold text-green-600">0 g/km</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                        <Timer className="w-5 h-5 text-purple-600" />
                      </div>
                      <div>
                        <div className="text-sm text-gray-600">0-100 kmph</div>
                        <div className="font-semibold">{evCar.acceleration}s</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-battery-100 rounded-lg flex items-center justify-center">
                        <Battery className="w-5 h-5 text-green-600" />
                      </div>
                      <div>
                        <div className="text-sm text-gray-600">Range</div>
                        <div className="font-semibold">{evCar.range} km</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                        <IndianRupee className="w-5 h-5 text-yellow-600" />
                      </div>
                      <div>
                        <div className="text-sm text-gray-600">Maintenance/Year</div>
                        <div className="font-semibold text-green-600">₹{evCar.maintenanceCost.toLocaleString()}</div>
                      </div>
                    </div>
                  </div>
                  <div className="pt-4 border-t">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                          <Clock className="w-5 h-5 text-orange-600" />
                        </div>
                        <div>
                          <div className="text-sm text-gray-600">AC Charging</div>
                          <div className="font-semibold">{evCar.chargingTime}</div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                          <Zap className="w-5 h-5 text-red-600" />
                        </div>
                        <div>
                          <div className="text-sm text-gray-600">Fast Charging</div>
                          <div className="font-semibold">{evCar.fastChargingTime}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Visual Comparison Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Cost Comparison Chart */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <BarChart3 className="w-5 h-5 text-blue-600" />
                    <span>Annual Cost Comparison</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium">Fuel/Charging Cost</span>
                        <span className="text-sm text-gray-600">
                          ₹{calculations.iceAnnualFuelCost.toLocaleString()} vs ₹
                          {calculations.evAnnualChargingCost.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex space-x-2">
                        <div
                          className="bg-orange-500 h-8 rounded flex items-center justify-center text-white text-xs font-medium"
                          style={{
                            width: `${(calculations.iceAnnualFuelCost / Math.max(calculations.iceAnnualFuelCost, calculations.evAnnualChargingCost)) * 100}%`,
                          }}
                        >
                          ICE
                        </div>
                        <div
                          className="bg-blue-500 h-8 rounded flex items-center justify-center text-white text-xs font-medium"
                          style={{
                            width: `${(calculations.evAnnualChargingCost / Math.max(calculations.iceAnnualFuelCost, calculations.evAnnualChargingCost)) * 100}%`,
                          }}
                        >
                          EV
                        </div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium">Maintenance Cost</span>
                        <span className="text-sm text-gray-600">
                          ₹{iceCar.maintenanceCost.toLocaleString()} vs ₹{evCar.maintenanceCost.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex space-x-2">
                        <div
                          className="bg-orange-500 h-8 rounded flex items-center justify-center text-white text-xs font-medium"
                          style={{
                            width: `${(iceCar.maintenanceCost / Math.max(iceCar.maintenanceCost, evCar.maintenanceCost)) * 100}%`,
                          }}
                        >
                          ICE
                        </div>
                        <div
                          className="bg-blue-500 h-8 rounded flex items-center justify-center text-white text-xs font-medium"
                          style={{
                            width: `${(evCar.maintenanceCost / Math.max(iceCar.maintenanceCost, evCar.maintenanceCost)) * 100}%`,
                          }}
                        >
                          EV
                        </div>
                      </div>
                    </div>
                    <div className="pt-4 border-t">
                      <div className="flex justify-between items-center">
                        <span className="font-semibold">Total Annual Cost</span>
                        <div className="text-right">
                          <div className="text-lg font-bold text-orange-600">
                            ₹{calculations.iceTotalAnnualCost.toLocaleString()}
                          </div>
                          <div className="text-lg font-bold text-blue-600">
                            ₹{calculations.evTotalAnnualCost.toLocaleString()}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Environmental Impact */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Leaf className="w-5 h-5 text-green-600" />
                    <span>Environmental Impact</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="text-center">
                      <div className="text-4xl font-bold text-green-600 mb-2">{calculations.co2Saved} kg</div>
                      <div className="text-gray-600">CO₂ emissions saved annually</div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-4 bg-red-50 rounded-lg">
                        <div className="text-2xl font-bold text-red-600">{iceCar.co2Emissions}</div>
                        <div className="text-sm text-gray-600">g/km (ICE)</div>
                      </div>
                      <div className="text-center p-4 bg-green-50 rounded-lg">
                        <div className="text-2xl font-bold text-green-600">0</div>
                        <div className="text-sm text-gray-600">g/km (EV)</div>
                      </div>
                    </div>
                    <div className="text-center text-sm text-gray-600">
                      Equivalent to planting{" "}
                      <span className="font-semibold text-green-600">{Math.round(calculations.co2Saved / 22)}</span>{" "}
                      trees annually
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Savings Summary */}
            <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-2 border-green-200">
              <CardContent className="p-8">
                <div className="text-center mb-8">
                  <div className="inline-flex items-center space-x-2 bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium mb-4">
                    <TrendingDown className="w-4 h-4" />
                    <span>Savings Summary</span>
                  </div>
                  <h3 className="text-3xl font-bold text-gray-900 mb-4">
                    Switching to {evCar.brand} {evCar.name} from your {iceCar.brand} {iceCar.name}
                  </h3>
                  <div className="text-5xl font-bold text-green-600 mb-2">
                    {calculations.annualSavings > 0 ? "+" : ""}₹{Math.abs(calculations.annualSavings).toLocaleString()}
                  </div>
                  <p className="text-xl text-gray-600">
                    {calculations.annualSavings > 0 ? "Annual Savings" : "Additional Annual Cost"}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-white rounded-xl p-6 text-center shadow-sm">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Fuel className="w-6 h-6 text-blue-600" />
                    </div>
                    <div className="text-2xl font-bold text-blue-600 mb-2">
                      ₹{calculations.fuelSavings.toLocaleString()}
                    </div>
                    <div className="text-gray-600">Fuel vs Charging Savings</div>
                  </div>

                  <div className="bg-white rounded-xl p-6 text-center shadow-sm">
                    <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <IndianRupee className="w-6 h-6 text-yellow-600" />
                    </div>
                    <div className="text-2xl font-bold text-yellow-600 mb-2">
                      ₹{calculations.maintenanceSavings.toLocaleString()}
                    </div>
                    <div className="text-gray-600">Maintenance Savings</div>
                  </div>

                  <div className="bg-white rounded-xl p-6 text-center shadow-sm">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Leaf className="w-6 h-6 text-green-600" />
                    </div>
                    <div className="text-2xl font-bold text-green-600 mb-2">{calculations.co2Saved} kg</div>
                    <div className="text-gray-600">CO₂ Emissions Eliminated</div>
                  </div>
                </div>

                <div className="mt-8 text-center">
                  <p className="text-gray-600 mb-4">
                    Based on 12,000 km annual driving, ₹100/litre fuel price, and ₹7/kWh electricity cost
                  </p>
                  <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3">
                    Find EV Dealers Near You
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Call to Action */}
        {!iceCar || !evCar ? (
          <Card className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white">
            <CardContent className="p-8 text-center">
              <Zap className="w-16 h-16 mx-auto mb-4 opacity-80" />
              <h3 className="text-2xl font-bold mb-4">Ready to Compare?</h3>
              <p className="text-blue-100 mb-6">
                Select your current car and an electric vehicle above to see detailed comparisons, potential savings,
                and environmental impact.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                  Real-world data
                </Badge>
                <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                  Accurate calculations
                </Badge>
                <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                  Environmental impact
                </Badge>
              </div>
            </CardContent>
          </Card>
        ) : null}
      </div>
    </div>
  )
}
