import prisma from "@/app/libs/prismadb";
export default async function getReservations(params: {
  listingId?: string;
  userId?: string;
  authorId?: string;
}) {
  try {
    const { listingId, userId, authorId } = params;

    let query: any = {};
    if (listingId) {
      query.listingId = listingId;
    }
    if (userId) {
      query.userId = userId;
    }
    if (authorId) {
      query.listing = { userId: authorId };
    }
    const reservations = await prisma.reservation.findMany({
      where: query,
      include: { listing: true },
      orderBy: { createdAt: "desc" },
    });
    const safeReservation = reservations.map((reservation) => ({
      ...reservation,
      createdAt: reservation.createdAt.toISOString(),
      startDate: reservation.startDate.toISOString(),
      endDate: reservation.endDate.toISOString(),
      listing: {
        ...reservation.listing,
        createdAt: reservation.createdAt.toISOString(),
      },
    }));
    return safeReservation;
  } catch (err) {
    throw new Error("Something went wrong during getReservations");
  }
}
