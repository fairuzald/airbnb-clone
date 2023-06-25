import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";

// Handler function for POST request
export async function POST(req: Request) {
  // Get the current user
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    // If no current user, return an error response
    return NextResponse.error();
  }

  // Parse the request body
  const body = await req.json();
  const {
    category,
    location,
    guestCount,
    roomCount,
    bathroomCount,
    imageSrc,
    price,
    title,
    description,
  } = body;

  // Check if any required fields are missing
  Object.keys(body).forEach((key) => {
    if (!body[key]) {
      // If any required field is missing, return an error response
      return NextResponse.error();
    }
  });

  // Create a new listing in the database
  const listings = await prisma.listing.create({
    data: {
      category,
      locationValue: location.value,
      guestCount,
      roomCount,
      bathroomCount,
      imageSrc,
      price: parseInt(price, 10),
      title,
      description,
      userId: currentUser.id,
    },
  });

  // Return the created listing as a JSON response
  return NextResponse.json(listings);
}
