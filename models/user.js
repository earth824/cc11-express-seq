module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notEmpty: true
        }
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isEmail: true
        }
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
      },
      birthDate: DataTypes.DATEONLY,
      lastUpdatePassword: DataTypes.DATE
    },
    {
      underscored: true,
      paranoid: true
    }
  );

  User.associate = models => {
    User.hasMany(models.Todo, {
      foreignKey: {
        allowNull: false,
        name: 'userId'
      },
      onDelete: 'RESTRICT',
      onUpdate: 'RESTRICT'
    });
  };

  return User;
};
