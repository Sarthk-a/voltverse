export interface EnhancedICECarData {
  id: string
  name: string
  brand: string
  image: string
  price: number // in lakhs
  fuelEfficiency: number // km/l
  fuelType: "Petrol" | "Diesel"
  co2Emissions: number // g/km
  maintenanceCost: number // annual
  acceleration: number // 0-100 kmph in seconds
  fuelTankCapacity: number // litres
  range: number // km with full tank
  runningCostPerKm: number // calculated
}

export interface EnhancedEVData {
  id: string
  name: string
  brand: string
  image: string
  price: number // in lakhs
  efficiency: number // km/kWh
  batteryCapacity: number // kWh
  chargingTime: string
  fastChargingTime: string
  co2Emissions: number // always 0 for EVs
  maintenanceCost: number // annual
  acceleration: number // 0-100 kmph in seconds
  range: number // km per charge
  chargingCost: number // per kWh
  runningCostPerKm: number // calculated
}

// Constants for calculations
export const FUEL_PRICE_PETROL = 100 // ₹ per litre
export const FUEL_PRICE_DIESEL = 90 // ₹ per litre
export const ELECTRICITY_COST = 7 // ₹ per kWh
export const ANNUAL_KM = 12000
export const INSURANCE_COST = 15000 // annual

export const enhancedICECarData: EnhancedICECarData[] = [
  {
    id: "maruti-swift",
    name: "Swift",
    brand: "Maruti Suzuki",
    image: "/placeholder.svg?height=300&width=400&text=Maruti+Swift&bg=f8f9fa",
    price: 6.49,
    fuelEfficiency: 23.2,
    fuelType: "Petrol",
    co2Emissions: 113,
    maintenanceCost: 12000,
    acceleration: 12.2,
    fuelTankCapacity: 37,
    range: 858,
    runningCostPerKm: 4.31, // 100/23.2
  },
  {
    id: "hyundai-i20",
    name: "i20",
    brand: "Hyundai",
    image: "/placeholder.svg?height=300&width=400&text=Hyundai+i20&bg=f8f9fa",
    price: 7.04,
    fuelEfficiency: 20.3,
    fuelType: "Petrol",
    co2Emissions: 119,
    maintenanceCost: 13500,
    acceleration: 10.7,
    fuelTankCapacity: 37,
    range: 751,
    runningCostPerKm: 4.93,
  },
  {
    id: "hyundai-creta",
    name: "Creta",
    brand: "Hyundai",
    image: "/placeholder.svg?height=300&width=400&text=Hyundai+Creta&bg=f8f9fa",
    price: 11.0,
    fuelEfficiency: 17.4,
    fuelType: "Petrol",
    co2Emissions: 144,
    maintenanceCost: 15000,
    acceleration: 10.8,
    fuelTankCapacity: 50,
    range: 870,
    runningCostPerKm: 5.75,
  },
  {
    id: "maruti-wagon-r",
    name: "WagonR",
    brand: "Maruti Suzuki",
    image: "/placeholder.svg?height=300&width=400&text=Maruti+WagonR&bg=f8f9fa",
    price: 5.54,
    fuelEfficiency: 25.2,
    fuelType: "Petrol",
    co2Emissions: 98,
    maintenanceCost: 10000,
    acceleration: 14.1,
    fuelTankCapacity: 32,
    range: 806,
    runningCostPerKm: 3.97,
  },
  {
    id: "maruti-alto",
    name: "Alto K10",
    brand: "Maruti Suzuki",
    image: "/placeholder.svg?height=300&width=400&text=Maruti+Alto&bg=f8f9fa",
    price: 3.99,
    fuelEfficiency: 24.7,
    fuelType: "Petrol",
    co2Emissions: 95,
    maintenanceCost: 9000,
    acceleration: 14.9,
    fuelTankCapacity: 27,
    range: 667,
    runningCostPerKm: 4.05,
  },
  {
    id: "maruti-baleno",
    name: "Baleno",
    brand: "Maruti Suzuki",
    image: "/placeholder.svg?height=300&width=400&text=Maruti+Baleno&bg=f8f9fa",
    price: 6.61,
    fuelEfficiency: 22.3,
    fuelType: "Petrol",
    co2Emissions: 116,
    maintenanceCost: 12500,
    acceleration: 11.5,
    fuelTankCapacity: 37,
    range: 825,
    runningCostPerKm: 4.48,
  },
  {
    id: "toyota-fortuner",
    name: "Fortuner",
    brand: "Toyota",
    image: "/placeholder.svg?height=300&width=400&text=Toyota+Fortuner&bg=f8f9fa",
    price: 33.43,
    fuelEfficiency: 10.0,
    fuelType: "Diesel",
    co2Emissions: 186,
    maintenanceCost: 25000,
    acceleration: 12.1,
    fuelTankCapacity: 80,
    range: 800,
    runningCostPerKm: 9.0, // diesel price
  },
]

