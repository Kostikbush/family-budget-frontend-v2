import { gql } from "@apollo/client";
import { UserFragment } from "shared/const/Fragments";

export const Registration = gql`
	${UserFragment}
	mutation Registration($args: UserRegistrationInput!) {
		registration(args: $args) {
			user {
				...UserFragment
			}
		}
	}
`;

export const Login = gql`
	${UserFragment}
	mutation Login($args: UserLoginInput!) {
		login(args: $args) {
			user {
				...UserFragment
			}
		}
	}
`;
