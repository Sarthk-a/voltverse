"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  ArrowLeft,
  Zap,
  Battery,
  Clock,
  Gauge,
  Timer,
  IndianRupee,
  Car,
  Fuel,
  Wrench,
  Leaf,
  TrendingDown,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { evData, regularCarData } from "@/lib/data"

export default function ComparePage() {
  const [selectedEVs, setSelectedEVs] = useState<string[]>([])
  const [brandFilter, setBrandFilter] = useState<string>("all")
  const [budgetFilter, setBudgetFilter] = useState<string>("all")
  const [typeFilter, setTypeFilter] = useState<string>("all")
  const [selectedRegularCar, setSelectedRegularCar] = useState<string>("")
  const [selectedComparisonEV, setSelectedComparisonEV] = useState<string>("")

  const filteredEVs = evData.filter((ev) => {
    if (brandFilter !== "all" && ev.brand !== brandFilter) return false
    if (budgetFilter !== "all") {
      const [min, max] = budgetFilter.split("-").map(Number)
      if (max && (ev.price < min || ev.price > max)) return false
      if (!max && ev.price < min) return false
    }
    if (typeFilter !== "all" && ev.type !== typeFilter) return false
    return true
  })

  const addEVToComparison = (evId: string) => {
    if (selectedEVs.length < 3 && !selectedEVs.includes(evId)) {
      setSelectedEVs([...selectedEVs, evId])
    }
  }

  const removeEVFromComparison = (evId: string) => {
    setSelectedEVs(selectedEVs.filter((id) => id !== evId))
  }

  const selectedEVData = selectedEVs.map((id) => evData.find((ev) => ev.id === id)!).filter(Boolean)
  const regularCar = regularCarData.find((car) => car.id === selectedRegularCar)
  const comparisonEV = evData.find((ev) => ev.id === selectedComparisonEV)

  const calculateSavings = () => {
    if (!regularCar || !comparisonEV) return 0
    const regularCarAnnualCost = regularCar.fuelCost * 150 + regularCar.maintenanceCost // 15000 km/year
    const evAnnualCost = comparisonEV.chargingCost * 150 + comparisonEV.maintenanceCost
    return regularCarAnnualCost - evAnnualCost
  }

  const brands = [...new Set(evData.map((ev) => ev.brand))]
  const types = [...new Set(evData.map((ev) => ev.type))]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center space-x-4">
            <Link href="/">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
            </Link>
            <h1 className="text-2xl font-bold text-gray-900">EV Comparison Tools</h1>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 space-y-12">
        {/* EV Comparison Section */}
        <section>
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Compare Electric Vehicles</h2>
            <p className="text-gray-600">Compare up to 3 electric vehicles side by side</p>
          </div>

          {/* Filters */}
          <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
            <h3 className="text-lg font-semibold mb-4">Filter Options</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Select value={brandFilter} onValueChange={setBrandFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="All Brands" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Brands</SelectItem>
                  {brands.map((brand) => (
                    <SelectItem key={brand} value={brand}>
                      {brand}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={budgetFilter} onValueChange={setBudgetFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="All Budgets" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Budgets</SelectItem>
                  <SelectItem value="0-15">Under ₹15 Lakh</SelectItem>
                  <SelectItem value="15-25">₹15-25 Lakh</SelectItem>
                  <SelectItem value="25-35">₹25-35 Lakh</SelectItem>
                  <SelectItem value="35">Above ₹35 Lakh</SelectItem>
                </SelectContent>
              </Select>

              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="All Types" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  {types.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Button
                onClick={() => {
                  setBrandFilter("all")
                  setBudgetFilter("all")
                  setTypeFilter("all")
                }}
                variant="outline"
              >
                Clear Filters
              </Button>
            </div>
          </div>

          {/* Available EVs */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-4">Available Electric Vehicles</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredEVs.map((ev) => (
                <Card key={ev.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <Image
                      src={ev.image || "/placeholder.svg"}
                      alt={ev.name}
                      width={300}
                      height={200}
                      className="w-full h-40 object-cover rounded-lg mb-4"
                    />
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <h4 className="font-semibold">
                          {ev.brand} {ev.name}
                        </h4>
                        <Badge variant="secondary">{ev.type}</Badge>
                      </div>
                      <p className="text-2xl font-bold text-blue-600">₹{ev.price} Lakh</p>
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <span className="flex items-center">
                          <Zap className="w-4 h-4 mr-1" />
                          {ev.range} km
                        </span>
                        <span className="flex items-center">
                          <Battery className="w-4 h-4 mr-1" />
                          {ev.batteryCapacity} kWh
                        </span>
                      </div>
                      <Button
                        onClick={() => addEVToComparison(ev.id)}
                        disabled={selectedEVs.includes(ev.id) || selectedEVs.length >= 3}
                        className="w-full"
                        size="sm"
                      >
                        {selectedEVs.includes(ev.id) ? "Added" : "Add to Compare"}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Comparison Table */}
          {selectedEVData.length > 0 && (
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold">Comparison ({selectedEVData.length}/3)</h3>
                <Button onClick={() => setSelectedEVs([])} variant="outline" size="sm">
                  Clear All
                </Button>
              </div>

              <div className="overflow-x-auto">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 min-w-[800px]">
                  {selectedEVData.map((ev) => (
                    <Card key={ev.id} className="relative">
                      <Button
                        onClick={() => removeEVFromComparison(ev.id)}
                        variant="ghost"
                        size="sm"
                        className="absolute top-2 right-2 z-10"
                      >
                        ×
                      </Button>
                      <CardHeader className="text-center pb-4">
                        <Image
                          src={ev.image || "/placeholder.svg"}
                          alt={ev.name}
                          width={300}
                          height={200}
                          className="w-full h-32 object-cover rounded-lg mb-4"
                        />
                        <CardTitle className="text-lg">
                          {ev.brand} {ev.name}
                        </CardTitle>
                        <p className="text-2xl font-bold text-blue-600">₹{ev.price} Lakh</p>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="flex items-center text-sm">
                            <Zap className="w-4 h-4 mr-2 text-blue-500" />
                            Range
                          </span>
                          <span className="font-semibold">{ev.range} km</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="flex items-center text-sm">
                            <Battery className="w-4 h-4 mr-2 text-green-500" />
                            Battery
                          </span>
                          <span className="font-semibold">{ev.batteryCapacity} kWh</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="flex items-center text-sm">
                            <Clock className="w-4 h-4 mr-2 text-orange-500" />
                            Charging
                          </span>
                          <span className="font-semibold">{ev.chargingTime}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="flex items-center text-sm">
                            <Gauge className="w-4 h-4 mr-2 text-red-500" />
                            Top Speed
                          </span>
                          <span className="font-semibold">{ev.topSpeed} kmph</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="flex items-center text-sm">
                            <Timer className="w-4 h-4 mr-2 text-purple-500" />
                            0-100 kmph
                          </span>
                          <span className="font-semibold">{ev.acceleration}s</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="flex items-center text-sm">
                            <Car className="w-4 h-4 mr-2 text-gray-500" />
                            Type
                          </span>
                          <Badge variant="secondary">{ev.type}</Badge>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          )}
        </section>

        <Separator className="my-12" />

        {/* EV vs Current Car Section */}
        <section>
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">EV vs My Current Car</h2>
            <p className="text-gray-600">See how much you can save by switching to an electric vehicle</p>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <h3 className="text-lg font-semibold mb-4">Select Vehicles to Compare</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2">Your Current Car</label>
                <Select value={selectedRegularCar} onValueChange={setSelectedRegularCar}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your current car" />
                  </SelectTrigger>
                  <SelectContent>
                    {regularCarData.map((car) => (
                      <SelectItem key={car.id} value={car.id}>
                        {car.brand} {car.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Electric Vehicle</label>
                <Select value={selectedComparisonEV} onValueChange={setSelectedComparisonEV}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select an EV to compare" />
                  </SelectTrigger>
                  <SelectContent>
                    {evData.map((ev) => (
                      <SelectItem key={ev.id} value={ev.id}>
                        {ev.brand} {ev.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Comparison Results */}
          {regularCar && comparisonEV && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Current Car Card */}
                <Card>
                  <CardHeader className="text-center">
                    <CardTitle className="text-lg">
                      {regularCar.brand} {regularCar.name}
                    </CardTitle>
                    <Badge variant="outline">{regularCar.type}</Badge>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="flex items-center text-sm">
                        <Fuel className="w-4 h-4 mr-2 text-orange-500" />
                        Fuel Cost (per 100km)
                      </span>
                      <span className="font-semibold">₹{regularCar.fuelCost}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="flex items-center text-sm">
                        <Wrench className="w-4 h-4 mr-2 text-gray-500" />
                        Annual Maintenance
                      </span>
                      <span className="font-semibold">₹{regularCar.maintenanceCost.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="flex items-center text-sm">
                        <Timer className="w-4 h-4 mr-2 text-purple-500" />
                        0-100 kmph
                      </span>
                      <span className="font-semibold">{regularCar.acceleration}s</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="flex items-center text-sm">
                        <Zap className="w-4 h-4 mr-2 text-blue-500" />
                        Range
                      </span>
                      <span className="font-semibold">{regularCar.range} km</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="flex items-center text-sm">
                        <IndianRupee className="w-4 h-4 mr-2 text-green-500" />
                        Annual Running Cost
                      </span>
                      <span className="font-semibold">
                        ₹{(regularCar.fuelCost * 150 + regularCar.maintenanceCost).toLocaleString()}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="flex items-center text-sm">
                        <Leaf className="w-4 h-4 mr-2 text-red-500" />
                        CO2 Emissions
                      </span>
                      <span className="font-semibold">{regularCar.emissions} g/km</span>
                    </div>
                  </CardContent>
                </Card>

                {/* EV Card */}
                <Card className="border-blue-200">
                  <CardHeader className="text-center">
                    <CardTitle className="text-lg">
                      {comparisonEV.brand} {comparisonEV.name}
                    </CardTitle>
                    <Badge className="bg-blue-100 text-blue-800">{comparisonEV.type}</Badge>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="flex items-center text-sm">
                        <Zap className="w-4 h-4 mr-2 text-blue-500" />
                        Charging Cost (per 100km)
                      </span>
                      <span className="font-semibold text-blue-600">₹{comparisonEV.chargingCost}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="flex items-center text-sm">
                        <Wrench className="w-4 h-4 mr-2 text-gray-500" />
                        Annual Maintenance
                      </span>
                      <span className="font-semibold text-blue-600">
                        ₹{comparisonEV.maintenanceCost.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="flex items-center text-sm">
                        <Timer className="w-4 h-4 mr-2 text-purple-500" />
                        0-100 kmph
                      </span>
                      <span className="font-semibold text-blue-600">{comparisonEV.acceleration}s</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="flex items-center text-sm">
                        <Battery className="w-4 h-4 mr-2 text-green-500" />
                        Range
                      </span>
                      <span className="font-semibold text-blue-600">{comparisonEV.range} km</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="flex items-center text-sm">
                        <IndianRupee className="w-4 h-4 mr-2 text-green-500" />
                        Annual Running Cost
                      </span>
                      <span className="font-semibold text-blue-600">
                        ₹{(comparisonEV.chargingCost * 150 + comparisonEV.maintenanceCost).toLocaleString()}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="flex items-center text-sm">
                        <Leaf className="w-4 h-4 mr-2 text-green-500" />
                        CO2 Emissions
                      </span>
                      <span className="font-semibold text-green-600">{comparisonEV.emissions} g/km</span>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Savings Summary */}
              <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
                <CardContent className="p-6 text-center">
                  <div className="flex items-center justify-center mb-4">
                    <TrendingDown className="w-8 h-8 text-green-600 mr-2" />
                    <h3 className="text-2xl font-bold text-gray-900">Potential Annual Savings</h3>
                  </div>
                  <div className="text-4xl font-bold text-green-600 mb-2">₹{calculateSavings().toLocaleString()}</div>
                  <p className="text-gray-600 mb-4">
                    {calculateSavings() > 0
                      ? `Switching to ${comparisonEV.brand} ${comparisonEV.name} can save you money annually!`
                      : `The ${comparisonEV.brand} ${comparisonEV.name} has higher running costs but offers zero emissions.`}
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div className="bg-white rounded-lg p-3">
                      <div className="font-semibold text-gray-900">Fuel vs Charging</div>
                      <div className="text-green-600 font-bold">
                        Save ₹{((regularCar.fuelCost - comparisonEV.chargingCost) * 150).toLocaleString()}/year
                      </div>
                    </div>
                    <div className="bg-white rounded-lg p-3">
                      <div className="font-semibold text-gray-900">Maintenance</div>
                      <div className="text-green-600 font-bold">
                        Save ₹{(regularCar.maintenanceCost - comparisonEV.maintenanceCost).toLocaleString()}/year
                      </div>
                    </div>
                    <div className="bg-white rounded-lg p-3">
                      <div className="font-semibold text-gray-900">CO2 Reduction</div>
                      <div className="text-green-600 font-bold">
                        {(((regularCar.emissions - comparisonEV.emissions) * 15000) / 1000).toFixed(1)} kg/year
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </section>
      </div>
    </div>
  )
}
