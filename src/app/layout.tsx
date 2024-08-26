'use client'
import "./globals.css";
import { ModalProvider, QueryProvider, ToastProivder } from "./providers";
import { ClerkProvider } from "@clerk/nextjs";

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<ClerkProvider>
			<html lang="en">
				<body suppressHydrationWarning={false}>
					<QueryProvider>
						<ToastProivder />
						<div className="h-full w-full overflow-hidden">
							<ModalProvider>{children}</ModalProvider>
						</div>
					</QueryProvider>
				</body>
			</html>
		</ClerkProvider>
	);
}
