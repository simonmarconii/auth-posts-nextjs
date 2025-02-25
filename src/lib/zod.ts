import { object, z } from "zod";

const UserEmailSchema = z.string({required_error: "Email is required"}).email({ message: "Invalid email address" }).trim();

const UserPasswordSchema = z.string({required_error: "Password is required"})
    .min(8, { message: "Password must be 8 or more characters long" })
    .regex(/[A-Z]/, { message: 'Contain at least one capital letter.' })
    .regex(/[0-9]/, { message: 'Contain at least one number.' })
    .regex(/[^a-zA-Z0-9]/, { message: 'Contain at least one special character.' });

export const LogInSchema = object({
    email: UserEmailSchema,
    password: UserPasswordSchema
});

export const RegisterSchema = object({
    name: z.string({required_error: "Name is required"})
        .min(2, { message: "Name must be 2 or more characters long" })
        .max(40, { message: "Name must be 40 or less characters long" }),
    email: UserEmailSchema,
    password: UserPasswordSchema
});

export const PostSchema = object({
    title: z.string({required_error: "Title is required"})
        .min(1, {message: "Title must be 1 or more characters long"})
        .max(30, {message: "Title must be 30 or less characters long"}),
    content: z.string({required_error: "Content is required"})
        .min(1, {message: "Content must be 1 or more characters long"})
        .max(300, {message: "Title must be 30 or less characters long"})
});