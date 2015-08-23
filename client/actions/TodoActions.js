import request from 'superagent-bluebird-promise'
import { createAction } from 'redux-actions'

import { get, create, update, order, remove, deleteAll, updateAll } from '../lib/api'

export const fetchTodos = createAction('GET_TODOS', get())

export const addTodo = createAction('ADD_TODO', create(), (payload) => payload)

export const updateTodo = createAction('UPDATE_TODO', update(), (payload) => payload)

export const updateAllTodos = createAction('UPDATE_ALL', updateAll(), (payload) => payload)

export const updateOrder = createAction('UPDATE_ORDER', order())

export const moveTodo = createAction('MOVE_TODO')

export const deleteTodo = createAction('DELETE_TODO', remove())

export const deleteAllTodos = createAction('DELETE_ALL', deleteAll())
