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

// We need individual states for two-way binding to work cleanly with the current implementation
// of `input(state)`.
// The current `state({...})` returns a proxy where accessing properties returns values, not sub-states.
// To support `input(formData.name)`, we'd need nested proxies or just use individual states for fields.
// For the "Magic" to work as `input(state)`, `state` must be the State object.
// If I use `const name = state("")`, `input(name)` works.
// If I use `const form = state({ name: "" })`, `input(form.value.name)` passes a string, not a state.
// So I should refactor the demo to use individual states or maybe we need a way to get a sub-state.
// Given the "Magic" constraint, let's use individual states for the fields for maximum clarity and magic.

export const FormDemo = () => {
	const name = state("");
	const emailState = state("");
	const password = state("");

	const errors = state({
		name: [] as string[],
		email: [] as string[],
		password: [] as string[],
	});

	const handleSubmit = (e: MouseEvent) => {
		e.preventDefault();

		// Validate
		errors.value = {
			name: validate(name.value, [required, minLength(3)]),
			email: validate(emailState.value, [required, email]),
			password: validate(password.value, [required, minLength(6)]),
		};

		const hasErrors = Object.values(errors.value).some((err) => err.length > 0);

		if (!hasErrors) {
			alert(
				`Form submitted!\n${JSON.stringify({ name: name.value, email: emailState.value, password: password.value }, null, 2)}`,
			);
			// Reset
			name.value = "";
			emailState.value = "";
			password.value = "";
		}
	};

	return section(
		{
			style: {
				padding: "20px",
				maxWidth: "400px",
				margin: "0 auto",
				fontFamily: "sans-serif",
			},
		},
		h2("Registration Form", { style: { textAlign: "center" } }),

		// Name Field
		div(
			{ style: { marginBottom: "15px" } },
			span("Name", { style: { display: "block", marginBottom: "5px" } }),
			input(name, {
				placeholder: "Enter Name",
				style: { width: "100%", padding: "8px", boxSizing: "border-box" },
			}),
			div(
				{ style: { color: "red", fontSize: "12px", marginTop: "5px" } },
				() => errors.value.name.join(", "),
			),
		),

		// Email Field
		div(
			{ style: { marginBottom: "15px" } },
			span("Email", { style: { display: "block", marginBottom: "5px" } }),
			input("email", emailState, {
				placeholder: "Enter Email",
				style: { width: "100%", padding: "8px", boxSizing: "border-box" },
			}),
			div(
				{ style: { color: "red", fontSize: "12px", marginTop: "5px" } },
				() => errors.value.email.join(", "),
			),
		),

		// Password Field
		div(
			{ style: { marginBottom: "15px" } },
			span("Password", { style: { display: "block", marginBottom: "5px" } }),
			input("password", password, {
				placeholder: "Enter Password",
				style: { width: "100%", padding: "8px", boxSizing: "border-box" },
			}),
			div(
				{ style: { color: "red", fontSize: "12px", marginTop: "5px" } },
				() => errors.value.password.join(", "),
			),
		),

		button("Register", {
			style: {
				width: "100%",
				padding: "10px",
				background: "#28a745",
				color: "white",
				border: "none",
				cursor: "pointer",
			},
			onclick: handleSubmit,
		}),
	);
};
