import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const userSchema = new Schema({
	username: { type: String, required: true },
	email: { type: String, required: true, unique: true },
	password: { type: String, required: true },
	role: { type: String, default: 'user' }
})

export default mongoose.model('User', userSchema, 'users');