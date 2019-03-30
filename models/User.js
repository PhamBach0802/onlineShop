const mongoose = require('mongoose');
const utils = require('../common/utils');
const Schema = mongoose.Schema;

const userSchema = new Schema(
	{
		avatar: Object,
		firstName: {
			type: String,
		},
		lastName: {
			type: String,
			required: true,
		},
		dob: Date,
		gender: {
			type: String,
			required: true,
		},
		country: String,
		phoneNumber: String,
		zipcode: {
			type: Number,
			min: 1000,
			max: 999999,
		},
		username: {
			type: String,
			required: true,
			validate: {
				validator: function(v) {
					return /^[A-Za-z0-9_.-]+$/.test(v);
				},
				message: props => `${props.value} is not a valid username!`,
			},
		},
		email: {
			type: String,
			required: true,
			validate: [
				{
					validator: function(v) {
						return utils.validateEmail(v);
					},
					message: props => `${props.value} is not a valid email!`,
				},
				{
					validator: function(v) {
						return mongoose
							.model('User')
							.countDocuments({ email: v })
							.exec()
							.then(count => count === 0);
					},
					message: props => `${props.value} is duplicated!`,
				},
			],
		},
		emailVerified: {
			type: String,
			default: "on",
		},
		role: {
			type: String,
			enum: ['admin', 'moderator', 'user'],
			required: true,
		},
		dateCreated: {
			type: Date,
			default: Date.now,
		},
	},
	{ toJSON: { virtuals: true } }
);

userSchema.virtual('fullName').get(function() {
	return this.firstName + ' ' + this.lastName;
});

const User = mongoose.model('User', userSchema);

module.exports = User;
