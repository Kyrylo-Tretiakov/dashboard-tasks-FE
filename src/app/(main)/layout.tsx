import { Header } from "@/widgets/header/ui/header";

export default function MainLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="w-full h-full">
            <Header />
            <div className="overflow-y-hidden bg-neutral-100 max-w-[1370px] h-[calc(100vh-110px)] mx-auto rounded-lg mt-10">
                {children}
            </div>
        </div >
    );
};
