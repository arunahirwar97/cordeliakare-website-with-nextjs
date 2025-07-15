import { NextResponse } from "next/server";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const origins = searchParams.get("origins");
  const destinations = searchParams.get("destinations");

  console.log("API Route - Origins:", origins);
  console.log("API Route - Destinations:", destinations);

  if (!origins || !destinations) {
    return NextResponse.json(
      { error: "Missing origins or destinations" },
      { status: 400 }
    );
  }

  try {
    const url =
      `https://maps.googleapis.com/maps/api/distancematrix/json?` +
      `origins=${encodeURIComponent(origins)}&destinations=${encodeURIComponent(
        destinations
      )}&` +
      `key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&` +
      `units=metric&mode=driving`;

    console.log("API Route - Calling URL:", url);

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log("API Route - Response:", JSON.stringify(data, null, 2));

    return NextResponse.json(data);
  } catch (error) {
    console.error("Distance Matrix API error:", error);
    return NextResponse.json(
      { error: "Failed to fetch distance data" },
      { status: 500 }
    );
  }
}
