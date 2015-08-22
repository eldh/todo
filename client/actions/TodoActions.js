import request from 'superagent-bluebird-promise'
import { createAction } from 'redux-actions'

import { get, create, update, order, remove, completeAll, deleteAll } from '../lib/api'

export const fetchTodos = createAction('GET_TODOS', get())

export const addTodo = createAction('ADD_TODO', create())

export const updateTodo = createAction('UPDATE_TODO', update())

export const updateOrder = createAction('UPDATE_ORDER', order())

export const markAllCompleted = createAction('COMPLETE_ALL', completeAll())

export const deleteTodo = createAction('DELETE_TODO', remove())

export const deleteAllTodos = createAction('DELETE_ALL', deleteAll())

export const moveTodo = createAction('MOVE_TODO')
