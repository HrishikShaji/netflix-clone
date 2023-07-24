"use client";
import Billboard from "@/components/Billboard";
import InfoModal from "@/components/InfoModal";
import MovieList from "@/components/MovieList";
import Navbar from "@/components/Navbar";
import useCurrentUser from "@/hooks/useCurrentUser";
import useFavourites from "@/hooks/useFavourites";
import useInfoModal from "@/hooks/useInfoModal";
import useMovielist from "@/hooks/useMovielist";

import { getSession, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const getData = async () => {};

export default function Home() {
  const router = useRouter();
  const session = useSession();
  const [movies, setMovies] = useState<Record<string, any>[]>([]);

  const { favourites } = useFavourites();
  const { isOpen, closeModal } = useInfoModal();

  useEffect(() => {
    if (session.status === "unauthenticated") {
      router.push("/auth");
    }

    const fetchData = async () => {
      const moviesData = await fetch("/api/movies", {
        method: "GET",
        headers: { "Content-type": "application/json" },
      });

      const data = await moviesData.json();
      setMovies(data);
      console.log(data, session);
    };
    fetchData();
  }, [session]);
  if (session.status === "loading") {
    return <div>Loading...</div>;
  }

  if (session.status === "authenticated") {
    console.log(movies, favourites);
    return (
      <main className=" w-full flex flex-col gap-10 justify-center items-center text-white">
        <InfoModal visible={isOpen} onClose={closeModal} />
        <Billboard />

        <div className=" flex flex-col w-full h-full">
          <MovieList key={1} title="Trending now" data={movies} />
          <MovieList key={2} title="My List" data={favourites} />
        </div>
      </main>
    );
  }
}
