import { ReactNode, useEffect } from "react";

import { useRouteNavigator } from "@vkontakte/vk-mini-apps-router";

export const ErrorPage = ({ children }: { children: ReactNode }) => {
	const routeNavigator = useRouteNavigator();
	// useEffect(() => {
	// 	const handleErrors = () => {
	// 		console.log("ererrrfvsdv");
	// 		routeNavigator.replace(`/`);
	// 	};

	// 	window.addEventListener("error", handleErrors);

	// 	return () => {
	// 		window.removeEventListener("error", handleErrors);
	// 	};
	// }, []);
	try {
		return children;
	} catch (e) {
		return <span>Что-то пошло не так :(</span>;
	}
};
