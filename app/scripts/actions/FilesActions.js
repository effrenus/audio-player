/*global ID3, FileAPIReader*/
/*eslint new-cap: 1*/
import alt from '../alt';
import uuid from 'random-uuid-v4';
import mimeTypes from '../audio/mime';
import _ from 'lodash';
import ThreadPool from 'threadpool-js';

/**
 * Create workers pool to get audio ID3 tags in separate threads
 * @type {ThreadPool}
 */
const pool = new ThreadPool(navigator.hardwareConcurrency || 4);

class FilesActions {

	append(file, tags) {
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
		pool.run('./scripts/worker.js', {file: files[0]});

		_.forEach(files, file => {
			if (mimeTypes.indexOf(file.type) >= 0) {
				pool.run('./scripts/worker.js', {file}).done(this.actions.append.bind(this, file));
			}
		});

		return files;
	}
}

export default alt.createActions(FilesActions);
