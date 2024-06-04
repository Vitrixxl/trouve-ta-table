"use client";
import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider } from "next-themes";
import { useEffect } from "react";

export default function Providers({ children }: { children: React.ReactNode }) {

    return (
        <NextUIProvider className="h-full">
            <ThemeProvider attribute="class" defaultTheme="dark" themes={["light", "dark"]}>
                {children}
            </ThemeProvider>

        </NextUIProvider>
    );
}