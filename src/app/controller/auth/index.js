const bcrypt = require('bcrypt')
const config = require('../../../config');
const { generateAccessToken } = require('../../../util/manageToken');

module.exports = {
    Mutation: {
      register: async (_, { data }, { models }) => {
        try {
          // TODO: check require data
          if (!data.password || !data.userName) throw config.statusMessage.INVALID_USERNAME_OR_PASSWORD;
          if (data.role && data.role != config.role.USER_ROLE) throw config.statusMessage.PERMISSION_DENIED;
          // data.role = admin
          //admin != user T
          //if(T && T) T
  
          // TODO: Check exist user
          
          const existingUser = await models.usermodel.findOne({ userName: data.userName });
          if (existingUser) throw config.statusMessage.USER_ALREADY_EXIST;
  
          // TODO: Hash password
          const hashPassword = await bcrypt.hash(data.password, 10);
  
          let newData = {
            ...data,
            password: hashPassword
          }
          const _user = await models.usermodel.create(newData);
          const accessToken = generateAccessToken({ id: _user._id.toString(), role: _user.role });
          const resData = { accessToken: accessToken, data: _user };
  
          return resData;
        } catch (error) {
          console.log(error);
          throw new Error(error);
        }
      },
      userLogin: async (_, { data }, { models }) => {
        try {
          // TODO: Check invalid data
          console.log("login ");
          if (!data.password || !data.userName) throw config.statusMessage.BAD_REQUEST;
  
          // TODO: Check User with userName
          const _user = await models.usermodel.findOne({ userName: data.userName });
          if (!_user) throw config.statusMessage.INVALID_USERNAME_OR_PASSWORD;
  
          // TODO: Verify user password
          const comparePassword = await bcrypt.compare(data.password, _user.password);
          if (!comparePassword) throw config.statusMessage.INVALID_USERNAME_OR_PASSWORD;
  
          // TODO: Generate accessToken
          const accessToken = generateAccessToken({ id: _user._id.toString(), role: _user.role });
  
          // TODO: Response
          const resData = { accessToken: accessToken, data: _user };
  
          return resData;
        } catch (err) {
          console.log("err: ", err);
          throw new Error(err);
        }
      },
    }
}