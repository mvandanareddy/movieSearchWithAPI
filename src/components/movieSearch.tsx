import React, { useState } from "react";
import { Movie } from "../types";

const MovieSearch: React.FC = () => {
  const [query, setQuery] = useState<string>("");
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const searchMovies = async () => {
    if (!query) return;
    setLoading(true);
    setError("");
    try {
      console.log("Fetching movies with query:", query);
      const apiKey = import.meta.env.VITE_API_URL;
      console.log(apiKey);

      const response = await fetch(
        `http://www.omdbapi.com/?s=${query}&apikey=${apiKey}`
      );
      const data = await response.json();
      console.log("API response data:", data);

      if (data.Response === "True") {
        setMovies(data.Search);
      } else {
        setError(data.Error || "No movies found");
      }
    } catch (err) {
      console.error("Error fetching movies:", err);
      setError("Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    searchMovies();
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-r from-purple-500 via-blue-500 to-teal-400 p-6">
      <div className="bg-white w-full max-w-7xl p-8 rounded-lg shadow-2xl">
        <h1 className="text-4xl text-center font-bold text-indigo-900 mb-8">
          Movie Search
        </h1>
        <form onSubmit={handleSearch} className="flex flex-col md:flex-row items-center gap-4">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for a movie..."
            className="p-3 w-full md:w-3/4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button
            type="submit"
            className="p-3 px-6 w-full md:w-auto text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition duration-200"
          >
            Search
          </button>
        </form>
        {loading && <p className="text-center text-lg text-gray-500 mt-4">Loading...</p>}
        {error && <p className="text-center text-lg text-red-500 mt-4">{error}</p>}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mt-8">
          {movies.map((movie) => (
            <div key={movie.imdbID} className="border-2 border-gray-300 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition duration-200">
              <img
                src={movie.Poster}
                alt={movie.Title}
                className="w-full h-72 object-cover"
              />
              <div className="p-4 text-center">
                <h3 className="text-lg font-semibold text-indigo-700">{movie.Title}</h3>
                <p className="text-gray-600">{movie.Year}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieSearch;
