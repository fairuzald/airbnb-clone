import prisma from "@/app/libs/prismadb";

export default async function getListingById(params: {  listingId?: string;}) {
  try {
    const { listingId } = params;
    if (!listingId || typeof listingId !== "string") {
      throw new Error("Invalid ID");
    }
    const listing = await prisma.listing.findUnique({
      where: {
        id: listingId,
      },
      include: {
        user: true,
      },
    });
    if (!listing) {
      return null;
    }
    return {
      ...listing,
      createdAt: listing.createdAt.toISOString(),
      user: {
        ...listing.user,
        createdAt: listing.user.createdAt.toISOString(),
        updatedAt: listing.user.updatedAt.toISOString(),
        emailVerified: listing.user.emailVerified?.toISOString() || null,
      },
    };

    // Rest of your code goes here
  } catch (err) {
    console.log(err);
    throw new Error("Something went wrong");
    // Handle the error here
  }
}
