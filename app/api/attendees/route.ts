import { NextResponse } from "next/server"
import { getAttendees } from "@/lib/actions"

// Esta ruta API permite a los organizadores ver quién ha confirmado
export async function GET() {
  try {
    const attendees = await getAttendees()
    return NextResponse.json({ attendees })
  } catch (error) {
    console.error("Error fetching attendees:", error)
    return NextResponse.json({ error: "Failed to fetch attendees" }, { status: 500 })
  }
}
