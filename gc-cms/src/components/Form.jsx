import axios from "axios";
import { useEffect, useState } from "react";
import CustomButton from "./CustomButton";

export default function Form({ handleSubmit, propName, movie }) {
	const [genres, setGenres] = useState([]);
	const [loading, setLoading] = useState(false);
	const [form, setForm] = useState({
		title: "",
		trailerUrl: "",
		imgUrl: "",
		synopsis: "",
		rating: "",
		genreId: "",
	});

	useEffect(() => {
		if (movie) {
			delete movie.createdAt;
			delete movie.updatedAt;

			setForm((prev) => {
				return {
					...prev,
					...movie,
				};
			});
		}
	}, [movie]);

	const fetchGenres = async () => {
		try {
			setLoading(true);
			const { data } = await axios.get(
				"https://h8-phase2-gc.vercel.app/apis/movie/genres",
				{
					headers: {
						Authorization: `Bearer ${localStorage.access_token}`,
					},
				}
			);

			setGenres(data.data);
		} catch (error) {
			console.log(error);
		} finally {
			setLoading(false);
		}
	};

	const getFormData = (fieldName, event) => {
		if (fieldName === "rating" || fieldName === "genreId") {
			setForm((prev) => {
				return {
					...prev,
					[fieldName]: +event.target.value,
				};
			});
		} else {
			setForm((prev) => {
				return {
					...prev,
					[fieldName]: event.target.value,
				};
			});
		}
	};

	useEffect(() => {
		fetchGenres();
	}, []);

	return (
		<div className="flex items-center justify-center min-h-screen bg-gray-800 py-24">
			<div className="bg-gray-700 p-8 rounded-lg shadow-md w-full max-w-lg">
				<h1 className="text-2xl font-bold mb-6 text-white text-center">
					Movie Form
				</h1>
				<form onSubmit={(e) => handleSubmit(e, form)}>
					{/* Title Field */}
					<div className="mb-4">
						<label className="block mb-1 font-medium text-gray-100">
							Title
						</label>
						<input
							type="text"
							id="title"
							name="title"
							placeholder="Enter title"
							value={form.title}
							onChange={(event) => getFormData("title", event)}
							className="w-full p-2 border rounded bg-gray-800 border-gray-600
						text-white focus:ring focus:ring-blue-500"
						/>
					</div>

					{/* Trailer URL Field */}
					<div className="mb-4">
						<label
							htmlFor="trailerUrl"
							className="block mb-1 font-medium text-gray-100">
							Trailer URL
						</label>
						<input
							type="text"
							id="trailerUrl"
							name="trailerUrl"
							placeholder="Enter trailer URL"
							value={form.trailerUrl}
							onChange={(event) => getFormData("trailerUrl", event)}
							className="w-full p-2 border rounded bg-gray-800 border-gray-600
						text-white focus:ring focus:ring-blue-500"
						/>
					</div>

					{/* Image URL Field */}
					<div className="mb-4">
						<label
							htmlFor="imgUrl"
							className="block mb-1 font-medium text-gray-100">
							Image URL
						</label>
						<input
							type="text"
							id="imgUrl"
							name="imgUrl"
							placeholder="Enter image URL"
							value={form.imgUrl}
							onChange={(event) => getFormData("imgUrl", event)}
							className="w-full p-2 border rounded bg-gray-800 border-gray-600
						text-white focus:ring focus:ring-blue-500"
						/>
					</div>

					{/* Genre ID Field */}
					{loading ? (
						<div className="flex justify-center items-center h-full">
							<p className="text-2xl text-white font-semibold">
								Loading genres...
							</p>
						</div>
					) : (
						<div className="mb-4">
							<label
								htmlFor="genreId"
								className="block mb-1 font-medium text-gray-100">
								Genre
							</label>
							<select
								id="genreId"
								name="genreId"
								value={form.genreId}
								onChange={(event) => getFormData("genreId", event)}
								className="w-full p-2 border rounded bg-gray-800 border-gray-600
								text-white focus:ring focus:ring-blue-500">
								<option
									value=""
									hidden
									disabled>
									Select a genre
								</option>
								{genres.map((genre) => (
									<option
										key={genre.id}
										value={genre.id}>
										{genre.name}
									</option>
								))}
							</select>
						</div>
					)}

					{/* Rating Field */}
					<div className="mb-4">
						<label
							htmlFor="rating"
							className="block mb-1 font-medium text-gray-100">
							Rating
						</label>
						<input
							type="number"
							id="rating"
							name="rating"
							placeholder="Enter rating"
							value={form.rating}
							onChange={(event) => getFormData("rating", event)}
							className="w-full p-2 border rounded bg-gray-800 border-gray-600
						text-white focus:ring focus:ring-blue-500"
						/>
					</div>

					{/* Synopsis Field */}
					<div className="mb-4">
						<label
							htmlFor="synopsis"
							className="block mb-1 font-medium text-gray-100">
							Synopsis
						</label>
						<textarea
							id="synopsis"
							name="synopsis"
							placeholder="Enter synopsis"
							value={form.synopsis}
							onChange={(event) => getFormData("synopsis", event)}
							className="w-full p-2 border rounded bg-gray-800 border-gray-600
						text-white focus:ring focus:ring-blue-500"
							rows="3"></textarea>
					</div>

					<CustomButton
						label={propName}
						className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 mt-1 rounded font-bold transition"
					/>
				</form>
			</div>
		</div>
	);
}
