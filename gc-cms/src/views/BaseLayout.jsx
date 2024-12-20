import { useEffect } from "react";
import Navbar from "../components/Navbar";
import { Outlet, useNavigate } from "react-router";
import Toastify from "toastify-js";

export default function BaseLayout() {
	const navigate = useNavigate();

	useEffect(() => {
		if (!localStorage.access_token) {
			Toastify({
				text: "Please login first",
				duration: 3000,
				gravity: "bottom", // `top` or `bottom`
				position: "right", // `left`, `center` or `right`
				stopOnFocus: true, // Prevents dismissing of toast on hover
				style: {
					background: "linear-gradient(to right, #df1b1b, #ba3030)",
				},
				onClick: function () {}, // Callback after click
			}).showToast();
			navigate("/login");
		}
	}, []);

	return (
		<>
			<Navbar />
			<Outlet />
		</>
	);
}
