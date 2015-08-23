import { handleActions } from 'redux-actions'
import { merge, append, findIndex, clone, map } from 'ramda'

const initialState = {
	todos: []
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
		return state.delete(payload.id)
	},

	UPDATE_TODO: (state, action) => {
		const { payload } = action
		const newState = clone(state)
		const index = findIndex((todo) => todo.id === payload.id
			, newState.todos)
		newState.todos[index] = payload
		return newState
	},

	COMPLETE_TODO: (state, action) => {
		const { payload } = action
		return state.set(payload.id, payload)
	},

	UPDATE_ALL: (state, action) => {
		const { payload } = action
		return {
			...state,
			todos: payload.todos,
		}
	},

	DELETE_ALL: (state, action) => {
		const { payload } = action
		return {
			...state,
			todos: payload.todos,
		}
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
