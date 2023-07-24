"use client";
import React from "react";
import { BsFillPlayFill } from "react-icons/bs";
import FavouriteButton from "./FavouriteButton";
import { useRouter } from "next/navigation";
import useInfoModal from "@/hooks/useInfoModal";
import { BiChevronDown } from "react-icons/bi";

interface MovieCardProps {
  data: Record<string, any>;
}

const MovieCard: React.FC<MovieCardProps> = ({ data }) => {
  const router = useRouter();

  const { openModal } = useInfoModal();
  return (
    <div className="group bg-zinc-900 col-span relative  w-full h-[110px]">
      <div className="absolute z-10 top-0 left-0 flex flex-col h-full group-hover:-translate-y-[130px] w-full transition duration group-hover:opacity-90 ">
        <img
          src={data.thumbnailUrl}
          alt="thumbnail"
          className="cursor-pointer object-cover  shadow-xl rounded-md  w-full  h-full "
        />
      </div>
      <div className="absolute w-full h-full">
        <BsFillPlayFill
          onClick={() => router.push(`/watch/${data?.id}`)}
          className="cursor-pointer"
          size={30}
        />
        <FavouriteButton movieId={data?.id} />
        <div
          onClick={() => openModal(data?.id)}
          className="cursor-pointer ml-auto w-6 h-6 border-white border-2 transition hover:bg-neutral-300 flex justify-center items-center rounded-full">
          <BiChevronDown size={30} className="" />
        </div>
        <h1>{data.title}</h1>
        <p>{data.genre}</p>
      </div>
    </div>
  );
};

export default MovieCard;
