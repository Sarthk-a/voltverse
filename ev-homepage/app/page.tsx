"use client"

import { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LoginDialog } from "@/components/login-dialog"
import { NotificationDialog } from "@/components/notification-dialog"
import {
  Zap,
  MapPin,
  Search,
  Navigation,
  Star,
  Calendar,
  Filter,
  Car,
  Bike,
  Truck,
  IndianRupee,
  Battery,
  Timer,
  Fuel,
  TrendingDown,
  Calculator,
  Users,
  Shield,
  Menu,
  X,
  Phone,
  Clock,
  CheckCircle,
  Eye,
  Heart,
  Share2,
  Route,
  Bookmark,
  Settings,
  Info,
  Building,
  User,
  Verified,
  CalendarIcon,
  MessageCircle,
  Download,
  Upload,
  Layers,
  BarChart3,
  Gauge,
  Leaf,
  Moon,
  Sun,
  Bell,
  Compass,
  Plus,
  Minus,
  RefreshCw,
  LogIn,
  LogOut,
} from "lucide-react"
import Image from "next/image"
import {
  chargingStations,
  evVehicles,
  iceVehicles,
  rentalVehicles,
  getProviderColor,
  getVehicleTypeIcon,
  calculateBreakEven,
  getConditionColor,
} from "@/lib/voltvverse-data"

