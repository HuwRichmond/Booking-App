const { gql } = require('apollo-server-express');

const typeDefs = gql`
  scalar Date

  type User {
    _id: ID
    firstName: String
    lastName: String
    email: String
    userType: String
  }
  
  type Reset {
    _id: ID
    firstName: String
    lastName: String
    email: String
    resetCode: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Centre {
    _id: ID
    centreName: String
    addressLine1: String
    addressLine2: String
    suburb: String
    state: String
    postCode: Int
    email1: String
    email2: String
    phone1: String
    phone2: String
    centreRoom: [CentreRoom]
  }

  type CentreRoom {
    _id: ID
    roomName: String
    roomCapacity: Int
    roomSupervisor: String
  }

  type Enquiry {
    _id: ID
    firstName: String
    lastName: String
    addressLine1: String
    addressLine2: String
    suburb: String
    state: String
    postCode: String
    email: String
    phone: String
    dogFirstName: String
    dogLastName: String
    dogDateOfBirth: Date
    requestedDays: [String]
    createdAt: String
    centre: [Centre]
    centreRoom: [CentreRoom]
    enrollmentCode: String
  }

  type Query {
    allUsers: [User]
    user: User
    enquiries: [Enquiry]
    enquiry(enquiryId: ID!): Enquiry
    allCentres: [Centre]
    allCentreRooms: [CentreRoom]
    searchEnrollmentLink(enrollmentCode: String!): Enquiry
  }


  type Mutation {
    addUser(firstName: String!, lastName: String!, email: String!, password: String!, userType: String!): Auth
    updateUser(firstName: String, lastName: String, email: String, password: String): User
    login(email: String!, password: String!): Auth
    addCentreRoom(roomName: String!, roomCapacity: Int!, roomSupervisor: String!, centreId: ID!): CentreRoom
    singleCentreRoom(_id: ID!): CentreRoom
    resetPassword(email: String!): Reset
    updatePassword(email: String!, resetCode: String!, password: String!): User
    addEnquiry(firstName: String!, lastName: String!, addressLine1: String!, addressLine2: String, suburb: String!, state: String!, postCode: String!, email: String!, phone: String!, dogFirstName: String!, dogLastName: String!, dogDateOfBirth: Date!, requestedDays: [String]!, centre: ID!, centreRoom: ID!): Enquiry
    removeEnquiry(enquiryId: ID!): Enquiry
    sendEnrollmentLink(enquiryId: ID!) : Enquiry
    
  }
`;

module.exports = typeDefs;