import { useRouter } from "next/navigation";
import React from "react";
import { BsFillPlayFill } from "react-icons/bs";

interface PlayButtonProps {
  movieId: string;
}

const PlayButton: React.FC<PlayButtonProps> = ({ movieId }) => {
  const router = useRouter();

  return (
    <button
      onClick={() => router.push(`/watch/${movieId}`)}
      className="bg-white text-black rounded-md py-1 px-2 w-auto text-xs font-semibold flex justify-center items-center hover:bg-neutral-300">
      <BsFillPlayFill size={25} className="mr-1" /> Play
    </button>
  );
};

export default PlayButton;
