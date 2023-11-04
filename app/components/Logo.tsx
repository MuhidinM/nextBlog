import Link from "next/link";
import React from "react";

const Logo = () => {
  return (
    <div>
      <Link href="/" className="flex items-center">
        <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
          Blog App
        </span>
      </Link>
    </div>
  );
};

export default Logo;
