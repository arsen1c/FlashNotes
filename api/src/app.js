import express from 'express';
import { DB_URL } from './config';
import routes from './routes';
import mongoose from 'mongoose';
import errorHandler from './middlewares/errorHandler';
import cookieParser from 'cookie-parser';
import cors from 'cors';

const app = express();
app.use(cookieParser());

mongoose.connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, 'useCreateIndex': true });
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
	console.log('DB Connected...');
});

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", 'http://localhost:3000');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Content-Type', 'application/json;charset=UTF-8')

  next();
});
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cors(
  {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  }
));

app.use('/api', routes);

// Error handler middleware
app.use(errorHandler);

export default app;
