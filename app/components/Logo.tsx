import Image from "next/image";
import Link from "next/link";
import React from "react";

const Logo = () => {
  return (
    <div>
      <Link href="/" className="flex items-center w-28">
        <Image
          src={"/Blog.png"}
          width={500}
          className="dark:invert"
          height={500}
          alt="logo"
        />
      </Link>
    </div>
  );
};

export default Logo;
