const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
	firstName : {
		type : String,
		required : [true, "First name is required"]
	},
	lastName : {
		type : String,
		required : [true, "Last name is required"]
	},
	email : {
		type : String,
		required : [true, "Email is required"]
	},
	password : {
		type : String,
		required : [true, "Password is required"]
	},
	isAdmin : {
		type : Boolean,
		default : false
	},
	orderedProduct : [
		{
			products : [
			{
				productId : {
					type : String,
					required : [true, "Product ID is required"]
				},
				productName : {
					type : String,
					required: [true, "Product name is required"]
				},
				quantity : {
					type : Number,
					required : [true, "Quantity is required"]
				},
				price : {
					type : Number
				}
			 }
		  	],
			_id : false,
		  	totalAmount : {
			type : Number,
		  default: 6000
			},
			purchasedOn : {

				type : Date,
			 default : new Date()
			}
		} 	
	]
})

module.exports = mongoose.model("User", userSchema);