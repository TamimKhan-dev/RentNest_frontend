import { z } from "zod";

export const registerSchema = z.object({
    name: z.string().min(5, 'Name must be atleast 5 characters!'),
    email: z.string().email("Please enter a valid email address!"),
    password: z.string().min(5, "Password must be at least 5 characters"),
    role: z.enum(["TENANT", "LANDLORD"])
});


export type RegisterFormData = z.infer<typeof registerSchema>;