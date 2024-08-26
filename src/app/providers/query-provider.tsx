"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode, useState } from "react";

export const QueryProvider = ({ children }: { children: ReactNode }) => {
    const [queryClient] = useState(() => new QueryClient({
        defaultOptions: {
            queries: {
                refetchOnWindowFocus: true,
                staleTime: 300000,
                refetchOnMount: true,
                retry: 1,
                gcTime: 0.3,
            },
        },
    }));

    return (
        <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );
};
