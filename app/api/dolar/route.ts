import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = await fetch("https://monedapi.ar/api/usd/bna", {
      next: { revalidate: 300 }, // Cache for 5 minutes
    });

    if (!response.ok) {
      throw new Error("Failed to fetch dollar rate");
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching dollar rate:", error);
    return NextResponse.json(
      { error: "Failed to fetch dollar rate" },
      { status: 500 }
    );
  }
}
