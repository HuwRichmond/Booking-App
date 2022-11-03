import { gql } from '@apollo/client';

export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        userType
      }
    }
  }
`;

export const ENQUIRY = gql`
mutation addEnquiry($firstName: String!, $lastName: String!, $addressLine1: String!, $addressLine2: String, $suburb: String!, $state: String!, $postCode: String!, $email: String!, $phone: String!, $childFirstName: String!, $childLastName: String!, $childDateOfBirth: Date!, $requestedDays: [String]!, $branch: ID!, $branchRoom: ID!) {
  addEnquiry(firstName: $firstName, lastName: $lastName, addressLine1: $addressLine1, addressLine2: $addressLine2, suburb: $suburb, state: $state, postCode: $postCode, email: $email, phone: $phone, childFirstName: $childFirstName, childLastName: $childLastName, childDateOfBirth: $childDateOfBirth, requestedDays: $requestedDays, branch: $branch, branchRoom: $branchRoom) {
    firstName
    lastName
    addressLine1
    addressLine2
    suburb
    state
    postCode
    email
    phone
    childFirstName
    childLastName
    childDateOfBirth
    requestedDays
    branch {
      _id
    }
    branchRoom {
      _id
    }
  }
}`;

export const ENQUIRY2 = gql`
mutation addEnquiry($firstName: String!, $lastName: String!) {
  addEnquiry(firstName: $firstName, lastName: $lastName) {
    firstName
    lastName
  }
}`;

export const REMOVE_ENQUIRY = gql`
  mutation removeEnquiry($enquiryId: ID!) {
    removeEnquiry(enquiryId: $enquiryId) {
      _id
    }
  }
`

export const RESET_CODE = gql`
mutation resetPassword($email: String!) {
  resetPassword(email: $email) {
    email
    firstName
    lastName
    resetCode
  }
}
`;

export const UPDATE_PASSWORD = gql`
mutation updatePassword($email: String!, $resetCode: String!, $password: String!) {
  updatePassword(email: $email, resetCode: $resetCode, password: $password) {
    _id
    firstName
    lastName
    email
  }
}
`;

export const SEND_ENROLLMENT_LINK =gql`
mutation sendEnrollmentLink($enquiryId: ID!) {
  sendEnrollmentLink(enquiryId: $enquiryId) {
    enrollmentCode
    email
  }
}`;

export const ADD_USER = gql`
  mutation addUser(
    $firstName: String!
    $lastName: String!
    $email: String!
    $password: String!
  ) {
    addUser(
      firstName: $firstName
      lastName: $lastName
      email: $email
      password: $password
    ) {
      token
      user {
        _id
      }
    }
  }
`;
