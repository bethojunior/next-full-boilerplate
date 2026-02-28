"use client"

import { Button } from "@/components/ui/button"
import { MapPin } from "lucide-react"
import Image from "next/image"

interface QRDisplayProps {
  onBack: () => void
}

export default function QRDisplay({ onBack }: QRDisplayProps) {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4">
      {/* Header */}
      <div className="w-full max-w-md mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center">
            <MapPin className="w-6 h-6 text-white" />
          </div>
          <div className="w-24 h-24 flex items-center justify-center mb-4 mx-auto">
            <Image
              src="/logo.jpeg"
              alt="R3TURN Logo"
              width={96}
              height={96}
              className="w-full h-full object-contain"
            />
          </div>
        </div>
      </div>


      {/* Botão de Leitura */}
      <Button 
        className="w-full max-w-md bg-orange-500 hover:bg-orange-600 text-white text-lg py-6"
        onClick={onBack}
      >
        LEIA O QRCOD
      </Button>

      {/* Barra de navegação */}
      <div className="w-full h-1 bg-white mt-4"></div>
    </div>
  )
}
