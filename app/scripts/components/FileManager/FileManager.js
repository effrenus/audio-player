import React from 'react';
// import FilesActions from '../../actions/FilesActions';
import DropArea from './DropArea';
import FileInput from './FileInput';


export default class FileManager extends React.Component {

	render() {
		return (
			<div className="file-manager">
				<DropArea />
				<FileInput />
			</div>
		);
	}

}
