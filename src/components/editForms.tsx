"use client"

import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { EmailSchema, NameSchema, PasswordEditSchema } from "@/lib/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { useRouter } from "next/navigation";
import { handleUpdatePassword, handleUpdatePost } from "@/action/postsActions";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { handleUploadProfileImage } from "@/action/filesActions";
import { revalidatePath } from "next/cache";

export function NameEditForm({ userName, item }: { userName: string, item: string }) {
    const router = useRouter();
    const { data: session, update } = useSession();

    const form = useForm<z.infer<typeof NameSchema>>({
        resolver: zodResolver(NameSchema),
        defaultValues: {
            name: ""
        }
    })

    async function onSubmit(values: z.infer<typeof NameSchema>) {
        try {
            const result = await handleUpdatePost(item, userName, values.name);
            if (!result) return;
            update({ name: values.name });
            router.push("/");
        } catch (error: any) {
            console.log("Something went wrong");
        }
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-3"
            >
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>New name</FormLabel>
                            <FormControl>
                                <Input
                                    type="name"
                                    placeholder="Enter new name"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit">Change</Button>
            </form>
        </Form>
    )
}

export function EmailEditForm({ userName, item }: { userName: string, item: string }) {
    const router = useRouter();

    const form = useForm<z.infer<typeof EmailSchema>>({
        resolver: zodResolver(EmailSchema),
        defaultValues: {
            email: ""
        }
    })

    async function onSubmit(values: z.infer<typeof EmailSchema>) {
        try {
            const result = await handleUpdatePost(item, userName, values.email);
            if (!result) return;
            router.push("/");
        } catch (error: any) {
            console.log("Something went wrong");
        }
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-3"
            >
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>New email</FormLabel>
                            <FormControl>
                                <Input
                                    type="email"
                                    placeholder="Enter new email"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit">Change</Button>
            </form>
        </Form>
    )
}

export function PasswordEditForm({ userName }: { userName: string }) {
    const router = useRouter();

    const form = useForm<z.infer<typeof PasswordEditSchema>>({
        resolver: zodResolver(PasswordEditSchema),
        defaultValues: {
            oldPassword: "",
            newPassword: ""
        }
    })

    async function onSubmit(values: z.infer<typeof PasswordEditSchema>) {
        try {
            const result = await handleUpdatePassword(userName, values.oldPassword, values.newPassword);
            if (!result) return;
            router.push("/");
        } catch (error: any) {
            console.log("Something went wrong");
        }
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-3"
            >
                <FormField
                    control={form.control}
                    name="oldPassword"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Old password</FormLabel>
                            <FormControl>
                                <Input
                                    type="password"
                                    placeholder="Enter old password"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="newPassword"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>New password</FormLabel>
                            <FormControl>
                                <Input
                                    type="password"
                                    placeholder="Enter new password"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit">Change</Button>
            </form>
        </Form>
    )
}

export function ImageEditForm({ userName }: { userName: string }) {
    const [file, setFile] = useState<File>();

    return (
        <div className="flex justify-center gap-5">
            <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                    setFile(e.target.files?.[0]);
                }}
            />
            <Button
                onClick={
                    async () => {
                        if (file) {
                            handleUploadProfileImage(file, userName);
                            revalidatePath(`/${userName}`);
                        }
                    }
                }
            >Upload</Button>
        </div>
    )
}