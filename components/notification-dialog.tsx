"use client"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { CheckCircle, AlertCircle, Info } from "lucide-react"

interface NotificationDialogProps {
  isOpen: boolean
  onClose: () => void
  isDarkMode: boolean
  type: "success" | "error" | "info" | "warning"
  title: string
  message: string
  details?: string[]
  actionButton?: {
    label: string
    action: () => void
  }
}

export function NotificationDialog({
  isOpen,
  onClose,
  isDarkMode,
  type,
  title,
  message,
  details,
  actionButton,
}: NotificationDialogProps) {
  const getIcon = () => {
    switch (type) {
      case "success":
        return <CheckCircle className="w-6 h-6 text-green-500" />
      case "error":
        return <AlertCircle className="w-6 h-6 text-red-500" />
      case "warning":
        return <AlertCircle className="w-6 h-6 text-yellow-500" />
      default:
        return <Info className="w-6 h-6 text-blue-500" />
    }
  }

  const getColorScheme = () => {
    switch (type) {
      case "success":
        return "from-green-500 to-emerald-500"
      case "error":
        return "from-red-500 to-pink-500"
      case "warning":
        return "from-yellow-500 to-orange-500"
      default:
        return "from-blue-500 to-cyan-500"
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className={`max-w-md ${isDarkMode ? "bg-gray-900 border-gray-700 text-white" : "bg-white"}`}>
        <DialogHeader>
          <div className="flex items-center space-x-3 mb-2">
            {getIcon()}
            <DialogTitle className={isDarkMode ? "text-white" : "text-gray-900"}>{title}</DialogTitle>
          </div>
          <DialogDescription className={isDarkMode ? "text-gray-400" : "text-gray-600"}>{message}</DialogDescription>
        </DialogHeader>

        {details && details.length > 0 && (
          <div className="space-y-2">
            {details.map((detail, index) => (
              <div
                key={index}
                className={`flex items-center space-x-2 text-sm ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}
              >
                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                <span>{detail}</span>
              </div>
            ))}
          </div>
        )}

        <div className="flex space-x-2 pt-4">
          {actionButton && (
            <Button
              onClick={() => {
                actionButton.action()
                onClose()
              }}
              className={`flex-1 bg-gradient-to-r ${getColorScheme()} hover:opacity-90 text-white`}
            >
              {actionButton.label}
            </Button>
          )}
          <Button
            variant="outline"
            onClick={onClose}
            className={`${actionButton ? "flex-1" : "w-full"} ${isDarkMode ? "bg-gray-800 border-gray-600 text-gray-300 hover:bg-gray-700" : ""}`}
          >
            {actionButton ? "Cancel" : "Close"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
