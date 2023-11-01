import { connectToDb } from "@/lib/helpers";
import prisma from "@/prisma";
import {
  generateErrorMessage,
  generateSuccessMessage,
} from "../../../lib/helpers";

export const GET = async () => {
  try {
    await connectToDb();
    const categories = await prisma.category.findMany();
    if (categories.length <= 0) {
      return generateSuccessMessage(
        { categories },
        "There are no categories yet",
        200
      );
    } else {
      return generateSuccessMessage(
        { categories },
        "Categories found successfuly",
        200
      );
    }
  } catch (error) {
    return generateErrorMessage({ error }, "Could not get categories", 500);
  } finally {
    await prisma.$disconnect();
  }
};
export const POST = async (req: Request) => {
  try {
    const { name } = await req.json();
    await connectToDb();
    const category = await prisma.category.create({ data: { name } });

    return generateSuccessMessage(
      { category },
      "category created successfuly",
      200
    );
  } catch (error) {
    return generateErrorMessage({ error }, "Could not create categories", 500);
  } finally {
    await prisma.$disconnect();
  }
};
