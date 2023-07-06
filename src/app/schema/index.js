const { gql } = require('apollo-server-express');
const productSchema = require("./productSchema");
const userSchema = require('./userSchema');
const authSchema = require('./authSchema')


const linkSchema = gql`
  scalar DateTime
  enum OrderByInput {
    createdAt_ASC
    createdAt_DESC
    updatedAt_ASC
    updatedAt_DESC
  }

  type Query {
    _: Boolean
  }

  type Mutation {
    _: Boolean
  }

  type Subscription {
    _: Boolean
  }
`;


module.exports = [
  linkSchema,
  productSchema,
  userSchema,
  authSchema

];
