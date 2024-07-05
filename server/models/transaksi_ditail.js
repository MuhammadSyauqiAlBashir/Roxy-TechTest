'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class transaksi_ditail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  transaksi_ditail.init({
    id_trans: DataTypes.INTEGER,
    id_barang: DataTypes.INTEGER,
    Qty: DataTypes.INTEGER,
    harga: DataTypes.INTEGER,
    subtotal: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'transaksi_ditail',
  });
  return transaksi_ditail;
};