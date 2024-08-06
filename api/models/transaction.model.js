const { DataTypes, Model } = require('sequelize');
const { paginate } = require('./plugins');

class Transaction extends Model {
  static init(sequelize) {
    super.init({
      operation_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      amount_cents: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      user_balance_cents_after: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      operation_response: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    }, {
      sequelize,
      timestamps: true,
    });
    return this;
  }

  static associate() {
    // TODO: associate
  }

  static paginate(filter = {}, options = {}) {
    return paginate(this, filter, options);
  }
}

module.exports = Transaction;
