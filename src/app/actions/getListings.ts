import prisma from "@/app/libs/prismadb";

export default async function getListings(params: { userId?: string }) {
  try {
    const { userId } = params;
    let query: any = {};
    if (userId) {
      query.userId = userId;
    }
    const listings = await prisma.listing.findMany({
      where: query,
      orderBy: { createdAt: "desc" },
    });

    const safeListings = listings.map((listing) => ({
      ...listing,
      createdAt: listing.createdAt.toISOString(),
    }));

    return safeListings;
  } catch (err: any) {
    throw new Error(err);
  }
}
