"use client";
import { AppRoutes } from "@/shared/lib/constants";
import { WavyBackground } from "@/shared/ui/wavy-background";
import { useRouter } from "next/navigation";

const WelcomePage = () => {
	const router = useRouter();

	const handleSignIn = () => {
		router.push(AppRoutes.signIn);
	};

	return (
		<>
			<WavyBackground className="absolute z-10">
				<div className="text-white">
					<h1 className="font-bold text-[60px]">
						Welcome to Task Managment service
					</h1>
					<div className="flex mt-5 justify-center items-center gap-x-4">
						<button
							onClick={handleSignIn}
							className="btn w-40 btn-default btn-lg"
						>
							Sign in
						</button>
						<button
							onClick={() => router.push(AppRoutes.signUp)}
							className="btn w-40 btn-outline btn-active btn-lg"
						>
							Sign up
						</button>
					</div>
				</div>
			</WavyBackground>
		</>
	);
};

export default WelcomePage;