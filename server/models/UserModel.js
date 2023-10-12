const { DataTypes } = require('sequelize');
const sequelize = require('../connection/db')
const bcrypt = require('bcrypt')

const User = sequelize.define('User', {
userId: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
},
email: {
    type: DataTypes.STRING,
    allowNull: false
},
password: {
    type: DataTypes.STRING,
    allowNull: false
},
fName: {
    type: DataTypes.STRING,
    allowNull: false
},
lName: {
    type: DataTypes.STRING,
    allowNull: false
},
phone: {
    type: DataTypes.STRING
},
address: {
    type: DataTypes.STRING
},
role: {
    type: DataTypes.ENUM('admin', 'data_entry', 'teacher'),
    defaultValue: 'teacher',
    allowNull: false
}
}, {
    tableName: 'users',
    timestamps: false
});

User.beforeCreate(async (user, options) => {
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt)
})

User.prototype.checkPassword = async function(enteredPassword) {
    const passwordsMatch = await bcrypt.compare(enteredPassword, this.password)
    return passwordsMatch
}

module.exports = User