export const enhancedEVData: EnhancedEVData[] = [
  {
    id: "tata-nexon-ev",
    name: "Nexon EV",
    brand: "Tata",
    image: "/placeholder.svg?height=300&width=400&text=Tata+Nexon+EV&bg=e0f2fe",
    price: 14.99,
    efficiency: 10.8,
    batteryCapacity: 40.5,
    chargingTime: "8.5 hrs (AC)",
    fastChargingTime: "56 min (10-80%)",
    co2Emissions: 0,
    maintenanceCost: 4000,
    acceleration: 9.9,
    range: 437,
    chargingCost: 7,
    runningCostPerKm: 0.65, // 7/10.8
  },
  {
    id: "mg-zs-ev",
    name: "ZS EV",
    brand: "MG",
    image: "/placeholder.svg?height=300&width=400&text=MG+ZS+EV&bg=e0f2fe",
    price: 21.99,
    efficiency: 9.2,
    batteryCapacity: 50.3,
    chargingTime: "7 hrs (AC)",
    fastChargingTime: "40 min (10-80%)",
    co2Emissions: 0,
    maintenanceCost: 5000,
    acceleration: 8.5,
    range: 461,
    chargingCost: 7,
    runningCostPerKm: 0.76,
  },
  {
    id: "byd-atto3",
    name: "Atto 3",
    brand: "BYD",
    image: "/placeholder.svg?height=300&width=400&text=BYD+Atto+3&bg=e0f2fe",
    price: 33.99,
    efficiency: 8.6,
    batteryCapacity: 60.48,
    chargingTime: "10.5 hrs (AC)",
    fastChargingTime: "50 min (10-80%)",
    co2Emissions: 0,
    maintenanceCost: 6000,
    acceleration: 7.3,
    range: 521,
    chargingCost: 7,
    runningCostPerKm: 0.81,
  },
  {
    id: "hyundai-ioniq5",
    name: "Ioniq 5",
    brand: "Hyundai",
    image: "/placeholder.svg?height=300&width=400&text=Hyundai+Ioniq+5&bg=e0f2fe",
    price: 45.95,
    efficiency: 7.8,
    batteryCapacity: 72.6,
    chargingTime: "11 hrs (AC)",
    fastChargingTime: "18 min (10-80%)",
    co2Emissions: 0,
    maintenanceCost: 7000,
    acceleration: 5.2,
    range: 631,
    chargingCost: 7,
    runningCostPerKm: 0.9,
  },
  {
    id: "tata-tiago-ev",
    name: "Tiago EV",
    brand: "Tata",
    image: "/placeholder.svg?height=300&width=400&text=Tata+Tiago+EV&bg=e0f2fe",
    price: 8.69,
    efficiency: 11.2,
    batteryCapacity: 24,
    chargingTime: "5.7 hrs (AC)",
    fastChargingTime: "57 min (10-80%)",
    co2Emissions: 0,
    maintenanceCost: 3500,
    acceleration: 13.5,
    range: 315,
    chargingCost: 7,
    runningCostPerKm: 0.63,
  },
]

// Enhanced calculation functions
export const calculateBreakEvenPoint = (iceCar: EnhancedICECarData, evCar: EnhancedEVData) => {
  const priceDifference = (evCar.price - iceCar.price) * 100000 // Convert to rupees
  const annualSavings = calculateAnnualSavings(iceCar, evCar)

  if (annualSavings <= 0) return null

  return priceDifference / annualSavings // Years to break even
}

export const calculateAnnualSavings = (iceCar: EnhancedICECarData, evCar: EnhancedEVData) => {
  const iceFuelCost = iceCar.runningCostPerKm * ANNUAL_KM
  const evChargingCost = evCar.runningCostPerKm * ANNUAL_KM
  const fuelSavings = iceFuelCost - evChargingCost
  const maintenanceSavings = iceCar.maintenanceCost - evCar.maintenanceCost

  return fuelSavings + maintenanceSavings
}

export const calculateCO2Saved = (iceCar: EnhancedICECarData) => {
  return Math.round((iceCar.co2Emissions * ANNUAL_KM) / 1000) // Convert to kg
}

export const calculateDailyBreakEvenKm = (iceCar: EnhancedICECarData, evCar: EnhancedEVData) => {
  const priceDifference = (evCar.price - iceCar.price) * 100000
  const savingsPerKm = iceCar.runningCostPerKm - evCar.runningCostPerKm
  const maintenanceSavingsPerKm = (iceCar.maintenanceCost - evCar.maintenanceCost) / ANNUAL_KM
  const totalSavingsPerKm = savingsPerKm + maintenanceSavingsPerKm

  if (totalSavingsPerKm <= 0) return null

  const breakEvenTotalKm = priceDifference / totalSavingsPerKm
  return Math.round(breakEvenTotalKm / (5 * 365)) // Assuming 5 years usage, daily km needed
}
