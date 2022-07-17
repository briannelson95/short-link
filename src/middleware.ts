import { NextFetchEvent, NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest, ev: NextFetchEvent) {
    if (
        req.nextUrl.pathname.startsWith("/api/") ||
        req.nextUrl.pathname === "/"
    ) {
        return;
    }
    const slug = req.nextUrl.pathname.split("/").pop();

    // console.log(req.nextUrl)
    const slugFetch = await fetch(`${req.nextUrl.origin}/api/get-url/${slug}`);
    if (slugFetch.status === 404) {
        return NextResponse.redirect(req.nextUrl.origin);
    }

    const data = await slugFetch.json();

    // console.log(data)

    if (data?.url) {
        return NextResponse.redirect(data.url);
    }
}