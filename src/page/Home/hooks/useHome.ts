import { useQuery } from "@apollo/client";
import { useRouteNavigator } from "@vkontakte/vk-mini-apps-router";

import { useGetIdUser } from "shared/lib/indexDbStorage";
import { useGetNeedRequest } from "shared/hooks/useGetNeedRequest";
import { useControlSnaks } from "entities/useControlSnaks";

import { USER_FRAGMENT, BUDGET_FRAGMENT } from "../lib/fragments";

export const useHome = () => {
	const id = useGetIdUser();
	const routeNavigator = useRouteNavigator();
	const { Snack, setSnack } = useControlSnaks();
	const request = useGetNeedRequest(USER_FRAGMENT, BUDGET_FRAGMENT);
	const { loading, data } = useQuery(request, {
		variables: { args: { id } },
		skip: !id,
		fetchPolicy: "cache-first",
		onCompleted: data => {
			if (data?.getUser?.user && data?.getUser?.budget) return;
			setSnack({
				message: "Не получилось загрузить данные пользователя, зайдите вновь",
				type: "error",
				onclick: () => routeNavigator.push("/"),
			});
		},
		onError: () => {
			setSnack({
				message: "Не получилось загрузить данные пользователя, зайдите вновь",
				type: "error",
				onclick: () => routeNavigator.push("/"),
			});
		},
	});
	const user = data?.getUser?.user;
	const budget = data?.getUser?.budget;
	return { Snack, loading, user, budget };
};
