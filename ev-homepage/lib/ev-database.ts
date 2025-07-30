export interface EVData {
  id: string
  name: string
  brand: string
  image: string
  price: number // in lakhs
  onRoadPrice: number // in lakhs (including insurance, registration)
  range: number // km per charge
  batteryCapacity: number // kWh
  chargingTime: string // 0-80%
  fastChargingTime: string // 0-80% DC fast charging
  topSpeed: number // kmph
  acceleration: number // 0-100 kmph in seconds
  fastChargingSupport: boolean
  bodyType: "SUV" | "Hatchback" | "Sedan" | "Crossover"
  batteryWarranty: string
  vehicleWarranty: string
  chargingCostPerKm: number // ₹ per km
  efficiency: number // km/kWh
  features: string[]
  pros: string[]
  cons: string[]
}

export interface ICECarData {
  id: string
  name: string
  brand: string
  image: string
  price: number // in lakhs
  onRoadPrice: number // in lakhs
  fuelEfficiency: number // km/l
  fuelType: "Petrol" | "Diesel"
  fuelCostPerKm: number // ₹ per km
  maintenanceCostAnnual: number
  co2Emissions: number // g/km
  acceleration: number // 0-100 kmph
  topSpeed: number // kmph
  bodyType: "SUV" | "Hatchback" | "Sedan" | "Crossover"
  range: number // km with full tank
}

