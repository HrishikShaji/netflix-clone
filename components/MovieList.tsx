"use client";
import { isEmpty } from "lodash";
import React, { useEffect, useState } from "react";
import MovieCard from "./MovieCard";

interface MovieListProps {
  data: Record<string, any>[];
  title: string;
}

const MovieList: React.FC<MovieListProps> = ({ data, title }) => {
  if (!Array.isArray(data) || isEmpty(data)) {
    return null; // Or you can render a message indicating no data
  }

  return (
    <div className="px-4 mt-4 space-y-8 w-full h-full">
      <div>
        <p className="text-white text-md font-semibold">{title}</p>
        <div className="grid grid-cols-4 gap-2 w-full">
          {data?.map((movie) => (
            <MovieCard key={movie.id} data={movie} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieList;
