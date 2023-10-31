import { connectToDb } from "@/lib/helpers";
import prisma from "@/prisma";
import { NextResponse } from "next/server";
import {
  generateErrorMessage,
  generateSuccessMessage,
} from "../../../lib/helpers";

export const GET = async () => {
  try {
    await connectToDb();
    const users = await prisma.user.findMany();
    return generateSuccessMessage({ ...users }, 200);
  } catch (error) {
    return generateErrorMessage({ error }, 500);
  } finally {
    await prisma.$disconnect();
  }
};
