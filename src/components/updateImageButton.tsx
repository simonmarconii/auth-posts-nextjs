"use client"

import { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { EditIcon, X } from "lucide-react";
import { Button } from "./ui/button";
import { handleUploadBgImage } from "@/action/filesActions";
import { revalidatePath } from "next/cache";

export function UpdateBgImageButton({ userName }: { userName: string }) {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [file, setFile] = useState<File>();

    return (
        <div>
            <button onClick={() => setIsOpen(true)}><EditIcon /></button>
            {isOpen && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-md flex items-center justify-center">
                    <Card className="w-[550px]">
                        <CardHeader>
                            <div className="flex justify-end">
                                <X width={20} height={20} className="hover:text-slate-400" onClick={() => setIsOpen(false)} />
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => {
                                        setFile(e.target.files?.[0]);
                                    }}
                                />
                            </div>
                        </CardContent>
                        <CardFooter className="flex justify-end">
                            <Button
                                onClick={
                                    async () => {
                                        if (file) {
                                            handleUploadBgImage(file, userName);
                                            revalidatePath(`/${userName}`);
                                        }
                                    }
                                }
                            >Upload</Button>
                        </CardFooter>
                    </Card>
                </div>
            )}
        </div>
    )
}