const jwt = require("jsonwebtoken");

const secret = "Capstone"


//==== Token Creation ======================
module.exports.accessId = (token) => {

	const data = {
		id : token._id,
		email : token.email,
		isAdmin : token.isAdmin
	};

	return jwt.sign(data, secret, {});
};
//=========== Token End ======================

//============= Token Validation =============

module.exports.verify = (request, response, next) => {

	let token = request.headers.authorization;

	if(typeof token !== "undefined") {

		console.log(token);


		token = token.slice(7, token.length);

		return jwt.verify(token, secret, (err, lesg) => {

			if(err){

				return res.send({ auth : "Failed"})

			} else {

				next();
			}
		}) 
	} else {

		return res.send({ auth : "Still Failed"})
	}
};
// ======================== end===============

//============== decrypt

module.exports.decode = (token) => {

	if(typeof token !== "undefined"){

		token = token.slice(7, token.length);

		return jwt.verify(token, secret, (err, data) => {

			if(err) {
				return null;

			} else {

				return jwt.decode(token, {complete : true}).payload
			}
		})

	} else {

		return null;
	}
}