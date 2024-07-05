'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
			"master_barangs",
			[
				{
					nm_barang: "Amoxsan",
					Qty: 15,
					harga: 20000,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					nm_barang: "Panadol",
					Qty: 10,
					harga: 10000,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					nm_barang: "Parasetamol",
					Qty: 12,
					harga: 20000,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					nm_barang: "Promag",
					Qty: 40,
					harga: 5000,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
			],
			{}
		);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete("master_barangs", null, {});
  }
};
