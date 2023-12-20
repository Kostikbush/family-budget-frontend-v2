import { useState } from "react";

import { TypeOfFinance } from "shared/const/Categories";
import { getCurrentType } from "shared/lib/getCurrentType";

export interface FinanceItemProps {
	type: TypeOfFinance;
	canSpend: number;
	spend: number;
	delay: number;
}

export const useFinanceItem = ({ spend, type, canSpend }: FinanceItemProps) => {
	const [hide, setHide] = useState(true);

	const obj = getCurrentType(type);

	const procent = (spend * 100) / (canSpend + canSpend);
	return { hide, obj, procent, setHide };
};
