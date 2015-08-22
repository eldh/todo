import React, { PropTypes } from 'react'
import shouldPureComponentUpdate from 'react-pure-render/function'

import Icon from './Icon'

import './checkbox.scss'

export default class Checkbox extends React.Component {

	static propTypes = {
	}

	shouldComponentUpdate = shouldPureComponentUpdate

	render() {
		const { id, defaultChecked, label, checked, onChange, className } = this.props
		return (
			<label className={'checkbox ' + className} htmlFor={id}>
				<input
					type='checkbox'
					id={id}
					className='checkbox__input'
					defaultChecked={defaultChecked}
					checked={checked}
					onChange={onChange}
				/>
				<div className='checkbox__indicator'>
					<Icon name='check' className='checkbox__indicator-icon' />
				</div>
				<span className='checkbox__label'>{label}</span>
			</label>
		)
	}
}