export default function VoltVersePlatform() {
  // Theme and UI states
  const [isDarkMode, setIsDarkMode] = useState(true)
  const [notifications, setNotifications] = useState(3)
  const [isOnline, setIsOnline] = useState(true)
  const [user, setUser] = useState<any>(null)
  const [showLoginDialog, setShowLoginDialog] = useState(false)
  const [notificationDialog, setNotificationDialog] = useState<{
    isOpen: boolean
    type: "success" | "error" | "info" | "warning"
    title: string
    message: string
    details?: string[]
    actionButton?: {
      label: string
      action: () => void
    }
  }>({
    isOpen: false,
    type: "info",
    title: "",
    message: "",
  })

  // Navigation state
  const [activeSection, setActiveSection] = useState<"map" | "compare" | "rentals">("map")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // VoltMap states
  const [searchLocation, setSearchLocation] = useState("")
  const [selectedCharger, setSelectedCharger] = useState<string | null>(null)
  const [mapView, setMapView] = useState<"list" | "map" | "route">("map")
  const [isSearching, setIsSearching] = useState(false)
  const [showRoutePanel, setShowRoutePanel] = useState(false)
  const [routeStartPoint, setRouteStartPoint] = useState("")
  const [routeEndPoint, setRouteEndPoint] = useState("")
  const [vehicleRange, setVehicleRange] = useState(400)
  const [currentCharge, setCurrentCharge] = useState(80)
  const [preferredChargerType, setPreferredChargerType] = useState("any")
  const [bookingSlot, setBookingSlot] = useState<string | null>(null)
  const [savedStations, setSavedStations] = useState<string[]>([])
  const [mapFilters, setMapFilters] = useState({
    chargerType: "all",
    provider: "all",
    availability: "all",
    distance: "all",
    amenities: "all",
  })

  // VoltCompare states
  const [selectedEVs, setSelectedEVs] = useState<string[]>([])
  const [compareCategory, setCompareCategory] = useState<"Cars" | "Bikes" | "Trucks">("Cars")
  const [compareFilters, setCompareFilters] = useState({
    budget: "all",
    bodyType: "all",
    brand: "all",
    range: "all",
    availability: "all",
  })
  const [selectedICE, setSelectedICE] = useState("")
  const [selectedEVForComparison, setSelectedEVForComparison] = useState("")
  const [dailyKm, setDailyKm] = useState(30)
  const [fuelPrice, setFuelPrice] = useState(100)
  const [electricityRate, setElectricityRate] = useState(7)
  const [selectedEVDetails, setSelectedEVDetails] = useState<string | null>(null)
  const [favoriteEVs, setFavoriteEVs] = useState<string[]>([])
  const [showCalculatorResults, setShowCalculatorResults] = useState(false)

  // VoltRide states
  const [rentalFilters, setRentalFilters] = useState({
    vehicleType: "all",
    location: "all",
    duration: "all",
    priceRange: "all",
    ownerType: "all",
    condition: "all",
    rating: "all",
  })
  const [rentalView, setRentalView] = useState<"all" | "companies" | "individuals">("all")
  const [selectedRental, setSelectedRental] = useState<string | null>(null)
  const [favoriteRentals, setFavoriteRentals] = useState<string[]>([])
  const [bookingRental, setBookingRental] = useState<string | null>(null)

  // Helper function to show notifications
  const showNotification = (
    type: "success" | "error" | "info" | "warning",
    title: string,
    message: string,
    details?: string[],
    actionButton?: { label: string; action: () => void },
  ) => {
    setNotificationDialog({
      isOpen: true,
      type,
      title,
      message,
      details,
      actionButton,
    })
  }

  // Functional handlers
  const handleSearch = () => {
    setIsSearching(true)
    setTimeout(() => {
      setIsSearching(false)
      showNotification(
        "success",
        "Search Complete",
        `Found ${filteredStations.length} charging stations near "${searchLocation}"`,
        [
          `${filteredStations.filter((s) => s.chargerTypes.some((c) => c.availability === "Available")).length} stations available now`,
          `Nearest station: ${filteredStations[0]?.name} (${filteredStations[0]?.distance} km)`,
          "Real-time availability updated",
        ],
      )
    }, 2000)
  }

  const handleNavigateToStation = (stationId: string) => {
    const station = chargingStations.find((s) => s.id === stationId)
    if (station) {
      showNotification(
        "info",
        "Navigation Started",
        `Opening navigation to ${station.name}`,
        [
          `Address: ${station.location.address}`,
          `Distance: ${station.distance} km`,
          `ETA: ${station.estimatedArrival}`,
          "Turn-by-turn directions will open in your maps app",
        ],
        {
          label: "Open Maps",
          action: () => console.log("Opening maps app"),
        },
      )
    }
  }

  const handleBookSlot = (stationId: string) => {
    if (!user) {
      showNotification(
        "warning",
        "Login Required",
        "Please login to book charging slots",
        [
          "Create an account to access booking features",
          "Save your favorite stations",
          "Get personalized recommendations",
        ],
        {
          label: "Login Now",
          action: () => setShowLoginDialog(true),
        },
      )
      return
    }

    setBookingSlot(stationId)
    const station = chargingStations.find((s) => s.id === stationId)
    setTimeout(() => {
      setBookingSlot(null)
      const bookingId = `VV${Math.random().toString(36).substr(2, 9).toUpperCase()}`
      showNotification(
        "success",
        "Slot Booked Successfully!",
        `Your charging slot at ${station?.name} has been confirmed`,
        [
          `Booking ID: ${bookingId}`,
          `Station: ${station?.name}`,
          `Address: ${station?.location.address}`,
          `Estimated arrival: ${station?.estimatedArrival}`,
          "SMS confirmation sent to your phone",
        ],
        {
          label: "View Booking",
          action: () => console.log("Opening booking details"),
        },
      )
    }, 2000)
  }

  const handleSaveStation = (stationId: string) => {
    if (!user) {
      showNotification(
        "warning",
        "Login Required",
        "Please login to save stations",
        [
          "Create an account to save favorite stations",
          "Access saved stations across devices",
          "Get notifications about your saved stations",
        ],
        {
          label: "Login Now",
          action: () => setShowLoginDialog(true),
        },
      )
      return
    }

    const station = chargingStations.find((s) => s.id === stationId)
    if (savedStations.includes(stationId)) {
      setSavedStations(savedStations.filter((id) => id !== stationId))
      showNotification("info", "Station Removed", `${station?.name} removed from your saved stations`, [
        `You have ${savedStations.length - 1} saved stations`,
      ])
    } else {
      setSavedStations([...savedStations, stationId])
      showNotification("success", "Station Saved", `${station?.name} added to your saved stations`, [
        "Access from your profile anytime",
        "Get notifications about availability",
        `You have ${savedStations.length + 1} saved stations`,
      ])
    }
  }

  const handlePlanRoute = () => {
    if (!routeStartPoint || !routeEndPoint) {
      showNotification("warning", "Missing Information", "Please enter both starting point and destination", [
        "Starting point is required",
        "Destination is required",
        "Route planning needs both locations",
      ])
      return
    }

    showNotification(
      "success",
      "Route Planned Successfully",
      `Optimal route from ${routeStartPoint} to ${routeEndPoint}`,
      [
        `Vehicle range: ${vehicleRange}km`,
        `Current charge: ${currentCharge}%`,
        `Preferred charger: ${preferredChargerType}`,
        "2 charging stops recommended",
        "Total journey time: 4h 30min",
      ],
      {
        label: "Start Navigation",
        action: () => console.log("Starting navigation"),
      },
    )
  }

  const handleToggleFavoriteEV = (evId: string) => {
    if (!user) {
      showNotification(
        "warning",
        "Login Required",
        "Please login to save favorite EVs",
        ["Create an account to save favorites", "Compare saved EVs easily", "Get price drop alerts"],
        {
          label: "Login Now",
          action: () => setShowLoginDialog(true),
        },
      )
      return
    }

    const ev = evVehicles.find((v) => v.id === evId)
    if (favoriteEVs.includes(evId)) {
      setFavoriteEVs(favoriteEVs.filter((id) => id !== evId))
      showNotification("info", "Removed from Favorites", `${ev?.brand} ${ev?.name} removed from favorites`)
    } else {
      setFavoriteEVs([...favoriteEVs, evId])
      showNotification("success", "Added to Favorites", `${ev?.brand} ${ev?.name} added to favorites`, [
        "Get price drop alerts",
        "Easy access from your profile",
        "Compare with other favorites",
      ])
    }
  }

  const handleShareEV = (evId: string) => {
    const ev = evVehicles.find((v) => v.id === evId)
    if (ev) {
      navigator.clipboard.writeText(
        `Check out the ${ev.brand} ${ev.name} on VoltVerse! Price: ₹${ev.price}${ev.type === "Car" ? "L" : "K"}, Range: ${ev.range}km`,
      )
      showNotification("success", "Link Copied", `${ev.brand} ${ev.name} details copied to clipboard`, [
        "Share with friends and family",
        "Compare prices and features",
        "Help others make informed decisions",
      ])
    }
  }

  const handleToggleFavoriteRental = (rentalId: string) => {
    if (!user) {
      showNotification(
        "warning",
        "Login Required",
        "Please login to save favorite rentals",
        ["Create an account to save favorites", "Quick booking access", "Get availability notifications"],
        {
          label: "Login Now",
          action: () => setShowLoginDialog(true),
        },
      )
      return
    }

    const rental = rentalVehicles.find((r) => r.id === rentalId)
    if (favoriteRentals.includes(rentalId)) {
      setFavoriteRentals(favoriteRentals.filter((id) => id !== rentalId))
      showNotification("info", "Removed from Favorites", `${rental?.brand} ${rental?.name} removed from favorites`)
    } else {
      setFavoriteRentals([...favoriteRentals, rentalId])
      showNotification("success", "Added to Favorites", `${rental?.brand} ${rental?.name} added to favorites`, [
        "Quick booking access",
        "Get availability alerts",
        "Compare with other rentals",
      ])
    }
  }

  const handleBookRental = (rentalId: string) => {
    if (!user) {
      showNotification(
        "warning",
        "Login Required",
        "Please login to book rentals",
        ["Create an account to book vehicles", "Secure payment processing", "Booking history and support"],
        {
          label: "Login Now",
          action: () => setShowLoginDialog(true),
        },
      )
      return
    }

    setBookingRental(rentalId)
    const rental = rentalVehicles.find((r) => r.id === rentalId)
    setTimeout(() => {
      setBookingRental(null)
      const bookingId = `VR${Math.random().toString(36).substr(2, 9).toUpperCase()}`
      showNotification(
        "success",
        "Booking Confirmed!",
        `Your rental booking for ${rental?.brand} ${rental?.name} is confirmed`,
        [
          `Booking ID: ${bookingId}`,
          `Owner: ${rental?.ownerName}`,
          `Daily rate: ₹${rental?.pricing.daily}`,
          `Security deposit: ₹${rental?.securityDeposit}`,
          "Owner will contact you shortly",
        ],
        {
          label: "View Booking",
          action: () => console.log("Opening booking details"),
        },
      )
    }, 2000)
  }

  const handleContactOwner = (rentalId: string) => {
    if (!user) {
      showNotification(
        "warning",
        "Login Required",
        "Please login to contact owners",
        ["Create an account to contact owners", "Secure messaging system", "Verified user protection"],
        {
          label: "Login Now",
          action: () => setShowLoginDialog(true),
        },
      )
      return
    }

    const rental = rentalVehicles.find((r) => r.id === rentalId)
    if (rental) {
      showNotification(
        "success",
        "Connecting with Owner",
        `Connecting you with ${rental.ownerName}`,
        [
          `Owner: ${rental.ownerName} (${rental.ownerType})`,
          `Rating: ${rental.ownerRating}/5.0`,
          `Phone: +91-98765-43210`,
          "Secure messaging available in app",
        ],
        {
          label: "Call Now",
          action: () => console.log("Initiating call"),
        },
      )
    }
  }

  const handleLogin = (userData: any) => {
    setUser(userData)
    showNotification("success", "Welcome to VoltVerse!", `Hello ${userData.name}, you're now logged in`, [
      "Access all premium features",
      "Save favorites and bookings",
      "Get personalized recommendations",
      "Join India's largest EV community",
    ])
  }

  const handleLogout = () => {
    setUser(null)
    setFavoriteEVs([])
    setFavoriteRentals([])
    setSavedStations([])
    showNotification("info", "Logged Out", "You have been successfully logged out", [
      "Your data is safely stored",
      "Login anytime to access your account",
      "Thank you for using VoltVerse",
    ])
  }

  // Filter data based on category and filters
  const filteredEVs = useMemo(() => {
    return evVehicles.filter((ev) => {
      if (compareCategory === "Cars" && ev.category !== "4-Wheeler") return false
      if (compareCategory === "Bikes" && ev.category !== "2-Wheeler") return false
      if (compareCategory === "Trucks" && ev.category !== "Commercial") return false

      if (compareFilters.budget !== "all") {
        const [min, max] = compareFilters.budget.split("-").map(Number)
        if (max && (ev.price < min || ev.price > max)) return false
        if (!max && ev.price < min) return false
      }
      if (compareFilters.brand !== "all" && ev.brand !== compareFilters.brand) return false
      if (compareFilters.range !== "all") {
        const [min, max] = compareFilters.range.split("-").map(Number)
        if (max && (ev.range < min || ev.range > max)) return false
        if (!max && ev.range < min) return false
      }
      if (compareFilters.availability !== "all" && ev.availability !== compareFilters.availability) return false

      return true
    })
  }, [compareCategory, compareFilters])

  const filteredRentals = useMemo(() => {
    return rentalVehicles.filter((rental) => {
      if (rentalFilters.vehicleType !== "all" && rental.type !== rentalFilters.vehicleType) return false
      if (rentalFilters.location !== "all" && rental.location.city !== rentalFilters.location) return false
      if (rentalFilters.ownerType !== "all" && rental.ownerType !== rentalFilters.ownerType) return false
      if (rentalFilters.condition !== "all" && rental.vehicleCondition !== rentalFilters.condition) return false
      if (rentalFilters.rating !== "all") {
        const minRating = Number(rentalFilters.rating)
        if (rental.rating < minRating) return false
      }
      if (rentalView === "companies" && rental.ownerType !== "Company") return false
      if (rentalView === "individuals" && rental.ownerType !== "Individual") return false
      return true
    })
  }, [rentalFilters, rentalView])

  const filteredStations = useMemo(() => {
    return chargingStations.filter((station) => {
      if (mapFilters.provider !== "all" && station.provider !== mapFilters.provider) return false
      if (mapFilters.availability !== "all") {
        const hasAvailable = station.chargerTypes.some((charger) => charger.availability === mapFilters.availability)
        if (!hasAvailable) return false
      }
      if (mapFilters.chargerType !== "all") {
        const hasType = station.chargerTypes.some((charger) => charger.type === mapFilters.chargerType)
        if (!hasType) return false
      }
      return true
    })
  }, [mapFilters])

  // EV comparison functions
  const addEVToComparison = (evId: string) => {
    if (selectedEVs.length < 4 && !selectedEVs.includes(evId)) {
      setSelectedEVs([...selectedEVs, evId])
      const ev = evVehicles.find((v) => v.id === evId)
      showNotification("success", "Added to Comparison", `${ev?.brand} ${ev?.name} added to comparison`, [
        `${selectedEVs.length + 1}/4 vehicles selected`,
        "Compare features, prices, and specifications",
      ])
    }
  }

  const removeEVFromComparison = (evId: string) => {
    setSelectedEVs(selectedEVs.filter((id) => id !== evId))
    const ev = evVehicles.find((v) => v.id === evId)
    showNotification("info", "Removed from Comparison", `${ev?.brand} ${ev?.name} removed from comparison`)
  }

  const selectedEVData = selectedEVs.map((id) => evVehicles.find((ev) => ev.id === id)!).filter(Boolean)

  // EV vs ICE comparison data
  const iceVehicle = iceVehicles.find((vehicle) => vehicle.id === selectedICE)
  const evForComparison = evVehicles.find((ev) => ev.id === selectedEVForComparison)

  const comparisonResults = useMemo(() => {
    if (!iceVehicle || !evForComparison) return null

    const annualKm = dailyKm * 365
    const iceTotalCost = iceVehicle.fuelCostPerKm * annualKm + iceVehicle.maintenanceCostAnnual
    const evTotalCost = evForComparison.chargingCostPerKm * annualKm + evForComparison.maintenanceCostAnnual
    const annualSavings = iceTotalCost - evTotalCost
    const breakEvenYears = calculateBreakEven(iceVehicle, evForComparison, dailyKm)

    return {
      annualSavings,
      breakEvenYears,
      iceTotalCost,
      evTotalCost,
      co2Saved: Math.round((iceVehicle.co2Emissions * annualKm) / 1000),
    }
  }, [iceVehicle, evForComparison, dailyKm])

  const themeClasses = isDarkMode
    ? "min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-blue-900"
    : "min-h-screen bg-gradient-to-br from-slate-50 to-blue-50"

  return (
    <div className={themeClasses}>
      {/* Enhanced Dark Mode Header - Edge to Edge */}
      <header
        className={`${isDarkMode ? "bg-gray-900/95 border-gray-700" : "bg-white/95 border-gray-200"} backdrop-blur-sm border-b sticky top-0 z-50 shadow-lg w-full`}
      >
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <div>
                <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                  VoltVerse
                </span>
                <div className={`text-xs ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>Complete EV Ecosystem</div>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-1">
              <Button
                variant={activeSection === "map" ? "default" : "ghost"}
                onClick={() => setActiveSection("map")}
                className={`flex items-center space-x-2 ${
                  activeSection === "map"
                    ? "bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg"
                    : isDarkMode
                      ? "text-gray-300 hover:text-white hover:bg-gray-800"
                      : "text-gray-600 hover:text-gray-900"
                }`}
              >
                <MapPin className="w-4 h-4" />
                <span>VoltMap</span>
              </Button>
              <Button
                variant={activeSection === "compare" ? "default" : "ghost"}
                onClick={() => setActiveSection("compare")}
                className={`flex items-center space-x-2 ${
                  activeSection === "compare"
                    ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg"
                    : isDarkMode
                      ? "text-gray-300 hover:text-white hover:bg-gray-800"
                      : "text-gray-600 hover:text-gray-900"
                }`}
              >
                <Car className="w-4 h-4" />
                <span>VoltCompare</span>
              </Button>
              <Button
                variant={activeSection === "rentals" ? "default" : "ghost"}
                onClick={() => setActiveSection("rentals")}
                className={`flex items-center space-x-2 ${
                  activeSection === "rentals"
                    ? "bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg"
                    : isDarkMode
                      ? "text-gray-300 hover:text-white hover:bg-gray-800"
                      : "text-gray-600 hover:text-gray-900"
                }`}
              >
                <Users className="w-4 h-4" />
                <span>VoltRide</span>
              </Button>
            </nav>

            {/* Header Actions */}
            <div className="flex items-center space-x-3">
              {/* User Profile or Login */}
              {user ? (
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-2">
                    <Image
                      src={user.avatar || "/placeholder.svg"}
                      alt={user.name}
                      width={32}
                      height={32}
                      className="rounded-full"
                    />
                    <div className="hidden sm:block">
                      <div className={`text-sm font-medium ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                        {user.name}
                      </div>
                      <div className={`text-xs ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>{user.city}</div>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleLogout}
                    className={
                      isDarkMode
                        ? "text-gray-300 hover:text-white hover:bg-gray-800"
                        : "text-gray-600 hover:text-gray-900"
                    }
                  >
                    <LogOut className="w-4 h-4" />
                  </Button>
                </div>
              ) : (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowLoginDialog(true)}
                  className={`flex items-center space-x-2 ${isDarkMode ? "text-gray-300 hover:text-white hover:bg-gray-800" : "text-gray-600 hover:text-gray-900"}`}
                >
                  <LogIn className="w-4 h-4" />
                  <span className="hidden sm:inline">Login</span>
                </Button>
              )}

              {/* Online Status */}
              <div className="flex items-center space-x-2">
                <div className={`w-2 h-2 rounded-full ${isOnline ? "bg-green-500" : "bg-red-500"} animate-pulse`}></div>
                <span className={`text-xs hidden sm:inline ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                  {isOnline ? "Online" : "Offline"}
                </span>
              </div>

              {/* Notifications */}
              <Button
                variant="ghost"
                size="sm"
                className={`relative ${isDarkMode ? "text-gray-300 hover:text-white hover:bg-gray-800" : "text-gray-600 hover:text-gray-900"}`}
                onClick={() => {
                  setNotifications(0)
                  showNotification("info", "Notifications", "Here are your latest updates", [
                    "New charging station added near you",
                    "EV price drop alert: Tata Nexon EV",
                    "Rental booking confirmed for tomorrow",
                  ])
                }}
              >
                <Bell className="w-5 h-5" />
                {notifications > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                    {notifications}
                  </span>
                )}
              </Button>

              {/* Theme Toggle */}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsDarkMode(!isDarkMode)}
                className={`${isDarkMode ? "text-yellow-400 hover:text-yellow-300 hover:bg-gray-800" : "text-gray-600 hover:text-gray-900"}`}
              >
                {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </Button>

              {/* Mobile Menu Button */}
              <Button
                variant="ghost"
                size="sm"
                className={`md:hidden ${isDarkMode ? "text-gray-300 hover:text-white hover:bg-gray-800" : "text-gray-600 hover:text-gray-900"}`}
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </Button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className={`md:hidden py-4 border-t ${isDarkMode ? "border-gray-700" : "border-gray-200"}`}>
              <div className="flex flex-col space-y-2">
                <Button
                  variant={activeSection === "map" ? "default" : "ghost"}
                  onClick={() => {
                    setActiveSection("map")
                    setMobileMenuOpen(false)
                  }}
                  className={`justify-start ${
                    activeSection === "map"
                      ? "bg-gradient-to-r from-blue-500 to-cyan-500 text-white"
                      : isDarkMode
                        ? "text-gray-300 hover:text-white hover:bg-gray-800"
                        : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  <MapPin className="w-4 h-4 mr-2" />
                  VoltMap - Charger Locator
                </Button>
                <Button
                  variant={activeSection === "compare" ? "default" : "ghost"}
                  onClick={() => {
                    setActiveSection("compare")
                    setMobileMenuOpen(false)
                  }}
                  className={`justify-start ${
                    activeSection === "compare"
                      ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white"
                      : isDarkMode
                        ? "text-gray-300 hover:text-white hover:bg-gray-800"
                        : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  <Car className="w-4 h-4 mr-2" />
                  VoltCompare - EV Comparison
                </Button>
                <Button
                  variant={activeSection === "rentals" ? "default" : "ghost"}
                  onClick={() => {
                    setActiveSection("rentals")
                    setMobileMenuOpen(false)
                  }}
                  className={`justify-start ${
                    activeSection === "rentals"
                      ? "bg-gradient-to-r from-green-500 to-emerald-500 text-white"
                      : isDarkMode
                        ? "text-gray-300 hover:text-white hover:bg-gray-800"
                        : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  <Users className="w-4 h-4 mr-2" />
                  VoltRide - EV Rentals
                </Button>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Main Content - Edge to Edge */}
      <main className="w-full px-4 sm:px-6 lg:px-8 py-8">
        {/* Enhanced VoltMap Section */}
        {activeSection === "map" && (
          <div className="space-y-8">
            {/* Hero Section */}
            <div className="text-center">
              <div className="inline-flex items-center space-x-2 bg-blue-500/20 text-blue-400 px-4 py-2 rounded-full text-sm font-medium mb-4 border border-blue-500/30">
                <MapPin className="w-4 h-4" />
                <span>VoltMap - EV Charger Locator & Route Planner</span>
              </div>
              <h1 className={`text-4xl font-bold mb-4 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                Find & Book <span className="text-blue-400">EV Chargers</span> Near You
              </h1>
              <p className={`text-xl max-w-3xl mx-auto ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
                Locate charging stations, plan optimal routes, book slots in advance, and discover charging
                opportunities. Your complete EV charging companion with real-time data.
              </p>
            </div>

            {/* Enhanced Search and Filters */}
            <Card
              className={`${isDarkMode ? "bg-gray-800/80 border-blue-500/30" : "bg-white/80 border-blue-100"} backdrop-blur-sm border-2 shadow-lg`}
            >
              <CardContent className="p-6">
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 mb-6">
                  <div className="lg:col-span-2">
                    <div className="relative">
                      <Search
                        className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${isDarkMode ? "text-gray-400" : "text-gray-400"}`}
                      />
                      <Input
                        placeholder="Search by location, pincode, or landmark..."
                        value={searchLocation}
                        onChange={(e) => setSearchLocation(e.target.value)}
                        className={`pl-10 h-12 text-lg ${isDarkMode ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400" : ""}`}
                      />
                    </div>
                  </div>
                  <Button
                    className="h-12 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white shadow-lg"
                    onClick={handleSearch}
                    disabled={isSearching}
                  >
                    {isSearching ? (
                      <RefreshCw className="w-5 h-5 mr-2 animate-spin" />
                    ) : (
                      <Navigation className="w-5 h-5 mr-2" />
                    )}
                    {isSearching ? "Searching..." : "Find Chargers"}
                  </Button>
                  <Button
                    variant="outline"
                    className={`h-12 ${isDarkMode ? "bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600" : "bg-transparent"}`}
                    onClick={() => setShowRoutePanel(!showRoutePanel)}
                  >
                    <Route className="w-5 h-5 mr-2" />
                    Plan Route
                  </Button>
                  <Button
                    variant="outline"
                    className={`h-12 ${isDarkMode ? "bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600" : "bg-transparent"}`}
                    onClick={() => {
                      navigator.geolocation.getCurrentPosition(
                        (position) => {
                          showNotification("success", "Location Found", "Found your current location", [
                            `Latitude: ${position.coords.latitude.toFixed(4)}`,
                            `Longitude: ${position.coords.longitude.toFixed(4)}`,
                            "Searching for nearby chargers...",
                          ])
                        },
                        () =>
                          showNotification("error", "Location Access Denied", "Unable to access your location", [
                            "Please enable location services",
                            "You can manually enter your location",
                            "Check browser permissions",
                          ]),
                      )
                    }}
                  >
                    <Compass className="w-5 h-5 mr-2" />
                    Near Me
                  </Button>
                </div>

                {/* Advanced Filters */}
                <div className="flex flex-wrap gap-3 mb-4">
                  <Select
                    value={mapFilters.chargerType}
                    onValueChange={(value) => setMapFilters({ ...mapFilters, chargerType: value })}
                  >
                    <SelectTrigger
                      className={`w-auto min-w-[140px] ${isDarkMode ? "bg-gray-700 border-gray-600 text-white" : ""}`}
                    >
                      <Filter className="w-4 h-4 mr-2" />
                      <SelectValue placeholder="Charger Type" />
                    </SelectTrigger>
                    <SelectContent className={isDarkMode ? "bg-gray-800 border-gray-600" : ""}>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="AC">AC Charging</SelectItem>
                      <SelectItem value="DC">DC Fast</SelectItem>
                      <SelectItem value="Fast">Ultra Fast</SelectItem>
                      <SelectItem value="Slow">Slow Charging</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select
                    value={mapFilters.provider}
                    onValueChange={(value) => setMapFilters({ ...mapFilters, provider: value })}
                  >
                    <SelectTrigger
                      className={`w-auto min-w-[140px] ${isDarkMode ? "bg-gray-700 border-gray-600 text-white" : ""}`}
                    >
                      <SelectValue placeholder="Provider" />
                    </SelectTrigger>
                    <SelectContent className={isDarkMode ? "bg-gray-800 border-gray-600" : ""}>
                      <SelectItem value="all">All Providers</SelectItem>
                      <SelectItem value="Tata Power">Tata Power</SelectItem>
                      <SelectItem value="Shell Recharge">Shell Recharge</SelectItem>
                      <SelectItem value="Ather Grid">Ather Grid</SelectItem>
                      <SelectItem value="ChargeGrid">ChargeGrid</SelectItem>
                      <SelectItem value="BPCL">BPCL</SelectItem>
                      <SelectItem value="IOCL">IOCL</SelectItem>
                      <SelectItem value="Private">Private</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select
                    value={mapFilters.availability}
                    onValueChange={(value) => setMapFilters({ ...mapFilters, availability: value })}
                  >
                    <SelectTrigger
                      className={`w-auto min-w-[140px] ${isDarkMode ? "bg-gray-700 border-gray-600 text-white" : ""}`}
                    >
                      <SelectValue placeholder="Availability" />
                    </SelectTrigger>
                    <SelectContent className={isDarkMode ? "bg-gray-800 border-gray-600" : ""}>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="Available">Available Now</SelectItem>
                      <SelectItem value="Busy">Busy</SelectItem>
                      <SelectItem value="Scheduled">Scheduled</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select
                    value={mapFilters.distance}
                    onValueChange={(value) => setMapFilters({ ...mapFilters, distance: value })}
                  >
                    <SelectTrigger
                      className={`w-auto min-w-[140px] ${isDarkMode ? "bg-gray-700 border-gray-600 text-white" : ""}`}
                    >
                      <SelectValue placeholder="Distance" />
                    </SelectTrigger>
                    <SelectContent className={isDarkMode ? "bg-gray-800 border-gray-600" : ""}>
                      <SelectItem value="all">Any Distance</SelectItem>
                      <SelectItem value="2">Within 2 km</SelectItem>
                      <SelectItem value="5">Within 5 km</SelectItem>
                      <SelectItem value="10">Within 10 km</SelectItem>
                      <SelectItem value="25">Within 25 km</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select
                    value={mapFilters.amenities}
                    onValueChange={(value) => setMapFilters({ ...mapFilters, amenities: value })}
                  >
                    <SelectTrigger
                      className={`w-auto min-w-[140px] ${isDarkMode ? "bg-gray-700 border-gray-600 text-white" : ""}`}
                    >
                      <SelectValue placeholder="Amenities" />
                    </SelectTrigger>
                    <SelectContent className={isDarkMode ? "bg-gray-800 border-gray-600" : ""}>
                      <SelectItem value="all">All Amenities</SelectItem>
                      <SelectItem value="Cafe">Cafe/Restaurant</SelectItem>
                      <SelectItem value="Restroom">Restroom</SelectItem>
                      <SelectItem value="WiFi">WiFi</SelectItem>
                      <SelectItem value="Shopping">Shopping</SelectItem>
                      <SelectItem value="ATM">ATM</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* View Toggle */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Button
                      variant={mapView === "map" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setMapView("map")}
                      className={
                        mapView === "map"
                          ? "bg-gradient-to-r from-blue-500 to-cyan-500 text-white"
                          : isDarkMode
                            ? "bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600"
                            : ""
                      }
                    >
                      <MapPin className="w-4 h-4 mr-1" />
                      Map View
                    </Button>
                    <Button
                      variant={mapView === "list" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setMapView("list")}
                      className={
                        mapView === "list"
                          ? "bg-gradient-to-r from-green-500 to-emerald-500 text-white"
                          : isDarkMode
                            ? "bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600"
                            : ""
                      }
                    >
                      <Layers className="w-4 h-4 mr-1" />
                      List View
                    </Button>
                    <Button
                      variant={mapView === "route" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setMapView("route")}
                      className={
                        mapView === "route"
                          ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white"
                          : isDarkMode
                            ? "bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600"
                            : ""
                      }
                    >
                      <Route className="w-4 h-4 mr-1" />
                      Route Planner
                    </Button>
                  </div>
                  <div className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                    {filteredStations.length} stations found
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Route Planning Panel */}
            {showRoutePanel && (
              <Card
                className={`${isDarkMode ? "bg-gray-800 border-purple-500/30" : "bg-white border-purple-200"} border-2`}
              >
                <CardHeader>
                  <CardTitle
                    className={`flex items-center justify-between ${isDarkMode ? "text-white" : "text-gray-900"}`}
                  >
                    <div className="flex items-center space-x-2">
                      <Route className="w-5 h-5 text-purple-500" />
                      <span>Route Planner</span>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowRoutePanel(false)}
                      className={isDarkMode ? "text-gray-400 hover:text-white" : ""}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label className={isDarkMode ? "text-gray-300" : ""}>Starting Point</Label>
                      <Input
                        placeholder="Enter starting location"
                        value={routeStartPoint}
                        onChange={(e) => setRouteStartPoint(e.target.value)}
                        className={`mt-1 ${isDarkMode ? "bg-gray-700 border-gray-600 text-white" : ""}`}
                      />
                    </div>
                    <div>
                      <Label className={isDarkMode ? "text-gray-300" : ""}>Destination</Label>
                      <Input
                        placeholder="Enter destination"
                        value={routeEndPoint}
                        onChange={(e) => setRouteEndPoint(e.target.value)}
                        className={`mt-1 ${isDarkMode ? "bg-gray-700 border-gray-600 text-white" : ""}`}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label className={isDarkMode ? "text-gray-300" : ""}>Vehicle Range (km)</Label>
                      <div className="flex items-center space-x-2 mt-1">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setVehicleRange(Math.max(100, vehicleRange - 50))}
                          className={isDarkMode ? "bg-gray-700 border-gray-600 text-gray-300" : ""}
                        >
                          <Minus className="w-4 h-4" />
                        </Button>
                        <Input
                          type="number"
                          value={vehicleRange}
                          onChange={(e) => setVehicleRange(Number(e.target.value))}
                          className={`text-center ${isDarkMode ? "bg-gray-700 border-gray-600 text-white" : ""}`}
                        />
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setVehicleRange(vehicleRange + 50)}
                          className={isDarkMode ? "bg-gray-700 border-gray-600 text-gray-300" : ""}
                        >
                          <Plus className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    <div>
                      <Label className={isDarkMode ? "text-gray-300" : ""}>Current Charge (%)</Label>
                      <div className="flex items-center space-x-2 mt-1">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setCurrentCharge(Math.max(0, currentCharge - 10))}
                          className={isDarkMode ? "bg-gray-700 border-gray-600 text-gray-300" : ""}
                        >
                          <Minus className="w-4 h-4" />
                        </Button>
                        <Input
                          type="number"
                          value={currentCharge}
                          onChange={(e) => setCurrentCharge(Number(e.target.value))}
                          className={`text-center ${isDarkMode ? "bg-gray-700 border-gray-600 text-white" : ""}`}
                        />
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setCurrentCharge(Math.min(100, currentCharge + 10))}
                          className={isDarkMode ? "bg-gray-700 border-gray-600 text-gray-300" : ""}
                        >
                          <Plus className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    <div>
                      <Label className={isDarkMode ? "text-gray-300" : ""}>Preferred Charger Type</Label>
                      <Select value={preferredChargerType} onValueChange={setPreferredChargerType}>
                        <SelectTrigger className={`mt-1 ${isDarkMode ? "bg-gray-700 border-gray-600 text-white" : ""}`}>
                          <SelectValue placeholder="Any" />
                        </SelectTrigger>
                        <SelectContent className={isDarkMode ? "bg-gray-800 border-gray-600" : ""}>
                          <SelectItem value="any">Any</SelectItem>
                          <SelectItem value="fast">Fast Charging Only</SelectItem>
                          <SelectItem value="dc">DC Fast</SelectItem>
                          <SelectItem value="ac">AC Charging</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <Button
                    className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
                    onClick={handlePlanRoute}
                  >
                    <Route className="w-4 h-4 mr-2" />
                    Plan Optimal Route
                  </Button>
                </CardContent>
              </Card>
            )}

            {/* Map and Charger List */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Enhanced Map Section */}
              <div className="lg:col-span-2">
                <Card className={`h-[700px] overflow-hidden ${isDarkMode ? "bg-gray-800 border-gray-700" : ""}`}>
                  <CardContent className="p-0 h-full relative">
                    {/* Enhanced Map Image with Dark Mode */}
                    <div
                      className={`w-full h-full rounded-lg relative overflow-hidden ${isDarkMode ? "bg-gradient-to-br from-gray-800 to-gray-900" : "bg-gradient-to-br from-blue-100 to-cyan-100"}`}
                    >
                      <Image
                        src={isDarkMode ? "/images/ev-map-dark.png" : "/images/ev-map-light.png"}
                        alt="EV Charging Stations Map"
                        width={800}
                        height={700}
                        className="w-full h-full object-cover"
                      />

                      {/* Map Overlays */}
                      <div className="absolute inset-0">
                        {/* Charging Station Pins */}
                        <div className="absolute top-1/4 left-1/3 transform -translate-x-1/2 -translate-y-1/2">
                          <Button
                            className="w-8 h-8 bg-green-500 hover:bg-green-600 rounded-full p-0 shadow-lg hover:scale-110 transition-transform"
                            onClick={() => setSelectedCharger("tata-power-mg-road")}
                          >
                            <Zap className="w-4 h-4 text-white" />
                          </Button>
                          <div
                            className={`absolute top-10 left-1/2 transform -translate-x-1/2 px-2 py-1 rounded shadow-lg text-xs whitespace-nowrap ${isDarkMode ? "bg-gray-800 text-white border border-gray-600" : "bg-white"}`}
                          >
                            Tata Power - Available
                          </div>
                        </div>

                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                          <Button
                            className="w-8 h-8 bg-red-500 hover:bg-red-600 rounded-full p-0 shadow-lg hover:scale-110 transition-transform"
                            onClick={() => setSelectedCharger("shell-koramangala")}
                          >
                            <Zap className="w-4 h-4 text-white" />
                          </Button>
                          <div
                            className={`absolute top-10 left-1/2 transform -translate-x-1/2 px-2 py-1 rounded shadow-lg text-xs whitespace-nowrap ${isDarkMode ? "bg-gray-800 text-white border border-gray-600" : "bg-white"}`}
                          >
                            Shell - Busy
                          </div>
                        </div>

                        <div className="absolute top-1/3 right-1/4 transform translate-x-1/2 -translate-y-1/2">
                          <Button
                            className="w-8 h-8 bg-blue-500 hover:bg-blue-600 rounded-full p-0 shadow-lg hover:scale-110 transition-transform"
                            onClick={() => setSelectedCharger("ather-grid-indiranagar")}
                          >
                            <Zap className="w-4 h-4 text-white" />
                          </Button>
                          <div
                            className={`absolute top-10 left-1/2 transform -translate-x-1/2 px-2 py-1 rounded shadow-lg text-xs whitespace-nowrap ${isDarkMode ? "bg-gray-800 text-white border border-gray-600" : "bg-white"}`}
                          >
                            Ather Grid - Available
                          </div>
                        </div>

                        {/* Current Location */}
                        <div className="absolute bottom-1/3 left-1/2 transform -translate-x-1/2 translate-y-1/2">
                          <div className="w-4 h-4 bg-blue-600 rounded-full shadow-lg animate-pulse"></div>
                          <div
                            className={`absolute top-6 left-1/2 transform -translate-x-1/2 px-2 py-1 rounded shadow-lg text-xs whitespace-nowrap ${isDarkMode ? "bg-blue-600 text-white" : "bg-blue-600 text-white"}`}
                          >
                            Your Location
                          </div>
                        </div>
                      </div>

                      {/* Map Controls */}
                      <div className="absolute top-4 right-4 flex flex-col space-y-2">
                        <Button
                          size="sm"
                          variant="secondary"
                          className={`w-10 h-10 p-0 ${isDarkMode ? "bg-gray-700 hover:bg-gray-600 text-white" : ""}`}
                          onClick={() => showNotification("info", "Map Settings", "Opening map configuration options")}
                        >
                          <Settings className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="secondary"
                          className={`w-10 h-10 p-0 ${isDarkMode ? "bg-gray-700 hover:bg-gray-600 text-white" : ""}`}
                          onClick={() =>
                            showNotification("info", "Map Layers", "Switching between satellite and street view")
                          }
                        >
                          <Layers className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="secondary"
                          className={`w-10 h-10 p-0 ${isDarkMode ? "bg-gray-700 hover:bg-gray-600 text-white" : ""}`}
                          onClick={() =>
                            showNotification("info", "Centering Map", "Centering map on your current location")
                          }
                        >
                          <Navigation className="w-4 h-4" />
                        </Button>
                      </div>

                      {/* Map Legend */}
                      <div
                        className={`absolute bottom-4 left-4 p-3 rounded-lg shadow-lg ${isDarkMode ? "bg-gray-800/90 border border-gray-600" : "bg-white/90"} backdrop-blur-sm`}
                      >
                        <h4 className={`text-sm font-semibold mb-2 ${isDarkMode ? "text-white" : ""}`}>
                          Station Status
                        </h4>
                        <div className="space-y-1">
                          <div className="flex items-center space-x-2 text-xs">
                            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                            <span className={isDarkMode ? "text-gray-300" : ""}>
                              Available (
                              {
                                filteredStations.filter((s) =>
                                  s.chargerTypes.some((c) => c.availability === "Available"),
                                ).length
                              }
                              )
                            </span>
                          </div>
                          <div className="flex items-center space-x-2 text-xs">
                            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                            <span className={isDarkMode ? "text-gray-300" : ""}>
                              Busy (
                              {
                                filteredStations.filter((s) => s.chargerTypes.some((c) => c.availability === "Busy"))
                                  .length
                              }
                              )
                            </span>
                          </div>
                          <div className="flex items-center space-x-2 text-xs">
                            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                            <span className={isDarkMode ? "text-gray-300" : ""}>
                              Scheduled (
                              {
                                filteredStations.filter((s) =>
                                  s.chargerTypes.some((c) => c.availability === "Scheduled"),
                                ).length
                              }
                              )
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Quick Stats */}
                <div className="grid grid-cols-3 gap-4 mt-4">
                  <Card className={`p-4 text-center ${isDarkMode ? "bg-gray-800 border-gray-700" : ""}`}>
                    <div className="text-2xl font-bold text-green-500">
                      {
                        filteredStations.filter((s) => s.chargerTypes.some((c) => c.availability === "Available"))
                          .length
                      }
                    </div>
                    <div className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>Available Now</div>
                  </Card>
                  <Card className={`p-4 text-center ${isDarkMode ? "bg-gray-800 border-gray-700" : ""}`}>
                    <div className="text-2xl font-bold text-blue-500">
                      {filteredStations.reduce((acc, s) => acc + s.chargerTypes.length, 0)}
                    </div>
                    <div className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>Total Chargers</div>
                  </Card>
                  <Card className={`p-4 text-center ${isDarkMode ? "bg-gray-800 border-gray-700" : ""}`}>
                    <div className="text-2xl font-bold text-purple-500">2.3 km</div>
                    <div className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>Nearest Station</div>
                  </Card>
                </div>
              </div>

              {/* Enhanced Charger List */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className={`text-xl font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                    Nearby Chargers
                  </h3>
                  <div className="flex space-x-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className={isDarkMode ? "bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600" : ""}
                      onClick={() =>
                        showNotification("info", "Exporting Data", "Preparing station data for download", [
                          "CSV format with all details",
                          "Real-time availability included",
                          "Download will start shortly",
                        ])
                      }
                    >
                      <Download className="w-4 h-4 mr-1" />
                      Export
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className={isDarkMode ? "bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600" : ""}
                      onClick={() =>
                        showNotification(
                          "info",
                          "Saved Stations",
                          `You have ${savedStations.length} saved stations`,
                          savedStations.length > 0
                            ? ["Access from your profile", "Get availability notifications", "Quick booking access"]
                            : [
                                "Save stations by clicking the bookmark icon",
                                "Access saved stations anytime",
                                "Get personalized recommendations",
                              ],
                        )
                      }
                    >
                      <Bookmark className="w-4 h-4 mr-1" />
                      Saved ({savedStations.length})
                    </Button>
                  </div>
                </div>

                <div className="max-h-[600px] overflow-y-auto space-y-4">
                  {filteredStations.map((station) => (
                    <Card
                      key={station.id}
                      className={`cursor-pointer transition-all duration-300 hover:shadow-lg ${
                        selectedCharger === station.id
                          ? isDarkMode
                            ? "ring-2 ring-blue-500 bg-gray-700"
                            : "ring-2 ring-blue-500 bg-blue-50"
                          : isDarkMode
                            ? "bg-gray-800 border-gray-700 hover:bg-gray-700"
                            : "hover:bg-gray-50"
                      }`}
                      onClick={() => setSelectedCharger(station.id)}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-1">
                              <h4 className={`font-bold text-lg ${isDarkMode ? "text-white" : ""}`}>{station.name}</h4>
                              {station.isVerified && <CheckCircle className="w-4 h-4 text-green-500" />}
                              <Button
                                variant="ghost"
                                size="sm"
                                className="p-1"
                                onClick={(e) => {
                                  e.stopPropagation()
                                  handleSaveStation(station.id)
                                }}
                              >
                                <Bookmark
                                  className={`w-4 h-4 ${
                                    savedStations.includes(station.id)
                                      ? "text-yellow-500 fill-current"
                                      : isDarkMode
                                        ? "text-gray-400"
                                        : "text-gray-500"
                                  }`}
                                />
                              </Button>
                            </div>
                            <div className="flex items-center space-x-2 mb-2">
                              <Badge className={`${getProviderColor(station.provider)} text-white text-xs`}>
                                {station.provider}
                              </Badge>
                              <div className="flex items-center space-x-1">
                                <Star className="w-4 h-4 text-yellow-500 fill-current" />
                                <span className={`text-sm font-medium ${isDarkMode ? "text-gray-300" : ""}`}>
                                  {station.rating}
                                </span>
                                <span className={`text-xs ${isDarkMode ? "text-gray-500" : "text-gray-500"}`}>
                                  ({station.reviews})
                                </span>
                              </div>
                            </div>
                            <div className={`text-sm mb-2 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                              <MapPin className="w-3 h-3 inline mr-1" />
                              {station.location.address}
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-sm font-semibold text-blue-500">{station.distance} km</div>
                            <div className={`text-xs ${isDarkMode ? "text-gray-500" : "text-gray-500"}`}>
                              {station.estimatedArrival}
                            </div>
                            <div className={`text-xs ${isDarkMode ? "text-gray-600" : "text-gray-400"}`}>
                              {station.lastUpdated}
                            </div>
                          </div>
                        </div>

                        {/* Charger Types */}
                        <div className="space-y-2 mb-4">
                          {station.chargerTypes.map((charger, index) => (
                            <div
                              key={index}
                              className={`flex items-center justify-between text-sm p-2 rounded ${isDarkMode ? "bg-gray-700" : "bg-gray-50"}`}
                            >
                              <div className="flex items-center space-x-2">
                                <Zap className="w-4 h-4 text-blue-500" />
                                <span className={`font-medium ${isDarkMode ? "text-white" : ""}`}>
                                  {charger.type} - {charger.plugType}
                                </span>
                                <span className={isDarkMode ? "text-gray-400" : "text-gray-500"}>
                                  ({charger.power}kW)
                                </span>
                                <Badge variant="outline" className="text-xs">
                                  {charger.count} ports
                                </Badge>
                              </div>
                              <div className="flex items-center space-x-2">
                                <div
                                  className={`w-2 h-2 rounded-full ${
                                    charger.availability === "Available"
                                      ? "bg-green-500"
                                      : charger.availability === "Busy"
                                        ? "bg-red-500"
                                        : "bg-yellow-500"
                                  }`}
                                ></div>
                                <span className={`text-xs font-medium ${isDarkMode ? "text-gray-300" : ""}`}>
                                  {charger.availability}
                                </span>
                                <span className={`text-xs ${isDarkMode ? "text-gray-500" : "text-gray-500"}`}>
                                  ₹{charger.pricePerUnit}/kWh
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* Amenities */}
                        <div className="flex flex-wrap gap-1 mb-4">
                          {station.amenities.slice(0, 4).map((amenity, index) => (
                            <Badge
                              key={index}
                              variant="secondary"
                              className={`text-xs ${isDarkMode ? "bg-gray-600 text-gray-300" : ""}`}
                            >
                              {amenity}
                            </Badge>
                          ))}
                          {station.amenities.length > 4 && (
                            <Badge
                              variant="secondary"
                              className={`text-xs ${isDarkMode ? "bg-gray-600 text-gray-300" : ""}`}
                            >
                              +{station.amenities.length - 4} more
                            </Badge>
                          )}
                        </div>

                        {/* Operating Hours & Contact */}
                        <div
                          className={`flex items-center justify-between text-xs mb-3 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}
                        >
                          <div className="flex items-center space-x-1">
                            <Clock className="w-3 h-3" />
                            <span>{station.operatingHours}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Phone className="w-3 h-3" />
                            <span>{station.contactNumber}</span>
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex space-x-2">
                          {station.isBookable && (
                            <Button
                              size="sm"
                              className="flex-1 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white"
                              onClick={(e) => {
                                e.stopPropagation()
                                handleBookSlot(station.id)
                              }}
                              disabled={bookingSlot === station.id}
                            >
                              {bookingSlot === station.id ? (
                                <RefreshCw className="w-4 h-4 mr-1 animate-spin" />
                              ) : (
                                <Calendar className="w-4 h-4 mr-1" />
                              )}
                              {bookingSlot === station.id ? "Booking..." : "Book Slot"}
                            </Button>
                          )}
                          <Button
                            size="sm"
                            variant="outline"
                            className={`flex-1 ${isDarkMode ? "bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600" : "bg-transparent"}`}
                            onClick={(e) => {
                              e.stopPropagation()
                              handleNavigateToStation(station.id)
                            }}
                          >
                            <Navigation className="w-4 h-4 mr-1" />
                            Navigate
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className={
                              isDarkMode
                                ? "bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600"
                                : "bg-transparent"
                            }
                            onClick={(e) => {
                              e.stopPropagation()
                              showNotification("info", "Calling Station", `Calling ${station.name}`, [
                                `Phone: ${station.contactNumber}`,
                                "Station hours: " + station.operatingHours,
                                "Ask about availability and booking",
                              ])
                            }}
                          >
                            <Phone className="w-4 h-4" />
                          </Button>
                        </div>

                        {/* Rental Option */}
                        {station.isRentable && (
                          <div
                            className={`mt-3 p-3 rounded-lg border ${isDarkMode ? "bg-green-900/20 border-green-500/30" : "bg-green-50 border-green-200"}`}
                          >
                            <div className="flex items-center justify-between">
                              <div>
                                <div
                                  className={`text-sm font-medium ${isDarkMode ? "text-green-400" : "text-green-800"}`}
                                >
                                  Available for Rent
                                </div>
                                <div className={`text-xs ${isDarkMode ? "text-green-500" : "text-green-600"}`}>
                                  ₹{station.rentalRate}/hour • {station.rentalConditions?.join(", ")}
                                </div>
                              </div>
                              <Button
                                size="sm"
                                variant="outline"
                                className={`${isDarkMode ? "text-green-400 border-green-500/50 bg-transparent hover:bg-green-500/10" : "text-green-700 border-green-300 bg-transparent"}`}
                                onClick={(e) => {
                                  e.stopPropagation()
                                  showNotification(
                                    "success",
                                    "Charger Rental",
                                    `Renting charger at ${station.name}`,
                                    [
                                      `Rate: ₹${station.rentalRate}/hour`,
                                      "Conditions: " + station.rentalConditions?.join(", "),
                                      "Contact owner for booking",
                                    ],
                                    { label: "Contact Owner", action: () => console.log("Contacting owner") },
                                  )
                                }}
                              >
                                Rent Out
                              </Button>
                            </div>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Add Your Charger CTA */}
                <Card
                  className={`border-2 border-dashed ${isDarkMode ? "bg-gradient-to-r from-green-900/20 to-blue-900/20 border-green-500/30" : "bg-gradient-to-r from-green-50 to-blue-50 border-green-300"}`}
                >
                  <CardContent className="p-6 text-center">
                    <Zap className="w-12 h-12 text-green-500 mx-auto mb-4" />
                    <h4 className={`text-lg font-bold mb-2 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                      Own a Charger?
                    </h4>
                    <p className={`mb-4 ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
                      List your charger for rent and earn extra income
                    </p>
                    <div className="flex space-x-2">
                      <Button
                        className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white flex-1"
                        onClick={() =>
                          showNotification(
                            "info",
                            "List Your Charger",
                            "Opening charger listing form",
                            [
                              "Earn ₹500-2000/month",
                              "Full insurance coverage",
                              "24/7 support included",
                              "Easy setup process",
                            ],
                            { label: "Get Started", action: () => console.log("Opening listing form") },
                          )
                        }
                      >
                        <Upload className="w-4 h-4 mr-2" />
                        List Your Charger
                      </Button>
                      <Button
                        variant="outline"
                        className={
                          isDarkMode ? "bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600" : "bg-transparent"
                        }
                        onClick={() =>
                          showNotification("info", "Help Center", "Opening help and support", [
                            "Frequently asked questions",
                            "Setup guides and tutorials",
                            "Contact support team",
                            "Community forums",
                          ])
                        }
                      >
                        <Info className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        )}

        {/* Enhanced VoltCompare Section */}
        {activeSection === "compare" && (
          <div className="space-y-8">
            {/* Hero Section */}
            <div className="text-center">
              <div className="inline-flex items-center space-x-2 bg-purple-500/20 text-purple-400 px-4 py-2 rounded-full text-sm font-medium mb-4 border border-purple-500/30">
                <Car className="w-4 h-4" />
                <span>VoltCompare - EV Comparison & Cost Analysis Tools</span>
              </div>
              <h1 className={`text-4xl font-bold mb-4 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                Compare EVs & <span className="text-purple-400">Calculate Real Savings</span>
              </h1>
              <p className={`text-xl max-w-3xl mx-auto ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
                Intelligent comparison platform for all types of electric vehicles with comprehensive cost analysis,
                real-world data, and detailed specifications.
              </p>
            </div>

            <Tabs defaultValue="side-by-side" className="w-full">
              <TabsList className={`grid w-full grid-cols-3 mb-8 ${isDarkMode ? "bg-gray-800 border-gray-700" : ""}`}>
                <TabsTrigger
                  value="side-by-side"
                  className={`flex items-center space-x-2 ${isDarkMode ? "data-[state=active]:bg-purple-600 data-[state=active]:text-white" : ""}`}
                >
                  <Car className="w-4 h-4" />
                  <span>Side-by-Side Compare</span>
                </TabsTrigger>
                <TabsTrigger
                  value="ev-vs-ice"
                  className={`flex items-center space-x-2 ${isDarkMode ? "data-[state=active]:bg-orange-600 data-[state=active]:text-white" : ""}`}
                >
                  <TrendingDown className="w-4 h-4" />
                  <span>EV vs ICE Analysis</span>
                </TabsTrigger>
                <TabsTrigger
                  value="calculator"
                  className={`flex items-center space-x-2 ${isDarkMode ? "data-[state=active]:bg-green-600 data-[state=active]:text-white" : ""}`}
                >
                  <Calculator className="w-4 h-4" />
                  <span>Cost Calculator</span>
                </TabsTrigger>
              </TabsList>

              {/* Enhanced Side-by-Side Comparison */}
              <TabsContent value="side-by-side" className="space-y-8">
                {/* Category and Enhanced Filters */}
                <Card className={isDarkMode ? "bg-gray-800 border-gray-700" : ""}>
                  <CardContent className="p-6">
                    <div className="flex flex-wrap items-center gap-4 mb-6">
                      <div className="flex items-center space-x-2">
                        <Label className={`font-semibold ${isDarkMode ? "text-gray-300" : ""}`}>Category:</Label>
                        <div className="flex space-x-1">
                          {["Cars", "Bikes", "Trucks"].map((category) => (
                            <Button
                              key={category}
                              variant={compareCategory === category ? "default" : "outline"}
                              size="sm"
                              onClick={() => setCompareCategory(category as any)}
                              className={`flex items-center space-x-1 ${
                                compareCategory === category
                                  ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white"
                                  : isDarkMode
                                    ? "bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600"
                                    : ""
                              }`}
                            >
                              {category === "Cars" && <Car className="w-4 h-4" />}
                              {category === "Bikes" && <Bike className="w-4 h-4" />}
                              {category === "Trucks" && <Truck className="w-4 h-4" />}
                              <span>{category}</span>
                            </Button>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                      <Select
                        value={compareFilters.budget}
                        onValueChange={(value) => setCompareFilters({ ...compareFilters, budget: value })}
                      >
                        <SelectTrigger className={isDarkMode ? "bg-gray-700 border-gray-600 text-white" : ""}>
                          <SelectValue placeholder="Budget Range" />
                        </SelectTrigger>
                        <SelectContent className={isDarkMode ? "bg-gray-800 border-gray-600" : ""}>
                          <SelectItem value="all">All Budgets</SelectItem>
                          {compareCategory === "Cars" && (
                            <>
                              <SelectItem value="0-15">Under ₹15 Lakh</SelectItem>
                              <SelectItem value="15-30">₹15-30 Lakh</SelectItem>
                              <SelectItem value="30-50">₹30-50 Lakh</SelectItem>
                              <SelectItem value="50">Above ₹50 Lakh</SelectItem>
                            </>
                          )}
                          {compareCategory === "Bikes" && (
                            <>
                              <SelectItem value="0-1">Under ₹1 Lakh</SelectItem>
                              <SelectItem value="1-2">₹1-2 Lakh</SelectItem>
                              <SelectItem value="2">Above ₹2 Lakh</SelectItem>
                            </>
                          )}
                          {compareCategory === "Trucks" && (
                            <>
                              <SelectItem value="0-10">Under ₹10 Lakh</SelectItem>
                              <SelectItem value="10-20">₹10-20 Lakh</SelectItem>
                              <SelectItem value="20">Above ₹20 Lakh</SelectItem>
                            </>
                          )}
                        </SelectContent>
                      </Select>

                      <Select
                        value={compareFilters.brand}
                        onValueChange={(value) => setCompareFilters({ ...compareFilters, brand: value })}
                      >
                        <SelectTrigger className={isDarkMode ? "bg-gray-700 border-gray-600 text-white" : ""}>
                          <SelectValue placeholder="Brand" />
                        </SelectTrigger>
                        <SelectContent className={isDarkMode ? "bg-gray-800 border-gray-600" : ""}>
                          <SelectItem value="all">All Brands</SelectItem>
                          <SelectItem value="Tata">Tata</SelectItem>
                          <SelectItem value="MG">MG</SelectItem>
                          <SelectItem value="BYD">BYD</SelectItem>
                          <SelectItem value="Hyundai">Hyundai</SelectItem>
                          <SelectItem value="Mahindra">Mahindra</SelectItem>
                          <SelectItem value="Ola">Ola</SelectItem>
                          <SelectItem value="Ather">Ather</SelectItem>
                        </SelectContent>
                      </Select>

                      <Select
                        value={compareFilters.range}
                        onValueChange={(value) => setCompareFilters({ ...compareFilters, range: value })}
                      >
                        <SelectTrigger className={isDarkMode ? "bg-gray-700 border-gray-600 text-white" : ""}>
                          <SelectValue placeholder="Range" />
                        </SelectTrigger>
                        <SelectContent className={isDarkMode ? "bg-gray-800 border-gray-600" : ""}>
                          <SelectItem value="all">All Ranges</SelectItem>
                          <SelectItem value="0-200">Under 200 km</SelectItem>
                          <SelectItem value="200-400">200-400 km</SelectItem>
                          <SelectItem value="400-600">400-600 km</SelectItem>
                          <SelectItem value="600">Above 600 km</SelectItem>
                        </SelectContent>
                      </Select>

                      <Select
                        value={compareFilters.availability}
                        onValueChange={(value) => setCompareFilters({ ...compareFilters, availability: value })}
                      >
                        <SelectTrigger className={isDarkMode ? "bg-gray-700 border-gray-600 text-white" : ""}>
                          <SelectValue placeholder="Availability" />
                        </SelectTrigger>
                        <SelectContent className={isDarkMode ? "bg-gray-800 border-gray-600" : ""}>
                          <SelectItem value="all">All Status</SelectItem>
                          <SelectItem value="Available">Available Now</SelectItem>
                          <SelectItem value="Coming Soon">Coming Soon</SelectItem>
                          <SelectItem value="Discontinued">Discontinued</SelectItem>
                        </SelectContent>
                      </Select>

                      <Button
                        onClick={() =>
                          setCompareFilters({
                            budget: "all",
                            bodyType: "all",
                            brand: "all",
                            range: "all",
                            availability: "all",
                          })
                        }
                        variant="outline"
                        className={isDarkMode ? "bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600" : ""}
                      >
                        Clear Filters
                      </Button>
                    </div>

                    <div className="mt-4 flex items-center justify-between">
                      <div className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                        {filteredEVs.length} vehicles found
                      </div>
                      <div className="text-sm text-purple-400 font-medium">
                        Compare up to 4 vehicles ({selectedEVs.length}/4)
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Enhanced Available EVs Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {filteredEVs.map((ev) => (
                    <Card
                      key={ev.id}
                      className={`hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-2 hover:border-purple-400 group ${isDarkMode ? "bg-gray-800 border-gray-700" : ""}`}
                    >
                      <div className="relative">
                        <Image
                          src={`/images/${ev.id.replace(/-/g, "-")}.png`}
                          alt={`${ev.brand} ${ev.name}`}
                          width={400}
                          height={250}
                          className="w-full h-48 object-cover rounded-t-lg"
                        />
                        <div
                          className={`absolute top-3 left-3 px-2 py-1 rounded-full text-xs font-medium ${isDarkMode ? "bg-gray-800/90 text-white" : "bg-white/90"} backdrop-blur-sm`}
                        >
                          {getVehicleTypeIcon(ev.type)} {ev.type}
                        </div>
                        <div className="absolute top-3 right-3 bg-purple-600 text-white px-2 py-1 rounded-full text-xs font-medium">
                          {ev.brand}
                        </div>
                        <div className="absolute bottom-3 left-3">
                          <Badge
                            className={`text-xs ${ev.availability === "Available" ? "bg-green-500" : ev.availability === "Coming Soon" ? "bg-yellow-500" : "bg-gray-500"}`}
                          >
                            {ev.availability}
                          </Badge>
                        </div>

                        {/* Action Buttons Overlay */}
                        <div className="absolute top-3 right-12 opacity-0 group-hover:opacity-100 transition-opacity flex space-x-1">
                          <Button
                            size="sm"
                            variant="secondary"
                            className={`w-8 h-8 p-0 ${isDarkMode ? "bg-gray-700 hover:bg-gray-600 text-white" : ""}`}
                            onClick={(e) => {
                              e.stopPropagation()
                              setSelectedEVDetails(ev.id)
                              showNotification(
                                "info",
                                "Vehicle Details",
                                `Viewing detailed specs for ${ev.brand} ${ev.name}`,
                                [
                                  `Price: ₹${ev.price}${ev.type === "Car" ? "L" : "K"}`,
                                  `Range: ${ev.range} km`,
                                  `Battery: ${ev.batteryCapacity} kWh`,
                                  `Top Speed: ${ev.topSpeed} kmph`,
                                ],
                              )
                            }}
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="secondary"
                            className={`w-8 h-8 p-0 ${isDarkMode ? "bg-gray-700 hover:bg-gray-600 text-white" : ""}`}
                            onClick={(e) => {
                              e.stopPropagation()
                              handleToggleFavoriteEV(ev.id)
                            }}
                          >
                            <Heart
                              className={`w-4 h-4 ${favoriteEVs.includes(ev.id) ? "text-red-500 fill-current" : ""}`}
                            />
                          </Button>
                          <Button
                            size="sm"
                            variant="secondary"
                            className={`w-8 h-8 p-0 ${isDarkMode ? "bg-gray-700 hover:bg-gray-600 text-white" : ""}`}
                            onClick={(e) => {
                              e.stopPropagation()
                              handleShareEV(ev.id)
                            }}
                          >
                            <Share2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>

                      <CardContent className="p-4">
                        <div className="mb-4">
                          <h4 className={`text-lg font-bold mb-1 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                            {ev.brand} {ev.name}
                          </h4>
                          <div className="flex items-center justify-between">
                            <span className="text-2xl font-bold text-purple-400">
                              ₹{ev.price}
                              {ev.type === "Car" ? "L" : "K"}
                            </span>
                            <div className="flex items-center space-x-1">
                              <Star className="w-4 h-4 text-yellow-500 fill-current" />
                              <span className={`text-sm font-medium ${isDarkMode ? "text-gray-300" : ""}`}>
                                {ev.rating}
                              </span>
                              <span className={`text-xs ${isDarkMode ? "text-gray-500" : "text-gray-500"}`}>
                                ({ev.reviews})
                              </span>
                            </div>
                          </div>
                          <div className={`text-sm mt-1 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
                            On-road: ₹{ev.onRoadPrice}
                            {ev.type === "Car" ? "L" : "K"}
                          </div>
                        </div>

                        <div className="space-y-2 mb-4">
                          <div className="flex items-center justify-between text-sm">
                            <span className={`flex items-center ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                              <Battery className="w-4 h-4 mr-1 text-green-500" />
                              Range
                            </span>
                            <span className={`font-semibold ${isDarkMode ? "text-white" : ""}`}>{ev.range} km</span>
                          </div>
                          <div className="flex items-center justify-between text-sm">
                            <span className={`flex items-center ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                              <Zap className="w-4 h-4 mr-1 text-blue-500" />
                              Battery
                            </span>
                            <span className={`font-semibold ${isDarkMode ? "text-white" : ""}`}>
                              {ev.batteryCapacity} kWh
                            </span>
                          </div>
                          <div className="flex items-center justify-between text-sm">
                            <span className={`flex items-center ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                              <Timer className="w-4 h-4 mr-1 text-orange-500" />
                              Charging
                            </span>
                            <span className={`font-semibold ${isDarkMode ? "text-white" : ""}`}>{ev.chargingTime}</span>
                          </div>
                          <div className="flex items-center justify-between text-sm">
                            <span className={`flex items-center ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                              <Gauge className="w-4 h-4 mr-1 text-red-500" />
                              Top Speed
                            </span>
                            <span className={`font-semibold ${isDarkMode ? "text-white" : ""}`}>
                              {ev.topSpeed} kmph
                            </span>
                          </div>
                          <div className="flex items-center justify-between text-sm">
                            <span className={`flex items-center ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                              <IndianRupee className="w-4 h-4 mr-1 text-green-500" />
                              Cost/km
                            </span>
                            <span className="font-semibold text-green-500">₹{ev.chargingCostPerKm.toFixed(2)}</span>
                          </div>
                        </div>

                        {/* Key Features */}
                        <div className="mb-4">
                          <div className="flex flex-wrap gap-1">
                            {ev.features.slice(0, 3).map((feature, index) => (
                              <Badge
                                key={index}
                                variant="secondary"
                                className={`text-xs ${isDarkMode ? "bg-gray-600 text-gray-300" : ""}`}
                              >
                                {feature}
                              </Badge>
                            ))}
                            {ev.features.length > 3 && (
                              <Badge
                                variant="secondary"
                                className={`text-xs ${isDarkMode ? "bg-gray-600 text-gray-300" : ""}`}
                              >
                                +{ev.features.length - 3}
                              </Badge>
                            )}
                          </div>
                        </div>

                        <div className="flex space-x-2">
                          <Button
                            onClick={() => addEVToComparison(ev.id)}
                            disabled={selectedEVs.includes(ev.id) || selectedEVs.length >= 4}
                            className={`flex-1 ${
                              selectedEVs.includes(ev.id)
                                ? "bg-gray-500 text-white"
                                : "bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
                            }`}
                          >
                            {selectedEVs.includes(ev.id) ? (
                              <>
                                <CheckCircle className="w-4 h-4 mr-1" />
                                Added
                              </>
                            ) : (
                              "Add to Compare"
                            )}
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className={
                              isDarkMode
                                ? "bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600"
                                : "bg-transparent"
                            }
                            onClick={() => {
                              setSelectedEVDetails(ev.id)
                              showNotification(
                                "info",
                                "Vehicle Details",
                                `Opening detailed view for ${ev.brand} ${ev.name}`,
                                [
                                  `Complete specifications`,
                                  `Performance metrics`,
                                  `Feature comparison`,
                                  `Pricing breakdown`,
                                ],
                              )
                            }}
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Enhanced Comparison Table */}
                {selectedEVData.length > 0 && (
                  <Card
                    className={`border-2 border-purple-400 ${isDarkMode ? "bg-gradient-to-br from-purple-900/20 to-blue-900/20" : "bg-gradient-to-br from-purple-50 to-blue-50"}`}
                  >
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className={`text-2xl flex items-center space-x-2 ${isDarkMode ? "text-white" : ""}`}>
                          <BarChart3 className="w-6 h-6 text-purple-500" />
                          <span>EV Comparison ({selectedEVData.length}/4)</span>
                        </CardTitle>
                        <div className="flex space-x-2">
                          <Button
                            onClick={() => setSelectedEVs([])}
                            variant="outline"
                            size="sm"
                            className={isDarkMode ? "bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600" : ""}
                          >
                            Clear All
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className={isDarkMode ? "bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600" : ""}
                            onClick={() =>
                              showNotification(
                                "info",
                                "Exporting Comparison",
                                "Preparing comparison data for download",
                                [
                                  "PDF format with detailed specs",
                                  "Side-by-side feature comparison",
                                  "Pricing and cost analysis",
                                  "Download will start shortly",
                                ],
                              )
                            }
                          >
                            <Download className="w-4 h-4 mr-1" />
                            Export
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="overflow-x-auto">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 min-w-[800px]">
                          {selectedEVData.map((ev) => (
                            <Card
                              key={ev.id}
                              className={`relative ${isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white"}`}
                            >
                              <Button
                                onClick={() => removeEVFromComparison(ev.id)}
                                variant="ghost"
                                size="sm"
                                className="absolute top-2 right-2 z-10 h-8 w-8 p-0"
                              >
                                <X className="w-4 h-4" />
                              </Button>
                              <div className="p-4">
                                <Image
                                  src={`/images/${ev.id.replace(/-/g, "-")}.png`}
                                  alt={`${ev.brand} ${ev.name}`}
                                  width={300}
                                  height={200}
                                  className="w-full h-32 object-cover rounded-lg mb-4"
                                />
                                <h4 className={`text-lg font-bold text-center mb-4 ${isDarkMode ? "text-white" : ""}`}>
                                  {ev.brand} {ev.name}
                                </h4>

                                <div className="space-y-3">
                                  <div className="flex justify-between items-center">
                                    <span className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                                      Price
                                    </span>
                                    <span className="font-bold text-purple-500">
                                      ₹{ev.price}
                                      {ev.type === "Car" ? "L" : "K"}
                                    </span>
                                  </div>
                                  <div className="flex justify-between items-center">
                                    <span className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                                      On-road Price
                                    </span>
                                    <span className={`font-semibold ${isDarkMode ? "text-white" : ""}`}>
                                      ₹{ev.onRoadPrice}
                                      {ev.type === "Car" ? "L" : "K"}
                                    </span>
                                  </div>
                                  <div className="flex justify-between items-center">
                                    <span className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                                      Range
                                    </span>
                                    <span className={`font-semibold ${isDarkMode ? "text-white" : ""}`}>
                                      {ev.range} km
                                    </span>
                                  </div>
                                  <div className="flex justify-between items-center">
                                    <span className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                                      Battery
                                    </span>
                                    <span className={`font-semibold ${isDarkMode ? "text-white" : ""}`}>
                                      {ev.batteryCapacity} kWh
                                    </span>
                                  </div>
                                  <div className="flex justify-between items-center">
                                    <span className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                                      Charging
                                    </span>
                                    <span className={`font-semibold ${isDarkMode ? "text-white" : ""}`}>
                                      {ev.chargingTime}
                                    </span>
                                  </div>
                                  {ev.fastChargingTime && (
                                    <div className="flex justify-between items-center">
                                      <span className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                                        Fast Charging
                                      </span>
                                      <span className={`font-semibold ${isDarkMode ? "text-white" : ""}`}>
                                        {ev.fastChargingTime}
                                      </span>
                                    </div>
                                  )}
                                  <div className="flex justify-between items-center">
                                    <span className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                                      Top Speed
                                    </span>
                                    <span className={`font-semibold ${isDarkMode ? "text-white" : ""}`}>
                                      {ev.topSpeed} kmph
                                    </span>
                                  </div>
                                  {ev.acceleration && (
                                    <div className="flex justify-between items-center">
                                      <span className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                                        0-100 kmph
                                      </span>
                                      <span className={`font-semibold ${isDarkMode ? "text-white" : ""}`}>
                                        {ev.acceleration}s
                                      </span>
                                    </div>
                                  )}
                                  <div className="flex justify-between items-center">
                                    <span className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                                      Efficiency
                                    </span>
                                    <span className={`font-semibold ${isDarkMode ? "text-white" : ""}`}>
                                      {ev.efficiency} km/kWh
                                    </span>
                                  </div>
                                  <div className="flex justify-between items-center">
                                    <span className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                                      Cost/km
                                    </span>
                                    <span className="font-semibold text-green-500">
                                      ₹{ev.chargingCostPerKm.toFixed(2)}
                                    </span>
                                  </div>
                                  <div className="flex justify-between items-center">
                                    <span className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                                      Annual Maintenance
                                    </span>
                                    <span className={`font-semibold ${isDarkMode ? "text-white" : ""}`}>
                                      ₹{ev.maintenanceCostAnnual.toLocaleString()}
                                    </span>
                                  </div>
                                  <div className="flex justify-between items-center">
                                    <span className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                                      Rating
                                    </span>
                                    <div className="flex items-center space-x-1">
                                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                                      <span className={`font-semibold ${isDarkMode ? "text-white" : ""}`}>
                                        {ev.rating}
                                      </span>
                                    </div>
                                  </div>
                                  <div className="flex justify-between items-center">
                                    <span className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                                      Warranty
                                    </span>
                                    <span className={`font-semibold text-xs ${isDarkMode ? "text-white" : ""}`}>
                                      {ev.warranty}
                                    </span>
                                  </div>
                                </div>

                                <div className="mt-4 pt-4 border-t">
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    className={`w-full ${isDarkMode ? "bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600" : "bg-transparent"}`}
                                    onClick={() => {
                                      setSelectedEVDetails(ev.id)
                                      showNotification(
                                        "info",
                                        "Detailed Specifications",
                                        `Opening comprehensive details for ${ev.brand} ${ev.name}`,
                                        [
                                          `Complete feature list`,
                                          `Performance benchmarks`,
                                          `Safety ratings`,
                                          `Owner reviews and feedback`,
                                        ],
                                      )
                                    }}
                                  >
                                    <Eye className="w-4 h-4 mr-1" />
                                    View Details
                                  </Button>
                                </div>
                              </div>
                            </Card>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>

              {/* Enhanced EV vs ICE Comparison */}
              <TabsContent value="ev-vs-ice" className="space-y-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <Card className={`border-2 border-orange-400 ${isDarkMode ? "bg-gray-800" : ""}`}>
                    <CardHeader className="text-center">
                      <div className="w-16 h-16 bg-orange-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Fuel className="w-8 h-8 text-orange-500" />
                      </div>
                      <CardTitle className={isDarkMode ? "text-white" : ""}>Your ICE Vehicle</CardTitle>
                      <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                        Select your current petrol/diesel vehicle
                      </p>
                    </CardHeader>
                    <CardContent>
                      <Select value={selectedICE} onValueChange={setSelectedICE}>
                        <SelectTrigger className={`h-12 ${isDarkMode ? "bg-gray-700 border-gray-600 text-white" : ""}`}>
                          <SelectValue placeholder="Select your current vehicle" />
                        </SelectTrigger>
                        <SelectContent className={isDarkMode ? "bg-gray-800 border-gray-600" : ""}>
                          {iceVehicles.map((vehicle) => (
                            <SelectItem key={vehicle.id} value={vehicle.id}>
                              <div className="flex items-center space-x-3 py-2">
                                <Image
                                  src={vehicle.image || "/placeholder.svg"}
                                  alt={`${vehicle.brand} ${vehicle.name}`}
                                  width={50}
                                  height={35}
                                  className="rounded"
                                />
                                <div>
                                  <div className={`font-medium ${isDarkMode ? "text-white" : ""}`}>
                                    {vehicle.brand} {vehicle.name}
                                  </div>
                                  <div className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
                                    ₹{vehicle.price}
                                    {vehicle.type === "Car" ? "L" : "K"} • {vehicle.fuelEfficiency} km/l •{" "}
                                    {vehicle.fuelType}
                                  </div>
                                  <div className="flex items-center space-x-2 mt-1">
                                    <Star className="w-3 h-3 text-yellow-500 fill-current" />
                                    <span className="text-xs">{vehicle.rating}</span>
                                    <span className={`text-xs ${isDarkMode ? "text-gray-500" : "text-gray-400"}`}>
                                      ({vehicle.reviews} reviews)
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </CardContent>
                  </Card>

                  <Card className={`border-2 border-blue-400 ${isDarkMode ? "bg-gray-800" : ""}`}>
                    <CardHeader className="text-center">
                      <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Zap className="w-8 h-8 text-blue-500" />
                      </div>
                      <CardTitle className={isDarkMode ? "text-white" : ""}>Electric Vehicle</CardTitle>
                      <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                        Choose an EV to compare against
                      </p>
                    </CardHeader>
                    <CardContent>
                      <Select value={selectedEVForComparison} onValueChange={setSelectedEVForComparison}>
                        <SelectTrigger className={`h-12 ${isDarkMode ? "bg-gray-700 border-gray-600 text-white" : ""}`}>
                          <SelectValue placeholder="Select an EV to compare" />
                        </SelectTrigger>
                        <SelectContent className={isDarkMode ? "bg-gray-800 border-gray-600" : ""}>
                          {evVehicles.map((ev) => (
                            <SelectItem key={ev.id} value={ev.id}>
                              <div className="flex items-center space-x-3 py-2">
                                <Image
                                  src={`/images/${ev.id.replace(/-/g, "-")}.png`}
                                  alt={`${ev.brand} ${ev.name}`}
                                  width={50}
                                  height={35}
                                  className="rounded"
                                />
                                <div>
                                  <div className={`font-medium ${isDarkMode ? "text-white" : ""}`}>
                                    {ev.brand} {ev.name}
                                  </div>
                                  <div className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
                                    ₹{ev.price}
                                    {ev.type === "Car" ? "L" : "K"} • {ev.range} km range • {ev.batteryCapacity} kWh
                                  </div>
                                  <div className="flex items-center space-x-2 mt-1">
                                    <Star className="w-3 h-3 text-yellow-500 fill-current" />
                                    <span className="text-xs">{ev.rating}</span>
                                    <span className={`text-xs ${isDarkMode ? "text-gray-500" : "text-gray-400"}`}>
                                      ({ev.reviews} reviews)
                                    </span>
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
                {comparisonResults && iceVehicle && evForComparison && (
                  <div className="space-y-8">
                    {/* Detailed Vehicle Cards */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                      {/* ICE Vehicle Details */}
                      <Card className={`border-2 border-orange-400 ${isDarkMode ? "bg-gray-800" : ""}`}>
                        <div className="bg-gradient-to-r from-orange-500 to-red-500 p-6 text-white">
                          <div className="flex items-center justify-between mb-4">
                            <div>
                              <h3 className="text-2xl font-bold">
                                {iceVehicle.brand} {iceVehicle.name}
                              </h3>
                              <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                                {iceVehicle.fuelType} Engine
                              </Badge>
                            </div>
                            <div className="text-right">
                              <div className="text-3xl font-bold">
                                ₹{iceVehicle.price}
                                {iceVehicle.type === "Car" ? "L" : "K"}
                              </div>
                              <div className="text-orange-100">Ex-showroom</div>
                            </div>
                          </div>
                          <Image
                            src={iceVehicle.image || "/placeholder.svg"}
                            alt={`${iceVehicle.brand} ${iceVehicle.name}`}
                            width={400}
                            height={250}
                            className="w-full h-48 object-cover rounded-lg"
                          />
                        </div>
                        <CardContent className="p-6 space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div
                              className={`flex items-center space-x-3 p-3 rounded-lg ${isDarkMode ? "bg-gray-700" : "bg-gray-50"}`}
                            >
                              <Fuel className="w-5 h-5 text-orange-600" />
                              <div>
                                <div className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                                  Fuel Efficiency
                                </div>
                                <div className={`font-bold text-lg ${isDarkMode ? "text-white" : ""}`}>
                                  {iceVehicle.fuelEfficiency} km/l
                                </div>
                              </div>
                            </div>
                            <div
                              className={`flex items-center space-x-3 p-3 rounded-lg ${isDarkMode ? "bg-gray-700" : "bg-gray-50"}`}
                            >
                              <IndianRupee className="w-5 h-5 text-red-600" />
                              <div>
                                <div className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                                  Cost per km
                                </div>
                                <div className={`font-bold text-lg ${isDarkMode ? "text-white" : ""}`}>
                                  ₹{iceVehicle.fuelCostPerKm.toFixed(2)}
                                </div>
                              </div>
                            </div>
                            <div
                              className={`flex items-center space-x-3 p-3 rounded-lg ${isDarkMode ? "bg-gray-700" : "bg-gray-50"}`}
                            >
                              <Timer className="w-5 h-5 text-purple-600" />
                              <div>
                                <div className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                                  0-100 kmph
                                </div>
                                <div className={`font-bold text-lg ${isDarkMode ? "text-white" : ""}`}>
                                  {iceVehicle.acceleration || "N/A"}s
                                </div>
                              </div>
                            </div>
                            <div
                              className={`flex items-center space-x-3 p-3 rounded-lg ${isDarkMode ? "bg-gray-700" : "bg-gray-50"}`}
                            >
                              <Gauge className="w-5 h-5 text-blue-600" />
                              <div>
                                <div className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                                  Top Speed
                                </div>
                                <div className={`font-bold text-lg ${isDarkMode ? "text-white" : ""}`}>
                                  {iceVehicle.topSpeed} kmph
                                </div>
                              </div>
                            </div>
                            <div
                              className={`flex items-center space-x-3 p-3 rounded-lg ${isDarkMode ? "bg-gray-700" : "bg-gray-50"}`}
                            >
                              <Zap className={`w-5 h-5 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`} />
                              <div>
                                <div className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>Range</div>
                                <div className={`font-bold text-lg ${isDarkMode ? "text-white" : ""}`}>
                                  {iceVehicle.range} km
                                </div>
                              </div>
                            </div>
                            <div
                              className={`flex items-center space-x-3 p-3 rounded-lg ${isDarkMode ? "bg-gray-700" : "bg-gray-50"}`}
                            >
                              <IndianRupee className="w-5 h-5 text-yellow-600" />
                              <div>
                                <div className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                                  Maintenance/Year
                                </div>
                                <div className={`font-bold text-lg ${isDarkMode ? "text-white" : ""}`}>
                                  ₹{iceVehicle.maintenanceCostAnnual.toLocaleString()}
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Additional ICE Vehicle Details */}
                          <div className="border-t pt-4">
                            <h4 className={`font-semibold mb-3 ${isDarkMode ? "text-white" : ""}`}>Key Features</h4>
                            <div className="flex flex-wrap gap-2">
                              {iceVehicle.features.map((feature, index) => (
                                <Badge
                                  key={index}
                                  variant="outline"
                                  className={`text-xs ${isDarkMode ? "border-gray-600 text-gray-300" : ""}`}
                                >
                                  {feature}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      {/* EV Vehicle Details */}
                      <Card className={`border-2 border-blue-400 ${isDarkMode ? "bg-gray-800" : ""}`}>
                        <div className="bg-gradient-to-r from-blue-500 to-cyan-500 p-6 text-white">
                          <div className="flex items-center justify-between mb-4">
                            <div>
                              <h3 className="text-2xl font-bold">
                                {evForComparison.brand} {evForComparison.name}
                              </h3>
                              <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                                Electric Vehicle
                              </Badge>
                            </div>
                            <div className="text-right">
                              <div className="text-3xl font-bold">
                                ₹{evForComparison.price}
                                {evForComparison.type === "Car" ? "L" : "K"}
                              </div>
                              <div className="text-blue-100">Ex-showroom</div>
                            </div>
                          </div>
                          <Image
                            src={`/images/${evForComparison.id.replace(/-/g, "-")}.png`}
                            alt={`${evForComparison.brand} ${evForComparison.name}`}
                            width={400}
                            height={250}
                            className="w-full h-48 object-cover rounded-lg"
                          />
                        </div>
                        <CardContent className="p-6 space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div
                              className={`flex items-center space-x-3 p-3 rounded-lg ${isDarkMode ? "bg-blue-900/20" : "bg-blue-50"}`}
                            >
                              <Zap className="w-5 h-5 text-blue-600" />
                              <div>
                                <div className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                                  Efficiency
                                </div>
                                <div className="font-bold text-lg text-blue-600">
                                  {evForComparison.efficiency} km/kWh
                                </div>
                              </div>
                            </div>
                            <div
                              className={`flex items-center space-x-3 p-3 rounded-lg ${isDarkMode ? "bg-blue-900/20" : "bg-blue-50"}`}
                            >
                              <IndianRupee className="w-5 h-5 text-green-600" />
                              <div>
                                <div className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                                  Cost per km
                                </div>
                                <div className="font-bold text-lg text-green-600">
                                  ₹{evForComparison.chargingCostPerKm.toFixed(2)}
                                </div>
                              </div>
                            </div>
                            <div
                              className={`flex items-center space-x-3 p-3 rounded-lg ${isDarkMode ? "bg-blue-900/20" : "bg-blue-50"}`}
                            >
                              <Battery className="w-5 h-5 text-green-600" />
                              <div>
                                <div className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>Range</div>
                                <div className={`font-bold text-lg ${isDarkMode ? "text-white" : ""}`}>
                                  {evForComparison.range} km
                                </div>
                              </div>
                            </div>
                            <div
                              className={`flex items-center space-x-3 p-3 rounded-lg ${isDarkMode ? "bg-blue-900/20" : "bg-blue-50"}`}
                            >
                              <Timer className="w-5 h-5 text-purple-600" />
                              <div>
                                <div className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                                  0-100 kmph
                                </div>
                                <div className={`font-bold text-lg ${isDarkMode ? "text-white" : ""}`}>
                                  {evForComparison.acceleration || "N/A"}s
                                </div>
                              </div>
                            </div>
                            <div
                              className={`flex items-center space-x-3 p-3 rounded-lg ${isDarkMode ? "bg-blue-900/20" : "bg-blue-50"}`}
                            >
                              <Clock className="w-5 h-5 text-orange-600" />
                              <div>
                                <div className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                                  Charging Time
                                </div>
                                <div className={`font-bold text-lg ${isDarkMode ? "text-white" : ""}`}>
                                  {evForComparison.chargingTime}
                                </div>
                              </div>
                            </div>
                            <div
                              className={`flex items-center space-x-3 p-3 rounded-lg ${isDarkMode ? "bg-blue-900/20" : "bg-blue-50"}`}
                            >
                              <IndianRupee className="w-5 h-5 text-green-600" />
                              <div>
                                <div className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                                  Maintenance/Year
                                </div>
                                <div className="font-bold text-lg text-green-600">
                                  ₹{evForComparison.maintenanceCostAnnual.toLocaleString()}
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Additional EV Details */}
                          <div className="border-t pt-4">
                            <h4 className={`font-semibold mb-3 ${isDarkMode ? "text-white" : ""}`}>Key Features</h4>
                            <div className="flex flex-wrap gap-2">
                              {evForComparison.features.slice(0, 6).map((feature, index) => (
                                <Badge
                                  key={index}
                                  variant="outline"
                                  className={`text-xs ${isDarkMode ? "border-gray-600 text-gray-300" : ""}`}
                                >
                                  {feature}
                                </Badge>
                              ))}
                            </div>
                          </div>

                          <div className="pt-4 border-t">
                            <div className="grid grid-cols-2 gap-4">
                              <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 bg-orange-500/20 rounded-lg flex items-center justify-center">
                                  <Clock className="w-5 h-5 text-orange-600" />
                                </div>
                                <div>
                                  <div className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                                    AC Charging
                                  </div>
                                  <div className={`font-semibold ${isDarkMode ? "text-white" : ""}`}>
                                    {evForComparison.chargingTime}
                                  </div>
                                </div>
                              </div>
                              {evForComparison.fastChargingTime && (
                                <div className="flex items-center space-x-3">
                                  <div className="w-10 h-10 bg-red-500/20 rounded-lg flex items-center justify-center">
                                    <Zap className="w-5 h-5 text-red-600" />
                                  </div>
                                  <div>
                                    <div className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                                      Fast Charging
                                    </div>
                                    <div className={`font-semibold ${isDarkMode ? "text-white" : ""}`}>
                                      {evForComparison.fastChargingTime}
                                    </div>
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                    {/* Enhanced Savings Analysis */}
                    <Card
                      className={`border-2 border-green-400 ${isDarkMode ? "bg-gradient-to-r from-green-900/20 to-blue-900/20" : "bg-gradient-to-r from-green-50 to-blue-50"}`}
                    >
                      <CardContent className="p-8">
                        <div className="text-center mb-8">
                          <div className="inline-flex items-center space-x-2 bg-green-500/20 text-green-400 px-4 py-2 rounded-full text-sm font-medium mb-4 border border-green-500/30">
                            <TrendingDown className="w-4 h-4" />
                            <span>Complete Savings Analysis</span>
                          </div>
                          <h3 className={`text-3xl font-bold mb-4 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                            Switching to {evForComparison.brand} {evForComparison.name} from your {iceVehicle.brand}{" "}
                            {iceVehicle.name}
                          </h3>
                          <div className="text-5xl font-bold text-green-500 mb-2">
                            {comparisonResults.annualSavings > 0 ? "+" : ""}₹
                            {Math.abs(comparisonResults.annualSavings).toLocaleString()}/year
                          </div>
                          <p className={`text-xl ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
                            {comparisonResults.annualSavings > 0 ? "Total Annual Savings" : "Additional Annual Cost"}
                          </p>
                          {comparisonResults.breakEvenYears > 0 && (
                            <p className="text-lg text-blue-400 mt-2">
                              Break-even point: {comparisonResults.breakEvenYears.toFixed(1)} years of daily usage
                            </p>
                          )}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                          <div
                            className={`rounded-xl p-6 text-center shadow-sm hover:shadow-md transition-shadow ${isDarkMode ? "bg-gray-800" : "bg-white"}`}
                          >
                            <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                              <Fuel className="w-6 h-6 text-blue-600" />
                            </div>
                            <div className="text-2xl font-bold text-blue-500 mb-2">
                              ₹
                              {Math.round(
                                (iceVehicle.fuelCostPerKm - evForComparison.chargingCostPerKm) * dailyKm * 365,
                              ).toLocaleString()}
                            </div>
                            <div className={isDarkMode ? "text-gray-400" : "text-gray-600"}>
                              Fuel vs Charging Savings
                            </div>
                          </div>

                          <div
                            className={`rounded-xl p-6 text-center shadow-sm hover:shadow-md transition-shadow ${isDarkMode ? "bg-gray-800" : "bg-white"}`}
                          >
                            <div className="w-12 h-12 bg-yellow-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                              <IndianRupee className="w-6 h-6 text-yellow-600" />
                            </div>
                            <div className="text-2xl font-bold text-yellow-600 mb-2">
                              ₹
                              {(
                                iceVehicle.maintenanceCostAnnual - evForComparison.maintenanceCostAnnual
                              ).toLocaleString()}
                            </div>
                            <div className={isDarkMode ? "text-gray-400" : "text-gray-600"}>Maintenance Savings</div>
                          </div>

                          <div
                            className={`rounded-xl p-6 text-center shadow-sm hover:shadow-md transition-shadow ${isDarkMode ? "bg-gray-800" : "bg-white"}`}
                          >
                            <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                              <Leaf className="w-6 h-6 text-green-600" />
                            </div>
                            <div className="text-2xl font-bold text-green-600 mb-2">
                              {comparisonResults.co2Saved} kg
                            </div>
                            <div className={isDarkMode ? "text-gray-400" : "text-gray-600"}>
                              CO₂ Emissions Eliminated
                            </div>
                          </div>
                        </div>

                        <div className={`text-center text-sm mb-6 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                          <p>
                            *Based on {dailyKm} km daily driving ({(dailyKm * 365).toLocaleString()} km/year), ₹
                            {fuelPrice}/litre fuel price, and ₹{electricityRate}/kWh electricity cost
                          </p>
                        </div>

                        <div className="flex justify-center">
                          <Button
                            size="lg"
                            className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white px-8 py-3"
                            onClick={() =>
                              showNotification(
                                "info",
                                "EV Dealers",
                                "Finding EV dealers near your location",
                                [
                                  "Authorized dealerships",
                                  "Test drive availability",
                                  "Financing options",
                                  "Trade-in services",
                                ],
                                { label: "View Dealers", action: () => console.log("Opening dealer locator") },
                              )
                            }
                          >
                            Find EV Dealers Near You
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                )}
              </TabsContent>

              {/* Enhanced Break-even Calculator */}
              <TabsContent value="calculator" className="space-y-8">
                <Card className={isDarkMode ? "bg-gray-800 border-gray-700" : ""}>
                  <CardHeader>
                    <CardTitle className={`flex items-center space-x-2 ${isDarkMode ? "text-white" : ""}`}>
                      <Calculator className="w-5 h-5 text-purple-600" />
                      <span>Advanced Break-even Calculator</span>
                    </CardTitle>
                    <p className={isDarkMode ? "text-gray-400" : "text-gray-600"}>
                      Calculate personalized savings based on your driving patterns and local costs
                    </p>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div>
                        <Label htmlFor="dailyKm" className={isDarkMode ? "text-gray-300" : ""}>
                          Daily Driving (km)
                        </Label>
                        <div className="flex items-center space-x-2 mt-1">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setDailyKm(Math.max(1, dailyKm - 5))}
                            className={isDarkMode ? "bg-gray-700 border-gray-600 text-gray-300" : ""}
                          >
                            <Minus className="w-4 h-4" />
                          </Button>
                          <Input
                            id="dailyKm"
                            type="number"
                            value={dailyKm}
                            onChange={(e) => setDailyKm(Number(e.target.value))}
                            className={`text-center ${isDarkMode ? "bg-gray-700 border-gray-600 text-white" : ""}`}
                          />
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setDailyKm(dailyKm + 5)}
                            className={isDarkMode ? "bg-gray-700 border-gray-600 text-gray-300" : ""}
                          >
                            <Plus className="w-4 h-4" />
                          </Button>
                        </div>
                        <p className={`text-xs mt-1 ${isDarkMode ? "text-gray-500" : "text-gray-500"}`}>
                          Average daily distance you drive
                        </p>
                      </div>
                      <div>
                        <Label htmlFor="fuelPrice" className={isDarkMode ? "text-gray-300" : ""}>
                          Fuel Price (₹/L)
                        </Label>
                        <div className="flex items-center space-x-2 mt-1">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setFuelPrice(Math.max(50, fuelPrice - 5))}
                            className={isDarkMode ? "bg-gray-700 border-gray-600 text-gray-300" : ""}
                          >
                            <Minus className="w-4 h-4" />
                          </Button>
                          <Input
                            id="fuelPrice"
                            type="number"
                            value={fuelPrice}
                            onChange={(e) => setFuelPrice(Number(e.target.value))}
                            className={`text-center ${isDarkMode ? "bg-gray-700 border-gray-600 text-white" : ""}`}
                          />
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setFuelPrice(fuelPrice + 5)}
                            className={isDarkMode ? "bg-gray-700 border-gray-600 text-gray-300" : ""}
                          >
                            <Plus className="w-4 h-4" />
                          </Button>
                        </div>
                        <p className={`text-xs mt-1 ${isDarkMode ? "text-gray-500" : "text-gray-500"}`}>
                          Current petrol/diesel price in your area
                        </p>
                      </div>
                      <div>
                        <Label htmlFor="electricityRate" className={isDarkMode ? "text-gray-300" : ""}>
                          Electricity Rate (₹/kWh)
                        </Label>
                        <div className="flex items-center space-x-2 mt-1">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setElectricityRate(Math.max(1, electricityRate - 1))}
                            className={isDarkMode ? "bg-gray-700 border-gray-600 text-gray-300" : ""}
                          >
                            <Minus className="w-4 h-4" />
                          </Button>
                          <Input
                            id="electricityRate"
                            type="number"
                            value={electricityRate}
                            onChange={(e) => setElectricityRate(Number(e.target.value))}
                            className={`text-center ${isDarkMode ? "bg-gray-700 border-gray-600 text-white" : ""}`}
                          />
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setElectricityRate(electricityRate + 1)}
                            className={isDarkMode ? "bg-gray-700 border-gray-600 text-gray-300" : ""}
                          >
                            <Plus className="w-4 h-4" />
                          </Button>
                        </div>
                        <p className={`text-xs mt-1 ${isDarkMode ? "text-gray-500" : "text-gray-500"}`}>
                          Your home electricity tariff rate
                        </p>
                      </div>
                    </div>

                    <Button
                      className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white"
                      onClick={() => {
                        setShowCalculatorResults(true)
                        showNotification(
                          "success",
                          "Calculation Complete",
                          "Personalized savings calculated based on your inputs",
                          [
                            `Daily driving: ${dailyKm} km`,
                            `Annual distance: ${(dailyKm * 365).toLocaleString()} km`,
                            `Fuel price: ₹${fuelPrice}/L`,
                            `Electricity rate: ₹${electricityRate}/kWh`,
                          ],
                        )
                      }}
                    >
                      <Calculator className="w-4 h-4 mr-2" />
                      Calculate My Savings
                    </Button>

                    {iceVehicle && evForComparison && comparisonResults && showCalculatorResults && (
                      <div className="border-t pt-6">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                          <div className="space-y-4">
                            <h4 className={`text-lg font-semibold ${isDarkMode ? "text-white" : ""}`}>
                              Detailed Cost Analysis
                            </h4>
                            <div className="space-y-3">
                              <div className="flex justify-between">
                                <span className={isDarkMode ? "text-gray-300" : ""}>ICE Annual Fuel Cost:</span>
                                <span className={`font-semibold ${isDarkMode ? "text-white" : ""}`}>
                                  ₹{Math.round(iceVehicle.fuelCostPerKm * dailyKm * 365).toLocaleString()}
                                </span>
                              </div>
                              <div className="flex justify-between">
                                <span className={isDarkMode ? "text-gray-300" : ""}>EV Annual Charging Cost:</span>
                                <span className="font-semibold text-green-500">
                                  ₹{Math.round(evForComparison.chargingCostPerKm * dailyKm * 365).toLocaleString()}
                                </span>
                              </div>
                              <div className="flex justify-between">
                                <span className={isDarkMode ? "text-gray-300" : ""}>ICE Annual Maintenance:</span>
                                <span className={`font-semibold ${isDarkMode ? "text-white" : ""}`}>
                                  ₹{iceVehicle.maintenanceCostAnnual.toLocaleString()}
                                </span>
                              </div>
                              <div className="flex justify-between">
                                <span className={isDarkMode ? "text-gray-300" : ""}>EV Annual Maintenance:</span>
                                <span className="font-semibold text-green-500">
                                  ₹{evForComparison.maintenanceCostAnnual.toLocaleString()}
                                </span>
                              </div>
                              <div className="border-t pt-2 flex justify-between">
                                <span className={`font-semibold ${isDarkMode ? "text-white" : ""}`}>
                                  Total Annual Savings:
                                </span>
                                <span className="font-semibold text-green-500">
                                  ₹{comparisonResults.annualSavings.toLocaleString()}
                                </span>
                              </div>
                            </div>
                          </div>

                          <div className="space-y-4">
                            <h4 className={`text-lg font-semibold ${isDarkMode ? "text-white" : ""}`}>
                              Investment Analysis
                            </h4>
                            <div
                              className={`p-6 rounded-lg text-center ${
                                comparisonResults.breakEvenYears > 0 && comparisonResults.breakEvenYears <= 5
                                  ? isDarkMode
                                    ? "bg-green-900/20 border-2 border-green-500/30"
                                    : "bg-green-50 border-2 border-green-200"
                                  : isDarkMode
                                    ? "bg-red-900/20 border-2 border-red-500/30"
                                    : "bg-red-50 border-2 border-red-200"
                              }`}
                            >
                              <div
                                className={`text-2xl font-bold mb-2 ${
                                  comparisonResults.breakEvenYears > 0 && comparisonResults.breakEvenYears <= 5
                                    ? "text-green-500"
                                    : "text-red-500"
                                }`}
                              >
                                {comparisonResults.breakEvenYears > 0 && comparisonResults.breakEvenYears <= 5
                                  ? "✅ EV is Worth It!"
                                  : "❌ Consider Your Usage"}
                              </div>
                              <p
                                className={`text-sm ${
                                  comparisonResults.breakEvenYears > 0 && comparisonResults.breakEvenYears <= 5
                                    ? isDarkMode
                                      ? "text-green-400"
                                      : "text-green-700"
                                    : isDarkMode
                                      ? "text-red-400"
                                      : "text-red-700"
                                }`}
                              >
                                {comparisonResults.breakEvenYears > 0
                                  ? `Break-even in ${comparisonResults.breakEvenYears.toFixed(1)} years. EV pays for itself through savings.`
                                  : "EV costs more than potential savings over time. Consider higher daily usage or wait for prices to drop."}
                              </p>
                            </div>

                            {/* Gauge Meter Visualization */}
                            <div className="text-center">
                              <div className={`text-sm mb-2 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                                Cost Efficiency Score
                              </div>
                              <div className="relative w-32 h-16 mx-auto">
                                <div className="absolute inset-0 bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 rounded-t-full"></div>
                                <div
                                  className="absolute w-1 h-12 bg-gray-800 origin-bottom transform -translate-x-0.5"
                                  style={{
                                    left: "50%",
                                    bottom: "0",
                                    transform: `rotate(${Math.min(180, Math.max(0, comparisonResults.breakEvenYears > 0 && comparisonResults.breakEvenYears <= 5 ? 135 : 45))}deg) translateX(-50%)`,
                                    transformOrigin: "bottom center",
                                  }}
                                ></div>
                              </div>
                              <div className={`text-xs mt-2 ${isDarkMode ? "text-gray-500" : "text-gray-500"}`}>
                                {comparisonResults.breakEvenYears > 0 && comparisonResults.breakEvenYears <= 5
                                  ? "Highly Efficient"
                                  : "Not Efficient"}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        )}

        {/* Enhanced VoltRide Section */}
        {activeSection === "rentals" && (
          <div className="space-y-8">
            {/* Hero Section */}
            <div className="text-center">
              <div className="inline-flex items-center space-x-2 bg-green-500/20 text-green-400 px-4 py-2 rounded-full text-sm font-medium mb-4 border border-green-500/30">
                <Users className="w-4 h-4" />
                <span>VoltRide - EV Rental Marketplace</span>
              </div>
              <h1 className={`text-4xl font-bold mb-4 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                Rent Electric Vehicles <span className="text-green-400">On-Demand</span>
              </h1>
              <p className={`text-xl max-w-3xl mx-auto ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
                Access electric cars, scooters, bikes, and commercial vehicles for hourly, daily, or monthly rentals
                from verified companies and individuals.
              </p>
            </div>

            {/* Enhanced Filters and View Toggle */}
            <Card
              className={`backdrop-blur-sm border-2 shadow-lg ${isDarkMode ? "bg-gray-800/80 border-green-500/30" : "bg-white/80 border-green-100"}`}
            >
              <CardContent className="p-6">
                {/* View Toggle */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-2">
                    <Button
                      variant={rentalView === "all" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setRentalView("all")}
                      className={`flex items-center space-x-1 ${
                        rentalView === "all"
                          ? "bg-gradient-to-r from-green-500 to-emerald-500 text-white"
                          : isDarkMode
                            ? "bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600"
                            : ""
                      }`}
                    >
                      <Users className="w-4 h-4" />
                      <span>All Rentals</span>
                    </Button>
                    <Button
                      variant={rentalView === "companies" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setRentalView("companies")}
                      className={`flex items-center space-x-1 ${
                        rentalView === "companies"
                          ? "bg-gradient-to-r from-blue-500 to-cyan-500 text-white"
                          : isDarkMode
                            ? "bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600"
                            : ""
                      }`}
                    >
                      <Building className="w-4 h-4" />
                      <span>Companies</span>
                    </Button>
                    <Button
                      variant={rentalView === "individuals" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setRentalView("individuals")}
                      className={`flex items-center space-x-1 ${
                        rentalView === "individuals"
                          ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white"
                          : isDarkMode
                            ? "bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600"
                            : ""
                      }`}
                    >
                      <User className="w-4 h-4" />
                      <span>Individuals</span>
                    </Button>
                  </div>
                  <div className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                    {filteredRentals.length} vehicles available
                  </div>
                </div>

                {/* Advanced Filters */}
                <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-7 gap-4 mb-6">
                  <Select
                    value={rentalFilters.vehicleType}
                    onValueChange={(value) => setRentalFilters({ ...rentalFilters, vehicleType: value })}
                  >
                    <SelectTrigger className={isDarkMode ? "bg-gray-700 border-gray-600 text-white" : ""}>
                      <SelectValue placeholder="Vehicle Type" />
                    </SelectTrigger>
                    <SelectContent className={isDarkMode ? "bg-gray-800 border-gray-600" : ""}>
                      <SelectItem value="all">All Vehicles</SelectItem>
                      <SelectItem value="Car">Electric Cars</SelectItem>
                      <SelectItem value="Scooter">Scooters</SelectItem>
                      <SelectItem value="Bike">Bikes</SelectItem>
                      <SelectItem value="e-Rickshaw">e-Rickshaws</SelectItem>
                      <SelectItem value="e-Truck">e-Trucks</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select
                    value={rentalFilters.location}
                    onValueChange={(value) => setRentalFilters({ ...rentalFilters, location: value })}
                  >
                    <SelectTrigger className={isDarkMode ? "bg-gray-700 border-gray-600 text-white" : ""}>
                      <SelectValue placeholder="Location" />
                    </SelectTrigger>
                    <SelectContent className={isDarkMode ? "bg-gray-800 border-gray-600" : ""}>
                      <SelectItem value="all">All Locations</SelectItem>
                      <SelectItem value="Bangalore">Bangalore</SelectItem>
                      <SelectItem value="Mumbai">Mumbai</SelectItem>
                      <SelectItem value="Delhi">Delhi</SelectItem>
                      <SelectItem value="Chennai">Chennai</SelectItem>
                      <SelectItem value="Pune">Pune</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select
                    value={rentalFilters.duration}
                    onValueChange={(value) => setRentalFilters({ ...rentalFilters, duration: value })}
                  >
                    <SelectTrigger className={isDarkMode ? "bg-gray-700 border-gray-600 text-white" : ""}>
                      <SelectValue placeholder="Duration" />
                    </SelectTrigger>
                    <SelectContent className={isDarkMode ? "bg-gray-800 border-gray-600" : ""}>
                      <SelectItem value="all">Any Duration</SelectItem>
                      <SelectItem value="hourly">Hourly</SelectItem>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select
                    value={rentalFilters.priceRange}
                    onValueChange={(value) => setRentalFilters({ ...rentalFilters, priceRange: value })}
                  >
                    <SelectTrigger className={isDarkMode ? "bg-gray-700 border-gray-600 text-white" : ""}>
                      <SelectValue placeholder="Price Range" />
                    </SelectTrigger>
                    <SelectContent className={isDarkMode ? "bg-gray-800 border-gray-600" : ""}>
                      <SelectItem value="all">All Prices</SelectItem>
                      <SelectItem value="0-500">Under ₹500/day</SelectItem>
                      <SelectItem value="500-1500">₹500-1500/day</SelectItem>
                      <SelectItem value="1500-3000">₹1500-3000/day</SelectItem>
                      <SelectItem value="3000">Above ₹3000/day</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select
                    value={rentalFilters.condition}
                    onValueChange={(value) => setRentalFilters({ ...rentalFilters, condition: value })}
                  >
                    <SelectTrigger className={isDarkMode ? "bg-gray-700 border-gray-600 text-white" : ""}>
                      <SelectValue placeholder="Condition" />
                    </SelectTrigger>
                    <SelectContent className={isDarkMode ? "bg-gray-800 border-gray-600" : ""}>
                      <SelectItem value="all">All Conditions</SelectItem>
                      <SelectItem value="Excellent">Excellent</SelectItem>
                      <SelectItem value="Good">Good</SelectItem>
                      <SelectItem value="Fair">Fair</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select
                    value={rentalFilters.rating}
                    onValueChange={(value) => setRentalFilters({ ...rentalFilters, rating: value })}
                  >
                    <SelectTrigger className={isDarkMode ? "bg-gray-700 border-gray-600 text-white" : ""}>
                      <SelectValue placeholder="Rating" />
                    </SelectTrigger>
                    <SelectContent className={isDarkMode ? "bg-gray-800 border-gray-600" : ""}>
                      <SelectItem value="all">All Ratings</SelectItem>
                      <SelectItem value="4.5">4.5+ Stars</SelectItem>
                      <SelectItem value="4">4+ Stars</SelectItem>
                      <SelectItem value="3.5">3.5+ Stars</SelectItem>
                      <SelectItem value="3">3+ Stars</SelectItem>
                    </SelectContent>
                  </Select>

                  <Button
                    onClick={() =>
                      setRentalFilters({
                        vehicleType: "all",
                        location: "all",
                        duration: "all",
                        priceRange: "all",
                        ownerType: "all",
                        condition: "all",
                        rating: "all",
                      })
                    }
                    variant="outline"
                    className={isDarkMode ? "bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600" : ""}
                  >
                    Clear All
                  </Button>
                </div>

                {/* Quick Filter Tags */}
                <div className="flex flex-wrap gap-2">
                  <Badge
                    variant="secondary"
                    className={`cursor-pointer hover:bg-green-500 hover:text-white transition-colors ${isDarkMode ? "bg-gray-600 text-gray-300" : ""}`}
                    onClick={() => setRentalFilters({ ...rentalFilters, priceRange: "0-500" })}
                  >
                    Budget Friendly
                  </Badge>
                  <Badge
                    variant="secondary"
                    className={`cursor-pointer hover:bg-blue-500 hover:text-white transition-colors ${isDarkMode ? "bg-gray-600 text-gray-300" : ""}`}
                    onClick={() => setRentalFilters({ ...rentalFilters, condition: "Excellent" })}
                  >
                    Premium Quality
                  </Badge>
                  <Badge
                    variant="secondary"
                    className={`cursor-pointer hover:bg-purple-500 hover:text-white transition-colors ${isDarkMode ? "bg-gray-600 text-gray-300" : ""}`}
                    onClick={() => setRentalFilters({ ...rentalFilters, rating: "4.5" })}
                  >
                    Top Rated
                  </Badge>
                  <Badge
                    variant="secondary"
                    className={`cursor-pointer hover:bg-orange-500 hover:text-white transition-colors ${isDarkMode ? "bg-gray-600 text-gray-300" : ""}`}
                    onClick={() => setRentalFilters({ ...rentalFilters, vehicleType: "Car" })}
                  >
                    Cars Only
                  </Badge>
                  <Badge
                    variant="secondary"
                    className={`cursor-pointer hover:bg-cyan-500 hover:text-white transition-colors ${isDarkMode ? "bg-gray-600 text-gray-300" : ""}`}
                    onClick={() => setRentalFilters({ ...rentalFilters, vehicleType: "Scooter" })}
                  >
                    Scooters Only
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Enhanced Rental Vehicles Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredRentals.map((rental) => (
                <Card
                  key={rental.id}
                  className={`hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-2 hover:border-green-400 group ${isDarkMode ? "bg-gray-800 border-gray-700" : ""}`}
                >
                  <div className="relative">
                    <Image
                      src={`/images/${rental.id.replace(/-/g, "-")}.png`}
                      alt={`${rental.brand} ${rental.name}`}
                      width={400}
                      height={250}
                      className="w-full h-48 object-cover rounded-t-lg"
                    />

                    {/* Status Badges */}
                    <div className="absolute top-3 left-3 flex flex-col space-y-1">
                      <Badge className={`text-xs ${rental.isAvailable ? "bg-green-500" : "bg-red-500"} text-white`}>
                        {rental.isAvailable ? "Available" : "Booked"}
                      </Badge>
                      <Badge
                        className={`text-xs ${rental.ownerType === "Company" ? "bg-blue-500" : "bg-purple-500"} text-white`}
                      >
                        {rental.ownerType}
                      </Badge>
                    </div>

                    {/* Condition Badge */}
                    <div className="absolute top-3 right-3">
                      <Badge className={`text-xs ${getConditionColor(rental.vehicleCondition)} text-white`}>
                        {rental.vehicleCondition}
                      </Badge>
                    </div>

                    {/* Action Buttons Overlay */}
                    <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity flex space-x-1">
                      <Button
                        size="sm"
                        variant="secondary"
                        className={`w-8 h-8 p-0 ${isDarkMode ? "bg-gray-700 hover:bg-gray-600 text-white" : ""}`}
                        onClick={(e) => {
                          e.stopPropagation()
                          setSelectedRental(rental.id)
                          showNotification(
                            "info",
                            "Vehicle Details",
                            `Viewing details for ${rental.brand} ${rental.name}`,
                            [
                              `Owner: ${rental.ownerName}`,
                              `Location: ${rental.location.city}`,
                              `Daily rate: ₹${rental.pricing.daily}`,
                              `Security deposit: ₹${rental.securityDeposit}`,
                            ],
                          )
                        }}
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="secondary"
                        className={`w-8 h-8 p-0 ${isDarkMode ? "bg-gray-700 hover:bg-gray-600 text-white" : ""}`}
                        onClick={(e) => {
                          e.stopPropagation()
                          handleToggleFavoriteRental(rental.id)
                        }}
                      >
                        <Heart
                          className={`w-4 h-4 ${favoriteRentals.includes(rental.id) ? "text-red-500 fill-current" : ""}`}
                        />
                      </Button>
                      <Button
                        size="sm"
                        variant="secondary"
                        className={`w-8 h-8 p-0 ${isDarkMode ? "bg-gray-700 hover:bg-gray-600 text-white" : ""}`}
                        onClick={(e) => {
                          e.stopPropagation()
                          navigator.clipboard.writeText(
                            `Check out this ${rental.brand} ${rental.name} for rent on VoltVerse! ₹${rental.pricing.daily}/day in ${rental.location.city}`,
                          )
                          showNotification(
                            "success",
                            "Link Copied",
                            `${rental.brand} ${rental.name} rental details copied to clipboard`,
                            ["Share with friends and family", "Compare rental options", "Help others find great deals"],
                          )
                        }}
                      >
                        <Share2 className="w-4 h-4" />
                      </Button>
                    </div>

                    {/* Verified Badge */}
                    {rental.isVerified && (
                      <div className="absolute bottom-3 left-3">
                        <Badge className="bg-green-500 text-white text-xs flex items-center space-x-1">
                          <Verified className="w-3 h-3" />
                          <span>Verified</span>
                        </Badge>
                      </div>
                    )}
                  </div>

                  <CardContent className="p-4">
                    <div className="mb-4">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className={`text-lg font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                          {rental.brand} {rental.name}
                        </h4>
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 text-yellow-500 fill-current" />
                          <span className={`text-sm font-medium ${isDarkMode ? "text-gray-300" : ""}`}>
                            {rental.rating}
                          </span>
                          <span className={`text-xs ${isDarkMode ? "text-gray-500" : "text-gray-500"}`}>
                            ({rental.reviews})
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <Badge
                            variant="outline"
                            className={`text-xs ${isDarkMode ? "border-gray-600 text-gray-300" : ""}`}
                          >
                            {getVehicleTypeIcon(rental.type)} {rental.type}
                          </Badge>
                          <Badge
                            variant="outline"
                            className={`text-xs ${isDarkMode ? "border-gray-600 text-gray-300" : ""}`}
                          >
                            {rental.batteryCapacity} kWh
                          </Badge>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-green-500">₹{rental.pricing.daily}</div>
                          <div className={`text-xs ${isDarkMode ? "text-gray-500" : "text-gray-500"}`}>per day</div>
                        </div>
                      </div>

                      <div className={`text-sm mb-3 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                        <MapPin className="w-3 h-3 inline mr-1" />
                        {rental.location.area}, {rental.location.city}
                      </div>
                    </div>

                    {/* Vehicle Specs */}
                    <div className="grid grid-cols-2 gap-3 mb-4">
                      <div className="flex items-center justify-between text-sm">
                        <span className={`flex items-center ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                          <Battery className="w-4 h-4 mr-1 text-green-500" />
                          Range
                        </span>
                        <span className={`font-semibold ${isDarkMode ? "text-white" : ""}`}>{rental.range} km</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className={`flex items-center ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                          <Gauge className="w-4 h-4 mr-1 text-blue-500" />
                          Top Speed
                        </span>
                        <span className={`font-semibold ${isDarkMode ? "text-white" : ""}`}>
                          {rental.topSpeed} kmph
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className={`flex items-center ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                          <Timer className="w-4 h-4 mr-1 text-orange-500" />
                          Charging
                        </span>
                        <span className={`font-semibold ${isDarkMode ? "text-white" : ""}`}>{rental.chargingTime}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className={`flex items-center ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                          <CalendarIcon className="w-4 h-4 mr-1 text-purple-500" />
                          Year
                        </span>
                        <span className={`font-semibold ${isDarkMode ? "text-white" : ""}`}>{rental.year}</span>
                      </div>
                    </div>

                    {/* Pricing Options */}
                    <div className={`mb-4 p-3 rounded-lg ${isDarkMode ? "bg-gray-700" : "bg-gray-50"}`}>
                      <div className="grid grid-cols-3 gap-2 text-xs">
                        <div className="text-center">
                          <div className={`font-semibold ${isDarkMode ? "text-white" : ""}`}>
                            ₹{rental.pricing.hourly}
                          </div>
                          <div className={isDarkMode ? "text-gray-400" : "text-gray-600"}>per hour</div>
                        </div>
                        <div className="text-center">
                          <div className="font-semibold text-green-500">₹{rental.pricing.daily}</div>
                          <div className={isDarkMode ? "text-gray-400" : "text-gray-600"}>per day</div>
                        </div>
                        <div className="text-center">
                          <div className={`font-semibold ${isDarkMode ? "text-white" : ""}`}>
                            ₹{rental.pricing.weekly}
                          </div>
                          <div className={isDarkMode ? "text-gray-400" : "text-gray-600"}>per week</div>
                        </div>
                      </div>
                    </div>

                    {/* Owner Information */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs font-bold">{rental.ownerName.charAt(0)}</span>
                        </div>
                        <div>
                          <div className={`text-sm font-medium ${isDarkMode ? "text-white" : ""}`}>
                            {rental.ownerName}
                          </div>
                          <div className="flex items-center space-x-1">
                            <Star className="w-3 h-3 text-yellow-500 fill-current" />
                            <span className={`text-xs ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                              {rental.ownerRating}/5.0
                            </span>
                            {rental.ownerType === "Company" && (
                              <Badge variant="outline" className="text-xs">
                                <Building className="w-3 h-3 mr-1" />
                                Business
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className={`text-xs ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                          Security Deposit
                        </div>
                        <div className={`text-sm font-semibold ${isDarkMode ? "text-white" : ""}`}>
                          ₹{rental.securityDeposit.toLocaleString()}
                        </div>
                      </div>
                    </div>

                    {/* Features */}
                    <div className="mb-4">
                      <div className="flex flex-wrap gap-1">
                        {rental.features.slice(0, 3).map((feature, index) => (
                          <Badge
                            key={index}
                            variant="secondary"
                            className={`text-xs ${isDarkMode ? "bg-gray-600 text-gray-300" : ""}`}
                          >
                            {feature}
                          </Badge>
                        ))}
                        {rental.features.length > 3 && (
                          <Badge
                            variant="secondary"
                            className={`text-xs ${isDarkMode ? "bg-gray-600 text-gray-300" : ""}`}
                          >
                            +{rental.features.length - 3}
                          </Badge>
                        )}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex space-x-2">
                      <Button
                        onClick={() => handleBookRental(rental.id)}
                        disabled={!rental.isAvailable || bookingRental === rental.id}
                        className={`flex-1 ${
                          rental.isAvailable
                            ? "bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white"
                            : "bg-gray-400 text-gray-700 cursor-not-allowed"
                        }`}
                      >
                        {bookingRental === rental.id ? (
                          <RefreshCw className="w-4 h-4 mr-1 animate-spin" />
                        ) : (
                          <Calendar className="w-4 h-4 mr-1" />
                        )}
                        {bookingRental === rental.id ? "Booking..." : rental.isAvailable ? "Book Now" : "Not Available"}
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className={
                          isDarkMode ? "bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600" : "bg-transparent"
                        }
                        onClick={() => handleContactOwner(rental.id)}
                      >
                        <MessageCircle className="w-4 h-4" />
                      </Button>
                    </div>

                    {/* Additional Info */}
                    <div className={`mt-3 text-xs ${isDarkMode ? "text-gray-500" : "text-gray-500"}`}>
                      <div className="flex items-center justify-between">
                        <span>Last updated: {rental.lastUpdated}</span>
                        <span>Distance: {rental.distance} km away</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* List Your Vehicle CTA */}
            <Card
              className={`border-2 border-dashed ${isDarkMode ? "bg-gradient-to-r from-green-900/20 to-blue-900/20 border-green-500/30" : "bg-gradient-to-r from-green-50 to-blue-50 border-green-300"}`}
            >
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Car className="w-8 h-8 text-green-500" />
                </div>
                <h3 className={`text-2xl font-bold mb-4 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                  Own an Electric Vehicle?
                </h3>
                <p className={`text-lg mb-6 max-w-2xl mx-auto ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
                  List your EV for rent and earn ₹15,000-50,000 per month. Join thousands of vehicle owners making money
                  from their idle EVs.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                      <IndianRupee className="w-5 h-5 text-blue-600" />
                    </div>
                    <div className="text-left">
                      <div className={`font-semibold ${isDarkMode ? "text-white" : ""}`}>High Earnings</div>
                      <div className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                        Up to ₹50K/month
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
                      <Shield className="w-5 h-5 text-green-600" />
                    </div>
                    <div className="text-left">
                      <div className={`font-semibold ${isDarkMode ? "text-white" : ""}`}>Full Insurance</div>
                      <div className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                        Complete coverage
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
                      <Users className="w-5 h-5 text-purple-600" />
                    </div>
                    <div className="text-left">
                      <div className={`font-semibold ${isDarkMode ? "text-white" : ""}`}>24/7 Support</div>
                      <div className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                        Always available
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white px-8"
                    onClick={() =>
                      showNotification(
                        "info",
                        "List Your Vehicle",
                        "Opening vehicle listing form",
                        [
                          "Earn passive income from your EV",
                          "Full insurance and support included",
                          "Easy setup in under 10 minutes",
                          "Join 10,000+ vehicle owners",
                        ],
                        { label: "Get Started", action: () => console.log("Opening listing form") },
                      )
                    }
                  >
                    <Upload className="w-5 h-5 mr-2" />
                    List Your Vehicle
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className={
                      isDarkMode ? "bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600" : "bg-transparent"
                    }
                    onClick={() =>
                      showNotification(
                        "info",
                        "Learn More",
                        "Opening detailed information about vehicle listing",
                        [
                          "Pricing and commission structure",
                          "Requirements and eligibility",
                          "Success stories from owners",
                          "Frequently asked questions",
                        ],
                        { label: "View Details", action: () => console.log("Opening info page") },
                      )
                    }
                  >
                    <Info className="w-5 h-5 mr-2" />
                    Learn More
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </main>

      {/* Enhanced Floating Action Button */}
      <div className="fixed bottom-6 right-6 z-40">
        <div className="flex flex-col space-y-3">
          {/* Quick Actions */}
          <div className="flex flex-col space-y-2">
            <Button
              size="sm"
              className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white shadow-lg hover:shadow-xl transition-all duration-300"
              onClick={() =>
                showNotification("info", "Quick Search", "Opening quick search for charging stations", [
                  "Find nearest stations",
                  "Real-time availability",
                  "Book slots instantly",
                  "Get directions",
                ])
              }
            >
              <Search className="w-5 h-5" />
            </Button>
            <Button
              size="sm"
              className="w-12 h-12 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white shadow-lg hover:shadow-xl transition-all duration-300"
              onClick={() =>
                showNotification(
                  "info",
                  "Emergency Support",
                  "Connecting to 24/7 emergency support",
                  ["Roadside assistance", "Technical support", "Emergency charging", "Towing services"],
                  { label: "Call Now", action: () => console.log("Calling emergency support") },
                )
              }
            >
              <Phone className="w-5 h-5" />
            </Button>
          </div>

          {/* Main FAB */}
          <Button
            size="lg"
            className="w-14 h-14 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
            onClick={() =>
              showNotification(
                "info",
                "VoltVerse Assistant",
                "How can I help you today?",
                ["Find charging stations", "Compare EVs", "Book rentals", "Get support"],
                { label: "Chat Now", action: () => console.log("Opening chat assistant") },
              )
            }
          >
            <MessageCircle className="w-6 h-6" />
          </Button>
        </div>
      </div>

      {/* Login Dialog */}
      <LoginDialog
        isOpen={showLoginDialog}
        onClose={() => setShowLoginDialog(false)}
        isDarkMode={isDarkMode}
        onLogin={handleLogin}
      />

      {/* Notification Dialog */}
      <NotificationDialog
        isOpen={notificationDialog.isOpen}
        onClose={() => setNotificationDialog({ ...notificationDialog, isOpen: false })}
        isDarkMode={isDarkMode}
        type={notificationDialog.type}
        title={notificationDialog.title}
        message={notificationDialog.message}
        details={notificationDialog.details}
        actionButton={notificationDialog.actionButton}
      />
    </div>
  )
}
