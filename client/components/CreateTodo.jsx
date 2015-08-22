import React, { PropTypes } from 'react'
import shouldPureComponentUpdate from 'react-pure-render/function'

import * as actions from '../actions/TodoActions'

import './create-todo.scss'
import './borders.scss'

export default class CreateTodo extends React.Component {

	static propTypes = {
		todo: PropTypes.object,
	}

	state = { title: '' }

	shouldComponentUpdate = shouldPureComponentUpdate

	render() {
		const { title } = this.state
		return (
			<div className='create-todo dash-border--top'>
				<input
					className='create-todo__input'
					type='text'
					autoFocus={true}
					onChange={this._updateTitle.bind(this)}
					onKeyDown={this._onKeyDown.bind(this)}
					value={title}
					placeholder='What needs to be done?'
				/>
				<button
					className='create-todo__button'
					disabled={title.length === 0}
					onClick={this._createTodo.bind(this)}
				>
					Add Todo
				</button>
			</div>
		)
	}

	_updateTitle(e) {
		this.setState({ title: e.currentTarget.value })
	}
	_onKeyDown(e) {
		if (e.which === 13 && this.state.title.length > 0) {
			this._updateTitle(e)
			this._createTodo()
		}
	}

	_createTodo() {
		const { dispatch } = this.props
		this.setState({title: ''})
		dispatch(actions.addTodo({
			title: this.state.title,
			completed: false,
		}))
	}
}
