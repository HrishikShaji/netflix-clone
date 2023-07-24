"use client";
import axios from "axios";
import useCurrentUser from "@/hooks/useCurrentUser";
import React, { useCallback } from "react";
import { AiOutlineCheck, AiOutlinePlus } from "react-icons/ai";
import useFavourites from "@/hooks/useFavourites";
import { useMemo } from "react";

interface FavouriteButtonProps {
  movieId: string;
}

const FavouriteButton: React.FC<FavouriteButtonProps> = ({ movieId }) => {
  const { mutate: mutateFavourites } = useFavourites();
  const { data: currentUser, mutate } = useCurrentUser();

  const isFavourite = useMemo(() => {
    const list = currentUser?.favouriteIds || [];

    return list.includes(movieId);
  }, [currentUser, movieId]);

  const toggleFavourites = useCallback(async () => {
    let response;
    if (isFavourite) {
      response = await axios.delete("/api/favourite", { data: { movieId } });
    } else {
      await fetch("/api/favourite", {
        method: "POST",
        body: JSON.stringify({ movieId }),
        headers: { "Content-Type": "application/json" },
      });
    }
    const updatedFavouriteIds = response?.data?.favouriteIds;

    mutate({
      ...currentUser,
      favouriteIds: updatedFavouriteIds,
    });

    mutateFavourites();
  }, [movieId, isFavourite, currentUser, mutate, mutateFavourites]);

  const Icon = isFavourite ? AiOutlineCheck : AiOutlinePlus;

  return (
    <div
      onClick={toggleFavourites}
      className="cursor-pointer group/item w-6 h-6 border-white rounded-full flex justify-center items-center transition hover:border-neutral-300">
      <Icon className="text-white" />
    </div>
  );
};

export default FavouriteButton;
