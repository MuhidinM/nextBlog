// server side

// import { getServerSession } from "next-auth";
// import { authOptions } from "./api/auth/[...nextauth]/route";

//   export default async function Home() {
//   const data = await getServerSession(authOptions);
//   return (
//     <main>
//       <div className="">Hello world</div>
//       <div className="">{JSON.stringify(data)}</div>
//     </main>
//   );
// }

// client side

"use client";

import { useSession } from "next-auth/react";

export default function Home() {
  const { data, status } = useSession();
  return (
    <main>
      <div className="">Hello world</div>
      <div className="">{JSON.stringify(data)}</div>
      <div className="">{JSON.stringify(status)}</div>
    </main>
  );
}
