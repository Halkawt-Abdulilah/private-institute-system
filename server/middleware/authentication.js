const {isValidToken} = require('../utils')

const authenticateUser = async (req,res,next) => {
    const token = req.signedCookies.piToken

    if(!token) {
        throw new Error('Authentication Invalid')
    }
    try {
        const payload = isValidToken({ token })
        req.employee = {name:payload.name, employeeId: payload.employeeId, role:payload.role}
        next()
    } catch(err) {
        throw new Error('Authentication Invalid')
    }
}

const authorizePerms = (...roles) => {

    return (req,res,next) => {
        if(!roles.includes(req.employee.role)) {
            throw new Error('Unauthorized to access this route')
        }
        next();
    }

}

module.exports = {
    authenticateUser,
    authorizePerms
}