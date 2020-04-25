
let id = 0

export function create() {
	const return_id = id
	id++
	return Promise.resolve(return_id)
}
