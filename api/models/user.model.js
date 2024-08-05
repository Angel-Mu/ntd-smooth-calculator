const bcrypt = require('bcryptjs');
const { DataTypes, Model } = require('sequelize');
const { paginate } = require('./plugins');

const hashPass = async (user) => {
  if (user.password) {
    // eslint-disable-next-line no-param-reassign
    user.password_hash = await bcrypt.hash(user.password, 8);
  }
};

class User extends Model {
  static init(sequelize) {
    super.init({
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: DataTypes.VIRTUAL,
      password_hash: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM('active', 'inactive'),
        allowNull: false,
        defaultValue: 'active',
      },
    }, {
      hooks: {
        beforeValidate: hashPass,
        beforeCreate: hashPass,
        beforeSave: hashPass,
      },
      sequelize,
      timestamps: true,
    });
    return this;
  }

  static associate(models) {
    this.hasMany(models.Transaction);
  }

  static paginate(filter = {}, options = {}) {
    return paginate(this, filter, options);
  }

  checkPassword(password) {
    return bcrypt.compare(password, this.password_hash);
  }
}

module.exports = User;
