const { ApolloServer } = require('apollo-server');
const dotenv = require('dotenv');
const {connect} = require('./config/database/db')
const models = require('./app/model')
const { makeExecutableSchema } = require("@graphql-tools/schema");
dotenv.config()
const PORT = process.env.PORT;

const schemas = require('./app/schema');
const controller= require('./app/controller')


const startServer = async () => {
    connect();
    const schema = makeExecutableSchema({ typeDefs: schemas, resolvers: controller });
    const server = new ApolloServer({
        schema,
        context: async ({ req }) => {
            return {
                req,
                models,
            };
        },
    });
    server.listen({port: PORT}).then(({url}) => console.log(`Server running at ${url}`));
}
startServer();

