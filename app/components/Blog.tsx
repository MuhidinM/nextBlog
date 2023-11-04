import Image from "next/image";
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
    <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
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
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="w-5 h-5 text-gray-600 transition-colors duration-200 dark:dark:text-gray-200 group-hover:text-deep-purple-accent-700"
                    >
                      <polyline
                        points="6 23 1 23 1 12 6 12"
                        fill="none"
                        strokeMiterlimit="10"
                      />
                      <path
                        d="M6,12,9,1H9a3,3,0,0,1,3,3v6h7.5a3,3,0,0,1,2.965,3.456l-1.077,7A3,3,0,0,1,18.426,23H6Z"
                        fill="none"
                        stroke="currentColor"
                        strokeMiterlimit="10"
                      />
                    </svg>
                  </div>
                  <p className="font-semibold">7.4K</p>
                </a>
                <a
                  href="/"
                  aria-label="Comments"
                  className="flex items-start text-gray-800 transition-colors duration-200 dark:dark:text-gray-400 hover:text-deep-purple-accent-700 group"
                >
                  <div className="mr-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      stroke="currentColor"
                      className="w-5 h-5 text-gray-600 transition-colors duration-200 dark:dark:text-gray-200 group-hover:text-deep-purple-accent-700"
                    >
                      <polyline
                        points="23 5 23 18 19 18 19 22 13 18 12 18"
                        fill="none"
                        strokeMiterlimit="10"
                      />
                      <polygon
                        points="19 2 1 2 1 14 5 14 5 19 12 14 19 14 19 2"
                        fill="none"
                        stroke="currentColor"
                        strokeMiterlimit="10"
                      />
                    </svg>
                  </div>
                  <p className="font-semibold">81</p>
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
