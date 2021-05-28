import app from './src/app';
import { PORT } from './src/config';

app.listen(PORT, () => {
	console.log(`Listening on port ${PORT}`);
})