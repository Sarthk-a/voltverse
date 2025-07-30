export interface ChargingStation {
  id: string
  name: string
  provider: "Tata Power" | "ChargeGrid" | "Ather Grid" | "Shell Recharge" | "BPCL" | "IOCL" | "Private"
  location: {
    lat: number
    lng: number
    address: string
    city: string
    state: string
    pincode: string
    landmark: string
  }
  chargerTypes: {
    type: "AC" | "DC" | "Fast" | "Slow"
    plugType: "Type 2" | "CCS" | "CHAdeMO" | "Bharat AC001" | "Bharat DC001"
    power: number // kW
    count: number
    availability: "Available" | "Busy" | "Scheduled" | "Out of Service"
    pricePerUnit: number // ₹ per kWh
    estimatedTime: string // charging time
  }[]
  amenities: string[]
  rating: number
  reviews: number
  isBookable: boolean
  operatingHours: string
  isRentable?: boolean
  rentalRate?: number // ₹ per hour
  rentalConditions?: string[]
  distance?: number // km from user
  estimatedArrival?: string
  photos: string[]
  contactNumber: string
  isVerified: boolean
  lastUpdated: string
}

export interface EVVehicle {
  id: string
  name: string
  brand: string
  type: "Car" | "Bike" | "Truck" | "Scooter" | "e-Rickshaw"
  category: "2-Wheeler" | "4-Wheeler" | "Commercial"
  image: string
  gallery: string[]
  price: number // in lakhs for cars, thousands for bikes
  onRoadPrice: number
  range: number // km
  batteryCapacity: number // kWh
  chargingTime: string
  fastChargingTime?: string
  topSpeed: number // kmph
  acceleration?: number // 0-100 kmph (for cars)
  bodyType?: string
  seatingCapacity?: number
  bootSpace?: number // litres
  groundClearance?: number // mm
  features: string[]
  safetyFeatures: string[]
  efficiency: number // km/kWh
  chargingCostPerKm: number
  maintenanceCostAnnual: number
  warranty: string
  batteryWarranty: string
  pros: string[]
  cons: string[]
  colors: string[]
  variants: {
    name: string
    price: number
    range: number
    features: string[]
  }[]
  rating: number
  reviews: number
  availability: "Available" | "Coming Soon" | "Discontinued"
  launchDate: string
}

export interface ICEVehicle {
  id: string
  name: string
  brand: string
  type: "Car" | "Bike"
  image: string
  price: number
  onRoadPrice: number
  fuelEfficiency: number // km/l
  fuelType: "Petrol" | "Diesel"
  fuelCostPerKm: number
  maintenanceCostAnnual: number
  co2Emissions: number // g/km
  acceleration?: number
  topSpeed: number
  range: number // km with full tank
  seatingCapacity?: number
  bootSpace?: number
  features: string[]
  rating: number
  reviews: number
}

export interface RentalVehicle {
  id: string
  name: string
  brand: string
  type: "Car" | "Scooter" | "Bike" | "e-Rickshaw" | "e-Truck"
  image: string
  gallery: string[]
  range: number
  chargingTime: string
  location: {
    lat: number
    lng: number
    address: string
    city: string
    area: string
  }
  pricing: {
    hourly?: number
    daily: number
    weekly?: number
    monthly?: number
  }
  features: string[]
  badges: (
    | "Fast Charger Included"
    | "Home Delivery"
    | "Helmet Included"
    | "Insurance Included"
    | "GPS Tracking"
    | "24/7 Support"
  )[]
  rating: number
  reviews: number
  availability: boolean
  ownerId: string
  ownerName: string
  ownerType: "Individual" | "Company"
  ownerRating: number
  vehicleCondition: "New" | "Like New" | "Good" | "Fair"
  yearOfManufacture: number
  kmsDriven: number
  lastServiced: string
  documents: string[]
  pickupDelivery: {
    homeDelivery: boolean
    pickupPoints: string[]
    deliveryCharges: number
  }
  cancellationPolicy: string
  securityDeposit: number
  fuelPolicy: string
  mileageLimit: number
  extraKmCharges: number
}

