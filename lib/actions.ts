"use server"

import fs from "fs"
import path from "path"

// Esta es una implementación simple que guarda las confirmaciones en un archivo
// En un entorno real, usarías una base de datos como Supabase, MongoDB, etc.
export async function saveAttendance(name: string) {
  try {
    const dataDir = path.join(process.cwd(), "data")
    const filePath = path.join(dataDir, "attendees.json")

    // Crear directorio si no existe
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true })
    }

    // Leer archivo existente o crear uno nuevo
    let attendees = []
    if (fs.existsSync(filePath)) {
      const fileContent = fs.readFileSync(filePath, "utf8")
      attendees = JSON.parse(fileContent)
    }

    // Añadir nuevo asistente
    attendees.push({
      name,
      timestamp: new Date().toISOString(),
    })

    // Guardar archivo
    fs.writeFileSync(filePath, JSON.stringify(attendees, null, 2))

    return { success: true }
  } catch (error) {
    console.error("Error saving attendance:", error)
    throw new Error("Failed to save attendance")
  }
}