import { User } from '../models';
import { CustomErrorHandler } from '../services';
import Joi from 'joi';

const notesController = {
	async add (req, res, next) {
		try {
			const user = await User.findOne({ _id: req.user._id });

			if (!user) {
				return next(CustomErrorHandler.unAuthorized());
			};

			const { title, description, date } = req.body;
			user.notes.push({ title, description, date });
			await user.save();
			res.json({ message: 'Note Saved!' });
		} catch (err) {
			return next(err);
		};
	},
	async listAllNotes(req, res, next) {
		try {
			const user = await User.findOne({ _id: req.user._id }).select('notes');

			if (!user){
				return next(CustomErrorHandler.unAuthorized());
			}

			res.json({data: user});
		} catch(err) {
			return next(err);
		}
	}
}

export default notesController;