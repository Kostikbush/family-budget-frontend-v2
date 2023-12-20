import { useMutation } from "@apollo/client";

import { useForm } from "shared/lib/useForms";
import { useChangePanel } from "shared/lib/changePanel";
import { ActivePanel } from "shared/const/ActivePanel";
import { handleIndexDb } from "shared/lib/indexDbStorage";
import { useControlSnaks } from "entities/useControlSnaks";

import { Registration } from "../api/Auth";
import { UserRegistration, userSchemaRegistration } from "../lib/validate";

export const useRegistration = () => {
	const [value, setValue, handleSubmit, error] = useForm<UserRegistration>(
		{ name: null, password: null, email: null },
		{ validateShema: userSchemaRegistration }
	);
	const changePanel = useChangePanel();
	const { Snack, setSnack } = useControlSnaks();
	const [registration, { loading }] = useMutation(Registration, {
		variables: {
			args: value,
		},

		onCompleted: data => {
			if (data.registration.user) {
				const user = data.registration.user;

				if (!user) {
					setSnack({
						message: "Пользователь не смог загрузиться, попробуйте позже",
						type: "error",
						onclick: () => {
							changePanel(ActivePanel.hel, "p");
						},
					});
				}

				setSnack({
					message: "Вы успешно зарегистрированы!",
					type: "ok",
					onclick: () => {
						changePanel(ActivePanel.hel, "r");
					},
				});
				(async () => {
					const { saveUserData } = await handleIndexDb();
					await saveUserData({
						email: value.email || "",
						password: value.password || "",
						id: user.id,
					});
				})();
			} else {
				setSnack({ message: "Что-то пошло не так", type: "error" });
			}
		},

		onError: ({ graphQLErrors, message: mes }) => {
			const graphQLErrorsMessage = graphQLErrors;

			const message = graphQLErrorsMessage[0]?.message;

			setSnack({ message: mes, type: "error" });

			if (message && Array.isArray(message)) {
				message.map(text => setSnack({ message: text, type: "error" }));
			}
		},
	});

	const handleRegistration = () => {
		handleSubmit(registration);
	};

	return { setValue, handleRegistration, loading: loading, error, Snack };
};
