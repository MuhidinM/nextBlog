import { connectToDb } from "@/lib/helpers";
import prisma from "@/prisma";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
export const POST = async (req: Request) => {
  const { name, email, password } = await req.json();
  if (!email || !password || !name) {
    return NextResponse.json({ message: "Invalid Data" }, { status: 422 });
  }
  try {
    await connectToDb();
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { email, name, password: hashedPassword },
    });
    return NextResponse.json(
      { message: "user created", ...user },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { message: "user not created", ...error },
      { status: 201 }
    );
  } finally {
    await prisma.$disconnect();
  }
};
