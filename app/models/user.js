/**
 * @model User
 */

// Load dependecies
var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var Schema = mongoose.Schema;



var userSchema = new Schema({
	local: {
		email: String,
		password: String
	}
});


userSchema.methods = {

	/**
	 * [generateHash]
	 * @param  {[String]} password
	 * @return {[Boolean]} 
	 */
	
	generateHash: function(password){
		return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
	},

	/**
	 * [validPassword return true if valid password]
	 * @param  {[String]} password
	 * @return {[Boolean]}
	 */
	
	validPassword: function(password){
		return bcrypt.compareSync(password, this.local.password);
	}



}


mongoose.model('User', userSchema);