import Image from "next/image";
import { BiLike, BiComment } from "react-icons/bi";

interface BlogPost {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  userId: string;
  created_at: string; // need to conver this to local date format
  updatedAt: Date;
  categoryId: string;
  locations: string;
}
export const Blog = async () => {
  const response = await fetch("http://localhost:3000/api/blog");
  const data = await response.json();
  const blogPosts = data.blogs;
  // console.log(blogPosts);
  return (
    <div className="grid gap-5 lg:grid-cols-3 sm:max-w-sm sm:mx-auto lg:max-w-full">
      {blogPosts.map((blog: BlogPost) => (
        <div
          key={blog.id}
          className="overflow-hidden transition-shadow duration-300 bg-white rounded dark:bg-slate-950"
        >
          <a href="/" aria-label="Article">
            <Image
              src={blog.imageUrl}
              className="object-cover w-full h-64 rounded"
              alt=""
              width={1260}
              height={750}
            />
          </a>
          <div className="py-5">
            <p className="mb-2 text-xs font-semibold text-gray-600 uppercase dark:text-gray-300">
              {blog.created_at}
            </p>
            <a
              href="/"
              aria-label="Article"
              className="inline-block mb-3 text-black transition-colors duration-200 hover:text-deep-purple-accent-700"
            >
              <p className="text-2xl font-bold leading-5 dark:text-slate-200">
                {blog.title}
              </p>
            </a>
            <p className="mb-4 text-gray-700 dark:text-gray-400">
              {blog.description}
            </p>
            <div className="flex space-x-4">
              <a
                href="/"
                aria-label="Likes"
                className="flex items-start text-gray-800 transition-colors duration-200 hover:text-deep-purple-accent-700 group dark:text-gray-400"
              >
                <div className="mr-2">
                  <BiLike className="w-5 h-5 text-gray-600 transition-colors duration-200 dark:dark:text-gray-200 group-hover:text-deep-purple-accent-700" />
                </div>
                <p className="font-semibold">7.4K</p>
              </a>

              <a
                href="/"
                aria-label="Comments"
                className="flex items-start text-gray-800 transition-colors duration-200 dark:dark:text-gray-400 hover:text-deep-purple-accent-700 group"
              >
                <div className="mr-2">
                  <BiComment className="w-5 h-5 text-gray-600 transition-colors duration-200 dark:dark:text-gray-200 group-hover:text-deep-purple-accent-700" />
                </div>
                <p className="font-semibold">81</p>
              </a>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
