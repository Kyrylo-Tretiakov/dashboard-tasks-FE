'use client';
import { Header } from "@/widgets/header/ui/header";
import { useUser } from "@clerk/nextjs";

export default function MainLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const { user } = useUser();

    if (!user) {
        return (
            <div className="flex flex-col items-center justify-center h-screen w-screen">
                <span className="loading loading-infinity w-[100px]"></span>
                <h1 className="text-2xl font-bold">Launching App</h1>
            </div>
        )
    }

    return (
        <div className="w-full h-full">
            <Header />
            <div className="overflow-y-hidden bg-neutral-100 max-w-[1370px] h-[calc(100vh-110px)] mx-auto rounded-lg mt-10">
                {children}
            </div>
        </div >
    );
};
