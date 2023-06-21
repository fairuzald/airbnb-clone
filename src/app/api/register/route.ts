import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

import prisma from "@/app/libs/prismadb";

export async function POST(
  request: Request,
) {
  // Parse the JSON body of the request
  const body = await request.json();
  const {
    email,
    name,
    password,
  } = body;

  // Hash the password using bcrypt with a cost factor of 12
  const hashedPassword = await bcrypt.hash(password, 12);

  // Create a new user in the Prisma database
  const user = await prisma.user.create({
    data: {
      email,
      name,
      hashedPassword,
    },
  });

  // Return the user information as a JSON response
  return NextResponse.json(user);
}
