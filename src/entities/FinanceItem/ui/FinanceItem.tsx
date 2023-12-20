import { Tooltip } from "shared/ui/Tooltip";

import { FinanceItemProps, useFinanceItem } from "../hooks/useFinanceItem";

import style from "./financeItem.module.scss";

export const FinanceItem = ({ type, canSpend, spend, delay }: FinanceItemProps) => {
	const { hide, obj, procent, setHide } = useFinanceItem({
		type,
		canSpend,
		spend,
		delay,
	});

	return (
		<div
			className={style.wrapper}
			style={{
				animationDelay: `0.${delay * 9}s`,
			}}
			onMouseOver={() => setHide(false)}
			onMouseLeave={() => setHide(true)}
		>
			<Tooltip hide={hide}>
				<ul className={style.infoList}>
					<li>
						тип {obj.budgetType} - '{obj.text}'
					</li>
					<li>
						{obj.budgetType === "доход" ? "заработано" : "потрачено"} {spend}
					</li>
					<li>
						{obj.budgetType === "доход" ? "ещё заработаете" : "можно потратить"} {canSpend}
					</li>
				</ul>
			</Tooltip>
			<div
				style={{
					backgroundColor: obj.color,
				}}
				className={style.financeItem}
			>
				<span
					style={{
						height: `${procent}%`,
					}}
					className={style.financeItemProgress}
				></span>
				{obj.img}
			</div>
		</div>
	);
};
//заполненность кружка, цифра сколько потрачено, цифра сколько еще можно потратить,
//фильтры сколько можно потратить месяц/неделя/день
//кружок увеличивается при рендере
