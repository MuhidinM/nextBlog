import { connectToDb } from "@/lib/helpers";
import prisma from "@/prisma";
import {
  generateErrorMessage,
  generateSuccessMessage,
} from "../../../lib/helpers";

export const GET = async () => {
  try {
    await connectToDb();
    const users = await prisma.user.findMany();
    if (users.length <= 0) {
      return generateSuccessMessage(
        { ...users },
        "There are no users yet",
        200
      );
    } else {
      return generateSuccessMessage(
        { ...users },
        "Users found successfuly",
        200
      );
    }
  } catch (error) {
    return generateErrorMessage({ error }, "Could not get users", 500);
  } finally {
    await prisma.$disconnect();
  }
};
