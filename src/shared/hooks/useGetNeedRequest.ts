import { DocumentNode, gql } from '@apollo/client'

export const useGetNeedRequest = (
	USER_FRAGMENT: DocumentNode | null,
	BUDGET_FRAGMENT: DocumentNode | null
) => {
	if (USER_FRAGMENT && BUDGET_FRAGMENT) {
		return gql`
			${USER_FRAGMENT}
			${BUDGET_FRAGMENT}
			query GetUser($args: UserGetInput!) {
				getUser(args: $args) {
					user {
						...USER_FRAGMENT
					}
					budget {
						...BUDGET_FRAGMENT
					}
				}
			}
		`
	} else if (USER_FRAGMENT && !BUDGET_FRAGMENT) {
		return gql`
			${USER_FRAGMENT}
			query GetUser($args: UserGetInput!) {
				getUser(args: $args) {
					user {
						...USER_FRAGMENT
					}
				}
			}
		`
	} else if (BUDGET_FRAGMENT && !USER_FRAGMENT) {
		return gql`
			${USER_FRAGMENT}
			query GetUser($args: UserGetInput!) {
				getUser(args: $args) {
					budget {
						...BUDGET_FRAGMENT
					}
				}
			}
		`
	}
	return gql`
		${USER_FRAGMENT}
		${BUDGET_FRAGMENT}
		query GetUser($args: UserGetInput!) {
			getUser(args: $args) {
				user {
					...USER_FRAGMENT
				}
				budget {
					...BUDGET_FRAGMENT
				}
			}
		}
	`
}
