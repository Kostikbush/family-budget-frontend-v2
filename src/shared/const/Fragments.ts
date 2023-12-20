import { gql } from '@apollo/client';

export const UserFragment = gql`
  fragment UserFragment on UserEntity {
    avatar
    dateCreate
    email
    id
    isSetComment
    name
    password
    role
  }
`;

export const BudgetFragment = gql`
  fragment BudgetFragment on BudgetEntity {
    id
    users
    aim {
      accumulated
      category
      dateEnd
      dateOffs
      id
      sumOffs
      type
    }
    categorys
    currentExpens {
      category
      countOffs
      dateOffs
      id
      type
      userID
    }
    currentIncome {
      category
      count
      date
      id
      type
      userID
    }
    lastExpenses {
      category
      date
      id
      sum
      userID
    }
    lastIncom {
      category
      date
      id
      sum
      userID
    }
    sum
  }
`;
