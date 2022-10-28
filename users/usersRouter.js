import express from 'express';
import { findUserByName } from './usersService.js';

export const usersRouter = express.Router();

usersRouter.get('/all', (req, res) => {
	let resultUser = findUserByName(
		[
			{ name: 'Victor', age: 22 },
			{ name: 'Vasya', age: 22 },
			{ name: 'Victor', age: 22 },
			{ name: 'Victor', age: 22 },
			{ name: 'Serega', age: 22 },
		],
		req.query.name
	);
	res.contentType('application/json').send(resultUser);
});
