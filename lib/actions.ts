"use server"

// Almacenamiento en memoria (temporal)
const attendees: Array<{ name: string; timestamp: string }> = []

export async function saveAttendance(name: string) {
  try {
    // Añadir nuevo asistente a la memoria
    attendees.push({
      name,
      timestamp: new Date().toISOString(),
    })

    // Nota: Este almacenamiento se reiniciará cuando la función serverless se reinicie
    // pero funcionará para pruebas temporales

    return { success: true }
  } catch (error) {
    console.error("Error saving attendance:", error)
    throw new Error("Failed to save attendance")
  }
}

// Nueva función para obtener asistentes
export async function getAttendees() {
  return attendees
}
