import Form from "../components/Form";
import axios from "axios";
import Toastify from "toastify-js";
import { useNavigate } from "react-router";

export default function AddMoviePage() {
	const navigate = useNavigate();

	const handleSubmit = async (e, form) => {
		e.preventDefault();
		try {
			const { data } = await axios.post(
				"https://h8-phase2-gc.vercel.app/apis/movie/movies",
				form,
				{
					headers: {
						Authorization: `Bearer ${localStorage.access_token}`,
					},
				}
			);
			Toastify({
				text: `Sucessfully added movie with title ${data.data.title}`,
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
			console.log(error);

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

	return (
		<Form
			propName="Add Movie"
			handleSubmit={handleSubmit}
		/>
	);
}