export const evDatabase: EVData[] = [
  {
    id: "tata-nexon-ev",
    name: "Nexon EV",
    brand: "Tata",
    image: "/placeholder.svg?height=300&width=400&text=Tata+Nexon+EV&bg=1e40af&color=white",
    price: 14.99,
    onRoadPrice: 16.5,
    range: 437,
    batteryCapacity: 40.5,
    chargingTime: "8.5 hrs (AC)",
    fastChargingTime: "56 min (10-80%)",
    topSpeed: 120,
    acceleration: 9.9,
    fastChargingSupport: true,
    bodyType: "SUV",
    batteryWarranty: "8 years/1.6 lakh km",
    vehicleWarranty: "3 years/1.25 lakh km",
    chargingCostPerKm: 0.65,
    efficiency: 10.8,
    features: ["Connected Car Tech", "Fast Charging", "Regenerative Braking"],
    pros: ["Proven reliability", "Good service network", "Competitive pricing"],
    cons: ["Limited fast charging network", "Interior quality could be better"],
  },
  {
    id: "tata-tiago-ev",
    name: "Tiago EV",
    brand: "Tata",
    image: "/placeholder.svg?height=300&width=400&text=Tata+Tiago+EV&bg=1e40af&color=white",
    price: 8.69,
    onRoadPrice: 9.8,
    range: 315,
    batteryCapacity: 24,
    chargingTime: "5.7 hrs (AC)",
    fastChargingTime: "57 min (10-80%)",
    topSpeed: 120,
    acceleration: 13.5,
    fastChargingSupport: true,
    bodyType: "Hatchback",
    batteryWarranty: "8 years/1.6 lakh km",
    vehicleWarranty: "3 years/1.25 lakh km",
    chargingCostPerKm: 0.63,
    efficiency: 11.2,
    features: ["Compact Design", "City-friendly", "Fast Charging"],
    pros: ["Affordable entry point", "Good for city driving", "Reliable brand"],
    cons: ["Limited range", "Basic interior", "Small boot space"],
  },
  {
    id: "mg-zs-ev",
    name: "ZS EV",
    brand: "MG",
    image: "/placeholder.svg?height=300&width=400&text=MG+ZS+EV&bg=dc2626&color=white",
    price: 21.99,
    onRoadPrice: 24.5,
    range: 461,
    batteryCapacity: 50.3,
    chargingTime: "7 hrs (AC)",
    fastChargingTime: "40 min (10-80%)",
    topSpeed: 140,
    acceleration: 8.5,
    fastChargingSupport: true,
    bodyType: "SUV",
    batteryWarranty: "8 years/1.5 lakh km",
    vehicleWarranty: "5 years/unlimited km",
    chargingCostPerKm: 0.76,
    efficiency: 9.2,
    features: ["Premium Interior", "Large Touchscreen", "Connected Features"],
    pros: ["Premium feel", "Good range", "Feature-rich"],
    cons: ["Higher price", "Limited service network", "Software glitches"],
  },
  {
    id: "byd-atto3",
    name: "Atto 3",
    brand: "BYD",
    image: "/placeholder.svg?height=300&width=400&text=BYD+Atto+3&bg=059669&color=white",
    price: 33.99,
    onRoadPrice: 37.5,
    range: 521,
    batteryCapacity: 60.48,
    chargingTime: "10.5 hrs (AC)",
    fastChargingTime: "50 min (10-80%)",
    topSpeed: 160,
    acceleration: 7.3,
    fastChargingSupport: true,
    bodyType: "SUV",
    batteryWarranty: "8 years/1.5 lakh km",
    vehicleWarranty: "6 years/1.5 lakh km",
    chargingCostPerKm: 0.81,
    efficiency: 8.6,
    features: ["Blade Battery", "Premium Build", "Advanced Safety"],
    pros: ["Excellent range", "Premium quality", "Advanced battery tech"],
    cons: ["Expensive", "New brand in India", "Limited service centers"],
  },
  {
    id: "hyundai-ioniq5",
    name: "Ioniq 5",
    brand: "Hyundai",
    image: "/placeholder.svg?height=300&width=400&text=Hyundai+Ioniq+5&bg=7c3aed&color=white",
    price: 45.95,
    onRoadPrice: 50.5,
    range: 631,
    batteryCapacity: 72.6,
    chargingTime: "11 hrs (AC)",
    fastChargingTime: "18 min (10-80%)",
    topSpeed: 185,
    acceleration: 5.2,
    fastChargingSupport: true,
    bodyType: "Crossover",
    batteryWarranty: "8 years/1.6 lakh km",
    vehicleWarranty: "3 years/unlimited km",
    chargingCostPerKm: 0.9,
    efficiency: 7.8,
    features: ["Ultra-fast Charging", "Futuristic Design", "V2L Technology"],
    pros: ["Fastest charging", "Excellent range", "Premium features"],
    cons: ["Very expensive", "Limited availability", "High maintenance"],
  },
  {
    id: "mahindra-xuv400",
    name: "XUV400 EV",
    brand: "Mahindra",
    image: "/placeholder.svg?height=300&width=400&text=Mahindra+XUV400&bg=ea580c&color=white",
    price: 15.99,
    onRoadPrice: 17.8,
    range: 456,
    batteryCapacity: 39.4,
    chargingTime: "6.5 hrs (AC)",
    fastChargingTime: "50 min (10-80%)",
    topSpeed: 150,
    acceleration: 8.3,
    fastChargingSupport: true,
    bodyType: "SUV",
    batteryWarranty: "8 years/1.6 lakh km",
    vehicleWarranty: "3 years/1.25 lakh km",
    chargingCostPerKm: 0.68,
    efficiency: 10.2,
    features: ["Spacious Interior", "Good Ground Clearance", "Robust Build"],
    pros: ["Good value for money", "Spacious", "Strong build quality"],
    cons: ["Average interior quality", "Limited features", "Charging network"],
  },
  {
    id: "kia-ev6",
    name: "EV6",
    brand: "Kia",
    image: "/placeholder.svg?height=300&width=400&text=Kia+EV6&bg=1f2937&color=white",
    price: 60.95,
    onRoadPrice: 67.0,
    range: 708,
    batteryCapacity: 77.4,
    chargingTime: "12 hrs (AC)",
    fastChargingTime: "18 min (10-80%)",
    topSpeed: 185,
    acceleration: 3.5,
    fastChargingSupport: true,
    bodyType: "Crossover",
    batteryWarranty: "8 years/1.6 lakh km",
    vehicleWarranty: "3 years/unlimited km",
    chargingCostPerKm: 0.95,
    efficiency: 7.2,
    features: ["Ultra-fast Charging", "Premium Interior", "Advanced Tech"],
    pros: ["Longest range", "Fastest acceleration", "Premium luxury"],
    cons: ["Most expensive", "Limited service network", "High running costs"],
  },
  {
    id: "volvo-xc40-recharge",
    name: "XC40 Recharge",
    brand: "Volvo",
    image: "/placeholder.svg?height=300&width=400&text=Volvo+XC40&bg=0f172a&color=white",
    price: 56.9,
    onRoadPrice: 62.5,
    range: 418,
    batteryCapacity: 78,
    chargingTime: "8 hrs (AC)",
    fastChargingTime: "40 min (10-80%)",
    topSpeed: 180,
    acceleration: 4.9,
    fastChargingSupport: true,
    bodyType: "SUV",
    batteryWarranty: "8 years/1.6 lakh km",
    vehicleWarranty: "3 years/unlimited km",
    chargingCostPerKm: 1.2,
    efficiency: 6.5,
    features: ["Scandinavian Design", "Premium Safety", "Google Integration"],
    pros: ["Premium luxury", "Excellent safety", "Unique design"],
    cons: ["Very expensive", "Lower efficiency", "Limited service"],
  },
]

