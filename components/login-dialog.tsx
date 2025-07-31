"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  User,
  Mail,
  Lock,
  Phone,
  MapPin,
  Building,
  Eye,
  EyeOff,
  ChromeIcon as Google,
  Facebook,
  Apple,
  Zap,
} from "lucide-react"

interface LoginDialogProps {
  isOpen: boolean
  onClose: () => void
  isDarkMode: boolean
  onLogin: (user: any) => void
}

export function LoginDialog({ isOpen, onClose, isDarkMode, onLogin }: LoginDialogProps) {
  const [activeTab, setActiveTab] = useState("login")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    phone: "",
    city: "",
    userType: "individual",
  })

  const handleLogin = async () => {
    setIsLoading(true)
    // Simulate API call
    setTimeout(() => {
      const user = {
        id: "user_123",
        name: formData.name || "John Doe",
        email: formData.email,
        phone: formData.phone || "+91-98765-43210",
        city: formData.city || "Bangalore",
        userType: formData.userType,
        avatar: "/placeholder.svg?height=40&width=40&text=JD&bg=3b82f6&color=white",
        joinedDate: new Date().toISOString(),
        preferences: {
          notifications: true,
          darkMode: isDarkMode,
        },
      }
      onLogin(user)
      setIsLoading(false)
      onClose()
    }, 2000)
  }

  const handleSocialLogin = (provider: string) => {
    setIsLoading(true)
    setTimeout(() => {
      const user = {
        id: `${provider}_user_123`,
        name: `User from ${provider}`,
        email: `user@${provider.toLowerCase()}.com`,
        phone: "+91-98765-43210",
        city: "Bangalore",
        userType: "individual",
        avatar: `/placeholder.svg?height=40&width=40&text=${provider[0]}&bg=3b82f6&color=white`,
        joinedDate: new Date().toISOString(),
        preferences: {
          notifications: true,
          darkMode: isDarkMode,
        },
      }
      onLogin(user)
      setIsLoading(false)
      onClose()
    }, 1500)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className={`max-w-md ${isDarkMode ? "bg-gray-900 border-gray-700 text-white" : "bg-white"}`}>
        <DialogHeader>
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              VoltVerse
            </DialogTitle>
          </div>
          <DialogDescription className={isDarkMode ? "text-gray-400" : "text-gray-600"}>
            Join India's largest EV ecosystem platform
          </DialogDescription>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className={`grid w-full grid-cols-2 ${isDarkMode ? "bg-gray-800" : ""}`}>
            <TabsTrigger
              value="login"
              className={isDarkMode ? "data-[state=active]:bg-blue-600 data-[state=active]:text-white" : ""}
            >
              Login
            </TabsTrigger>
            <TabsTrigger
              value="signup"
              className={isDarkMode ? "data-[state=active]:bg-blue-600 data-[state=active]:text-white" : ""}
            >
              Sign Up
            </TabsTrigger>
          </TabsList>

          <TabsContent value="login" className="space-y-4">
            <div className="space-y-4">
              <div>
                <Label htmlFor="email" className={isDarkMode ? "text-gray-300" : ""}>
                  Email
                </Label>
                <div className="relative">
                  <Mail
                    className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}
                  />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className={`pl-10 ${isDarkMode ? "bg-gray-800 border-gray-600 text-white" : ""}`}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="password" className={isDarkMode ? "text-gray-300" : ""}>
                  Password
                </Label>
                <div className="relative">
                  <Lock
                    className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}
                  />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className={`pl-10 pr-10 ${isDarkMode ? "bg-gray-800 border-gray-600 text-white" : ""}`}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </Button>
                </div>
              </div>

              <Button
                onClick={handleLogin}
                disabled={isLoading || !formData.email || !formData.password}
                className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white"
              >
                {isLoading ? "Signing in..." : "Sign In"}
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="signup" className="space-y-4">
            <div className="space-y-4">
              <div>
                <Label htmlFor="name" className={isDarkMode ? "text-gray-300" : ""}>
                  Full Name
                </Label>
                <div className="relative">
                  <User
                    className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}
                  />
                  <Input
                    id="name"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className={`pl-10 ${isDarkMode ? "bg-gray-800 border-gray-600 text-white" : ""}`}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="signup-email" className={isDarkMode ? "text-gray-300" : ""}>
                  Email
                </Label>
                <div className="relative">
                  <Mail
                    className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}
                  />
                  <Input
                    id="signup-email"
                    type="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className={`pl-10 ${isDarkMode ? "bg-gray-800 border-gray-600 text-white" : ""}`}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="phone" className={isDarkMode ? "text-gray-300" : ""}>
                  Phone Number
                </Label>
                <div className="relative">
                  <Phone
                    className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}
                  />
                  <Input
                    id="phone"
                    placeholder="+91-XXXXX-XXXXX"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className={`pl-10 ${isDarkMode ? "bg-gray-800 border-gray-600 text-white" : ""}`}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="city" className={isDarkMode ? "text-gray-300" : ""}>
                  City
                </Label>
                <div className="relative">
                  <MapPin
                    className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}
                  />
                  <Input
                    id="city"
                    placeholder="Enter your city"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className={`pl-10 ${isDarkMode ? "bg-gray-800 border-gray-600 text-white" : ""}`}
                  />
                </div>
              </div>

              <div>
                <Label className={isDarkMode ? "text-gray-300" : ""}>Account Type</Label>
                <div className="flex space-x-2 mt-2">
                  <Button
                    type="button"
                    variant={formData.userType === "individual" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setFormData({ ...formData, userType: "individual" })}
                    className={`flex-1 ${formData.userType === "individual" ? "bg-blue-600 text-white" : isDarkMode ? "bg-gray-800 border-gray-600 text-gray-300" : ""}`}
                  >
                    <User className="w-4 h-4 mr-2" />
                    Individual
                  </Button>
                  <Button
                    type="button"
                    variant={formData.userType === "business" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setFormData({ ...formData, userType: "business" })}
                    className={`flex-1 ${formData.userType === "business" ? "bg-blue-600 text-white" : isDarkMode ? "bg-gray-800 border-gray-600 text-gray-300" : ""}`}
                  >
                    <Building className="w-4 h-4 mr-2" />
                    Business
                  </Button>
                </div>
              </div>

              <div>
                <Label htmlFor="signup-password" className={isDarkMode ? "text-gray-300" : ""}>
                  Password
                </Label>
                <div className="relative">
                  <Lock
                    className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}
                  />
                  <Input
                    id="signup-password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className={`pl-10 pr-10 ${isDarkMode ? "bg-gray-800 border-gray-600 text-white" : ""}`}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </Button>
                </div>
              </div>

              <Button
                onClick={handleLogin}
                disabled={isLoading || !formData.name || !formData.email || !formData.password}
                className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white"
              >
                {isLoading ? "Creating Account..." : "Create Account"}
              </Button>
            </div>
          </TabsContent>
        </Tabs>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className={`w-full border-t ${isDarkMode ? "border-gray-700" : "border-gray-300"}`} />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className={`px-2 ${isDarkMode ? "bg-gray-900 text-gray-400" : "bg-white text-gray-500"}`}>
              Or continue with
            </span>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3">
          <Button
            variant="outline"
            onClick={() => handleSocialLogin("Google")}
            disabled={isLoading}
            className={isDarkMode ? "bg-gray-800 border-gray-600 text-gray-300 hover:bg-gray-700" : ""}
          >
            <Google className="w-4 h-4" />
          </Button>
          <Button
            variant="outline"
            onClick={() => handleSocialLogin("Facebook")}
            disabled={isLoading}
            className={isDarkMode ? "bg-gray-800 border-gray-600 text-gray-300 hover:bg-gray-700" : ""}
          >
            <Facebook className="w-4 h-4" />
          </Button>
          <Button
            variant="outline"
            onClick={() => handleSocialLogin("Apple")}
            disabled={isLoading}
            className={isDarkMode ? "bg-gray-800 border-gray-600 text-gray-300 hover:bg-gray-700" : ""}
          >
            <Apple className="w-4 h-4" />
          </Button>
        </div>

        <div className={`text-center text-xs ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
          By continuing, you agree to our <button className="underline hover:text-blue-500">Terms of Service</button>{" "}
          and <button className="underline hover:text-blue-500">Privacy Policy</button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
