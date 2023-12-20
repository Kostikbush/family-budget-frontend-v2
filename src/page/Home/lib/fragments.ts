import { gql } from '@apollo/client'

export const USER_FRAGMENT = gql`
	fragment USER_FRAGMENT on UserEntity {
		name
	}
`
export const BUDGET_FRAGMENT = gql`
	fragment BUDGET_FRAGMENT on BudgetEntity {
		id
	}
`
// export const USER_FRAGMENT = gql`
// 	fragment USER_FRAGMENT on UserEntity {
// 		name
// 		dateCreate
// 		role
// 	}
// `
