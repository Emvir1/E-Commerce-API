const express = require("express");
const router = express.Router();
const auth = require("../auth");
const User = require("../models/User");
const Product = require("../models/Product");
const userController = require("../controllers/userController");

//=== User registration ================================
router.post("/register", (req, res) => {
  userController
    .registerUser(req.body)
    .then((resultFromUser) => res.send(resultFromUser))
    .catch((err) => res.send());
});
// ============= End of Registration ===================

// ============== checking of email validation  ========

router.post("/checkuser", (req, res) => {
  userController
    .checkEmailValid(req.body)
    .then((resultFromEmail) => res.send(resultFromEmail))
    .catch((err) => res.send(err));
});

//=================== end of Email Validation ==========

//====================== login User ====================
router.post("/login", (reg, res) => {
  userController
    .login(reg.body)
    .then((resultFromDb) => res.send(resultFromDb))
    .catch((err) => res.send(err));
});
// =========================== End of Login=============

//========================== set admin =================
router.put("/:userId", auth.verify, (req, res) => {

	const admin = auth.decode(req.headers.authorization);

	if(admin.isAdmin){

		userController.addAdmin(req.params, req.body).then(resultFromAdmin => res.send(resultFromAdmin)).catch(err => res.send(err))
	} else {
		res.send(false)
	}
})

//=========== View User ================================

router.get("/details", (req, res) => {
  const data = auth.decode(req.headers.authorization);

  userController
    .getUser({ userId: data.id })
    .then((resultFromData) => res.send(resultFromData))
    .catch((err) => err);
});
//================== End ================================

//============ Create Order =================================

router.post("/checkout", auth.verify, (req, res) => {

    const userData = auth.decode(req.headers.authorization);

    let data = {
        userId : userData.id,
        isAdmin : userData.isAdmin,

    }
    console.log(data)

    if(!data.isAdmin){

        userController.checkout(data, req.body).then(resultFromController => res.send(resultFromController)).catch(err =>res.send(err));
        console.log(req.body)
    } else {
        res.send(false);
    }
});

//========================== Get all=========================

router.get("/:userId/userDetails", (req, res) => {
  const userData = auth.decode(req.headers.authorization);

  userController
    .getUsers(userData.id)
    .then((resultFromController) => res.send(resultFromController))
    .catch((err) => res.send(err));
});

//========================= For debugging purposes ===========

module.exports = router;
