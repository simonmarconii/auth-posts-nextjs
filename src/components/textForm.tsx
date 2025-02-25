"use client"

import { useForm } from "react-hook-form";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { z } from "zod";
import { PostSchema } from "@/lib/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { revalidatePath } from "next/cache";

export default function TextForm({ userName, isDisabled }: {
    userName: string, isDisabled: boolean
}) {
    const form = useForm<z.infer<typeof PostSchema>>({
        resolver: zodResolver(PostSchema),
        defaultValues: {
            title: "",
            content: "",
        }
    })

    async function onSubmit(values: z.infer<typeof PostSchema>) {
        try {
            const response = await fetch("http://localhost:3000/api/create-post", {
                method: "POST",
                body: JSON.stringify({
                    title: values.title,
                    content: values.content,
                    userName
                })
            });

            if(response.status === 200) revalidatePath("/");
        } catch (error) {
            throw error;
        }
    }

    return (
        <div className="flex items-center justify-center">
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-3 w-full"
                >
                    <FormField
                        disabled={isDisabled}
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Title</FormLabel>
                                <FormControl>
                                    <Input
                                        className="shadow-none"
                                        type="title"
                                        placeholder="Title here..."
                                        autoComplete="off"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="content"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Content</FormLabel>
                                <FormControl>
                                    <Textarea
                                        placeholder="Content here..."
                                        className="resize-none"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button disabled={isDisabled} type="submit">Post</Button>
                </form>
            </Form>
        </div>
    )
}