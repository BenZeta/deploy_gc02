import axios from "axios";
import { useEffect, useState } from "react";

export default function GenrePage() {
	const [genres, setGenres] = useState([]);
	const [loading, setLoading] = useState(false);

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

	useEffect(() => {
		fetchGenres();
	}, []);

	return (
		<div className="bg-gray-800 min-h-screen text-white p-8 pt-24">
			<h1 className="text-4xl font-bold mb-8 text-center">Genres</h1>
			{loading ? (
				<div className="flex justify-center items-center h-full">
					<p className="text-2xl font-semibold">Loading genres...</p>
				</div>
			) : (
				<div className="overflow-x-auto">
					<table className="table-auto w-full max-w-4xl mx-auto bg-gray-700 text-white rounded-lg">
						<thead className="bg-gray-900">
							<tr>
								<th className="px-4 py-2 text-left">#</th>
								<th className="px-4 py-2 text-left">Genre ID</th>
								<th className="px-4 py-2 text-left">Genre Name</th>
							</tr>
						</thead>
						<tbody>
							{genres.map((genre, index) => (
								<tr
									key={genre.id}
									className={
										index % 2 === 0
											? "bg-gray-600 hover:scale-105 transition-transform duration-200"
											: "bg-gray-800 hover:scale-105 transition-transform duration-200"
									}>
									<td className="px-4 py-2">{index + 1}</td>
									<td className="px-4 py-2">{genre.id}</td>
									<td className="px-4 py-2">{genre.name}</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			)}
		</div>
	);
}
