import app from './src/app';
import { PORT } from './src/config';
import cookieParser from 'cookie-parser';
app.use(cookieParser());
app.listen(PORT, () => {
	console.log(`Listening on port ${PORT}`);
})