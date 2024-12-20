import { useEffect, useState } from "react";
import axios from "axios";
import Toastify from "toastify-js";
import { useNavigate } from "react-router";
import { MdDelete } from "react-icons/md";
import { BiMessageSquareEdit } from "react-icons/bi";
import { FaUpload } from "react-icons/fa6";

export default function HomePage() {
	const [movies, setMovies] = useState([]);
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();

	const handleDelete = async (movieId) => {
		try {
			const { data } = await axios.delete(
				`https://h8-phase2-gc.vercel.app/apis/movie/movies/${movieId}`,
				{
					headers: {
						Authorization: `Bearer ${localStorage.access_token}`,
					},
				}
			);
			fetchMovies();

			Toastify({
				text: data.message,
				duration: 3000,
				gravity: "bottom", // `top` or `bottom`
				position: "right", // `left`, `center` or `right`
				stopOnFocus: true, // Prevents dismissing of toast on hover
				style: {
					background: "linear-gradient(to right, #00b09b, #96c93d)",
				},
				onClick: function () {}, // Callback after click
			}).showToast();
		} catch (error) {
			Toastify({
				text: error.response.data.error,
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

	const handleImageUpdate = async (e, movieId) => {
		try {
			const images = e.target.files[0];
			const formData = new FormData();
			formData.append("file", images);

			const { data } = await axios.patch(
				`https://h8-phase2-gc.vercel.app/apis/movie/movies/${movieId}`,
				formData,
				{
					headers: {
						Authorization: `Bearer ${localStorage.access_token}`,
					},
				}
			);

			fetchMovies();

			Toastify({
				text: data.message,
				duration: 3000,
				gravity: "bottom", // `top` or `bottom`
				position: "right", // `left`, `center` or `right`
				stopOnFocus: true, // Prevents dismissing of toast on hover
				style: {
					background: "linear-gradient(to right, #00b09b, #96c93d)",
				},
				onClick: function () {}, // Callback after click
			}).showToast();
		} catch (error) {
			Toastify({
				text: error.response.data.error,
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

	const fetchMovies = async () => {
		try {
			setLoading(true);
			const { data } = await axios.get(
				"https://h8-phase2-gc.vercel.app/apis/movie/movies",
				{
					headers: {
						Authorization: `Bearer ${localStorage.access_token}`,
					},
				}
			);
			setMovies(data.data);
		} catch (error) {
			console.log(error);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchMovies();
	}, []);

	return (
		<div className="bg-gray-800 min-h-screen text-white p-8 py-24">
			{/* Title */}
			<h1 className="text-4xl font-bold mb-8 text-center">Dashboard</h1>

			{/* Loading Indicator */}
			{loading ? (
				<div className="flex justify-center items-center h-full">
					<p className="text-2xl font-semibold">Loading movies...</p>
				</div>
			) : (
				<div className="overflow-x-auto">
					{/* Table */}
					<table className="table-auto w-full border-collapse bg-gray-800 shadow-lg rounded-lg overflow-hidden">
						{/* Table Header */}
						<thead>
							<tr className="bg-gray-900 text-gray-300">
								<th className="px-6 py-4 text-left">ID</th>
								<th className="px-6 py-4 text-left">Title</th>
								<th className="px-6 py-4 text-left">Synopsis</th>
								<th className="px-6 py-4 text-center">Image</th>
								<th className="px-6 py-4 text-center">Trailer</th>
								<th className="px-6 py-4 text-center">Rating</th>
								<th className="px-6 py-4 text-center">Actions</th>
							</tr>
						</thead>

						{/* Table Body */}
						<tbody>
							{movies.map((movie) => (
								<tr
									key={movie.id}
									className="border-b border-gray-700 hover:bg-gray-700 hover:scale-[1.02] transition-transform duration-200">
									<td className="px-6 py-4">{movie.id}</td>
									<td className="px-6 py-4">{movie.title}</td>
									<td className="px-6 py-4 truncate max-w-xs">
										{movie.synopsis.substring(0, 50) + "..."}
									</td>
									<td className="px-6 py-4 text-center">
										<img
											src={movie.imgUrl}
											alt={movie.title}
											className="w-20 h-20 object-cover rounded-lg mx-auto"
										/>
									</td>
									<td className="px-6 py-4 text-center whitespace-nowrap">
										<a
											href={movie.trailerUrl}
											className="text-blue-400 hover:text-blue-500 underline transition">
											Watch Trailer
										</a>
									</td>
									<td className="px-6 py-4 text-center text-yellow-400">
										{movie.rating.toFixed(1)}
									</td>
									<td className="px-6 py-4 text-center">
										<div className="flex justify-center space-x-5">
											<label htmlFor={`uploadFile${movie.id}`}>
												<FaUpload
													size="2rem"
													className="cursor-pointer hover:scale-105 relative top-1.5 right-2"
												/>
												<input
													type="file"
													id={`uploadFile${movie.id}`}
													onChange={(e) => handleImageUpdate(e, movie.id)}
													className="hidden">
													{/* <FaUpload /> */}
												</input>
											</label>
											{/* <CiRead
												className="cursor-pointer hover:scale-105"
												onClick={() => navigate(`/movie/${movie.id}`)}
												size="2.5rem"
											/> */}
											<BiMessageSquareEdit
												onClick={() => navigate(`/edit-movie/${movie.id}`)}
												className="cursor-pointer hover:scale-105"
												size="2.5rem"
											/>
											<MdDelete
												onClick={() => handleDelete(movie.id)}
												className="cursor-pointer hover:scale-105"
												size="2.5rem"
											/>
										</div>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			)}
		</div>
	);
}
