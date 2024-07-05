const { Op } = require('sequelize');
const {master_barang,transaksi_hider, transaksi_ditail} = require("../models");

class Controller {
    static async getBarang(req,res){
        try {
            const { search } = req.query;
			let queryCommand = { order: [["id", "ASC"]] };
			if (search) {
				queryCommand = {
					where: {
						nm_barang: { [Op.iLike]: `%${search}%` },
					},
					order: [["id", "ASC"]],
				};
			}
            const data = await master_barang.findAll(queryCommand)
            res.status(200).json(data)
        } catch (error) {
            console.log(error);
            res.status(500).json({message: "Internal Server Error"})
        }
    }
    static async addBarang(req,res){
        try {
            const data = req.body
            await master_barang.create(data)
            res.status(201).json({message: "New Item has ben added"})
        } catch (error) {
            console.log(error);
            res.status(500).json({message: "Internal Server Error"})
        }
    }
    static async updateBarang(req,res){
        try {
            const {id} = req.params
            const data = req.body
            await master_barang.update(data,{where: {id}})
            res.status(200).json({message: "Data has been updated"})
        } catch (error) {
            console.log(error);
            res.status(500).json({message: "Internal Server Error"})
        }
    }
    static async deleteBarang(req,res){
        try {
            const {id} = req.params
            await master_barang.destroy({where: {id}})
            res.status(200).json({message: "Data has been deleted"})
        } catch (error) {
            console.log(error);
            res.status(500).json({message: "Internal Server Error"})
        }
    }
    static async getBarangById(req,res){
        try {
            const {id} = req.params
            const data = await master_barang.findByPk(id)
            res.status(200).json(data)
        } catch (error) {
            console.log(error);
            res.status(500).json({message: "Internal Server Error"})
        }
    }
    static async addTransaksi(req,res){
        try {
            const data = req.body
            const newTransaksi = await transaksi_hider.create({tgl_transaksi : new Date(),total: data.total})
            data.items.map(async(item) => {
                const barang = await master_barang.findByPk(item.id)
                if(!barang) throw {
                    code: 404,
                    message: "Item not listed in the database",
                };
                const detailTransaksi = {
                    id_trans : newTransaksi.id,
                    id_barang : item.id,
                    harga: barang.harga,
                    Qty : item.Qty,
                    harga_barang : barang.harga,
                    subtotal : item.Qty * barang.harga
                }
                await master_barang.update({Qty: barang.Qty - item.Qty},{where: {id: item.id}})
                await transaksi_ditail.create(detailTransaksi)
            })
            res.status(201).json({message: "Data has been created"})
        } catch (error) {
            if (error.code === 404) {
				res.status(404).json({ message: error.message });
			} else {
				res.status(500).json({
					message: "Internal Server Error",
				});
			}
        }
    }
}

module.exports= Controller

