const { gql } = require('apollo-server-express');

exports.typeDefs = gql `
    type Employee {
        id: ID!
        firstname: String!
        lastname: String!
        email: String!
        gender: String!
        salary: Float!
    }
    type User {
        id: ID!
        username: String!
        email: String!
        password: String!
      }
    type LoginPayload {
        token: String
        user: User
      }
    type Query {
        login(email: String!, password: String!): LoginPayload
        getEmployees: [Employee]
        getEmployeeByID(id: ID!): Employee
    }

    type Mutation {
        addEmployee(firstname: String!
            lastname: String!
            email: String!
            gender: String!
            salary: Float!): Employee

        updateEmployee(id: String!
            firstname: String!
            lastname: String!
            email: String!
            gender: String!
            salary: Float!): Employee
        
        deleteEmployee(id: String!): Employee
        signup(username: String!, email: String!, password: String!): User!
    }
`