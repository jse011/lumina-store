"use client";

import { useAuth } from "@/core/providers/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import ConsoleDashboard from "@/modules/video-creator/components/features/ConsoleDashboard";

export default function ConsolePage() {
    const { user, isLoading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!isLoading && !user) {
            router.push("/");
        }
    }, [user, isLoading, router]);

    if (isLoading || !user) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-tertiary"></div>
            </div>
        );
    }

    return (
        <main className="min-h-screen bg-background">
            <ConsoleDashboard />
        </main>
    );
}
