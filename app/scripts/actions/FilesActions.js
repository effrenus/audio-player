import alt from '../alt';
import id3 from 'id3js';
import uuid from 'random-uuid-v4';
import mimeTypes from '../audio/mime';
import _ from 'lodash';

class FilesActions {
	newFile(file, err, tags) {
		return {
			id: uuid(),
			tags: (tags.title ? tags : undefined),
			file
		};
	}

	updateFiles(files) {
		_.forEach(files, (file) => {
			if (mimeTypes.indexOf(file.type) >= 0) {
				id3(file, this.actions.newFile.bind(this, file));
			}
		});

		return files;
	}
}

export default alt.createActions(FilesActions);
