"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Calendar, Clock, MapPin, PartyPopper, User } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import confetti from "canvas-confetti"
import { saveAttendance } from "@/lib/actions"

export default function InvitacionReunion() {
  const [isHovering, setIsHovering] = useState(false)
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [name, setName] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleConfetti = async () => {
    if (!name.trim()) return

    setIsSubmitting(true)

    try {
      await saveAttendance(name)

      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      })

      setShowConfirmation(true)
      setTimeout(() => setShowConfirmation(false), 3000)
    } catch (error) {
      console.error("Error al guardar asistencia:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  // Colores para los círculos
  const colors = ["#FF5D8F", "#FF9D5C", "#5D7CE5"]

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#2A3352] p-4">
      <div
        className="relative max-w-md w-full rounded-xl overflow-hidden"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        {/* Luces decorativas animadas */}
        <div className="absolute w-full top-0 left-0 h-32 overflow-hidden">
          <div className="relative w-full h-full">
            {[...Array(10)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full"
                style={{
                  backgroundColor: colors[i % colors.length],
                  width: 40 + (i % 3) * 5,
                  height: 40 + (i % 3) * 5,
                  left: `${i * 10 + 5}%`,
                  top: i % 2 === 0 ? 10 : 50,
                  backgroundImage:
                    "repeating-linear-gradient(45deg, transparent, transparent 5px, rgba(0,0,0,0.1) 5px, rgba(0,0,0,0.1) 10px)",
                }}
                animate={{
                  y: isHovering ? [0, -5, 0] : 0,
                }}
                transition={{
                  duration: 1.5,
                  delay: i * 0.1,
                  repeat: isHovering ? Number.POSITIVE_INFINITY : 0,
                  repeatType: "reverse",
                }}
              />
            ))}
            <div className="absolute w-full h-1 bg-[#333] top-[45px]" />
          </div>
        </div>

        {/* Contenido principal */}
        <motion.div
          className="bg-[#2A3352] text-center pt-36 pb-16 px-8 rounded-xl shadow-2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1
            className="text-[#FFB6C1] text-7xl font-bold tracking-wider mb-12"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            REUNIÓN
          </motion.h1>

          <div className="space-y-6 text-white">
            <motion.div
              className="flex items-center justify-center gap-2"
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <Calendar className="text-[#FFB6C1]" />
              <p className="text-xl">Sábado 3 de Abril</p>
            </motion.div>

            <motion.div
              className="flex items-center justify-center gap-2"
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              <Clock className="text-[#FF9D5C]" />
              <p className="text-xl">7:00 p.m.</p>
            </motion.div>

            <motion.div
              className="flex items-center justify-center gap-2"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.9 }}
            >
              <MapPin className="text-[#5D7CE5] flex-shrink-0" />
              <p className="text-lg">Carrera 35 #63D-48 Manzana 3 | Al lado del parque de los novios</p>
            </motion.div>

            <motion.div
              className="mt-10 italic text-[#FFB6C1] text-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1 }}
            >
              <p>Trae a tu jevo/jeva :P</p>
            </motion.div>
          </div>

          <motion.div
            className="mt-12 space-y-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.3 }}
          >
            <div className="flex flex-col items-center space-y-2">
              <Label htmlFor="name" className="text-white">
                Tu nombre
              </Label>
              <div className="flex w-full max-w-xs">
                <div className="bg-white rounded-l-md p-2 flex items-center">
                  <User className="h-5 w-5 text-[#2A3352]" />
                </div>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Escribe tu nombre"
                  className="rounded-l-none bg-white text-[#2A3352]"
                />
              </div>
            </div>

            <Button
              onClick={handleConfetti}
              disabled={!name.trim() || isSubmitting}
              className="bg-[#FFB6C1] hover:bg-[#FF9D5C] text-[#2A3352] font-bold px-8 py-6 rounded-full text-lg transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <PartyPopper className="mr-2" />
              {isSubmitting ? "Confirmando..." : "Confirmar Asistencia"}
            </Button>

            {showConfirmation && (
              <motion.p
                className="text-[#5D7CE5] mt-4 font-medium"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                ¡Genial! ¡Si llegas tarde, te gusta el pene, {name}!
              </motion.p>
            )}
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
// Esta es una invitación a una reunión con animaciones y efectos visuales.
