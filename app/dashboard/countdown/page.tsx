"use client";

import { useEffect, useState } from "react";
import CurrentItems from "@/app/ui/dashboard/item-countdown";

export default function Page() {
    const [refreshKey, setRefreshKey] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setRefreshKey((oldKey) => oldKey + 1); // forces CurrentItems to re-mount
        }, 20000);

        return () => clearInterval(interval);
    }, []);

    return (
        <main>
            <div>
                <h2 style={{ fontSize: "25px" }}>Current Items</h2>
                <CurrentItems key={refreshKey} />
            </div>
        </main>
    );
}
