import express from 'express';
import { usersRouter } from './users/usersRouter.js';

const port = 9876;
const app = express();

app.use((req, res, next) => {
	console.log(`Выполнен запрос: ${new Date().toLocaleString()}`);
	next();
});

app.use('/users', usersRouter);

app.listen(port, () => {
	console.log(
		`Server running at port: ${port}\nStart date/time: ${new Date().toLocaleString()}`
	);
});
