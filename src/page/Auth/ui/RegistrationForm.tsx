import { Button, ButtonGroup, FormItem, FormLayout, FormLayoutGroup, Group, Input, PanelHeader } from "@vkontakte/vkui";
import { Icon48ChevronRightOutline } from "@vkontakte/icons";

import { useChangePanel } from "shared/lib/changePanel";
import { ActivePanel } from "shared/const/ActivePanel";

import { useRegistration } from "../hooks/useRegistration";

import style from "./Auth.module.scss";

export const RegistrationForm = () => {
	const { Snack, handleRegistration, error, loading, setValue } = useRegistration();

	const changePanel = useChangePanel();
	return (
		<>
			<PanelHeader className={style.text}>Регистрация</PanelHeader>
			<Group padding='m'>
				<FormLayout>
					<FormLayoutGroup mode='vertical'>
						<FormItem
							bottom={error?.name ? error.name : ""}
							status={error?.name ? "error" : "default"}
							htmlFor='name'
							top='Имя'
						>
							<Input
								placeholder='Имя'
								status={error?.name ? "error" : "default"}
								onChange={setValue}
								className={style.input}
								id='name'
							/>
						</FormItem>
						<FormItem
							bottom={error?.email ? error.email : ""}
							status={error?.email ? "error" : "default"}
							htmlFor='email'
							top='Email'
							id='email'
						>
							<Input
								placeholder='email'
								status={error?.email ? "error" : "default"}
								onChange={setValue}
								className={style.input}
								id='email'
							/>
						</FormItem>
						<FormItem
							bottom={error?.password ? error.password : ""}
							status={error?.password ? "error" : "default"}
							htmlFor='password'
							top='Пароль'
						>
							<Input
								placeholder='Пароль'
								type='password'
								status={error?.password ? "error" : "default"}
								onChange={setValue}
								className={style.input}
								id='password'
							/>
						</FormItem>
					</FormLayoutGroup>
				</FormLayout>
			</Group>
			<ButtonGroup align='center'>
				<Button onClick={handleRegistration} mode='outline' loading={loading} className={style.button} rounded>
					Зарегистрироваться
				</Button>
				<Button
					loading={loading}
					className={style.button}
					stretched={false}
					onClick={() => changePanel(ActivePanel.log, "p")}
					mode='outline'
					rounded
					after={<Icon48ChevronRightOutline width={25} height={25} />}
					appearance='accent'
					size='s'
				>
					Войти
				</Button>
			</ButtonGroup>
			{Snack}
		</>
	);
};
