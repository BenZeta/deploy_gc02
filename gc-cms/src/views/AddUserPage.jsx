import { useState } from "react";
import CustomButton from "../components/CustomButton";
import axios from "axios";
import Toastify from "toastify-js";

export default function AddUserForm() {
	const [user, setUser] = useState({
		username: "",
		email: "",
		password: "",
		phoneNumber: "",
		address: "",
	});

	const getFormData = (fieldName, event) => {
		setUser((prev) => {
			return {
				...prev,
				[fieldName]: event.target.value,
			};
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const { data } = await axios.post(
				"https://h8-phase2-gc.vercel.app/apis/add-user",
				user,
				{
					headers: {
						Authorization: `Bearer ${localStorage.access_token}`,
					},
				}
			);

			Toastify({
				text: `User with email ${data.data.email} has been added`,
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
	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-800 text-white py-24">
			<div className="bg-gray-700 p-8 rounded-lg shadow-lg w-full max-w-lg">
				<h1 className="text-2xl font-bold mb-6 text-center">Add New User</h1>
				<form onSubmit={handleSubmit}>
					<div className="mb-4">
						<label
							htmlFor="username"
							className="block mb-1 font-medium">
							Username
						</label>
						<input
							type="text"
							id="username"
							name="username"
							placeholder="Enter username"
							onChange={(event) => getFormData("username", event)}
							className="w-full p-2 border rounded bg-gray-800 border-gray-600
						text-white focus:ring focus:ring-blue-500"
						/>
					</div>

					<div className="mb-4">
						<label
							htmlFor="email"
							className="block mb-1 font-medium">
							Email
						</label>
						<input
							type="email"
							id="email"
							name="email"
							placeholder="Enter email"
							onChange={(event) => getFormData("email", event)}
							className="w-full p-2 border rounded bg-gray-800 border-gray-600
						text-white focus:ring focus:ring-blue-500"
						/>
					</div>

					<div className="mb-4">
						<label
							htmlFor="password"
							className="block mb-1 font-medium">
							Password
						</label>
						<input
							type="password"
							id="password"
							name="password"
							placeholder="Enter password"
							onChange={(event) => getFormData("password", event)}
							className="w-full p-2 border rounded bg-gray-800 border-gray-600 text-white focus:ring focus:ring-blue-500"
						/>
					</div>

					<div className="mb-4">
						<label
							htmlFor="phoneNumber"
							className="block mb-1 font-medium">
							Phone Number
						</label>
						<input
							type="text"
							id="phoneNumber"
							name="phoneNumber"
							placeholder="Enter phone number"
							onChange={(event) => getFormData("phoneNumber", event)}
							className="w-full p-2 border rounded bg-gray-800 border-gray-600 text-white focus:ring focus:ring-blue-500"
						/>
					</div>

					<div className="mb-6">
						<label
							htmlFor="address"
							className="block mb-1 font-medium">
							Address
						</label>
						<input
							type="text"
							id="address"
							name="address"
							placeholder="Enter address"
							onChange={(event) => getFormData("address", event)}
							className="w-full p-2 border rounded bg-gray-800 border-gray-600 text-white focus:ring focus:ring-blue-500"
						/>
					</div>

					<CustomButton
						label="Add User"
						type="submit"
						className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded font-bold transition"
					/>
				</form>
			</div>
		</div>
	);
}
