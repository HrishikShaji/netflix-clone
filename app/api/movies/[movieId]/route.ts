import prismadb from "@/lib/prismadb";
import serverAuth from "@/lib/serverAuth";
import { NextApiRequest } from "next";
import { NextRequest, NextResponse } from "next/server";

const handler = async (req: NextRequest, res: NextResponse) => {
  const url = req.nextUrl.pathname;

  const urlSplit = url.split("/");

  const movieId = urlSplit[urlSplit.length - 1];

  try {
    await serverAuth(req);

    if (!movieId) {
      throw new Error("Invalid id");
    }

    const movie = await prismadb.movie.findUnique({
      where: {
        id: movieId,
      },
    });
    if (!movie) {
      throw new Error("invalid id");
    }

    return NextResponse.json(movie);
  } catch (err) {
    return NextResponse.json(err);
  }
};

export { handler as GET };
