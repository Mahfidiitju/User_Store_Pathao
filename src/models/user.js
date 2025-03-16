'use strict';
const {
  Model
} = require('sequelize');
const bcrypt = require('bcryptjs');
const { ServerConfig } = require('../config');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {

    static associate(models) {
      this.hasMany(models.Tag, {
        foreignKey: 'userId'
      });
    }
  }
  User.init({
    firstName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
      unique:true
    }
  }, {
    sequelize,
    modelName: 'User',
  });

  User.beforeCreate(function encrypt(user) {
    const encryptedPassword = bcrypt.hashSync(user.password, +ServerConfig.SALT_ROUNDS);
    user.password = encryptedPassword;
  });
  return User;
};