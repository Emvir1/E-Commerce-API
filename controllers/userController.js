const bcrypt = require("bcrypt");
const auth = require("../auth");
const User = require("../models/User");
const Product = require("../models/Product");

// const auth = require("../auth");

//=============== Start of Register
module.exports.registerUser = (req) => {
  let newUser = new User({
    firstName: req.firstName,
    lastName: req.lastName,
    email: req.email,
    password: bcrypt.hashSync(req.password, 12),
  });

  return newUser
    .save()
    .then((user) => {
      if (user) {
        return true;
      } else {
        return false;
      }
    })
    .catch((err) => err);
};
//==================== End of Register

//============= validation using email

module.exports.checkEmailValid = (req) => {
  return User.find({ email: req.email })
    .then((res) => {
      if (res.length > 0) {
        return true;
      } else {
        return false;
      }
    })
    .catch((err) => err);
};
//================== end email validation

// ============== User Authenticate Via Token =============

module.exports.login = (log) => {
  return User.findOne({ email: log.email })
    .then((res) => {
      if (res == null) {
        return false;
      } else {
        const validator = bcrypt.compareSync(log.password, res.password);

        if (validator) {
          return { access: auth.accessId(res) };
        } else {
          return false;
        }
      }
    })
    .catch((err) => err);
};
//===========================================================
// === Retrieve data from User ==============================

module.exports.getUser = (res) => {
  return User.findById(res.userId).then((result) => {
    if (result == null) {
      return false;
    } else {
      result.password = "";
      return result;
    }
  });
};
//================================== End =====================

//======================= set admin ==========================

module.exports.addAdmin = (req, res) => {

	let admin = {isAdmin: res.isAdmin}

	return User.findByIdAndUpdate(req.userId, admin).then(resultFromAdm => true).catch(err => err);
}

//========================= Create Order ==========================

// module.exports.checkOut = (data, body) => {

//   const id = data.userId;

//   return User.findById(id).then((user) => {

//       user.orderedProduct.push({ products: body});
//       console.log(user.orderedProduct[0].products);
//       return user.save();
//     }).catch((error) => {
//       console.error(err);
//       throw err;
//     });
// };
//================================= End ===========================

//======================================== Retrieve Details =======

module.exports.getUsers = (id) => {
  return User.findById(id).then((result) => {
    result.password = "";

    return result;
  });
};

//========================================= for debugging purposes==

module.exports.checkout = (data, body) => {
  const id = data.userId;
  console.log(data);



  return User.findById(id).then(user => {
    user.orderedProduct.push({ products : body});
    console.log(user.orderedProduct[0].products);
    return user.save();
  }).catch(err => {
    // handle errors here
    console.error(err);
    throw err;
  });
};
