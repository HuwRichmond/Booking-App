import { gql } from '@apollo/client';


export const QUERY_USER = gql`
  {
  user {
    firstName
    lastName
    }
  }
`;

export const QUERY_ENQUIRIES = gql`
  query getEnquiries {
    enquiries {
      _id
      firstName
      lastName
      addressLine1
      addressLine2
      suburb
      state,
      postCode
      email
      phone
      childFirstName
      childLastName
      childDateOfBirth
      createdAt
      requestedDays
      branch {
        _id
        branchName
      }
      branchRoom {
        _id
        roomName
        roomCapacity
      }
    }
  }
`
export const QUERY_SINGLE_ENQUIRY = gql `
  query getSingleEnquiry($enquiryId: ID!) {
    enquiry(enquiryId: $enquiryId) {
      _id
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
      createdAt
      requestedDays
      branch {
        _id
        branchName
      }
      branchRoom {
        _id
        roomCapacity
        roomName
      }
    }
  }
`;

export const BRANCHES = gql`
query AllBranches {
  allBranches {
    _id
    branchName
    addressLine1
    addressLine2
    suburb
    state
    postCode
    email1
    email2
    phone1
    phone2
    branchRoom {
      _id
      roomName
      roomCapacity
      roomSupervisor
    }
  }
}
`;


export const GET_DETAILS_FOR_ENROLLMENT=gql`
query searchEnrollmentLink($enrollmentCode: String!) {
  searchEnrollmentLink(enrollmentCode: $enrollmentCode) {
  _id
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
    createdAt
    branch {
      _id
      branchName
    }
    branchRoom {
      _id
      roomName
    }
    enrollmentCode
  }  
  }
`;