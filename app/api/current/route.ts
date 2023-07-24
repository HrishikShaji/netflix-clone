import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";
import { NextApiRequest, NextApiResponse } from "next";
import serverAuth from "@/lib/serverAuth";
import { NextRequest, NextResponse } from "next/server";

const getUser = async (req: NextRequest, res: NextApiResponse) => {
  try {
    const { currentUser } = await serverAuth(req);

    return NextResponse.json(currentUser);
  } catch (error) {
    return NextResponse.json({ message: "Error getting current user" });
  }
};

export { getUser as GET };
