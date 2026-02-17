import { NextRequest, NextResponse } from "next/server";
import { getPizarraData } from "@/lib/getPizarraData";

export async function GET(request: NextRequest) {
  try {
    // Extract fecha parameter from query string
    const searchParams = request.nextUrl.searchParams;
    const fecha = searchParams.get("fecha");

    // Validate that fecha parameter exists
    if (!fecha) {
      return NextResponse.json(
        { error: "Falta parámetro fecha" },
        { status: 400 }
      );
    }

    // Validate date format (YYYY-MM-DD)
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(fecha)) {
      return NextResponse.json(
        { error: "fecha must be in YYYY-MM-DD format" },
        { status: 400 }
      );
    }

    // Fetch pizarra data using shared function
    const data = await getPizarraData(fecha);

    // No data found for this date
    if (!data) {
      return NextResponse.json({
        error: "No se encontraron datos para esa fecha",
      });
    }

    // Return response matching PHP structure
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error in /api/pizarra:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
