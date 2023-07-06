const {gql} = require('apollo-server')
module.exports = gql `

type ResponeUserAuthData {
        accessToken: String!
        data: User!
    }
input UserLoginInput {
    userName: String!
    password: String!
}

extend type Mutation{
    register(data: UserInput!): ResponeUserAuthData!
    userLogin(data: UserLoginInput!): ResponeUserAuthData!
}



`