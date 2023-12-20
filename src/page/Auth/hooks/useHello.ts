import { useRouteNavigator } from "@vkontakte/vk-mini-apps-router";

import { useChangePanel } from "shared/lib/changePanel";
import { useGetIdUser } from "shared/lib/indexDbStorage";
import { useGetNeedRequest } from "shared/hooks/useGetNeedRequest";
import { ActivePanel } from "shared/const/ActivePanel";
import { difference } from "shared/lib/dateMethods";
import { Roles } from "shared/types/storeTypes";
import { useControlSnaks } from "entities/useControlSnaks";

import { USER_FRAGMENT } from "../lib/fragments";
import { getTimeZone } from "../lib/getTimeString";
import { useQuery } from "@apollo/client";

const getString = (days: number) => {
	if (days === 1) {
		return `У вас последний день бесплатного использования`;
	}
	if (days > 1 && days <= 4) {
		return `У вас осталось ${days} дня бесплатного использования`;
	}
	if (days > 4 && days <= 14) {
		return `У вас осталось ${days} дней бесплатного использования`;
	}
	return "У вас закончился бесплатный период использования";
};

export const useHello = () => {
	const changePanel = useChangePanel();
	const { Snack, setSnack } = useControlSnaks();
	const hour = new Date().getHours();
	const timeString = getTimeZone(hour);
	const id = useGetIdUser();
	const routeNavigator = useRouteNavigator();
	const request = useGetNeedRequest(USER_FRAGMENT, null);
	const { loading, data } = useQuery(request, {
		variables: { args: { id } },
		skip: !id,
		fetchPolicy: "cache-first",
		onCompleted: data => {
			if (!data?.getUser?.user) {
				setSnack({
					message: "Не получилось загрузить данные пользователя, зайдите вновь",
					type: "error",
					onclick: () => routeNavigator.push("/"),
				});
				return;
			}
			const user = data?.getUser?.user;
			if (user.role.includes(Roles.ADMIN) || user.role.includes(Roles.VIP_USER)) {
				setSnack({
					message: "Добро пожаловать!",
					type: "ok",
					onclick: () => {
						changePanel(ActivePanel.home, "r");
					},
				});
			} else {
				const dayLast = 14 - difference(user.dateCreate || "");
				setSnack({
					message: getString(dayLast),
					type: "warn",
					onclick: () => {
						changePanel(ActivePanel.home, "r");
					},
				});
			}
		},
		onError: () => {
			setSnack({
				message: "Не получилось загрузить данные пользователя, зайдите вновь",
				type: "error",
				onclick: () => routeNavigator.push("/"),
			});
		},
	});

	return { Snack, timeString, name: data?.getUser?.user?.name, loading };
};
