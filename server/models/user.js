import bcrypt from 'bcrypt-nodejs';

export default (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'First Name is required'
        }
      }
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Last Name is required'
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        msg: 'This email is already taken.'
      },
      validate: {
        isEmail: {
          msg: 'Email address is invalid'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [6, 100],
          msg: 'Password length should range between 6 - 100 characters'
        }
      }
    },
    roleId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      default: 2
    },
    currentToken: {
      type: DataTypes.TEXT,
      allowNull: true
    },
  }, {
    classMethods: {
      associate: (models) => {
        // associations can be defined here
        User.belongsTo(models.Role, { foreignKey: 'roleId' });
        User.hasMany(models.Document, { foreignKey: 'ownerId' });
      }
    },
  });

  User.beforeCreate((user) => {
    user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10));
  });

  User.beforeUpdate((user) => {
    if (user._changed.password) {
      user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10));
    }
  });
  return User;
};
