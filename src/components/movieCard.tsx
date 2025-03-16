import React from "react";
import { Movie } from "../types";

export interface MovieCardProps {
  movie: Movie;
}

export const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  return (
    <div className="border-2 border-gray-300 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-transform transform hover:scale-105 bg-white">
      <img
        src={movie.Poster}
        alt={movie.Title}
        className="w-full h-80 object-cover"
      />
      <div className="text-center p-4">
        <h2 className="text-2xl font-bold text-indigo-700">{movie.Title}</h2>
        <p className="text-gray-600 text-lg font-medium mt-1">{movie.Year}</p>
      </div>
    </div>
  );
};