// Enhanced sample data with more entries
export const chargingStations: ChargingStation[] = [
  {
    id: "tata-power-mg-road",
    name: "Tata Power - MG Road",
    provider: "Tata Power",
    location: {
      lat: 12.9716,
      lng: 77.5946,
      address: "MG Road, Bangalore",
      city: "Bangalore",
      state: "Karnataka",
      pincode: "560001",
      landmark: "Near Brigade Road",
    },
    chargerTypes: [
      {
        type: "DC",
        plugType: "CCS",
        power: 60,
        count: 2,
        availability: "Available",
        pricePerUnit: 12,
        estimatedTime: "45 min (10-80%)",
      },
      {
        type: "AC",
        plugType: "Type 2",
        power: 22,
        count: 4,
        availability: "Busy",
        pricePerUnit: 8,
        estimatedTime: "3-4 hours",
      },
    ],
    amenities: ["Cafe", "Restroom", "WiFi", "Parking", "ATM", "Shopping"],
    rating: 4.5,
    reviews: 234,
    isBookable: true,
    operatingHours: "24/7",
    distance: 2.3,
    estimatedArrival: "8 mins",
    photos: ["/placeholder.svg?height=200&width=300&text=Tata+Power+Station"],
    contactNumber: "+91-80-12345678",
    isVerified: true,
    lastUpdated: "2 mins ago",
  },
  {
    id: "shell-koramangala",
    name: "Shell Recharge - Koramangala",
    provider: "Shell Recharge",
    location: {
      lat: 12.9352,
      lng: 77.6245,
      address: "Koramangala 5th Block, Bangalore",
      city: "Bangalore",
      state: "Karnataka",
      pincode: "560034",
      landmark: "Forum Mall",
    },
    chargerTypes: [
      {
        type: "Fast",
        plugType: "CCS",
        power: 120,
        count: 3,
        availability: "Available",
        pricePerUnit: 15,
        estimatedTime: "25 min (10-80%)",
      },
    ],
    amenities: ["Fuel Station", "Convenience Store", "ATM", "Car Wash"],
    rating: 4.2,
    reviews: 156,
    isBookable: true,
    operatingHours: "6:00 AM - 11:00 PM",
    distance: 4.1,
    estimatedArrival: "12 mins",
    photos: ["/placeholder.svg?height=200&width=300&text=Shell+Station"],
    contactNumber: "+91-80-23456789",
    isVerified: true,
    lastUpdated: "5 mins ago",
  },
  {
    id: "ather-grid-indiranagar",
    name: "Ather Grid - Indiranagar",
    provider: "Ather Grid",
    location: {
      lat: 12.9719,
      lng: 77.6412,
      address: "100 Feet Road, Indiranagar",
      city: "Bangalore",
      state: "Karnataka",
      pincode: "560038",
      landmark: "Metro Station",
    },
    chargerTypes: [
      {
        type: "Fast",
        plugType: "CCS",
        power: 30,
        count: 2,
        availability: "Available",
        pricePerUnit: 10,
        estimatedTime: "60 min (10-80%)",
      },
    ],
    amenities: ["Metro Connectivity", "Food Court", "Parking"],
    rating: 4.7,
    reviews: 89,
    isBookable: true,
    operatingHours: "5:00 AM - 12:00 AM",
    distance: 3.8,
    estimatedArrival: "11 mins",
    photos: ["/placeholder.svg?height=200&width=300&text=Ather+Grid"],
    contactNumber: "+91-80-34567890",
    isVerified: true,
    lastUpdated: "1 min ago",
  },
  {
    id: "private-whitefield",
    name: "Green Charge Hub - Whitefield",
    provider: "Private",
    location: {
      lat: 12.9698,
      lng: 77.75,
      address: "ITPL Main Road, Whitefield",
      city: "Bangalore",
      state: "Karnataka",
      pincode: "560066",
      landmark: "Phoenix MarketCity",
    },
    chargerTypes: [
      {
        type: "AC",
        plugType: "Type 2",
        power: 7.4,
        count: 1,
        availability: "Available",
        pricePerUnit: 6,
        estimatedTime: "6-8 hours",
      },
    ],
    amenities: ["Covered Parking", "Security"],
    rating: 4.8,
    reviews: 45,
    isBookable: true,
    operatingHours: "8:00 AM - 8:00 PM",
    isRentable: true,
    rentalRate: 50,
    rentalConditions: ["Only overnight", "Advance booking required"],
    distance: 12.5,
    estimatedArrival: "28 mins",
    photos: ["/placeholder.svg?height=200&width=300&text=Private+Charger"],
    contactNumber: "+91-98765-43210",
    isVerified: false,
    lastUpdated: "15 mins ago",
  },
  {
    id: "bpcl-electronic-city",
    name: "BPCL Fast Charge - Electronic City",
    provider: "BPCL",
    location: {
      lat: 12.8456,
      lng: 77.6603,
      address: "Electronic City Phase 1",
      city: "Bangalore",
      state: "Karnataka",
      pincode: "560100",
      landmark: "Infosys Gate",
    },
    chargerTypes: [
      {
        type: "DC",
        plugType: "CCS",
        power: 50,
        count: 2,
        availability: "Busy",
        pricePerUnit: 11,
        estimatedTime: "50 min (10-80%)",
      },
    ],
    amenities: ["Fuel Station", "Restroom", "Snacks"],
    rating: 4.1,
    reviews: 78,
    isBookable: true,
    operatingHours: "24/7",
    distance: 18.2,
    estimatedArrival: "35 mins",
    photos: ["/placeholder.svg?height=200&width=300&text=BPCL+Station"],
    contactNumber: "+91-80-45678901",
    isVerified: true,
    lastUpdated: "3 mins ago",
  },
]

