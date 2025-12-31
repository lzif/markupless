/**
 * Type definition for a validator function.
 * Returns an error string if invalid, or null if valid.
 */
export type Validator<T> = (value: T) => string | null;

/**
 * Validates that a value is not null, undefined, or empty string.
 */
export const required: Validator<any> = (value) => {
	if (value === null || value === undefined || value === "") {
		return "This field is required";
	}
	return null;
};

/**
 * Validates that a string has a minimum length.
 * @param min - Minimum number of characters.
 */
export const minLength = (min: number): Validator<string> => {
	return (value: string) => {
		if (value && value.length < min) {
			return `Minimum length is ${min} characters`;
		}
		return null;
	};
};

/**
 * Validates that a string has a maximum length.
 * @param max - Maximum number of characters.
 */
export const maxLength = (max: number): Validator<string> => {
	return (value: string) => {
		if (value && value.length > max) {
			return `Maximum length is ${max} characters`;
		}
		return null;
	};
};

/**
 * Validates that a string is a valid email format.
 */
export const email: Validator<string> = (value) => {
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	if (value && !emailRegex.test(value)) {
		return "Invalid email address";
	}
	return null;
};

/**
 * Validates a string against a regular expression.
 * @param regex - The pattern to match.
 * @param message - The error message to return if match fails.
 */
export const pattern = (regex: RegExp, message: string): Validator<string> => {
	return (value: string) => {
		if (value && !regex.test(value)) {
			return message;
		}
		return null;
	};
};

/**
 * Validates that a number is at least a minimum value.
 * @param minValue - The minimum allowed value.
 */
export const min = (minValue: number): Validator<number> => {
	return (value: number) => {
		if (value !== null && value !== undefined && value < minValue) {
			return `Minimum value is ${minValue}`;
		}
		return null;
	};
};

/**
 * Validates that a number is at most a maximum value.
 * @param maxValue - The maximum allowed value.
 */
export const max = (maxValue: number): Validator<number> => {
	return (value: number) => {
		if (value !== null && value !== undefined && value > maxValue) {
			return `Maximum value is ${maxValue}`;
		}
		return null;
	};
};

/**
 * Runs a list of validators against a value.
 * @param value - The value to validate.
 * @param validators - Array of validator functions.
 * @returns Array of error messages (empty if valid).
 */
export function validate<T>(value: T, validators: Validator<T>[]): string[] {
	const errors: string[] = [];
	for (const validator of validators) {
		const error = validator(value);
		if (error) {
			errors.push(error);
		}
	}
	return errors;
}
