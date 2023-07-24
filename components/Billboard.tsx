import useBillboard from "@/hooks/useBillboard";
import React, { useCallback } from "react";
import { AiOutlineInfoCircle } from "react-icons/ai";
import PlayButton from "./PlayButton";
import useInfoModal from "@/hooks/useInfoModal";

const Billboard = () => {
  const { data } = useBillboard();
  console.log(data);

  const { openModal } = useInfoModal();

  const handleModal = useCallback(() => {
    openModal(data?.id);
  }, [openModal, data?.id]);

  return (
    <div className="relative h-[56.25vw]">
      <video
        className="w-full h-[56.25vw] object-cover brightness-[60%]"
        autoPlay
        loop
        muted
        poster={data?.thumbnailUrl}
        src={data?.videoUrl}></video>
      <div className="absolute top-[30%] md:top-[40%] ml-4 md:ml-16">
        <p className="text-white text-xl md:text-5xl h-full w-[50%] font-bold drop-shadow-xl">
          {data?.title}
        </p>
        <p className="text-white text-[8px] md:text-lg mt-3 md:mt-0 w-[80%] md:w-[80%] drop-shadow-xl">
          {data?.description}
        </p>
        <div className="flex flex-row items-center mt-3 gap-3">
          <PlayButton movieId={data?.id} />
          <button
            onClick={handleModal}
            className="bg-white text-white bg-opacity-30 rounded-md py-1 px-2 w-auto text-xs font-semibold flex flex-row items-center hover:bg-opacity-20 transition">
            <AiOutlineInfoCircle className="mr-1" />
            More Info
          </button>
        </div>
      </div>
    </div>
  );
};

export default Billboard;
