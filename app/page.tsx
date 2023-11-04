import { Blog, Hero } from "./components";
export default function Home() {
  return (
    <main className="px-4 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl">
      <Hero />
      <div className="flex justify-center text-3xl">Recent Blogs</div>
      <Blog />
    </main>
  );
}
