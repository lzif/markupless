export type Validator<T> = (value: T) => string | null;

export const required: Validator<any> = (value) => {
	if (value === null || value === undefined || value === "") {
		return "This field is required";
	}
	return null;
};

export const minLength = (min: number): Validator<string> => {
	return (value: string) => {
		if (value && value.length < min) {
			return `Minimum length is ${min} characters`;
		}
		return null;
	};
};

export const maxLength = (max: number): Validator<string> => {
	return (value: string) => {
		if (value && value.length > max) {
			return `Maximum length is ${max} characters`;
		}
		return null;
	};
};

export const email: Validator<string> = (value) => {
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	if (value && !emailRegex.test(value)) {
		return "Invalid email address";
	}
	return null;
};

export const pattern = (regex: RegExp, message: string): Validator<string> => {
	return (value: string) => {
		if (value && !regex.test(value)) {
			return message;
		}
		return null;
	};
};

export const min = (minValue: number): Validator<number> => {
	return (value: number) => {
		if (value !== null && value !== undefined && value < minValue) {
			return `Minimum value is ${minValue}`;
		}
		return null;
	};
};

export const max = (maxValue: number): Validator<number> => {
	return (value: number) => {
		if (value !== null && value !== undefined && value > maxValue) {
			return `Maximum value is ${maxValue}`;
		}
		return null;
	};
};

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
