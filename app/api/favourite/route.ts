import { without } from "lodash";
import prismadb from "@/lib/prismadb";
import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse, NextRequest } from "next/server";
import serverAuth from "@/lib/serverAuth";

const handler = async (req: NextRequest, res: NextApiResponse) => {
  const { currentUser } = await serverAuth(req);

  const { movieId } = await req.json();

  console.log("Request body:", movieId);
  try {
    if (req.method === "POST") {
      const existingUser = await prismadb.movie.findUnique({
        where: {
          id: movieId,
        },
      });

      if (!existingUser) {
        throw new Error("Invali id");
      }

      const user = await prismadb.user.update({
        where: {
          email: currentUser.email || "",
        },
        data: {
          favouriteIds: {
            push: movieId,
          },
        },
      });
      return NextResponse.json(user);
    } else if (req.method === "DELETE") {
      const existingUser = await prismadb.movie.findUnique({
        where: {
          id: movieId,
        },
      });

      if (!existingUser) {
        throw new Error("Invali id");
      }

      const updateFavouriteIds = without(currentUser.favouriteIds, movieId);

      const updatedUser = await prismadb.user.update({
        where: {
          email: currentUser.email || "",
        },
        data: {
          favouriteIds: updateFavouriteIds,
        },
      });

      return NextResponse.json(updatedUser);
    } else {
      throw new Error("wrong operation");
    }
  } catch (err) {
    return NextResponse.json(err);
  }
};

export { handler as DELETE, handler as POST, handler as GET };
