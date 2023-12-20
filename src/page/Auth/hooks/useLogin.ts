import { UserLogin, userSchemaLogin } from "../lib/validate";
import { useEffect, useState } from "react";

import { ActivePanel } from "shared/const/ActivePanel";
import { Login } from "../api/Auth";
import { handleIndexDb } from "shared/lib/indexDbStorage";
import { useChangePanel } from "shared/lib/changePanel";
import { useControlSnaks } from "entities/useControlSnaks";
import { useForm } from "shared/lib/useForms";
import { useMutation } from "@apollo/client";

export const useLogin = () => {
	const [value, handleValue, handleSubmit, error, setValue] = useForm<UserLogin>(
		{ password: null, email: null },
		{ validateShema: userSchemaLogin }
	);
	// const ar = {} as Array<string>;
	// console.log(ar.map(i => i));

	const changePanel = useChangePanel();
	const { Snack, setSnack } = useControlSnaks();
	const [userData, setUser] = useState({ email: "", password: "" });
	const [login, { loading: loadingData }] = useMutation(Login, {
		variables: {
			args: value,
		},

		onCompleted: data => {
			if (data.login.user) {
				const userID = data.login.user.id;

				if (!userID) {
					setSnack({
						message: "Пользователь не смог загрузиться, попробуйте позже",
						type: "error",
						onclick: () => {
							changePanel(ActivePanel.hel, "p");
						},
					});
					return;
				}

				setSnack({
					message: "Вы успешно авторизованы",
					type: "ok",
					onclick: () => {
						changePanel(ActivePanel.hel, "p");
					},
				});
				(async () => {
					const { saveUserData } = await handleIndexDb();
					await saveUserData({
						email: value.email || "",
						password: value.password || "",
						id: userID,
					});
				})();
			} else {
				setSnack({ message: "Что-то пошло не так", type: "error" });
			}
		},
		onError: ({ graphQLErrors, message: mes }) => {
			const graphQLErrorsMessage = graphQLErrors;
			const message = graphQLErrorsMessage[0].message;

			setSnack({ message: mes, type: "error" });
			if (message && Array.isArray(message)) {
				message.map(text => setSnack({ message: text, type: "error" }));
			}
		},
	});

	const handleLogin = async () => {
		handleSubmit(login);
	};

	useEffect(() => {
		(async () => {
			const { getUserData } = await handleIndexDb();
			const { email, password } = await getUserData();
			setUser({ email: email || "", password: password || "" });
			setValue({ email, password });
		})();
	}, []);

	return {
		handleValue,
		handleLogin,
		loading: loadingData,
		error,
		Snack,
		email: userData.email,
		password: userData.password,
	};
};
