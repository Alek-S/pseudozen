const mongoose = require('mongoose');
const Schema = mongoose.Schema;


// Create schema
let UserSchema = new Schema({
	email: {
		type: String,
		required: [true, 'User email required']
	},
	password: {
		type: String,
		required: [true, 'User password required']
	},
	name: {
		type: String,
	},
});

let User = mongoose.model('User', UserSchema);
module.exports = User;