const { gql } = require('apollo-server')
module.exports = gql`

type User{
    id: ID
    userName: String!
    password: String!
    role: UserRole
    createAt: DateTime
    updateAt: DateTime
}

enum UserRole {
        USER
        ADMIN
    }

input UserInput{
    userName: String!
    password: String!
    role: UserRole

}
input UserWhereInputOne {
        id: ID!
    }

input UserWhereInput{
    id: ID
    userName: String!
    password: String!
    role: UserRole
    OR: [UserWhereInput]
}
type ResponeUserData {
        total: Int!
        data: [User]!
    }
input ChangePasswordInput {
        id: ID!
    }
extend type Query{
    user(where: UserWhereInputOne!): User!
    users(where: UserWhereInput, orderBy: OrderByInput, skip: Int, limit: Int): ResponeUserData!
}
extend type Mutation{
    createUser(data: UserInput!): User!
    updateUser(data: UserInput!, where: UserWhereInputOne!): User!
    deleteUser(where: UserWhereInputOne!): User!
    changePassword(data: UserInput! ,where: ChangePasswordInput!): User!
}







`;