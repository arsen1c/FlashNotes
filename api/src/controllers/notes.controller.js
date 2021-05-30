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
			const { id, title, description, date } = req.body;
			user.notes.push({ id, title, description, date });
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
	},
	async delete(req, res, next) {
		try {
			const id = req.params.id;
			const user = await User.findOne({ _id: req.user._id });
			if (!user) {
				return next(CustomErrorHandler.unAuthorized());
			}

			const deleted = user.notes.map((item, index) => {
				if (item.id === parseInt(id)) {
					user.notes.splice(index, 1);	
				};
			});

			if (!deleted) {
				console.log('Error Deleting: Maybe Incorrect Number');
			}
			
			await user.save();
			res.json({ message: 'ok', notes: user.notes });
		} catch (err) {
			return next(err);
		}
	}
}

export default notesController;