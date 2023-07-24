import prismadb from "@/lib/prismadb";
import serverAuth from "@/lib/serverAuth";
import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";

const handler = async (req: NextRequest, res: NextApiResponse) => {
  try {
    await serverAuth(req);
    const movies = await prismadb.movie.findMany();

    return NextResponse.json(movies);
  } catch (err) {
    return NextResponse.json(err);
  }
};

export { handler as GET };
