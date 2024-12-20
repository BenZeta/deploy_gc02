import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import Toastify from "toastify-js";
import CustomButton from "../components/CustomButton";

export default function MovieDetail() {
	const [movie, setMovie] = useState({});
	const { id } = useParams();
	const navigate = useNavigate();

	const fetchMovieDetail = async () => {
		try {
			const { data } = await axios.get(
				`https://h8-phase2-gc.vercel.app/apis/movie/movies/${id}`,
				{
					headers: {
						Authorization: `Bearer ${localStorage.access_token}`,
					},
				}
			);

			setMovie(data.data);
		} catch (error) {
			Toastify({
				text: error.message,
				duration: 3000,
				close: true,
				gravity: "bottom", // `top` or `bottom`
				position: "right", // `left`, `center` or `right`
				stopOnFocus: true, // Prevents dismissing of toast on hover
				style: {
					background: "linear-gradient(to right, #df1b1b, #ba3030)",
				},
				onClick: function () {}, // Callback after click
			}).showToast();
		}
	};
	useEffect(() => {
		fetchMovieDetail();
	}, [id]);

	return (
		<div className="py-12 bg-gradient-to-b from-gray-900 to-gray-800 min-h-screen text-white">
			{/* Container */}
			<div className="max-w-4xl mx-auto py-12 px-4">
				{/* Header */}
				<h1 className="text-4xl font-bold mb-8 text-center">{movie.title}</h1>

				{/* Content */}
				<div className="flex flex-col md:flex-row bg-gray-800 shadow-lg rounded-lg overflow-hidden">
					{/* Movie Image */}
					<img
						src={movie.imgUrl}
						alt={movie.title}
						className="w-full md:w-1/3 object-cover"
					/>

					{/* Movie Details */}
					<div className="p-6 md:w-2/3">
						{/* Synopsis */}
						<h2 className="text-2xl font-semibold mb-4">Synopsis</h2>
						<hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-500" />
						<p className="text-gray-300 mb-6">{movie.synopsis}</p>

						{/* Rating & Genre */}
						<div className="mb-6">
							<p className="text-yellow-400 font-bold text-lg">
								⭐ Rating: {movie.rating}/10
							</p>
							<p className="text-gray-400 mt-6 font-semibold">
								Created At:
								<span className="text-white">
									{" "}
									{movie?.createdAt?.split("T")[0]}
								</span>
							</p>
						</div>

						{/* Added By */}
						<p className="text-gray-400 mb-6 font-semibold">
							Updated At:{" "}
							<span className="text-white">
								{movie?.updatedAt?.split("T")[0]}
							</span>
						</p>

						{/* Trailer Button */}
						<div className="flex justify-between">
							<a
								href={movie.trailerUrl}
								target="_blank"
								rel="noopener noreferrer"
								className="bg-blue-500 text-white py-2 px-4 rounded-lg font-semibold hover:bg-blue-600 transition">
								Watch Trailer
							</a>
							<CustomButton
								className="bg-slate-500 rounded-lg font-semibold text-white hover:bg-slate-600 transition py-2 px-4"
								onClick={() => navigate("/")}
								label="Go Back"
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
