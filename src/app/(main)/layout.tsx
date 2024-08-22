"use client";
import { Loader } from "@/shared/ui/loader";
import { Header } from "@/widgets/header/ui/header";
import { useUser } from "@clerk/nextjs";

export default function MainLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const { user } = useUser();

	if (!user) return <Loader />;

	return (
		<div className="w-full h-full px-3">
			<Header />
			<div className="overflow-y-hidden bg-neutral-100 max-w-[1370px] h-[calc(100vh-110px)] mx-auto rounded-lg mt-10">
				{children}
			</div>
		</div>
	);
}
