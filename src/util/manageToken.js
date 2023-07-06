const jwt = require('jsonwebtoken')
const {redis} = require('../config/redis/redis')
const config = require('../config')




const userTokenKey = (id) => `${config.node.NODE_ENV}::TOKEN::${id}`


const getUserTokenFromRedis = async (id) => {
    try {
        const userToken = await redis.get(userTokenKey(id))
        return userToken
        
    } catch (error) {
        console.log("error: ", error)
        return null
    }
}
const getUserDataOnToken = (req) => {
    try {
        const authorization = req.headers['authorization']
        const { id, role } = jwt.verify(authorization, process.env.SECRET_KEY);
        return { id, role }
    } catch (error) {
        console.log("error: ", error)
        return null
    }
}
const tokenVerification = async (req) => {
    try {
        // TODO: Check token from header
        const tokenFromHeader = getUserDataOnToken(req)
        if (!tokenFromHeader) return { isValid: false, data: null }

        // TODO: Check token from redis
        const tokenFromRedis = await getUserTokenFromRedis(tokenFromHeader.id)
        if (!tokenFromRedis) return { isValid: false, data: null }
        
        // TODO: Response
        return { isValid: true, data: tokenFromHeader }
    } catch (error) {
        console.log("error: ", error)
        return { isValid: false, data: null }
    }
}
const generateAccessToken = async (data) => {
    try {
        // TODO: Generate Token
        const accessToken = jwt.sign(data, process.env.SECRET_KEY, { expiresIn: config.token.TOKEN_EXPIRE_TIME });
        
        // TODO: Save token to redis
        await redis.set(userTokenKey(data.id), accessToken, "EX", config.token.TOKEN_EXPIRE_TIME)

        // TODO: Response
        return accessToken
    } catch (error) {
        console.log("error: ", error)
        return null
    }
}
const deleteUserTokenKeyFromRedis = async (id) => {
    try {
        const userToken = await redis.del(userTokenKey(id));
        return userToken
    } catch (error) {
        console.log("error: ", error)
        return null
    }
}
module.exports = {
    userTokenKey,
    getUserTokenFromRedis,
    getUserDataOnToken,
    tokenVerification,
    generateAccessToken,
    deleteUserTokenKeyFromRedis
}