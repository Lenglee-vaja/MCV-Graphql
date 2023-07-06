module.exports ={
    node: {
        NODE_ENV: "DEVELOPMENT",
    },
    token: {
        TOKEN_EXPIRE_TIME: 86400, 
    },
    secretKey: {
        JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
    },
    statusMessage: {
        PERMISSION_DENIED: "PERMISSION_DENIED",
        INVALID_USERNAME_OR_PASSWORD: "INVALID_USERNAME_OR_PASSWORD",
        USER_ALREADY_EXIST: "USER_ALREADY_EXIST",
        BAD_REQUEST: "BAD_REQUEST",
        USER_NOT_FOUND: "USER_NOT_FOUND",
        INVALID_USER_ID: "INVALID_USER_ID",
    },
    role: {
        ADMIN_ROLE: "ADMIN",
        USER_ROLE: "USER",
    },
}