import { NextResponse } from "next/server"
import fs from "fs"
import path from "path"

// Esta ruta API permite a los organizadores ver quién ha confirmado
// Nota: En producción, deberías proteger esta ruta con autenticación
export async function GET() {
  try {
    const filePath = path.join(process.cwd(), "data", "attendees.json")

    if (!fs.existsSync(filePath)) {
      return NextResponse.json({ attendees: [] })
    }

    const fileContent = fs.readFileSync(filePath, "utf8")
    const attendees = JSON.parse(fileContent)

    return NextResponse.json({ attendees })
  } catch (error) {
    console.error("Error fetching attendees:", error)
    return NextResponse.json({ error: "Failed to fetch attendees" }, { status: 500 })
  }
}