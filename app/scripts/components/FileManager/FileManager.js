import React from 'react';
import FilesActions from '../../actions/FilesActions';
import DropArea from './DropArea';
import FileInput from './FileInput';


export default class FileManager extends React.Component {

	_onUserFiles(files) {
		FilesActions.updateFiles(files);
	}

	render() {
		return (
			<div className="file-manager">
				<DropArea onDrop={this._onUserFiles} />
				<FileInput />
			</div>
		);
	}

}
