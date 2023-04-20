import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import prisma from "@/app/libs/prismadb";

export async function POST(
  request: Request
) {
  const body = await request.json();
  const { email, name, password } = body;
  //wait until bcrypt hash the pasword
  const hashedPassword = await bcrypt.hash(password, 12);
  //creating new user
  const user = await prisma.user.create({ data: { email, name, hashedPassword } });

  return NextResponse.json(user);
}