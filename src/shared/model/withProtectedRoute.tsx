"use client";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import React, { ElementType, useEffect } from "react";

const withProtectedRoute = (WrappedComponent: ElementType) => {
	return (props: any) => {
		const { isSignedIn, user } = useUser();
		const router = useRouter();

		useEffect(() => {
			if (!isSignedIn) {
				router.push("/welcome");
			}
		}, [isSignedIn, router]);

		return isSignedIn ? <WrappedComponent {...props} /> : <></>;
	};
};

export default withProtectedRoute;
