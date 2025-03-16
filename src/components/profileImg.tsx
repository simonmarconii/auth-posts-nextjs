"use client"

import Image from "next/image";
import { useEffect, useState } from "react"

export function BackgroundImg({ image }: { image: string }) {
    const [bgImg, setBgImg] = useState<string>("");

    useEffect(() => {
        setBgImg(image);
    }, []);

    return (
        <div className="relative w-[1200px] h-[450px]">
            <Image
                src={bgImg}
                alt="User background"
                layout="fill"
                objectFit="cover"
                className="border rounded-xl"
            />
        </div>
    )
}

export function ProfileImg({ image }: { image: string }) {
    const [profileImg, setProfileImg] = useState<string>("");

    useEffect(() => {
        setProfileImg(image);
    }, []);

    return (
        <div className="relative w-[200px] h-[200px]">
            <Image
                src={profileImg}
                alt="User Image"
                layout="fill"
                objectFit="cover"
                className="rounded-full"
            />
        </div>
    )
}