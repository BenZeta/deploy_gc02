import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
// import { IoStarSharp } from "react-icons/io5";

export default function MovieDetail() {
	const [movie, setMovie] = useState([]);
	const { id } = useParams();
	const navigate = useNavigate();

	async function fetchMovieDetail() {
		try {
			const { data } = await axios.get(
				`https://h8-phase2-gc.vercel.app/apis/pub/movie/movies/${id}`
			);
			setMovie(data.data);
		} catch (error) {
			console.error("Error fetching movie details:", error);
		}
	}

	useEffect(() => {
		fetchMovieDetail();
	}, []);

	return (
		<div className="bg-slate-700 min-h-screen flex justify-center items-center p-4">
			<div className="max-w-4xl w-full bg-gray-900 rounded-lg shadow-lg overflow-hidden flex flex-col md:flex-row">
				{/* Movie Poster */}
				<div className="w-full md:w-1/2">
					<img
						src={movie.imgUrl}
						alt={movie.title}
						className="w-full h-auto object-cover"
					/>
				</div>

				{/* Movie Details */}
				<div className="p-6 text-white w-full md:w-1/2 relative flex flex-col">
					{/* Title */}
					<h1 className="text-4xl font-bold mb-6 text-center md:text-left">
						{movie.title}
					</h1>

					{/* Info Block */}
					<div className="mb-6 space-y-4">
						<p className="text-yellow-400 font-semibold">
							Rating: {movie.rating || "N/A"}/10 ⭐
						</p>
						<p className="text-teal-400 font-semibold">
							Genre: {movie.Genre?.name || "N/A"}
						</p>
						<p className="text-purple-400 font-semibold">
							Added by: {movie.User?.username || "Unknown"}
						</p>
						<p className="text-gray-300 leading-relaxed">
							{movie.synopsis || "No synopsis available."}
						</p>
					</div>

					{/* Buttons */}
					<div className="absolute bottom-6 left-6 right-6 flex justify-center md:justify-start gap-4">
						<a
							href={movie.trailerUrl}
							target="_blank"
							rel="noopener noreferrer"
							className="bg-blue-600 hover:bg-blue-700 transition-colors duration-200 text-white font-semibold py-2 px-6 rounded-lg shadow-md">
							Watch Trailer
						</a>
						<button
							className="bg-amber-600 hover:bg-yellow-700 transition-colors duration-200 text-white font-semibold py-2 px-6 rounded-lg shadow-md"
							onClick={() => navigate("/")}>
							Go Back
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
