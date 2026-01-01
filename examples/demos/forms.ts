import {
	button,
	div,
	email,
	h2,
	input,
	minLength,
	required,
	section,
	span,
	state,
	validate,
} from "../../out";

export const FormDemo = () => {
	const formData = state({
		name: "",
		email: "",
		password: "",
	});

	const errors = state({
		name: [] as string[],
		email: [] as string[],
		password: [] as string[],
	});

	const handleSubmit = (e: MouseEvent) => {
		e.preventDefault();

		// Validate
		errors.value = {
			name: validate(formData.value.name, [required, minLength(3)]),
			email: validate(formData.value.email, [required, email]),
			password: validate(formData.value.password, [required, minLength(6)]),
		};

		const hasErrors = Object.values(errors.value).some((err) => err.length > 0);

		if (!hasErrors) {
			alert(`Form submitted!\n${JSON.stringify(formData.value, null, 2)}`);
			// Reset
			formData.value = { name: "", email: "", password: "" };
		}
	};

	return section()
		.style({
			padding: "20px",
			maxWidth: "400px",
			margin: "0 auto",
			fontFamily: "sans-serif",
		})
		.with(h2("Registration Form").style({ textAlign: "center" }))
		.with(
			div()
				.style({ marginBottom: "15px" })
				.with(span("Name").style({ display: "block", marginBottom: "5px" }))
				.with(
					input()
						.value(formData.value.name)
						.onInput(
							(val) => (formData.value = { ...formData.value, name: val }),
						)
						.style({ width: "100%", padding: "8px", boxSizing: "border-box" }),
				)
				.with(
					div()
						.style({ color: "red", fontSize: "12px", marginTop: "5px" })
						.each(
							() => errors.value.name,
							(err) => span(err).style({ display: "block" }),
						),
				),
		)
		.with(
			div()
				.style({ marginBottom: "15px" })
				.with(span("Email").style({ display: "block", marginBottom: "5px" }))
				.with(
					input("email")
						.value(formData.value.email)
						.onInput(
							(val) => (formData.value = { ...formData.value, email: val }),
						)
						.style({ width: "100%", padding: "8px", boxSizing: "border-box" }),
				)
				.with(
					div()
						.style({ color: "red", fontSize: "12px", marginTop: "5px" })
						.each(
							() => errors.value.email,
							(err) => span(err).style({ display: "block" }),
						),
				),
		)
		.with(
			div()
				.style({ marginBottom: "15px" })
				.with(span("Password").style({ display: "block", marginBottom: "5px" }))
				.with(
					input("password")
						.value(formData.value.password)
						.onInput(
							(val) => (formData.value = { ...formData.value, password: val }),
						)
						.style({ width: "100%", padding: "8px", boxSizing: "border-box" }),
				)
				.with(
					div()
						.style({ color: "red", fontSize: "12px", marginTop: "5px" })
						.each(
							() => errors.value.password,
							(err) => span(err).style({ display: "block" }),
						),
				),
		)
		.with(
			button("Register")
				.style({
					width: "100%",
					padding: "10px",
					background: "#28a745",
					color: "white",
					border: "none",
					cursor: "pointer",
				})
				.onClick(handleSubmit),
		);
};
