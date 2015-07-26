import alt from '../alt';
import TrackActions from '../actions/TrackActions';
import {PLAYER_STATES} from '../constants/Player';
import FilesStore from './FilesStore';

class PlayerStore {
	constructor() {
		this.bindListeners({
			handlePlay: TrackActions.PLAY,
			handleResume: TrackActions.RESUME,
			handlePause: TrackActions.PAUSE,
			handleNext: TrackActions.NEXT
		});
	}

	handlePlay(id) {
		if (!FilesStore.getLen()) {
			return false;
		}

		if (!id) {
			this.activeTrackId = FilesStore.getFirstTrackID();
		}
		else {
			this.activeTrackId = id;
		}

		this.playerState = PLAYER_STATES.PLAYING;
	}

	handleResume() {
		this.playerState = PLAYER_STATES.RESUMED;
	}

	handlePause() {
		this.playerState = PLAYER_STATES.PAUSED;
	}

	handleNext() {
		let nextId = FilesStore.getNextID(this.activeTrackId);
		this.activeTrackId = nextId;
		this.playerState = PLAYER_STATES.PLAYING;
	}
}

export default alt.createStore(PlayerStore, 'PlayerStore');
