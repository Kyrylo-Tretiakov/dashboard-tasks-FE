"use client";
import { LampContainer } from "@/shared/ui/lamp-section";
import { motion } from "framer-motion";

const InvitedBoardsPage = () => {
	return (
		<LampContainer>
			<motion.h1
				initial={{ opacity: 0.5, y: 100 }}
				whileInView={{ opacity: 1, y: 0 }}
				transition={{
					delay: 0.3,
					duration: 0.8,
					ease: "easeInOut",
				}}
				className="mt-8 bg-gradient-to-br from-slate-300 to-slate-500 py-4 bg-clip-text text-center text-4xl font-medium tracking-tight text-transparent md:text-7xl"
			>
				Coming Soon
			</motion.h1>
		</LampContainer>
	);
};

export default InvitedBoardsPage;