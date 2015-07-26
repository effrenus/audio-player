import alt from '../alt';
import FilesActions from '../actions/FilesActions';
import _ from 'lodash';

class FilesStore {
	constructor() {
		this.bindListeners({
			handleNewFile: FilesActions.NEW_FILE
		});

		this.state = {
			files: []
		};
	}

	handleNewFile(file) {
		this.state.files.push(file);
	}

	static getFile(id) {
		return _.find(this.state.files, (f) => {
			return id === f.id;
		});
	}

	static getNextID(id) {
		let len = this.state.files.length;
		let index = _.findIndex(this.state.files, (f) => {
			return id === f.id;
		});
		return (index < len - 1) ? this.state.files[index + 1].id : undefined;
	}

	static getLen() {
		return this.state.files.length;
	}

	static getFirstTrackID() {
		return this.getLen() ? this.state.files[0].id : undefined;
	}
}

export default alt.createStore(FilesStore, 'FilesStore');
