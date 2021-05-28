import express from 'express';
import { DB_URL } from './config';
import routes from './routes';
import mongoose from 'mongoose';
import errorHandler from './middlewares/errorHandler';

const app = express();

mongoose.connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, 'useCreateIndex': true });
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
	console.log('DB Connected...');
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use('/api', routes);

// Error handler middleware
app.use(errorHandler);

export default app;
