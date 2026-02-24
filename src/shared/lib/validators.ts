export const validators = {
  required: (v: string) => (v?.trim() ? null : "This field is required"),
  email: (v: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ? null : "Invalid email address",
  phone: (v: string) =>
    /^\+?[\d\s\-()]{7,}$/.test(v) ? null : "Invalid phone number",
  minLength: (min: number) => (v: string) =>
    v?.length >= min ? null : `Minimum ${min} characters`,
};
