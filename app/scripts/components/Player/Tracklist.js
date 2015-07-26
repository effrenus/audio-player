import React, {Component} from 'react';
import Track from './Track';
import FilesStore from '../../stores/FilesStore';
import PlayerStore from '../../stores/PlayerStore';

export default class Tracklist extends Component {
	constructor() {
		super();

		this.state = {tracks: [], activeTrackId: null};

		FilesStore.listen(() => {
			this.setState({tracks: FilesStore.getState().files});
		});

		PlayerStore.listen(() => {
			let storeState = PlayerStore.getState();
			this.setState(storeState);
		});
	}

	renderList() {
		return (this.state.tracks.length) ?
			this.state.tracks.map((track) => {
				let props = {track: track};
				if (this.state.activeTrackId === track.id) {
					props.active = true;
					props.state = this.state.playerState;
				}
				return <Track key={track.id} {...props} />;
			}) : <div className="tracklist__empty">Пусто</div>;
	}

	render() {
		return (
			<div className="tracklist">
				<h2 className="tracklist__header">Плейлист</h2>
				{this.renderList()}
			</div>
		);
	}
}
