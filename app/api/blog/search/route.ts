import {
  connectToDb,
  generateErrorMessage,
  generateSuccessMessage,
} from "@/lib/helpers";
import prisma from "@/prisma";

export const GET = async (req: Request) => {
  const searchedTitle = new URL(req.url).searchParams.get("title");
  try {
    await connectToDb();
    const blogs = await prisma.blog.findMany({
      where: { title: { contains: searchedTitle ?? "" } },
    });
    return generateSuccessMessage(
      { blogs },
      `Blogs with found successfuly`,
      200
    );
  } catch (error) {
    return generateErrorMessage({ error }, `could not get the blog`, 500);
  } finally {
    await prisma.$disconnect();
  }
};
