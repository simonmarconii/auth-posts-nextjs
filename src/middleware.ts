export { auth as middleware } from "@/auth";

export const config = {
    matcher: ["/((?!api|_next/statix|_next/image|.*\\.png$).*)"]
}