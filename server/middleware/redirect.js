const {StatusCodes} = require('http-status-codes')

const redirect = (req, res, next) => {
    const tokenCookie = req.signedCookies.piToken
    // res.setHeader('Content-Type', 'application/json')
    if(!tokenCookie) {
        return res.status(StatusCodes.NOT_FOUND).json({redirectUrl: '/login'})
    } else {
        return res.status(StatusCodes.OK).json({redirectUrl: '/dashboard'})
    }
}

module.exports = redirect