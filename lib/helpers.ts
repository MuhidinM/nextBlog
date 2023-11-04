import prisma from "@/prisma";
import { NextResponse } from "next/server";

export const connectToDb = async () => {
  try {
    await prisma.$connect();
  } catch (err: any) {
    throw new Error(err);
  }
};
export const generateSuccessMessage = (
  data: any,
  message: string,
  status: number
) => {
  return NextResponse.json({ message, ...data }, { status, statusText: "OK" });
};
export const generateErrorMessage = (
  data: any,
  message: string,
  status: number
) => {
  NextResponse.json({ message, ...data }, { status, statusText: "ERROR" });
};

export const getAllBlogs = async (count?: number) => {
  const response = await fetch("http://localhost:3000/api/blog", {
    cache: "no-store",
  });
  const data = await response.json();
  if (count) {
    return data.blogs.slice(0, count);
  }
  return data.blogs;
};
