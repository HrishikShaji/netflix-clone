"use client";
import React from "react";
import useSWR from "swr";
import fetcher from "@/lib/fetcher";

const useFavourites = () => {
  const { data, error, isLoading, mutate } = useSWR(
    "/api/favourites",
    fetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  const favourites = data || [];

  return { favourites, error, isLoading, mutate };
};

export default useFavourites;