export const iceCarDatabase: ICECarData[] = [
  {
    id: "maruti-swift",
    name: "Swift",
    brand: "Maruti Suzuki",
    image: "/placeholder.svg?height=300&width=400&text=Maruti+Swift&bg=f59e0b&color=white",
    price: 6.49,
    onRoadPrice: 7.5,
    fuelEfficiency: 23.2,
    fuelType: "Petrol",
    fuelCostPerKm: 4.31,
    maintenanceCostAnnual: 12000,
    co2Emissions: 113,
    acceleration: 12.2,
    topSpeed: 165,
    bodyType: "Hatchback",
    range: 858,
  },
  {
    id: "maruti-alto",
    name: "Alto K10",
    brand: "Maruti Suzuki",
    image: "/placeholder.svg?height=300&width=400&text=Maruti+Alto&bg=f59e0b&color=white",
    price: 3.99,
    onRoadPrice: 4.8,
    fuelEfficiency: 24.7,
    fuelType: "Petrol",
    fuelCostPerKm: 4.05,
    maintenanceCostAnnual: 9000,
    co2Emissions: 95,
    acceleration: 14.9,
    topSpeed: 150,
    bodyType: "Hatchback",
    range: 667,
  },
  {
    id: "hyundai-i20",
    name: "i20",
    brand: "Hyundai",
    image: "/placeholder.svg?height=300&width=400&text=Hyundai+i20&bg=7c3aed&color=white",
    price: 7.04,
    onRoadPrice: 8.2,
    fuelEfficiency: 20.3,
    fuelType: "Petrol",
    fuelCostPerKm: 4.93,
    maintenanceCostAnnual: 13500,
    co2Emissions: 119,
    acceleration: 10.7,
    topSpeed: 180,
    bodyType: "Hatchback",
    range: 751,
  },
  {
    id: "hyundai-creta",
    name: "Creta",
    brand: "Hyundai",
    image: "/placeholder.svg?height=300&width=400&text=Hyundai+Creta&bg=7c3aed&color=white",
    price: 11.0,
    onRoadPrice: 12.8,
    fuelEfficiency: 17.4,
    fuelType: "Petrol",
    fuelCostPerKm: 5.75,
    maintenanceCostAnnual: 15000,
    co2Emissions: 144,
    acceleration: 10.8,
    topSpeed: 190,
    bodyType: "SUV",
    range: 870,
  },
  {
    id: "maruti-baleno",
    name: "Baleno",
    brand: "Maruti Suzuki",
    image: "/placeholder.svg?height=300&width=400&text=Maruti+Baleno&bg=f59e0b&color=white",
    price: 6.61,
    onRoadPrice: 7.8,
    fuelEfficiency: 22.3,
    fuelType: "Petrol",
    fuelCostPerKm: 4.48,
    maintenanceCostAnnual: 12500,
    co2Emissions: 116,
    acceleration: 11.5,
    topSpeed: 170,
    bodyType: "Hatchback",
    range: 825,
  },
  {
    id: "toyota-fortuner",
    name: "Fortuner",
    brand: "Toyota",
    image: "/placeholder.svg?height=300&width=400&text=Toyota+Fortuner&bg=dc2626&color=white",
    price: 33.43,
    onRoadPrice: 38.5,
    fuelEfficiency: 10.0,
    fuelType: "Diesel",
    fuelCostPerKm: 9.0,
    maintenanceCostAnnual: 25000,
    co2Emissions: 186,
    acceleration: 12.1,
    topSpeed: 180,
    bodyType: "SUV",
    range: 800,
  },
]

// Utility functions
export const getBrandColor = (brand: string): string => {
  const colors: Record<string, string> = {
    Tata: "bg-blue-600",
    MG: "bg-red-600",
    BYD: "bg-green-600",
    Hyundai: "bg-purple-600",
    Mahindra: "bg-orange-600",
    Kia: "bg-gray-800",
    Volvo: "bg-slate-800",
    "Maruti Suzuki": "bg-yellow-600",
    Toyota: "bg-red-600",
  }
  return colors[brand] || "bg-gray-600"
}

export const calculateAnnualSavings = (iceCar: ICECarData, ev: EVData): number => {
  const annualKm = 12000
  const iceTotalCost = iceCar.fuelCostPerKm * annualKm + iceCar.maintenanceCostAnnual
  const evTotalCost = ev.chargingCostPerKm * annualKm + 4000 // EV maintenance
  return iceTotalCost - evTotalCost
}

export const calculateBreakEvenYears = (iceCar: ICECarData, ev: EVData): number => {
  const priceDifference = (ev.onRoadPrice - iceCar.onRoadPrice) * 100000
  const annualSavings = calculateAnnualSavings(iceCar, ev)
  return annualSavings > 0 ? priceDifference / annualSavings : -1
}
