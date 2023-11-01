import { connectToDb } from "@/lib/helpers";
import prisma from "@/prisma";
import {
  generateErrorMessage,
  generateSuccessMessage,
} from "../../../lib/helpers";
import { UploadApiResponse, v2 } from "cloudinary";

async function uploadImage(file: Blob) {
  return new Promise<UploadApiResponse>(async (resolve, reject) => {
    const buffer = Buffer.from(await file.arrayBuffer());
    v2.uploader
      .upload_stream(
        { resource_type: "auto", folder: "nextBlog" },
        (error, result) => {
          if (error) {
            console.log(error);
            return reject(error);
          } else if (result) {
            return resolve(result);
          }
        }
      )
      .end(buffer);
  });
}
export const GET = async () => {
  try {
    await connectToDb();
    const blogs = await prisma.blog.findMany();
    if (blogs.length <= 0) {
      return generateSuccessMessage({ blogs }, "There are no blogs yet", 200);
    } else {
      return generateSuccessMessage({ blogs }, "Blogs found successfuly", 200);
    }
  } catch (error) {
    return generateErrorMessage({ error }, "Could not get blogs", 500);
  } finally {
    await prisma.$disconnect();
  }
};
export const POST = async (req: Request) => {
  v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KYE,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
  try {
    const formData = await req.formData();
    const { title, description, userId, categoryId, locations } = JSON.parse(
      formData.get("postData") as string
    );
    if (!title || !description || !userId || !categoryId || !locations) {
      return generateErrorMessage({ reason: "Invalid" }, "Invalid data", 422);
    }
    const file = formData.get("image") as Blob | null;
    let uploadedFile: UploadApiResponse | null = null;
    if (file) {
      uploadedFile = await uploadImage(file);
    } else {
      uploadedFile = null;
    }
    await connectToDb();
    const user = await prisma.user.findFirst({ where: { id: userId } });
    const category = await prisma.category.findFirst({
      where: { id: categoryId },
    });
    if (!user || !category) {
      return generateErrorMessage(
        { reason: "Invalid" },
        "Invalid user or category",
        401
      );
    }

    const blog = await prisma.blog.create({
      data: {
        title,
        description,
        locations,
        categoryId,
        userId,
        imageUrl: uploadedFile?.url ?? null,
      },
    });

    return generateSuccessMessage({ blog }, "Blog created successfuly", 201);
  } catch (error) {
    return generateErrorMessage({ error }, "Could not create blogs", 500);
  } finally {
    await prisma.$disconnect();
  }
};
