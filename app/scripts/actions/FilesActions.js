/*global ID3, FileAPIReader*/
/*eslint new-cap: 1*/
import alt from '../alt';
import uuid from 'random-uuid-v4';
import mimeTypes from '../audio/mime';
import _ from 'lodash';

class FilesActions {

	append(file) {
		let tags = ID3.getAllTags(file.name);

		let track = {
			id: uuid(),
			title: tags.title || file.name,
			album: tags.album || '',
			artist: tags.artist || '',
			file
		};

		if (tags.picture) {
			let base64String = '';
			let image = tags.picture;
			for (let i = 0; i < image.data.length; i++) {
				base64String += String.fromCharCode(image.data[i]);
			}
			track.image = `data:${image.format};base64,` + window.btoa(base64String);
		}

		return track;
	}

	delete(id) {
		return id;
	}

	updateFiles(files) {
		_.forEach(files, (file) => {
			if (mimeTypes.indexOf(file.type) >= 0) {
				ID3.loadTags(
					file.name,
					this.actions.append.bind(this, file),
					{
						tags: ['title', 'artist', 'album', 'picture'],
						dataReader: FileAPIReader(file)
					}
				);
			}
		});

		return files;
	}
}

export default alt.createActions(FilesActions);
