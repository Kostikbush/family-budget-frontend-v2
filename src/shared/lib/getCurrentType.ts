import {
	TypeOfFinance,
	Income,
	IncomesTypes,
	ExpenseTypes,
	Expense,
} from "../const/Categories"

const isIncomeType = (value: TypeOfFinance): value is Income => {
	return value in IncomesTypes
}

export const getCurrentType = (value: Income | Expense) => {
	if (isIncomeType(value)) {
		return { budgetType: "доход", ...IncomesTypes[value] }
	} else {
		return { budgetType: "расход", ...ExpenseTypes[value] }
	}
}
