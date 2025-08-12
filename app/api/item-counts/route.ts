import { NextResponse } from "next/server";
import { fetchItemCounts } from "@/app/lib/itemdata";

export async function GET() {
    try {
        const items = await fetchItemCounts();
        return NextResponse.json(items);
    } catch (err) {
        console.error("Error fetching item counts:", err);
        return NextResponse.json({ error: "Failed to fetch item counts" }, { status: 500 });
    }
}
