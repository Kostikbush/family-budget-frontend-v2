import { Expense, Income } from "../const/Categories"

export enum Roles {
	ADMIN = "ADMIN",
	VIP_USER = "VIP_USER",
	USER = "USER",
}

export enum IncomType {
	week = "week",
	mounth = "mounth",
}

export enum ExpenseType {
	IncomType,
	year = "year",
	day = "day",
}

export interface User {
	name: string
	email: string
	avatar: string | null
	id: string
	role: Roles[]
	isSetComment: boolean
	dateCreate: string
}

interface CurrentIncome {
	id: string
	type: IncomType
	count: number
	date: number
	category: string
	userID: string
}

interface CurrentExpense {
	id: string
	type: ExpenseType
	countOffs: number
	category: string
	dateOffs: string
	userID: string
}

interface Aim {
	id: string
	type: ExpenseType
	sumOffs: number
	category: string
	accumulated: number
	dateOffs: string
	dateEnd: Date
}

export interface LastIncom {
	id: string
	date: Date
	sum: number
	category: string
	userID: string
	type: Income
}

export interface LastExpenses {
	id: string
	date: Date
	sum: number
	category: string
	userID: string
	type: Expense
}

export interface Budget {
	id: string
	users: string[]
	sum: number
	currentIncome: CurrentIncome[]
	currentExpens: CurrentExpense[]
	lastIncom: LastIncom[]
	lastExpenses: LastExpenses[]
	aim: Aim[]
	categorys: string[]
}
