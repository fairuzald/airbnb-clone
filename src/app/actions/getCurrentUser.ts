import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import prisma from "../libs/prismadb";
// getsession form next auth getserversession
export async function getSession() {
  return await getServerSession(authOptions);
}
// Fetch getcurrentuser await getsession
export default async function getCurrentUser() {
  try {
    const session = await getSession();
    if (!session?.user?.email) {
      return null;
    }
    const currentUser = await prisma.user.findUnique({
      where: { email: session.user.email },
    });
    if (!currentUser) {
      return null;
    }
    return currentUser;
  } catch (err) {
    console.log(err);
  }
}