export const evVehicles: EVVehicle[] = [
  {
    id: "tata-nexon-ev",
    name: "Nexon EV",
    brand: "Tata",
    type: "Car",
    category: "4-Wheeler",
    image: "/placeholder.svg?height=300&width=400&text=Tata+Nexon+EV&bg=1e40af&color=white",
    gallery: [
      "/placeholder.svg?height=300&width=400&text=Nexon+Interior",
      "/placeholder.svg?height=300&width=400&text=Nexon+Dashboard",
      "/placeholder.svg?height=300&width=400&text=Nexon+Charging",
    ],
    price: 14.99,
    onRoadPrice: 16.5,
    range: 437,
    batteryCapacity: 40.5,
    chargingTime: "8.5 hrs (AC)",
    fastChargingTime: "56 min (10-80%)",
    topSpeed: 120,
    acceleration: 9.9,
    bodyType: "SUV",
    seatingCapacity: 5,
    bootSpace: 350,
    groundClearance: 209,
    features: ["Connected Car Tech", "Fast Charging", "Regenerative Braking", "Multi-drive Modes", "Cruise Control"],
    safetyFeatures: ["Dual Airbags", "ABS with EBD", "ESP", "Hill Hold Control", "ISOFIX"],
    efficiency: 10.8,
    chargingCostPerKm: 0.65,
    maintenanceCostAnnual: 4000,
    warranty: "3 years/1.25 lakh km",
    batteryWarranty: "8 years/1.6 lakh km",
    pros: ["Proven reliability", "Good service network", "Competitive pricing", "Feature-rich"],
    cons: ["Limited fast charging network", "Interior quality could be better", "Road noise"],
    colors: ["Glacier White", "Daytona Grey", "Intensi-Teal", "Flame Red"],
    variants: [
      { name: "Prime", price: 14.99, range: 312, features: ["Basic infotainment", "Manual AC"] },
      { name: "Max", price: 16.99, range: 437, features: ["Premium infotainment", "Auto AC", "Sunroof"] },
    ],
    rating: 4.3,
    reviews: 1247,
    availability: "Available",
    launchDate: "2020-01-28",
  },
  {
    id: "mg-zs-ev",
    name: "ZS EV",
    brand: "MG",
    type: "Car",
    category: "4-Wheeler",
    image: "/placeholder.svg?height=300&width=400&text=MG+ZS+EV&bg=dc2626&color=white",
    gallery: [
      "/placeholder.svg?height=300&width=400&text=ZS+Interior",
      "/placeholder.svg?height=300&width=400&text=ZS+Features",
      "/placeholder.svg?height=300&width=400&text=ZS+Charging",
    ],
    price: 21.99,
    onRoadPrice: 24.5,
    range: 461,
    batteryCapacity: 50.3,
    chargingTime: "7 hrs (AC)",
    fastChargingTime: "40 min (10-80%)",
    topSpeed: 140,
    acceleration: 8.5,
    bodyType: "SUV",
    seatingCapacity: 5,
    bootSpace: 448,
    groundClearance: 161,
    features: [
      "10.1-inch Touchscreen",
      "Connected Features",
      "Panoramic Sunroof",
      "Wireless Charging",
      "Premium Audio",
    ],
    safetyFeatures: ["6 Airbags", "ESP", "ABS", "Hill Descent Control", "360° Camera"],
    efficiency: 9.2,
    chargingCostPerKm: 0.76,
    maintenanceCostAnnual: 5000,
    warranty: "5 years/unlimited km",
    batteryWarranty: "8 years/1.5 lakh km",
    pros: ["Premium feel", "Good range", "Feature-rich", "Strong build quality"],
    cons: ["Higher price", "Limited service network", "Software glitches", "Higher maintenance"],
    colors: ["Arctic White", "Asteroid Grey", "Exclusive Silver", "Electric Blue"],
    variants: [
      { name: "Excite", price: 21.99, range: 419, features: ["Standard features"] },
      { name: "Exclusive", price: 25.99, range: 461, features: ["Premium features", "Leather seats"] },
    ],
    rating: 4.1,
    reviews: 892,
    availability: "Available",
    launchDate: "2020-01-27",
  },
  {
    id: "byd-atto3",
    name: "Atto 3",
    brand: "BYD",
    type: "Car",
    category: "4-Wheeler",
    image: "/placeholder.svg?height=300&width=400&text=BYD+Atto+3&bg=059669&color=white",
    gallery: [
      "/placeholder.svg?height=300&width=400&text=Atto3+Interior",
      "/placeholder.svg?height=300&width=400&text=Atto3+Tech",
      "/placeholder.svg?height=300&width=400&text=Atto3+Charging",
    ],
    price: 33.99,
    onRoadPrice: 37.5,
    range: 521,
    batteryCapacity: 60.48,
    chargingTime: "10.5 hrs (AC)",
    fastChargingTime: "50 min (10-80%)",
    topSpeed: 160,
    acceleration: 7.3,
    bodyType: "SUV",
    seatingCapacity: 5,
    bootSpace: 440,
    groundClearance: 175,
    features: ["Blade Battery", "Rotating Touchscreen", "Premium Interior", "Advanced ADAS", "OTA Updates"],
    safetyFeatures: [
      "7 Airbags",
      "ADAS Level 2",
      "Blind Spot Monitoring",
      "Lane Keep Assist",
      "Auto Emergency Braking",
    ],
    efficiency: 8.6,
    chargingCostPerKm: 0.81,
    maintenanceCostAnnual: 6000,
    warranty: "6 years/1.5 lakh km",
    batteryWarranty: "8 years/1.5 lakh km",
    pros: ["Excellent range", "Premium quality", "Advanced battery tech", "Feature-loaded"],
    cons: ["Expensive", "New brand in India", "Limited service centers", "Higher running costs"],
    colors: ["Surf Blue", "Boulder Grey", "Parkour Red"],
    variants: [
      { name: "Dynamic", price: 33.99, range: 468, features: ["Standard features"] },
      { name: "Premium", price: 34.49, range: 521, features: ["Premium features", "ADAS"] },
    ],
    rating: 4.4,
    reviews: 567,
    availability: "Available",
    launchDate: "2022-10-11",
  },
  {
    id: "hyundai-ioniq5",
    name: "Ioniq 5",
    brand: "Hyundai",
    type: "Car",
    category: "4-Wheeler",
    image: "/placeholder.svg?height=300&width=400&text=Hyundai+Ioniq+5&bg=7c3aed&color=white",
    gallery: [
      "/placeholder.svg?height=300&width=400&text=Ioniq5+Interior",
      "/placeholder.svg?height=300&width=400&text=Ioniq5+Tech",
      "/placeholder.svg?height=300&width=400&text=Ioniq5+Charging",
    ],
    price: 45.95,
    onRoadPrice: 50.5,
    range: 631,
    batteryCapacity: 72.6,
    chargingTime: "11 hrs (AC)",
    fastChargingTime: "18 min (10-80%)",
    topSpeed: 185,
    acceleration: 5.2,
    bodyType: "Crossover",
    seatingCapacity: 5,
    bootSpace: 531,
    groundClearance: 163,
    features: ["Ultra-fast Charging", "V2L Technology", "Digital Cockpit", "Augmented Reality HUD", "Premium Audio"],
    safetyFeatures: ["8 Airbags", "SmartSense ADAS", "Blind Spot Collision Avoidance", "Highway Driving Assist"],
    efficiency: 7.8,
    chargingCostPerKm: 0.9,
    maintenanceCostAnnual: 7000,
    warranty: "3 years/unlimited km",
    batteryWarranty: "8 years/1.6 lakh km",
    pros: ["Fastest charging", "Excellent range", "Premium features", "Futuristic design"],
    cons: ["Very expensive", "Limited availability", "High maintenance", "Complex tech"],
    colors: ["Gravity Gold", "Digital Teal", "Phantom Black", "Lucid Blue"],
    variants: [
      { name: "RWD", price: 45.95, range: 631, features: ["Rear-wheel drive"] },
      { name: "AWD", price: 54.95, range: 582, features: ["All-wheel drive", "Enhanced performance"] },
    ],
    rating: 4.6,
    reviews: 234,
    availability: "Available",
    launchDate: "2022-12-20",
  },
  {
    id: "mahindra-xuv400",
    name: "XUV400 EV",
    brand: "Mahindra",
    type: "Car",
    category: "4-Wheeler",
    image: "/placeholder.svg?height=300&width=400&text=Mahindra+XUV400&bg=ea580c&color=white",
    gallery: [
      "/placeholder.svg?height=300&width=400&text=XUV400+Interior",
      "/placeholder.svg?height=300&width=400&text=XUV400+Features",
      "/placeholder.svg?height=300&width=400&text=XUV400+Charging",
    ],
    price: 15.99,
    onRoadPrice: 17.8,
    range: 456,
    batteryCapacity: 39.4,
    chargingTime: "6.5 hrs (AC)",
    fastChargingTime: "50 min (10-80%)",
    topSpeed: 150,
    acceleration: 8.3,
    bodyType: "SUV",
    seatingCapacity: 5,
    bootSpace: 378,
    groundClearance: 205,
    features: ["AdrenoX Connect", "Dual Zone AC", "Wireless Charging", "Premium Audio", "Multiple Drive Modes"],
    safetyFeatures: ["6 Airbags", "ESP", "Hill Hold Control", "TPMS", "Reverse Camera"],
    efficiency: 10.2,
    chargingCostPerKm: 0.68,
    maintenanceCostAnnual: 4500,
    warranty: "3 years/1.25 lakh km",
    batteryWarranty: "8 years/1.6 lakh km",
    pros: ["Good value for money", "Spacious", "Strong build quality", "Good ground clearance"],
    cons: ["Average interior quality", "Limited features", "Charging network", "Build quality issues"],
    colors: ["Everest White", "Galaxy Grey", "Napoli Black", "Coral Blue"],
    variants: [
      { name: "EC", price: 15.99, range: 375, features: ["Basic variant"] },
      { name: "EL", price: 17.69, range: 456, features: ["Mid variant with more features"] },
      { name: "EL Pro", price: 19.29, range: 456, features: ["Top variant with premium features"] },
    ],
    rating: 4.0,
    reviews: 445,
    availability: "Available",
    launchDate: "2022-09-08",
  },
  {
    id: "tata-tiago-ev",
    name: "Tiago EV",
    brand: "Tata",
    type: "Car",
    category: "4-Wheeler",
    image: "/placeholder.svg?height=300&width=400&text=Tata+Tiago+EV&bg=1e40af&color=white",
    gallery: [
      "/placeholder.svg?height=300&width=400&text=Tiago+Interior",
      "/placeholder.svg?height=300&width=400&text=Tiago+Dashboard",
      "/placeholder.svg?height=300&width=400&text=Tiago+Charging",
    ],
    price: 8.69,
    onRoadPrice: 9.8,
    range: 315,
    batteryCapacity: 24,
    chargingTime: "5.7 hrs (AC)",
    fastChargingTime: "57 min (10-80%)",
    topSpeed: 120,
    acceleration: 13.5,
    bodyType: "Hatchback",
    seatingCapacity: 5,
    bootSpace: 316,
    groundClearance: 170,
    features: ["Connected Car Tech", "Fast Charging", "Multi-drive Modes", "Regenerative Braking"],
    safetyFeatures: ["Dual Airbags", "ABS with EBD", "Corner Stability Control", "ISOFIX"],
    efficiency: 11.2,
    chargingCostPerKm: 0.63,
    maintenanceCostAnnual: 3500,
    warranty: "3 years/1.25 lakh km",
    batteryWarranty: "8 years/1.6 lakh km",
    pros: ["Affordable entry point", "Good for city driving", "Reliable brand", "Low running costs"],
    cons: ["Limited range", "Basic interior", "Small boot space", "Highway performance"],
    colors: ["Pristine White", "Daytona Grey", "Tropical Mist", "Flame Red"],
    variants: [
      { name: "XE", price: 8.69, range: 250, features: ["Basic variant"] },
      { name: "XT", price: 9.44, range: 315, features: ["Mid variant"] },
      { name: "XZ+", price: 11.99, range: 315, features: ["Top variant with premium features"] },
    ],
    rating: 4.2,
    reviews: 678,
    availability: "Available",
    launchDate: "2022-09-28",
  },
  {
    id: "ola-s1-pro",
    name: "S1 Pro",
    brand: "Ola",
    type: "Scooter",
    category: "2-Wheeler",
    image: "/placeholder.svg?height=300&width=400&text=Ola+S1+Pro&bg=dc2626&color=white",
    gallery: [
      "/placeholder.svg?height=300&width=400&text=S1+Dashboard",
      "/placeholder.svg?height=300&width=400&text=S1+Features",
      "/placeholder.svg?height=300&width=400&text=S1+Charging",
    ],
    price: 1.39,
    onRoadPrice: 1.5,
    range: 181,
    batteryCapacity: 4.0,
    chargingTime: "6.5 hrs",
    topSpeed: 116,
    features: ["Reverse Mode", "Hill Hold", "Cruise Control", "Music System", "Navigation"],
    safetyFeatures: ["Anti-theft", "Geo-fencing", "Remote diagnostics"],
    efficiency: 45.2,
    chargingCostPerKm: 0.15,
    maintenanceCostAnnual: 1500,
    warranty: "3 years/50,000 km",
    batteryWarranty: "3 years/50,000 km",
    pros: ["High performance", "Tech features", "Good range", "App connectivity"],
    cons: ["Service network issues", "Software bugs", "Build quality concerns", "Charging infrastructure"],
    colors: ["Jet Black", "Porcelain White", "Neo Mint", "Coral Glam"],
    variants: [
      { name: "S1 Air", price: 1.09, range: 101, features: ["Basic variant"] },
      { name: "S1 Pro", price: 1.39, range: 181, features: ["Premium variant with all features"] },
    ],
    rating: 3.8,
    reviews: 2341,
    availability: "Available",
    launchDate: "2021-08-15",
  },
  {
    id: "ather-450x",
    name: "450X",
    brand: "Ather",
    type: "Scooter",
    category: "2-Wheeler",
    image: "/placeholder.svg?height=300&width=400&text=Ather+450X&bg=f59e0b&color=white",
    gallery: [
      "/placeholder.svg?height=300&width=400&text=450X+Dashboard",
      "/placeholder.svg?height=300&width=400&text=450X+Features",
      "/placeholder.svg?height=300&width=400&text=450X+Charging",
    ],
    price: 1.46,
    onRoadPrice: 1.6,
    range: 146,
    batteryCapacity: 3.7,
    chargingTime: "5.4 hrs",
    topSpeed: 90,
    features: ["7-inch Touchscreen", "Google Maps", "OTA Updates", "Theft Protection", "Ride Statistics"],
    safetyFeatures: ["Anti-theft", "Fall detection", "Tow detection"],
    efficiency: 39.5,
    chargingCostPerKm: 0.18,
    maintenanceCostAnnual: 2000,
    warranty: "3 years/30,000 km",
    batteryWarranty: "3 years/30,000 km",
    pros: ["Premium build", "Tech-loaded", "Good service", "Reliable performance"],
    cons: ["Higher price", "Limited range", "Charging time", "Limited availability"],
    colors: ["Space Grey", "Still White", "Mint Green"],
    variants: [
      { name: "450 Plus", price: 1.33, range: 116, features: ["Mid variant"] },
      { name: "450X", price: 1.46, range: 146, features: ["Top variant with all features"] },
    ],
    rating: 4.4,
    reviews: 1567,
    availability: "Available",
    launchDate: "2020-01-10",
  },
  {
    id: "tata-ace-ev",
    name: "Ace EV",
    brand: "Tata",
    type: "Truck",
    category: "Commercial",
    image: "/placeholder.svg?height=300&width=400&text=Tata+Ace+EV&bg=059669&color=white",
    gallery: [
      "/placeholder.svg?height=300&width=400&text=Ace+Cabin",
      "/placeholder.svg?height=300&width=400&text=Ace+Loading",
      "/placeholder.svg?height=300&width=400&text=Ace+Charging",
    ],
    price: 8.5,
    onRoadPrice: 9.2,
    range: 154,
    batteryCapacity: 21.3,
    chargingTime: "4.5 hrs",
    topSpeed: 60,
    features: ["Load Capacity 750kg", "Fast Charging", "Telematics", "GPS Tracking", "Driver App"],
    safetyFeatures: ["Load monitoring", "Speed limiter", "Driver alerts"],
    efficiency: 7.2,
    chargingCostPerKm: 0.97,
    maintenanceCostAnnual: 8000,
    warranty: "5 years/2 lakh km",
    batteryWarranty: "5 years/2 lakh km",
    pros: ["Commercial viability", "Low running costs", "Government incentives", "Proven platform"],
    cons: ["Limited range", "Charging infrastructure", "Higher upfront cost", "Load limitations"],
    colors: ["Commercial White", "Fleet Blue"],
    variants: [
      { name: "Standard", price: 8.5, range: 154, features: ["Basic commercial features"] },
      { name: "Smart", price: 9.2, range: 154, features: ["Telematics and smart features"] },
    ],
    rating: 4.1,
    reviews: 234,
    availability: "Available",
    launchDate: "2022-06-15",
  },
]

