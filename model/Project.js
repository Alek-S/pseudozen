const mongoose = require('mongoose');
const Schema = mongoose.Schema;


// Create schema
let ProjectSchema = new Schema({
	_creator : { type: Schema.Types.ObjectId, ref: 'User' },
	title: {
		type: String,
		required: [true, 'Project title required']
	},
	createdAt: { 
		type: Date, 
		default: Date.now 
	},
	entry: [],
	public: {
		type: Boolean,
		default: true
	},
	description: {
		type: String
	}
});

let Project = mongoose.model('Project', ProjectSchema);
module.exports = Project;