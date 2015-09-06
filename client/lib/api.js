import request from 'superagent-bluebird-promise'

const BASE_URL = 'http://localhost:5000/api'
const ENTITY = 'todos'

export const get = (type = ENTITY) => async () => {
	const url = `${BASE_URL}/${type}`
	return _get(url)
}

export const create = (type = ENTITY) => async (payload) => {
	const url = `${BASE_URL}/${type}`
	return _post(url, payload)
}

export const update = (type = ENTITY) => async (payload) => {
	const url = `${BASE_URL}/${type}/${payload.id}`
	return _put(url, payload)
}

export const remove = (type = ENTITY) => async (payload) => {
	console.log('remove', payload)
	const url = `${BASE_URL}/${type}/${payload.id}`
	return _delete(url)
}

export const updateAll = (type = ENTITY) => async (payload) => {
	const url = `${BASE_URL}/${type}/updateAll`
	return _put(url, payload)
}

export const deleteAll = (type = ENTITY) => async (payload) => {
	const url = `${BASE_URL}/${type}/deleteAll`
	return _delete(url, payload)
}

export const order = (type = ENTITY) => async (payload) => {
	const url = `${BASE_URL}/${type}/order`
	return _post(url, payload)
}

const _get = async (url) => {
	const result = await request
		.get(url)
		.promise()
	return result.body
}

const _post = async (url, payload) => {
	const result = await request
		.post(url)
		.send(payload)
		.promise()
	return result.body
}

const _put = async (url, payload) => {
	const result = await request
		.put(url)
		.send(payload)
		.promise()
	return result.body
}

const _delete = async (url, payload) => {
	const result = await request
		.del(url)
		.promise()
	return result.body
}
