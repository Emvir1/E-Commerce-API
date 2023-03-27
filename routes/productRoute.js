const express = require("express");
const router = express.Router();
const auth = require("../auth");

const productController = require("../controllers/productController");


//=========== Create Product Via Admin ===================
router.post("/createproduct", auth.verify, (req, res) => {

	const product = auth.decode(req.headers.authorization);

	if(product.isAdmin) {

		productController.addProduct(req.body).then(resultFromProduct => res.send(resultFromProduct)).catch(err => res.send(err));
	} else {

		res.send(false)
	}
});
//=========================================================

//============================== Retrieve Products admin ==

router.get("/hardware", auth.verify, (req, res) => {

	const get = auth.decode(req.headers.authorization);

	if(get.isAdmin){

		productController.getAllProduct().then(resultFromProduct => res.send(resultFromProduct)).catch(err => res.send(err));
	} else {

		res.send(false);
	}
});
//=========================================== end ===========

//======================== Get all active product User ======
router.get("/", (req,res) => {

	productController.getAllProductUser().then(resultFromProduct => res.send(resultFromProduct)).catch(err =>res.send(err));
})
//===================================== end ==================

//====================== Retrieve A specific Product ==============
router.get("/:productId", (req,res) => {

	console.log(req.params);


	productController.getProduct(req.params).then(resultFromProduct => res.send(resultFromProduct)).catch(err => res.send(err))
})

//=========================== End =============================

//=========================== Update Product via Admin =========

router.put("/:productId", auth.verify, (req,res) => {

	const product = auth.decode(req.headers.authorization);

	if(product.isAdmin){

		productController.updateProduct(req.params, req.body).then(resultFromProduct => res.send(resultFromProduct)).catch(err => res.send(err))
	} else {

		res.send(false)

	}
})
//=============================== End============================

//============================Archive Product via Admin==========

router.put("/:productId/archive", auth.verify, (req,res) => {

	const product = auth.decode(req.headers.authorization);

	if(product.isAdmin){

		productController.archiveProduct(req.params, req.body).then(resultFromProduct => res.send(resultFromProduct)).catch(err => res.send(err))
	} else {

		res.send(false);
	}
})
//================================== End ==========================

module.exports = router;