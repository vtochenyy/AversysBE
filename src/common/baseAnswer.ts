export function baseAnswer(status: number, value: Object, paging: Object) {
	return {
		status: status,
		data: value,
		paging: paging,
	};
}
