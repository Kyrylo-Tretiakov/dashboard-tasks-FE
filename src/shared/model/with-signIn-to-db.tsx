"use client";
import { useUser } from "@clerk/nextjs";
import React, { ElementType, useEffect } from "react";
import useMutate from "../api/use-mutate";
import { ApiRoutes, HttpMethods } from "../lib/constants";

interface PostData {
	key: string;
}

interface RespnseData {
	success: boolean;
}

const withSignInToDb = (WrappedComponent: ElementType) => {
	return (props: any) => {
		const { user } = useUser();
		const { mutate, isPending } = useMutate({
			onSuccess: () => {
				console.log("Success: with adding user to db");
			},
			onError: () => {
				console.error("Error: with creating user to db");
			},
		});
		useEffect(() => {
			if (user?.id) {
				mutate({
					url: ApiRoutes.createUser,
					method: HttpMethods.POST,
					body: { userId: user.id },
				} as any);
			}
		}, [user]);

		return <WrappedComponent {...props} />;
	};
};

export default withSignInToDb;
