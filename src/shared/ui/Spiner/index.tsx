import { Spinner } from "@vkontakte/vkui";

import style from "./spiner.module.scss";

export const Spiner = () => {
	return (
		<div className={style.spinerWrapper}>
			<Spinner size='large' />
		</div>
	);
};
