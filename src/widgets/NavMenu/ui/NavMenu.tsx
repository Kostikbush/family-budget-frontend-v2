import { useState } from "react";
import style from "./navMenu.module.scss";

export const NavMenu = () => {
	const [open, setOpen] = useState(false);
	// сетить строку а не будевское значение чтоб при первом рендере не проигровалась анимация
	return (
		<section className={style.wrapper}>
			<span onClick={() => setOpen(!open)} className={style.burger}>
				<span></span>
				<span></span>
				<span></span>
			</span>
		</section>
	);
};
