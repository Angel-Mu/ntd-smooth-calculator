const { DataTypes, Model } = require('sequelize');
const { paginate } = require('./plugins');

class Operation extends Model {
  static init(sequelize) {
    super.init({
      type: {
        type: DataTypes.ENUM('addition', 'subtraction', 'multiplication', 'division', 'square_root', 'random_string'),
        allowNull: false,
      },
      cost_cents: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    }, {
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
}

module.exports = Operation;
