const Product = require("../models/Product")


// =============== Create Product ===============================

module.exports.addProduct = (req) => {

	let newProduct = new Product({
		name : req.name,
		description : req.description,
		price : req.price
	});

	return newProduct.save().then(product => true).catch(err => false)
};
//================= end ==========================================

//======================= Retrieve All product Admin =============

module.exports.getAllProduct = () => {

	return Product.find({}).then(result => result).catch(err => err);
}
//============================ End ================================

//============================ Get All Active User ================

module.exports.getAllProductUser = () => {

	return Product.find({ isActive : true}).then(result => result).catch(err => err);
}
//=============================End===================================

//=========================== Get specific Course ===================

module.exports.getProduct = (req) => {

	return Product.findById(req.productId).then(res => {
		return res;

	}).catch(err => err);
}
//==================================== End ===========================

//========================== Update Product Via Admin ================
module.exports.updateProduct = (req, res) => {

	let updatedProduct = {

		name: res.name,
		description : res.description,
		price: res.price
	};

	return Product.findByIdAndUpdate(req.productId, updatedProduct).then(product => true).catch(err => err)
}
//================================= End ================================

//================================= Archive a Course ===================

module.exports.archiveProduct = (req, res) => {

	let archive = {isActive: res.isActive}

	return Product.findByIdAndUpdate(req.productId, archive).then(resultFromProduct => true).catch(err => err);
}
//================================== End ================================