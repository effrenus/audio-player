import alt from '../alt';

class TrackActions {
	constructor() {
		this.generateActions('play', 'resume', 'pause', 'stop', 'next');
	}
}

export default alt.createActions(TrackActions);
