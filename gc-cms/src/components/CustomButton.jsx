export default function CustomButton({
	className = "",
	type = "submit",
	label = "Button",
	onClick = () => {},
}) {
	return (
		<button
			type={type}
			onClick={onClick}
			className={className}>
			{label}
		</button>
	);
}
