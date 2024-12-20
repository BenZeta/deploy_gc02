import axios from "axios";
import Form from "../components/Form";
import { useNavigate, useParams } from "react-router";
import Toastify from "toastify-js";
import { useEffect, useState } from "react";

export default function EditMoviePage() {
	const [movie, setMovie] = useState({});
	const navigate = useNavigate();
	const { id } = useParams();

	const fetchMovie = async () => {
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

	const handleSubmit = async (e, form) => {
		e.preventDefault();
		try {
			const { data } = await axios.put(
				`https://h8-phase2-gc.vercel.app/apis/movie/movies/${id}`,
				form,
				{
					headers: {
						Authorization: `Bearer ${localStorage.access_token}`,
					},
				}
			);

			Toastify({
				text: data?.message,
				duration: 3000,
				gravity: "bottom", // `top` or `bottom`
				position: "right", // `left`, `center` or `right`
				stopOnFocus: true, // Prevents dismissing of toast on hover
				style: {
					background: "linear-gradient(to right, #00b09b, #96c93d)",
				},
				onClick: function () {}, // Callback after click
			}).showToast();

			navigate("/");
		} catch (error) {
			Toastify({
				text: "Error",
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
		fetchMovie();
	}, []);

	return (
		<Form
			propName="Edit Movie"
			handleSubmit={handleSubmit}
			movie={movie}
		/>
	);
}
