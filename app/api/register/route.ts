import bcrypt from "bcrypt";
import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";
import { NextApiRequest, NextApiResponse } from "next";

export async function POST(req: Request, res: Response) {
  const data = await req.json();
  const { email, name, password } = data;
  console.log(email, name, password);

  try {
    const existingUSer = await prismadb.user.findUnique({
      where: {
        email,
      },
    });
    if (existingUSer) {
      return NextResponse.json({ error: "Email taken" });
    }
    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await prismadb.user.create({
      data: {
        email,
        name,
        hashedPassword,
        image: "",
        emailVerified: new Date(),
      },
    });
    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json(error);
  }
}
