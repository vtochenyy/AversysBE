export const findUserByName = (users, name) => {
	return users.filter((el) => el.name == name);
};
