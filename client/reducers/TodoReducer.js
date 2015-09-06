import { handleActions } from 'redux-actions'
import { merge, append, findIndex, clone, map, remove } from 'ramda'

const initialState = {
	todos: []
}

function updateTodo(state, payload) {
	const newState = clone(state)
	const index = findIndex((todo) => todo.id === payload.id
		, newState.todos)
	newState.todos[index] = payload
	return newState
}

export default handleActions({

	ADD_TODO: (state, action) => {
		const { payload } = action
		return merge(state, {
			todos: append(action.payload, state.todos),
		})
	},

	GET_TODOS: (state, action) => {
		const { payload } = action
		return {
			...state,
			todos: payload.todos,
		}
	},

	DELETE_TODO: (state, action) => {
		const { payload } = action
		const index = findIndex((todo) => todo.id === payload.deleted, state.todos)
		return {...state, todos: remove(index, 1, state.todos)}
	},

	UPDATE_TODO: {
		start(state, action) {
			return updateTodo(state, {...action.meta, updating: true})
		},
		next(state, action) {
			return updateTodo(state, action.payload)
		}
	},

	UPDATE_ALL: {
		start(state, action) {
			return {
				...state,
				todos: map((todo) => merge(todo, action.meta), state.todos),
			}
		},
		next(state, action) {
			const { payload } = action
			return {
				...state,
				todos: payload.todos,
			}
		}
	},

	DELETE_ALL: {
		start(state, action) {
			return {
				...state,
				todos: [],
			}
		},
		next(state, action) {
			const { payload } = action
			return {
				...state,
				todos: payload.todos,
			}
		},
	},

	MOVE_TODO: (state, action) => {
		const { beforeIndex, afterIndex } = action.payload
		const newTodos = clone(state.todos)
		newTodos.splice(afterIndex, 0, newTodos.splice(beforeIndex, 1)[0])
		return {
			...state,
			todos: newTodos,
		}
	},

}, initialState)
