/* eslint-disable react/prop-types */
import { useNavigate } from "react-router";

export default function Card({ movies }) {
  const navigate = useNavigate();

  return (
    <>
      {movies.map((movie) => {
        return (
          <div
            key={movie.id}
            className="movie-card bg-gray-800 shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105"
          >
            <img
              src={movie.imgUrl}
              alt={movie.title}
              className="w-full h-96 object-cover"
              onClick={() => navigate(`/${movie.id}`)}
            />
            <div className="p-4 w-screen bg-transparent-50">
              <h2 className="font-bold text-2xl text-white">
                {movie.title.split(" ").length > 4 ||
                movie.title.length > 20 ||
                movie.title.split(":").length > 1 ||
                movie.title.split("-").length > 1
                  ? movie.title.substring(0, 20) + ".."
                  : movie.title}
              </h2>
              <p className="text-gray-400 text-sm mt-2">{movie.description}</p>
              <p className="mt-3 text-sm text-gray-400">
                Rating: <span className="text-yellow-500 font-bold">{movie.rating}/10</span>
              </p>
              <a
                href={movie.trailerUrl}
                target="_blank"
                className="block mt-4 text-blue-400 hover:underline font-semibold"
              >
                Watch Trailer
              </a>
            </div>
          </div>
        );
      })}
    </>
  );
}
