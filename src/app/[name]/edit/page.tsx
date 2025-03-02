"use client"

import { EmailEditForm, NameEditForm, PasswordEditForm } from "@/components/editForms";
import { Button } from "@/components/ui/button";
import { use } from "react";
import { useState } from "react";

const items = [
    {
        title: "Name",
        url: "#",
    },
    {
        title: "Email",
        url: "#",
    },
    {
        title: "Password",
        url: "#",
    },
    {
        title: "Image",
        url: "#",
    },
    {
        title: "Background",
        url: "#",
    },
]

function editSwitch(item: string, name: string) {
    switch (item) {
        case "Name":
            return <NameEditForm item={item} userName={name} />
        case "Email":
            return <EmailEditForm item={item} userName={name} />
        case "Password":
            return <PasswordEditForm userName={name} />
    }
}

export default function EditPage({ params }: {
    params: Promise<{
        name: string
    }>
}) {
    const resolvedParams = use(params);
    const [editField, setEditField] = useState<string>("Name");

    return (
        <div className="grid grid-cols-1 gap-2">
            <div className="flex justify-center">
                <div className="grid grid-cols-1 gap-5">
                    {items.map((item: any) => (
                        <Button key={item.title} onClick={() => setEditField(item.title)}>
                            {item.title}
                        </Button>
                    ))}
                </div>
            </div>
            <div className="mt-5">
                {editSwitch(editField, resolvedParams.name)}
            </div>
        </div>
    )
}