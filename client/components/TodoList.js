import React, { PropTypes } from 'react'
import shouldPureComponentUpdate from 'react-pure-render/function'
import { DragDropContext } from 'react-dnd'
import Todo from './Todo'
import HTML5Backend from 'react-dnd/modules/backends/HTML5'

import { findIndex, map } from 'ramda'

import * as actions from '../actions/TodoActions'

import './todo-list.scss'

@DragDropContext(HTML5Backend)
export default class TodoList extends React.Component {

	constructor(props) {
		super(props)
		this.moveDone = this.moveDone.bind(this)
		this.moveProgress = this.moveProgress.bind(this)
	}

	static propTypes = {
		todos: PropTypes.array,
	}

	shouldComponentUpdate = shouldPureComponentUpdate

	moveProgress(id, afterId) {
		const { todos } = this.props

		const beforeIndex = findIndex((t => t.id === id), todos)
		const afterIndex = findIndex((t => t.id === afterId), todos)
		if (beforeIndex !== afterIndex) {
			this.props.dispatch(actions.moveTodo({beforeIndex, afterIndex}))
		}
	}

	moveDone() {
		const { todos, dispatch } = this.props

		dispatch(actions.updateOrder(map(t => t.id, todos)))
	}

	render() {
		const { dispatch, todos } = this.props
		return (
			<ul className='todo-list'>
				{todos.map((todo) => {
					return <Todo
						key={todo.id}
						todo={todo}
						update={(todo) => dispatch(actions.updateTodo(todo))}
						moveProgress={this.moveProgress}
						moveDone={this.moveDone}
					/>
				})}
			</ul>
		)
	}
}
