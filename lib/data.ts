export interface EVData {
  id: string
  name: string
  brand: string
  image: string
  range: number // km
  batteryCapacity: number // kWh
  chargingTime: string
  topSpeed: number // kmph
  acceleration: number // 0-100 kmph in seconds
  price: number // in lakhs
  type: "SUV" | "Sedan" | "Hatchback"
  chargingCost: number // per 100km
  maintenanceCost: number // annual
  emissions: number // g/km CO2
}

export interface RegularCarData {
  id: string
  name: string
  brand: string
  fuelEfficiency: number // km/l
  fuelCost: number // per 100km
  maintenanceCost: number // annual
  acceleration: number // 0-100 kmph in seconds
  range: number // km (with full tank)
  emissions: number // g/km CO2
  type: "SUV" | "Sedan" | "Hatchback"
}

export const evData: EVData[] = [
  {
    id: "tata-nexon-ev",
    name: "Nexon EV",
    brand: "Tata",
    image: "/placeholder.svg?height=200&width=300&text=Tata+Nexon+EV",
    range: 437,
    batteryCapacity: 40.5,
    chargingTime: "8.5 hrs (AC)",
    topSpeed: 120,
    acceleration: 9.9,
    price: 14.99,
    type: "SUV",
    chargingCost: 120,
    maintenanceCost: 15000,
    emissions: 0,
  },
  {
    id: "mg-zs-ev",
    name: "ZS EV",
    brand: "MG",
    image: "/placeholder.svg?height=200&width=300&text=MG+ZS+EV",
    range: 461,
    batteryCapacity: 50.3,
    chargingTime: "7 hrs (AC)",
    topSpeed: 140,
    acceleration: 8.5,
    price: 21.99,
    type: "SUV",
    chargingCost: 140,
    maintenanceCost: 18000,
    emissions: 0,
  },
  {
    id: "hyundai-kona",
    name: "Kona Electric",
    brand: "Hyundai",
    image: "/placeholder.svg?height=200&width=300&text=Hyundai+Kona",
    range: 452,
    batteryCapacity: 39.2,
    chargingTime: "6.1 hrs (AC)",
    topSpeed: 155,
    acceleration: 9.7,
    price: 23.84,
    type: "SUV",
    chargingCost: 130,
    maintenanceCost: 20000,
    emissions: 0,
  },
  {
    id: "mahindra-xuv400",
    name: "XUV400 EV",
    brand: "Mahindra",
    image: "/placeholder.svg?height=200&width=300&text=Mahindra+XUV400",
    range: 456,
    batteryCapacity: 39.4,
    chargingTime: "6.5 hrs (AC)",
    topSpeed: 150,
    acceleration: 8.3,
    price: 15.99,
    type: "SUV",
    chargingCost: 125,
    maintenanceCost: 16000,
    emissions: 0,
  },
  {
    id: "byd-atto3",
    name: "Atto 3",
    brand: "BYD",
    image: "/placeholder.svg?height=200&width=300&text=BYD+Atto+3",
    range: 521,
    batteryCapacity: 60.48,
    chargingTime: "10.5 hrs (AC)",
    topSpeed: 160,
    acceleration: 7.3,
    price: 33.99,
    type: "SUV",
    chargingCost: 150,
    maintenanceCost: 22000,
    emissions: 0,
  },
]

export const regularCarData: RegularCarData[] = [
  {
    id: "maruti-swift",
    name: "Swift",
    brand: "Maruti Suzuki",
    fuelEfficiency: 23.2,
    fuelCost: 430,
    maintenanceCost: 25000,
    acceleration: 12.2,
    range: 450,
    emissions: 113,
    type: "Hatchback",
  },
  {
    id: "hyundai-creta",
    name: "Creta",
    brand: "Hyundai",
    fuelEfficiency: 17.4,
    fuelCost: 575,
    maintenanceCost: 30000,
    acceleration: 10.8,
    range: 520,
    emissions: 144,
    type: "SUV",
  },
  {
    id: "honda-city",
    name: "City",
    brand: "Honda",
    fuelEfficiency: 17.8,
    fuelCost: 560,
    maintenanceCost: 28000,
    acceleration: 10.2,
    range: 600,
    emissions: 119,
    type: "Sedan",
  },
  {
    id: "tata-harrier",
    name: "Harrier",
    brand: "Tata",
    fuelEfficiency: 14.6,
    fuelCost: 685,
    maintenanceCost: 35000,
    acceleration: 12.5,
    range: 450,
    emissions: 171,
    type: "SUV",
  },
  {
    id: "mahindra-xuv700",
    name: "XUV700",
    brand: "Mahindra",
    fuelEfficiency: 13.1,
    fuelCost: 765,
    maintenanceCost: 40000,
    acceleration: 9.5,
    range: 500,
    emissions: 191,
    type: "SUV",
  },
]
