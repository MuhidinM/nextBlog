import {
  connectToDb,
  generateErrorMessage,
  generateSuccessMessage,
} from "@/lib/helpers";
import prisma from "@/prisma";

export const GET = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  try {
    const id = params.id;
    await connectToDb();
    const user = await prisma.user.findFirst({
      where: { id },
      include: { _count: true, blogs: true },
    });
    return generateSuccessMessage(
      { ...user },
      `User with id ${id} found successfuly`,
      200
    );
  } catch (error) {
    return generateErrorMessage({ error }, `could not get the user`, 500);
  } finally {
    await prisma.$disconnect();
  }
};
