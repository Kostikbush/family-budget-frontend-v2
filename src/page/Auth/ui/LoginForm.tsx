import { Button, ButtonGroup, FormItem, FormLayout, FormLayoutGroup, Group, Input, PanelHeader } from "@vkontakte/vkui";
import { Icon48ChevronRightOutline } from "@vkontakte/icons";

import { useChangePanel } from "shared/lib/changePanel";
import { ActivePanel } from "shared/const/ActivePanel";

import { useLogin } from "../hooks/useLogin";

import style from "./Auth.module.scss";

export const LoginForm = () => {
	const { Snack, error, loading, email, password, handleLogin, handleValue } = useLogin();
	const changePanel = useChangePanel();

	return (
		<>
			<PanelHeader className={style.text}>Войти</PanelHeader>
			<Group padding='m'>
				<FormLayout>
					<FormLayoutGroup mode='vertical'>
						<FormItem
							bottom={error?.email ? error.email : ""}
							status={error?.email ? "error" : "default"}
							htmlFor='email'
							top='Email'
							id='email'
						>
							<Input
								placeholder='email'
								type='email'
								defaultValue={email}
								status={error?.email ? "error" : "default"}
								onChange={handleValue}
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
								defaultValue={password}
								status={error?.password ? "error" : "default"}
								onChange={handleValue}
								className={style.input}
								id='password'
							/>
						</FormItem>
					</FormLayoutGroup>
				</FormLayout>
			</Group>
			<ButtonGroup align='center'>
				<Button mode='outline' loading={loading} onClick={handleLogin} className={style.button} rounded>
					Войти
				</Button>
				<Button
					loading={loading}
					className={style.button}
					onClick={() => changePanel(ActivePanel.reg, "p")}
					mode='outline'
					rounded
					after={<Icon48ChevronRightOutline width={25} height={25} />}
					appearance='accent'
					size='s'
				>
					Регистрация
				</Button>
			</ButtonGroup>
			{Snack}
		</>
	);
};
