import React, { PropTypes } from 'react'
import shouldPureComponentUpdate from 'react-pure-render/function'
import * as actions from '../actions/TodoActions'

import { filter } from 'ramda'

import './footer.scss'
import './borders.scss'

export default class Footer extends React.Component {

	static propTypes = {
		todos: PropTypes.array.isRequired,
	}

	shouldComponentUpdate = shouldPureComponentUpdate

	render() {
		const { todos } = this.props
		const doneCount = filter((todo) => !todo.completed, todos).length
		return (
			<footer className='footer dash-border--top'>
				{todos.length === 0 ? <div className='quiet'>Make someone happy today.</div>
					: this._renderTodoCount(doneCount)
				}
				{todos.length === 0 ? null : doneCount > 0 ? <div
						className='link'
						onClick={this._markAllCompleted.bind(this)}
					>
						Mark all as complete
					</div> : <div
						className='link'
						onClick={this._clearCompleted.bind(this)}
					>
						Clear completed tasks
					</div>
				}
			</footer>
		)
	}

	_renderTodoCount(count) {
		const countString = this._getCountString(count)
		return (
			<div className='quiet flex-grow'>{countString}</div>
		)
	}

	_getCountString(count) {
		switch (count) {
		case 0:
			return 'You have done it all.'
		case 1:
			return 'Just one item left.'
		default:
			return count + ' items left'
		}
	}

	_markAllCompleted() {
		const { dispatch } = this.props
		dispatch(actions.markAllCompleted())
	}
	_clearCompleted() {
		const { dispatch } = this.props
		dispatch(actions.deleteAllTodos())
	}
}
