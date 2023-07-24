import prismadb from "@/lib/prismadb";
import serverAuth from "@/lib/serverAuth";
import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";

const handler = async (req: NextRequest, res: NextApiResponse) => {
  try {
    const { currentUser } = await serverAuth(req);

    const favouriteMovies = await prismadb.movie.findMany({
      where: {
        id: {
          in: currentUser?.favouriteIds,
        },
      },
    });
    return NextResponse.json(favouriteMovies);
  } catch (err) {
    return NextResponse.json(err);
  }
};

export { handler as GET };
