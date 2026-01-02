import {
	button,
	div,
	h2,
	input,
	li,
	section,
	span,
	state,
	ul,
} from "../../src";

export const TodoApp = () => {
	const tasks = state<string[]>([]);
	const newTask = state("");

	const addTask = () => {
		if (newTask.value.trim()) {
			tasks.value = [...tasks.value, newTask.value];
			newTask.value = "";
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
		h2("Todo List", { style: { textAlign: "center", color: "#333" } }),
		div(
			{ style: { display: "flex", gap: "10px", marginBottom: "20px" } },
			input(newTask, {
				placeholder: "Add a new task...",
				style: { flex: "1", padding: "8px" },
			}),
			button("Add", {
				style: {
					padding: "8px 16px",
					background: "#007BFF",
					color: "white",
					border: "none",
					cursor: "pointer",
				},
				onclick: addTask,
			}),
		),
		ul({ style: { listStyle: "none", padding: "0" } }).each(
			tasks,
			(task, index) =>
				li(
					{
						style: {
							padding: "10px",
							borderBottom: "1px solid #eee",
							display: "flex",
							justifyContent: "space-between",
						},
					},
					span(task),
					button("×", {
						style: {
							color: "red",
							border: "none",
							background: "none",
							cursor: "pointer",
						},
						onclick: () => {
							tasks.value = tasks.value.filter((_, i) => i !== index);
						},
					}),
				),
		),
	);
};
