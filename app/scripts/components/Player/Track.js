import cx from 'bem-classnames';
import React, {Component} from 'react';
import TrackActions from '../../actions/TrackActions';
import {PLAYER_STATES} from '../../constants/Player';

const bem = {
	track: {
		name: 'tracklist__track',
		states: ['active', 'paused', 'playing']
	},
	control: {
		name: 'track-control'
	},
	name: {
		name: 'tracklist__name'
	},
	album: {
		name: 'tracklist__album'
	}
};

export default class Track extends Component {
	constructor(props) {
		super(props);
		this.play = this.play.bind(this);
	}

	isPlaying() {
		return this.props.active && (this.props.state === PLAYER_STATES.PLAYING || this.props.state === PLAYER_STATES.RESUMED);
	}

	isPaused() {
		return this.props.active && this.props.state === PLAYER_STATES.PAUSED;
	}

	play() {
		let trackId = this.props.track.id;
		TrackActions.play(trackId);
	}

	resume() {
		TrackActions.resume();
	}

	pause() {
		TrackActions.pause();
	}

	renderControl() {
		return (
			<button className={cx(bem.control)} onClick={this.isPaused() ? this.resume : (this.isPlaying() ? this.pause : this.play)}>
			</button>
		);
	}

	renderTagData() {
		return (
			<div>
				<span className={cx(bem.name)}>{this.props.track.tags.title}</span>
				<span className={cx(bem.album)}>{this.props.track.tags.album}</span>
			</div>
		);
	}

	renderFileName() {
		return <span className={cx(bem.name)}>{this.props.track.file.name}</span>;
	}

	render() {
		return (
			<div className={cx(bem.track, {active: this.props.active, paused: this.isPaused(), playing: this.isPlaying()})}>
				{this.renderControl()}
				{this.props.track.tags ? this.renderTagData() : this.renderFileName()}
			</div>
		);
	}
}
