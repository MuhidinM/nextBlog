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
    const blog = await prisma.blog.findFirst({
      where: { id },
    });
    return generateSuccessMessage(
      { blog },
      `Blog with id ${id} found successfuly`,
      200
    );
  } catch (error) {
    return generateErrorMessage({ error }, `could not get the blog`, 500);
  } finally {
    await prisma.$disconnect();
  }
};
export const PUT = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  try {
    const { title, description } = await req.json();
    if (!title || !description) {
      return generateErrorMessage(
        { reason: "Invalid data" },
        "No title or description",
        422
      );
    }
    const id = params.id;
    await connectToDb();
    const blog = await prisma.blog.update({
      where: { id },
      data: { title, description },
    });
    return generateSuccessMessage(
      { blog },
      `Blog with id ${id} updated successfuly`,
      200
    );
  } catch (error) {
    return generateErrorMessage({ error }, `could not update the blog`, 500);
  } finally {
    await prisma.$disconnect();
  }
};
export const DELETE = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  try {
    const id = params.id;
    await connectToDb();
    const blog = await prisma.blog.delete({
      where: { id },
    });
    return generateSuccessMessage(
      { blog },
      `Blog with id ${id} deleted successfuly`,
      200
    );
  } catch (error) {
    return generateErrorMessage({ error }, `could not delete the blog`, 500);
  } finally {
    await prisma.$disconnect();
  }
};
