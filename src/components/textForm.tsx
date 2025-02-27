"use client"

import { useForm } from "react-hook-form";
import { Button, buttonVariants } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { z } from "zod";
import { PostSchema } from "@/lib/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { revalidatePath } from "next/cache";
import { handleCreatePost } from "@/action/postsActions";
import Link from "next/link";

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
            const newPost = await handleCreatePost(values.title, values.content, userName);

            if(!newPost) return null;

            revalidatePath("/");
        } catch (error) {
            throw error;
        }
    }

    return (
        <div className="w-[1200px]">
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
                        disabled={isDisabled}
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
                    {isDisabled ?
                        (
                            <Link href={"/auth/signin"} className={buttonVariants({variant: "default"})}>Post</Link>
                        ):(
                            <Button type="submit">Post</Button>
                        )
                    }
                </form>
            </Form>
        </div>
    )
}