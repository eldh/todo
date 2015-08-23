import React, { PropTypes, Component } from 'react'
import classnames from 'classnames'
import shouldPureComponentUpdate from 'react-pure-render/function'

import Checkbox from './Checkbox'
import Icon from './Icon'

import './todo.scss'

import { DragSource, DropTarget } from 'react-dnd'

const todoSource = {
	beginDrag(props) {
		return { id: props.todo.id }
	},
	endDrag(props, monitor, component) {
		if (!monitor.didDrop()) return
		props.moveDone()
	}
}

const todoTarget = {
	hover(props, monitor) {
		const draggedId = monitor.getItem().id
		if (draggedId !== props.id) {
			props.moveProgress(draggedId, props.todo.id)
		}
	}
}

@DropTarget('todo', todoTarget, connect => ({
	connectDropTarget: connect.dropTarget(),
}))
@DragSource('todo', todoSource, (connect, monitor) => ({
	connectDragSource: connect.dragSource(),
	isDragging: monitor.isDragging()
}))
export default class Todo extends Component {

	static propTypes = {
		connectDragSource: PropTypes.func.isRequired,
		connectDropTarget: PropTypes.func.isRequired,
		isDragging: PropTypes.bool.isRequired,
		todo: PropTypes.object,
		moveProgress: PropTypes.func.isRequired,
	}

	state = {hovering: false}

	shouldComponentUpdate = shouldPureComponentUpdate

	render() {
		const { todo, isDragging, connectDragSource, connectDropTarget } = this.props

		const classes = classnames({
			todo: true,
			'todo--completed': todo.completed,
			'todo--updating': todo.updating,
			// Add hover state to get around browser bugs with dnd & :hover.
			'todo--hover': this.state.hovering,
			'todo--dragging': isDragging,
		})

		return connectDragSource(connectDropTarget(
			<li
				className={classes}
				onMouseEnter={this.onMouseEnter.bind(this)}
				onMouseLeave={this.onMouseLeave.bind(this)}
			>
				<Checkbox
					checked={todo.completed}
					id={todo.id}
					label={todo.title}
					onChange={ this._toggleCompleted.bind(this)}
					className='todo__checkbox'
				/>
				<Icon name='move' className='todo__icon' />
			</li>
		))
	}

	onMouseLeave(e) {
		this.setState({hovering: false})
	}

	onMouseEnter(e) {
		this.setState({hovering: true})
	}

	_toggleCompleted() {
		const { update, todo } = this.props
		update({...todo, completed: !todo.completed})
	}
}