export const iceVehicles: ICEVehicle[] = [
  {
    id: "maruti-swift",
    name: "Swift",
    brand: "Maruti Suzuki",
    type: "Car",
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
    range: 858,
    seatingCapacity: 5,
    bootSpace: 268,
    features: ["SmartPlay Infotainment", "Auto AC", "Keyless Entry", "Push Button Start"],
    rating: 4.2,
    reviews: 15678,
  },
  {
    id: "hyundai-i20",
    name: "i20",
    brand: "Hyundai",
    type: "Car",
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
    range: 751,
    seatingCapacity: 5,
    bootSpace: 311,
    features: ["10.25-inch Touchscreen", "Sunroof", "Wireless Charging", "BlueLink Connected"],
    rating: 4.3,
    reviews: 8945,
  },
  {
    id: "hyundai-creta",
    name: "Creta",
    brand: "Hyundai",
    type: "Car",
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
    range: 870,
    seatingCapacity: 5,
    bootSpace: 433,
    features: ["10.25-inch Touchscreen", "Panoramic Sunroof", "Ventilated Seats", "360° Camera"],
    rating: 4.4,
    reviews: 12456,
  },
  {
    id: "honda-activa",
    name: "Activa 6G",
    brand: "Honda",
    type: "Bike",
    image: "/placeholder.svg?height=300&width=400&text=Honda+Activa&bg=dc2626&color=white",
    price: 0.74,
    onRoadPrice: 0.85,
    fuelEfficiency: 60,
    fuelType: "Petrol",
    fuelCostPerKm: 1.67,
    maintenanceCostAnnual: 3000,
    co2Emissions: 65,
    topSpeed: 83,
    range: 350,
    features: ["LED Headlight", "Digital Meter", "Mobile Charging Socket", "Silent Start"],
    rating: 4.5,
    reviews: 25678,
  },
  {
    id: "bajaj-pulsar",
    name: "Pulsar NS200",
    brand: "Bajaj",
    type: "Bike",
    image: "/placeholder.svg?height=300&width=400&text=Bajaj+Pulsar&bg=1f2937&color=white",
    price: 1.38,
    onRoadPrice: 1.55,
    fuelEfficiency: 35,
    fuelType: "Petrol",
    fuelCostPerKm: 2.86,
    maintenanceCostAnnual: 4500,
    co2Emissions: 95,
    acceleration: 3.5,
    topSpeed: 136,
    range: 420,
    features: ["Digital Console", "LED DRL", "Perimeter Frame", "Nitrox Suspension"],
    rating: 4.1,
    reviews: 8934,
  },
]

