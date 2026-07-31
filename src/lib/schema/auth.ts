import { z } from "zod";

export const loginSchema = z.object({
    email: z.string().email("Please enter a valid email address!"),
    password: z.string().min(5, "Password must be at least 5 characters!")
});

export const registerSchema = z.object({
    name: z.string().min(5, 'Name must be atleast 5 characters!'),
    email: z.string().email("Please enter a valid email address!"),
    password: z.string().min(5, "Password must be at least 5 characters!"),
    role: z.enum(["Tenant", "Landlord"])
});

export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;