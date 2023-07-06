const {queryWithWhere, queryWithOrderBy} = require('./helper')

module.exports = {
    Query: {
        getProductsList: async (_, { where, orderBy }, { models, req }) => {
            try {
                const _orderby = queryWithOrderBy(orderBy);
                const _where = queryWithWhere(where);
                const allProduct = await models.productmodel.count(_where)
                const result = await models.productmodel.find(_where)
                .sort(_orderby)
                .exec();
                return {
                    total: allProduct,
                    data: result
                };
            } catch (error) {
                console.log("error", error)

            }
        },
        getProduct: async (_, { where }, { models }) => {
            try {
                const product = await models.productmodel.findById(where.id)
                return product
            } catch (error) {
                console.log("error", error)
            }

        }
    },

    Mutation: {
        updateProduct: async (_, { data, where }, { models, req }) => {
            try {
                const updateProduct = await models.productmodel.findByIdAndUpdate(where.id, data)
                return updateProduct
            } catch (error) {
                console.log("err", error)
            }

        },
        addProduct: async (_, { data, where }, { models, req }) => {
            try {
              const result = await models.productmodel.create(data);
              return result;
            } catch (error) {
              console.log("ERROR", error);
            }
          },
          
        deleteProduct: async (_, { where }, { models, req }) => {
            try {
                const deleteProduct = await models.productmodel.findByIdAndDelete(where.id);
                return deleteProduct
            } catch (error) {
                console.log('Error while delete:', error);
                return false;
            }

        },

    }
}
