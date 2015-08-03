import React, {Component, PropTypes} from 'react';
import FilesActions from '../../actions/FilesActions';
import DropArea from './DropArea';
import FileInput from './FileInput';
import cx from 'bem-classnames';
import bem from './bem-classes';

export default class FileManager extends Component {
	constructor(props) {
		super(props);
		this._onClick = this._onClick.bind(this);
	}

	_onDropFiles(files) {
		FilesActions.updateFiles(files);
	}

	_onFileInputChange(files) {
		FilesActions.updateFiles(files);
	}

	_onClick() {
		this.refs.fileInput.onClick();
	}

	render() {
		return (
			<div onClick={this._onClick} className={cx(bem.manager)}>
				<DropArea onDrop={this._onDropFiles} />
				<FileInput onChange={this._onFileInputChange} accept={this.props.accept} multiple={true} ref="fileInput" />
			</div>
		);
	}

}

FileManager.defaultProps = {accept: ['*']};

FileManager.propTypes = {
	multiple: PropTypes.bool,
	accept: PropTypes.arrayOf(PropTypes.string)
};
