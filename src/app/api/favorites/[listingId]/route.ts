import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
export async function POST(
  req: Request,
  { params }: { params: { listingId?: string } }
) {
  // Get current user
  const currentUser = await getCurrentUser();

  //   Add validation to make sure the user must be logged in
  if (!currentUser) {
    return NextResponse.error();
  }

  //   Params validation
  const { listingId } = params;
  if (!listingId || typeof listingId !== "string") {
    return NextResponse.json({ error: "Invalid ID" }, { status: 204 });
  }
  // Get favoritedId before
  let favoriteIds = [...(currentUser.favoriteIds || [])];

  //   Push new Id to the data
  favoriteIds.push(listingId);

  //   Update the data on database
  const user = await prisma.user.update({
    where: { id: currentUser.id },
    data: { favoriteIds },
  });
  return NextResponse.json(user);
}


export async function DELETE(
    req: Request,
    { params }: { params: { listingId?: string } }
  ) {
    // Get current user and validate if they are logged in
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return NextResponse.error();
    }
  
    // Validation for params
    const { listingId } = params;
    if (!listingId || typeof listingId !== "string") {
      return NextResponse.json({ message: "Invalid ID" }, { status: 204 });
    }
  
    // Validate data before updating
    const user = await prisma.user.findUnique({
      where: {
        id: currentUser.id,
      },
    });
  
    const favoriteIds = user?.favoriteIds || [];
  
    const isFavorite = favoriteIds.includes(listingId);
    if (!isFavorite) {
      return NextResponse.json({ message: "Data not found" }, { status: 201 });
    }
  
    const updatedUser = await prisma.user.update({
      where: { id: currentUser.id },
      data: {
        favoriteIds: favoriteIds.filter((id) => id !== listingId),
      },
    });
  
    return NextResponse.json(updatedUser);
  }

  
  