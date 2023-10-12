const User = require('../models/UserModel')
const {attachCookieToResponse} = require('../utils')
const {StatusCodes} = require('http-status-codes')

const register = async (req, res) => {

    const {firstName, lastName, email, password} = req.body
    User.findOne({where: {email: email}}).then((user) => {
        if (user) {
          console.log('Email already registered, please use another email');
        } else {
            const user = User.create({
                fName: firstName,
                lName: lastName,
                email: email,
                password: password,
                role: 'teacher'
            })

            const payload = {userId: user.userId, firstName: user.fName, lastName: user.lName, role: user.role}
            attachCookieToResponse({ res, user:payload })
            res.status(StatusCodes.CREATED).json({msg: 'signed up successfully!'})
        }
        })
        .catch((error) => {
            console.error('Error checking for user:', error);
    });
}

const login = async (req, res) => {
    const {email, password} = req.body
    console.log(req.body);
    if(!email || !password) {
        throw new Error('please provide email or password')
    }
    User.findOne({where: {email: email}}).then((user) => {
        if (!user) {
            return res.status(StatusCodes.BAD_REQUEST).json({msg: 'invalid credentials'})
        } else {
            const isPasswordValid = user.checkPassword(password)
            if(!isPasswordValid) {
                return res.status(StatusCodes.BAD_REQUEST).json({msg: 'invalid credentials'})
            }
            const payload = {userId: user.userId, firstName: user.fName, lastName: user.lName, role: user.role}
            attachCookieToResponse({res, user: payload})
            return res.status(StatusCodes.OK).json({user: payload})
        }
        })
        .catch((error) => {
            console.error('Error checking for user:', error);
    });

}

const logout = async (req, res) => {
    res.cookie('pisToken', 'logout', {
        httpOnly: true,
        expires: new Date(Date.now() + 3000)
    })
    res.status(StatusCodes.OK).json({msg: 'user logged out'})
}


module.exports = {
    register,
    login,
    logout
}