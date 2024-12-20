import { useEffect, useState } from "react";

const images = [
	"https://images.unsplash.com/photo-1613679074451-9ddcc1103cc8?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
	"https://cdn.pixabay.com/photo/2020/09/11/00/06/spiderman-5561671_1280.jpg",
	"https://wallpapercg.com/media/ts_orig/17010.webp",
	"https://images7.alphacoders.com/111/thumb-1920-1115209.jpg",
];

export default function Carousell({ goToMoviePage }) {
	const [currentIndex, setCurrentIndex] = useState(0);

	const nextSlide = () => {
		setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
	};

	const prevSlide = () => {
		setCurrentIndex(
			(prevIndex) => (prevIndex - 1 + images.length) % images.length
		);
	};

	useEffect(() => {
		const interval = setInterval(nextSlide, 4000); // Automatically slide every 3 seconds
		return () => clearInterval(interval); // Clear interval when the component unmounts
	}, [currentIndex]);

	return (
		<div className="relative w-full h-screen overflow-hidden">
			<div
				className="absolute inset-0 flex transition-transform duration-500"
				style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
				{images.map((image, index) => (
					<img
						key={index}
						src={image}
						alt={`Slide ${index + 1}`}
						className="w-full h-full object-cover flex-shrink-0"
					/>
				))}
			</div>

			{/* Overlay Text */}
			<div className="absolute inset-0 flex flex-col items-center justify-center z-10 text-center">
				<h1 className="text-5xl md:text-8xl font-extrabold text-white  mb-4">
					MovieWorld
				</h1>
				<p className="text-lg md:text-2xl text-white italic mb-8">
					Experience Movies Like Never Before.
				</p>
				<div className="flex space-x-4">
					<button
						className="border-2 border-white px-6 py-3 rounded-full font-bold text-white hover:bg-white hover:text-black transition"
						onClick={goToMoviePage}>
						Explore Movies
					</button>
				</div>
			</div>

			{/* Left Button */}
			<button
				className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-gray-800 text-white rounded-full p-2 hover:bg-gray-700 transition z-20"
				onClick={prevSlide}>
				&#10094; {/* Left Arrow */}
			</button>

			{/* Right Button */}
			<button
				className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-gray-800 text-white rounded-full p-2 hover:bg-gray-700 transition z-20"
				onClick={nextSlide}>
				&#10095; {/* Right Arrow */}
			</button>

			{/* Dots */}
			<div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
				{images.map((_, index) => (
					<button
						key={index}
						className={`w-3 h-3 rounded-full ${
							currentIndex === index ? "bg-white" : "bg-gray-500"
						}`}
						onClick={() => setCurrentIndex(index)}
					/>
				))}
			</div>
		</div>
	);
}
