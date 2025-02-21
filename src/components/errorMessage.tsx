import { TriangleAlert } from "lucide-react";

export default function ErrorMessage({ error }: { error: string }) {
    return(
        <div className="flex w-full items-center text-sm rounded-lg text-red-600" role="alert">
            <TriangleAlert className="text-red-600"/>
            <span>Error</span>
            <div>{error}</div>
        </div>
    )
}