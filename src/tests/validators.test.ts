import { describe, it, expect } from "bun:test";
import {
	required,
	minLength,
	maxLength,
	email,
	pattern,
	min,
	max,
	validate,
} from "../utils/validators";

describe("Validators", () => {
	describe("required", () => {
		it("should return error for empty string", () => {
			expect(required("")).toBe("This field is required");
		});

		it("should return error for null", () => {
			expect(required(null)).toBe("This field is required");
		});

		it("should return error for undefined", () => {
			expect(required(undefined)).toBe("This field is required");
		});

		it("should return null for valid input", () => {
			expect(required("hello")).toBe(null);
			expect(required(0)).toBe(null);
		});
	});

	describe("minLength", () => {
		const validator = minLength(5);

		it("should return error if string is too short", () => {
			expect(validator("hey")).toBe("Minimum length is 5 characters");
		});

		it("should return null if string is long enough", () => {
			expect(validator("hello")).toBe(null);
			expect(validator("hello world")).toBe(null);
		});

		it("should handle empty value (usually handled by required)", () => {
			// Current implementation returns null if empty (skips check)
			// because usually minLength implies value is present.
			// If it's optional, empty string is valid.
			expect(validator("")).toBe(null);
		});
	});

	describe("maxLength", () => {
		const validator = maxLength(5);

		it("should return error if string is too long", () => {
			expect(validator("hello world")).toBe("Maximum length is 5 characters");
		});

		it("should return null if string is short enough", () => {
			expect(validator("hey")).toBe(null);
			expect(validator("hello")).toBe(null);
		});
	});

	describe("email", () => {
		it("should return error for invalid email", () => {
			expect(email("invalid-email")).toBe("Invalid email address");
			expect(email("test@")).toBe("Invalid email address");
			expect(email("@domain.com")).toBe("Invalid email address");
		});

		it("should return null for valid email", () => {
			expect(email("test@example.com")).toBe(null);
		});
	});

	describe("pattern", () => {
		const validator = pattern(/^[0-9]+$/, "Must be numbers");

		it("should return error if pattern does not match", () => {
			expect(validator("abc")).toBe("Must be numbers");
		});

		it("should return null if pattern matches", () => {
			expect(validator("123")).toBe(null);
		});
	});

	describe("min", () => {
		const validator = min(10);

		it("should return error if number is too small", () => {
			expect(validator(5)).toBe("Minimum value is 10");
		});

		it("should return null if number is large enough", () => {
			expect(validator(10)).toBe(null);
			expect(validator(15)).toBe(null);
		});
	});

	describe("max", () => {
		const validator = max(10);

		it("should return error if number is too large", () => {
			expect(validator(15)).toBe("Maximum value is 10");
		});

		it("should return null if number is small enough", () => {
			expect(validator(10)).toBe(null);
			expect(validator(5)).toBe(null);
		});
	});

	describe("validate helper", () => {
		it("should return list of errors", () => {
			const validators = [required, minLength(5)];
			const errors = validate("hi", validators);
			expect(errors).toEqual(["Minimum length is 5 characters"]);
		});

		it("should return empty list if all valid", () => {
			const validators = [required, minLength(5)];
			const errors = validate("hello", validators);
			expect(errors).toEqual([]);
		});

		it("should accumulate multiple errors", () => {
			const validators = [
				(val: string) => (val.includes("a") ? null : "Must include a"),
				(val: string) => (val.includes("b") ? null : "Must include b"),
			];
			const errors = validate("c", validators);
			expect(errors).toEqual(["Must include a", "Must include b"]);
		});
	});
});
