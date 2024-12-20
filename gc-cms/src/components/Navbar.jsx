/* eslint-disable react/prop-types */
import { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router";
import Toastify from "toastify-js";

export default function Navbar() {
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);
	const navigate = useNavigate();

	function handleLogout() {
		localStorage.clear();
		Toastify({
			text: "Sucessfully logged out",
			duration: 3000,
			gravity: "bottom", // `top` or `bottom`
			position: "right", // `left`, `center` or `right`
			stopOnFocus: true, // Prevents dismissing of toast on hover
			style: {
				background: "linear-gradient(to right, #00b09b, #96c93d)",
			},
			onClick: function () {}, // Callback after click
		}).showToast();
		navigate("/login");
	}

	return (
		<>
			{/* Navbar */}
			<nav className="fixed top-0 left-0 w-full bg-gray-800 bg-opacity-70 backdrop-blur-lg text-white shadow-md z-50">
				<div className="flex items-center justify-between py-4 px-6 mx-5">
					{/* Logo */}
					<button
						onClick={() => navigate("/")}
						className="text-2xl font-bold hover:text-blue-400 transition-colors duration-200">
						MovieWorld
					</button>

					<div className="relative flex justify-center items-center space-x-4 right-12">
						<NavLink
							to="/"
							className={({ isActive }) =>
								isActive
									? "text-blue-400 text-lg font-bold hover:scale-105"
									: "hover:scale-105"
							}>
							Home
						</NavLink>
						<NavLink
							to="/genres"
							className={({ isActive }) =>
								isActive
									? "text-blue-400 text-lg font-bold hover:scale-105"
									: "hover:scale-105"
							}>
							Genres
						</NavLink>
						<NavLink
							to="/add-user"
							className={({ isActive }) =>
								isActive
									? "text-blue-400 text-lg font-bold hover:scale-105"
									: "hover:scale-105"
							}>
							Add User
						</NavLink>
						<NavLink
							to="/add-movies"
							className={({ isActive }) =>
								isActive
									? "text-blue-400 text-lg font-bold hover:scale-105"
									: "hover:scale-105"
							}>
							Add Movie
						</NavLink>
					</div>

					{/* Profile Icon */}
					<div className="relative">
						<button
							onClick={() => setIsDropdownOpen(!isDropdownOpen)}
							className="text-white hover:text-blue-400 transition">
							<FaUserCircle
								className="text-3xl w-full h-full"
								size="2.5rem"
							/>
						</button>

						{/* Dropdown Menu */}
						{isDropdownOpen && (
							<div className="absolute right-0 mt-2 w-48 bg-gray-700 rounded-lg shadow-lg py-2 z-10">
								<button
									onClick={handleLogout}
									className="block w-full text-left px-4 py-2 text-white hover:bg-gray-600 transition">
									Logout
								</button>
							</div>
						)}
					</div>
				</div>
			</nav>
		</>
	);
}
