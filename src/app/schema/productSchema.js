const { gql } = require('apollo-server');
module.exports = gql`
type Product {
    id: ID
    category: String!
    productName: String!
    price: Int!
    imgPath: String
    colors: [String!]
    createAt: DateTime
    updateAt: DateTime
}
type ResponeProductData{
    total: Int
    data: [Product]

}
input ProductInput {
    category: String ,
    productName: String!,
    price: Int,
    colors: [String!],
    imgPath: String
    
}

input ProductWhereInputOne{
    id: ID!
}
input ProductWhereInput{
    category: String ,
    productName: String,
    price: Int,
    colors: [String!],
    imgPath: String,
    OR: [ProductWhereInput]
}


extend type Query {
    getProductsList(where: ProductWhereInput, orderBy: OrderByInput ): ResponeProductData!
    getProduct(where: ProductWhereInputOne!): Product
}
extend type  Mutation {
    updateProduct(data: ProductInput!, where: ProductWhereInputOne!): Product
    addProduct(data: ProductInput!): Product
    deleteProduct(where: ProductWhereInputOne!): Product
} `
