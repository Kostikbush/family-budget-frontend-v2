import { gql } from '@apollo/client'

export const USER_FRAGMENT = gql`
	fragment USER_FRAGMENT on UserEntity {
		name
		dateCreate
		role
	}
`
