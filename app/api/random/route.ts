import serverAuth from "@/lib/serverAuth";
import { NextApiRequest } from "next";
import { NextRequest, NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";

const handler = async (req: NextRequest, res: NextApiRequest) => {
  try {
    await serverAuth(req);
    const movieCount = await prismadb.movie.count();
    const randomIndex = Math.floor(Math.random() * movieCount);

    const randomMovies = await prismadb.movie.findMany({
      take: 1,
      skip: randomIndex,
    });

    return NextResponse.json(randomMovies[0]);
  } catch (err) {
    NextResponse.json(err);
  }
};
export { handler as GET };
