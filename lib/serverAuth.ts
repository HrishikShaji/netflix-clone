import { NextApiRequest } from "next";
import { getSession } from "next-auth/react";

import prismadb from "@/lib/prismadb";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { NextRequest } from "next/server";

const serverAuth = async (req: NextRequest) => {
  const session = await getServerSession(authOptions);
  console.log(session?.user);
  const userId = session?.user;

  if (!session?.user) {
    throw new Error("Not Signed in");
  }

  const currentUser = await prismadb.user.findUnique({
    where: {
      id: session.user as string,
    },
  });

  if (!currentUser) {
    throw new Error("Not Signed in");
  }

  return { currentUser };
};

export default serverAuth;
