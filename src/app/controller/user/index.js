const { tokenVerification, deleteUserTokenKeyFromRedis } = require("../../../util/manageToken");
const bcrypt = require('bcrypt')
const config = require('../../../config');

module.exports = {
    Mutation: {
        createUser: async (_, { data }, { models, req }) => {
            try {
              // TODO: Check invalid data
              if (!data.password || !data.role || !data.userName) throw config.statusMessage.BAD_REQUEST;
              // TODO: Check user ADMIN role permission
              const verifyToken = await tokenVerification(req);
              if (!verifyToken.isValid || (verifyToken.data.role != config.role.ADMIN_ROLE )) throw config.statusMessage.PERMISSION_DENIED;
                console.log("step1")
              // TODO: Check user data from User
              const checkUserAuthWithUsername = await models.usermodel.findOne({ userName: data.userName }).exec();
              if (checkUserAuthWithUsername) throw config.statusMessage.USER_ALREADY_EXIST;
      
              // TODO: hash UserAuth password
              const hashPassword = await bcrypt.hash(data.password, 10);
              let newUser={
                ...data,
                password: hashPassword
              }
      
      
              // TODO: Create User data
              const createUser = await models.usermodel.create(newUser);
      
              // TODO: Response user data
              return createUser;
            } catch (err) {
              console.log("err: ", err);
              throw new Error(err);
            }
          },
          deleteUser: async (_, { data, where }, { models, req }) => {
            try {
              // TODO: Check user permission
              const verifyToken = await tokenVerification(req);
              if (!verifyToken.isValid || (verifyToken.data.role != config.role.ADMIN_ROLE)) throw config.statusMessage.PERMISSION_DENIED;
              if (!where.id) throw config.statusMessage.INVALID_USER_ID;
      
      
              // TODO: delete user by id
              const deleteUser = await models.usermodel.findByIdAndDelete(where.id);
              if (!deleteUser) throw config.statusMessage.USER_NOT_FOUND;
      
              // TODO: delete user token from redis
              await deleteUserTokenKeyFromRedis(where.id)
      
      
              // TODO: Response
              return deleteUser;
            } catch (err) {
              console.log("err: ", err);
              throw new Error(err);
            }
          },
    },
    
}