export const rentalVehicles: RentalVehicle[] = [
  {
    id: "rental-nexon-ev-1",
    name: "Nexon EV",
    brand: "Tata",
    type: "Car",
    image: "/placeholder.svg?height=300&width=400&text=Tata+Nexon+EV&bg=1e40af&color=white",
    gallery: [
      "/placeholder.svg?height=200&width=300&text=Interior+View",
      "/placeholder.svg?height=200&width=300&text=Dashboard",
      "/placeholder.svg?height=200&width=300&text=Charging+Port",
    ],
    range: 437,
    chargingTime: "8.5 hrs",
    location: {
      lat: 12.9716,
      lng: 77.5946,
      address: "MG Road, Bangalore",
      city: "Bangalore",
      area: "Central Bangalore",
    },
    pricing: {
      hourly: 250,
      daily: 2500,
      weekly: 15000,
      monthly: 45000,
    },
    features: ["AC", "GPS", "Bluetooth", "Fast Charging", "Cruise Control"],
    badges: ["Fast Charger Included", "Insurance Included", "GPS Tracking", "24/7 Support"],
    rating: 4.6,
    reviews: 89,
    availability: true,
    ownerId: "owner-1",
    ownerName: "Green Fleet Rentals",
    ownerType: "Company",
    ownerRating: 4.8,
    vehicleCondition: "Like New",
    yearOfManufacture: 2023,
    kmsDriven: 15000,
    lastServiced: "2024-01-15",
    documents: ["RC", "Insurance", "PUC", "Permit"],
    pickupDelivery: {
      homeDelivery: true,
      pickupPoints: ["MG Road", "Koramangala", "Indiranagar"],
      deliveryCharges: 200,
    },
    cancellationPolicy: "Free cancellation up to 2 hours before pickup",
    securityDeposit: 5000,
    fuelPolicy: "Return with same charge level",
    mileageLimit: 200,
    extraKmCharges: 12,
  },
  {
    id: "rental-ola-s1-1",
    name: "S1 Pro",
    brand: "Ola",
    type: "Scooter",
    image: "/placeholder.svg?height=300&width=400&text=Ola+S1+Pro&bg=dc2626&color=white",
    gallery: [
      "/placeholder.svg?height=200&width=300&text=Dashboard+View",
      "/placeholder.svg?height=200&width=300&text=Side+Profile",
      "/placeholder.svg?height=200&width=300&text=Charging",
    ],
    range: 181,
    chargingTime: "6.5 hrs",
    location: {
      lat: 12.9352,
      lng: 77.6245,
      address: "Koramangala, Bangalore",
      city: "Bangalore",
      area: "South Bangalore",
    },
    pricing: {
      hourly: 80,
      daily: 400,
      weekly: 2500,
      monthly: 8000,
    },
    features: ["Reverse Mode", "Hill Hold", "Mobile App", "Music System"],
    badges: ["Helmet Included", "Home Delivery", "Insurance Included"],
    rating: 4.3,
    reviews: 156,
    availability: true,
    ownerId: "owner-2",
    ownerName: "EcoRide Scooters",
    ownerType: "Company",
    ownerRating: 4.5,
    vehicleCondition: "Good",
    yearOfManufacture: 2022,
    kmsDriven: 8500,
    lastServiced: "2024-01-10",
    documents: ["RC", "Insurance", "PUC"],
    pickupDelivery: {
      homeDelivery: true,
      pickupPoints: ["Koramangala", "BTM Layout", "HSR Layout"],
      deliveryCharges: 100,
    },
    cancellationPolicy: "Free cancellation up to 1 hour before pickup",
    securityDeposit: 2000,
    fuelPolicy: "Return with same charge level",
    mileageLimit: 100,
    extraKmCharges: 5,
  },
  {
    id: "rental-individual-nexon",
    name: "Nexon EV Max",
    brand: "Tata",
    type: "Car",
    image: "/placeholder.svg?height=300&width=400&text=Nexon+EV+Max&bg=1e40af&color=white",
    gallery: [
      "/placeholder.svg?height=200&width=300&text=Exterior+View",
      "/placeholder.svg?height=200&width=300&text=Interior+Luxury",
      "/placeholder.svg?height=200&width=300&text=Tech+Features",
    ],
    range: 437,
    chargingTime: "8.5 hrs",
    location: {
      lat: 12.9698,
      lng: 77.75,
      address: "Whitefield, Bangalore",
      city: "Bangalore",
      area: "East Bangalore",
    },
    pricing: {
      daily: 2800,
      weekly: 18000,
      monthly: 65000,
    },
    features: ["Sunroof", "Premium Audio", "Wireless Charging", "Connected Features"],
    badges: ["Insurance Included", "GPS Tracking"],
    rating: 4.7,
    reviews: 23,
    availability: true,
    ownerId: "individual-1",
    ownerName: "Rajesh Kumar",
    ownerType: "Individual",
    ownerRating: 4.9,
    vehicleCondition: "New",
    yearOfManufacture: 2024,
    kmsDriven: 2500,
    lastServiced: "2024-01-20",
    documents: ["RC", "Insurance", "PUC"],
    pickupDelivery: {
      homeDelivery: false,
      pickupPoints: ["Whitefield Main Road"],
      deliveryCharges: 0,
    },
    cancellationPolicy: "Free cancellation up to 4 hours before pickup",
    securityDeposit: 8000,
    fuelPolicy: "Return with same charge level",
    mileageLimit: 150,
    extraKmCharges: 15,
  },
  {
    id: "rental-mahindra-treo",
    name: "Treo",
    brand: "Mahindra",
    type: "e-Rickshaw",
    image: "/placeholder.svg?height=300&width=400&text=Mahindra+Treo&bg=ea580c&color=white",
    gallery: [
      "/placeholder.svg?height=200&width=300&text=Driver+Cabin",
      "/placeholder.svg?height=200&width=300&text=Passenger+Area",
      "/placeholder.svg?height=200&width=300&text=Commercial+Use",
    ],
    range: 141,
    chargingTime: "4 hrs",
    location: {
      lat: 12.9698,
      lng: 77.75,
      address: "Whitefield, Bangalore",
      city: "Bangalore",
      area: "Commercial Zone",
    },
    pricing: {
      daily: 800,
      weekly: 5000,
      monthly: 18000,
    },
    features: ["Commercial License", "GPS Tracking", "Driver Training", "Route Optimization"],
    badges: ["Insurance Included", "24/7 Support"],
    rating: 4.1,
    reviews: 67,
    availability: true,
    ownerId: "owner-3",
    ownerName: "Metro E-Rickshaw Fleet",
    ownerType: "Company",
    ownerRating: 4.3,
    vehicleCondition: "Good",
    yearOfManufacture: 2023,
    kmsDriven: 25000,
    lastServiced: "2024-01-05",
    documents: ["RC", "Insurance", "Commercial Permit", "Driver License"],
    pickupDelivery: {
      homeDelivery: false,
      pickupPoints: ["Whitefield Depot"],
      deliveryCharges: 0,
    },
    cancellationPolicy: "24 hours advance notice required",
    securityDeposit: 3000,
    fuelPolicy: "Return with same charge level",
    mileageLimit: 80,
    extraKmCharges: 8,
  },
  {
    id: "rental-ather-450x",
    name: "450X Gen 3",
    brand: "Ather",
    type: "Scooter",
    image: "/placeholder.svg?height=300&width=400&text=Ather+450X&bg=f59e0b&color=white",
    gallery: [
      "/placeholder.svg?height=200&width=300&text=Premium+Dashboard",
      "/placeholder.svg?height=200&width=300&text=Sleek+Design",
      "/placeholder.svg?height=200&width=300&text=Fast+Charging",
    ],
    range: 146,
    chargingTime: "5.4 hrs",
    location: {
      lat: 12.9719,
      lng: 77.6412,
      address: "Indiranagar, Bangalore",
      city: "Bangalore",
      area: "Central Bangalore",
    },
    pricing: {
      hourly: 120,
      daily: 600,
      weekly: 3500,
      monthly: 12000,
    },
    features: ["7-inch Touchscreen", "Google Maps", "OTA Updates", "Premium Build"],
    badges: ["Helmet Included", "Fast Charger Included", "GPS Tracking"],
    rating: 4.8,
    reviews: 45,
    availability: true,
    ownerId: "individual-2",
    ownerName: "Priya Sharma",
    ownerType: "Individual",
    ownerRating: 4.9,
    vehicleCondition: "Like New",
    yearOfManufacture: 2023,
    kmsDriven: 3200,
    lastServiced: "2024-01-18",
    documents: ["RC", "Insurance", "PUC"],
    pickupDelivery: {
      homeDelivery: true,
      pickupPoints: ["Indiranagar Metro", "Commercial Street"],
      deliveryCharges: 150,
    },
    cancellationPolicy: "Free cancellation up to 2 hours before pickup",
    securityDeposit: 3000,
    fuelPolicy: "Return with same charge level",
    mileageLimit: 80,
    extraKmCharges: 8,
  },
  {
    id: "rental-mg-zs-ev",
    name: "ZS EV Exclusive",
    brand: "MG",
    type: "Car",
    image: "/placeholder.svg?height=300&width=400&text=MG+ZS+EV&bg=dc2626&color=white",
    gallery: [
      "/placeholder.svg?height=200&width=300&text=Luxury+Interior",
      "/placeholder.svg?height=200&width=300&text=Premium+Features",
      "/placeholder.svg?height=200&width=300&text=Panoramic+Sunroof",
    ],
    range: 461,
    chargingTime: "7 hrs",
    location: {
      lat: 12.9352,
      lng: 77.6245,
      address: "HSR Layout, Bangalore",
      city: "Bangalore",
      area: "South Bangalore",
    },
    pricing: {
      daily: 3500,
      weekly: 22000,
      monthly: 80000,
    },
    features: ["Panoramic Sunroof", "Premium Audio", "360° Camera", "Wireless Charging"],
    badges: ["Fast Charger Included", "Insurance Included", "24/7 Support"],
    rating: 4.4,
    reviews: 78,
    availability: true,
    ownerId: "company-premium",
    ownerName: "Luxury EV Rentals",
    ownerType: "Company",
    ownerRating: 4.7,
    vehicleCondition: "New",
    yearOfManufacture: 2024,
    kmsDriven: 5000,
    lastServiced: "2024-01-22",
    documents: ["RC", "Insurance", "PUC", "Comprehensive Coverage"],
    pickupDelivery: {
      homeDelivery: true,
      pickupPoints: ["HSR Layout", "Koramangala", "BTM Layout"],
      deliveryCharges: 300,
    },
    cancellationPolicy: "Free cancellation up to 6 hours before pickup",
    securityDeposit: 10000,
    fuelPolicy: "Return with same charge level",
    mileageLimit: 250,
    extraKmCharges: 18,
  },
]

