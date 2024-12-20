import { useState } from "react";
import axios from "axios";
import Toastify from "toastify-js";
import { useNavigate } from "react-router";
import CustomButton from "../components/CustomButton";

export default function LoginPage() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const navigate = useNavigate();

	const handleLogin = async (e) => {
		e.preventDefault();
		try {
			const { data } = await axios.post(
				"https://h8-phase2-gc.vercel.app/apis/login",
				{ email, password }
			);

			const access_token = data.data.access_token;

			localStorage.setItem("access_token", access_token);
			Toastify({
				text: "Login successful",
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
		<div className="min-h-screen bg-gray-900 flex items-center justify-center p-6">
			<div className="max-w-md w-full bg-gray-800 rounded-lg shadow-lg p-8">
				<h2 className="text-3xl font-bold text-white text-center mb-6">
					Login
				</h2>
				<form onSubmit={handleLogin}>
					<div className="mb-4">
						<label
							htmlFor="email"
							className="block text-gray-400 text-sm font-medium mb-2">
							Email Address
						</label>
						<input
							type="email"
							id="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							placeholder="Enter your email"
							className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
						/>
					</div>

					<div className="mb-4">
						<label
							htmlFor="password"
							className="block text-gray-400 text-sm font-medium mb-2">
							Password
						</label>
						<input
							type="password"
							id="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							placeholder="Enter your password"
							className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
						/>
					</div>

					<CustomButton
						type="submit"
						className="mt-5 w-full text-white rounded-lg bg-blue-400 py-2 px-4"
						label="Login"
					/>
				</form>
			</div>
		</div>
	);
}
