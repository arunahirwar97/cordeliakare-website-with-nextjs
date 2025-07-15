import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const origin: any = req.query.origin;
  const destination: any = req.query.destination;

  if (!origin || !destination) {
    return res.status(400).json({ error: "Missing origin or destination" });
  }

  try {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodeURIComponent(
        origin
      )}&destinations=${encodeURIComponent(destination)}&key=${
        process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
      }`
    );
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error("Distance calculation error:", error);
    res.status(500).json({ error: "Failed to calculate distance" });
  }
}