// Utility functions
export const getProviderColor = (provider: string): string => {
  const colors: Record<string, string> = {
    "Tata Power": "bg-blue-600",
    ChargeGrid: "bg-green-600",
    "Ather Grid": "bg-orange-600",
    "Shell Recharge": "bg-yellow-600",
    BPCL: "bg-red-600",
    IOCL: "bg-purple-600",
    Private: "bg-gray-600",
  }
  return colors[provider] || "bg-gray-600"
}

export const getVehicleTypeIcon = (type: string): string => {
  const icons: Record<string, string> = {
    Car: "🚗",
    Scooter: "🛵",
    Bike: "🏍️",
    "e-Rickshaw": "🛺",
    "e-Truck": "🚛",
    Truck: "🚛",
  }
  return icons[type] || "🚗"
}

export const calculateBreakEven = (iceVehicle: ICEVehicle, evVehicle: EVVehicle, dailyKm: number): number => {
  const annualKm = dailyKm * 365
  const iceTotalCost = iceVehicle.fuelCostPerKm * annualKm + iceVehicle.maintenanceCostAnnual
  const evTotalCost = evVehicle.chargingCostPerKm * annualKm + evVehicle.maintenanceCostAnnual
  const annualSavings = iceTotalCost - evTotalCost
  const priceDifference = (evVehicle.onRoadPrice - iceVehicle.onRoadPrice) * (evVehicle.type === "Car" ? 100000 : 1000)

  return annualSavings > 0 ? priceDifference / annualSavings : -1
}

export const getConditionColor = (condition: string): string => {
  const colors: Record<string, string> = {
    New: "bg-green-100 text-green-800",
    "Like New": "bg-blue-100 text-blue-800",
    Good: "bg-yellow-100 text-yellow-800",
    Fair: "bg-orange-100 text-orange-800",
  }
  return colors[condition] || "bg-gray-100 text-gray-800"
}
