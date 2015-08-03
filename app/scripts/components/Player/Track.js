import cx from 'bem-classnames';
import React, {Component} from 'react';
import TrackActions from '../../actions/TrackActions';
import FilesActions from '../../actions/FilesActions';
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
	},
	delete: {
		name: 'tracklist__delete'
	}
};

export default class Track extends Component {
	constructor(props) {
		super(props);
		this.play = this.play.bind(this);
		this.delete = this.delete.bind(this);
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

	delete(event) {
		event.stopPropagation();
		FilesActions.delete(this.props.track.id);
	}

	renderControl() {
		return (
			<button className={cx(bem.control)} onClick={this.isPaused() ? this.resume : (this.isPlaying() ? this.pause : this.play)}>
			</button>
		);
	}

	render() {
		let albumTtitle = this.props.track.album ? <span className={cx(bem.album)}>{this.props.track.album}</span> : '';
		return (
			<div onClick={this.isPaused() ? this.resume : (this.isPlaying() ? this.pause : this.play)} className={cx(bem.track, {active: this.props.active, paused: this.isPaused(), playing: this.isPlaying()})}>
				{this.renderControl()}
				<span className={cx(bem.name)}>{this.props.track.title}</span>
				{albumTtitle}
				<b onClick={this.delete} className={cx(bem.delete)}>&times;</b>
			</div>
		);
	}
}
