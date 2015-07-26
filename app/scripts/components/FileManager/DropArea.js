import React from 'react';
import cx from 'bem-classnames';
import bem from './bem-classes';
import FilesActions from '../../actions/FilesActions';

export default class Droparea extends React.Component {

	constructor(props) {
		super(props);
		this.state = {active: false};
		this._toggleDropState = this._toggleDropState.bind(this);
		this._onDrop = this._onDrop.bind(this);

		document.addEventListener('dragover', function(event) {
			event.preventDefault();
		}, false);
	}

	_toggleDropState() {
		this.setState({active: !this.state.active});
	}

	_onDrop(event) {
		event.preventDefault();
		this._toggleDropState();
		let files = event.dataTransfer.files;
		FilesActions.updateFiles(files);
	}

	render() {
		return (
			<div
				onDrop={this._onDrop}
				onDragEnter={this._toggleDropState}
				onDragLeave={this._toggleDropState}
				className={cx(bem.droparea, {active: this.state.active})}>
				<span className={cx(bem.text)}>Чтобы загрузить треки, перетащите их сюда</span>
			</div>
		);
	}

}
