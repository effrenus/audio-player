import React, {Component} from 'react';
import cx from 'bem-classnames';
import FilesStore from '../../stores/FilesStore';
import PlayerStore from '../../stores/PlayerStore';
import TrackActions from '../../actions/TrackActions';
import {PLAYER_STATES} from '../../constants/Player';
import Volume from './Volume';
import Spectrogram from './Spectrogram';
import TrackInfo from './TrackInfo';
import audio from '../../audio/';

const bem = {
	player: {name: 'player', states: ['visualized']},
	controls: {name: 'player__controls'},
	play_btn: {name: 'player__play', states: ['playing']}
};

export default class AudioPlayer extends Component {
	constructor() {
		super();

		this.state = {progress: 0, visualize: false};

		PlayerStore.listen(() => {
			let storeState = PlayerStore.getState();
			let track = FilesStore.getFile(storeState.activeTrackId);

			switch (storeState.playerState) {
				case PLAYER_STATES.PLAYING:
					audio.playAudioFromFile(track.file);
					break;
				case PLAYER_STATES.PAUSED:
					audio.pause();
					break;
				case PLAYER_STATES.RESUMED:
				default:
					audio.playSound();
			}

			this.setState({track, playerState: storeState.playerState});
		});

		audio.on('timeupdate', this._onProgress.bind(this));
		audio.on('ended', this._onAudioEnd.bind(this));
		this.toggleVisualize = this.toggleVisualize.bind(this);
		this.togglePlay = this.togglePlay.bind(this);
	}

	componentDidMount() {
		this.setState({playerGeom: this.refs.player.getDOMNode().getBoundingClientRect()});
	}

	isPlaying() {
		return this.state.playerState === PLAYER_STATES.PLAYING || this.state.playerState === PLAYER_STATES.RESUMED;
	}

	isPaused() {
		return this.state.playerState === PLAYER_STATES.PAUSED;
	}

	setVolume(value) {
		audio.setVolume(value);
	}

	_onProgress(progress) {
		this.setState({progress});
	}

	_onAudioEnd() {
		TrackActions.next();
	}

	togglePlay() {
		if (this.isPlaying()) {
			TrackActions.pause();
		}
		else if (this.isPaused()) {
			TrackActions.resume();
		}
		else {
			TrackActions.play();
		}
	}

	toggleVisualize() {
		this.setState({visualize: !this.state.visualize});
	}

	renderTrackInfo() {
		return (!!this.state.track) ? <TrackInfo tags={this.state.track.tags} /> : '';
	}

	renderSpectrogram() {
		return (this.state.playerGeom ? <Spectrogram width={this.state.playerGeom.width} height={100} visualize={this.state.visualize} audio={audio} /> : '');
	}

	render() {
		return (
			<div ref="player" className={cx(bem.player, {visualized: this.state.visualize})}>

				<div className="player__progress progress">
					<i className="progress__bar" style={{width: this.state.progress + '%'}}></i>
				</div>

				{this.renderTrackInfo()}

				<div className="player__controls">
					<button onClick={this.togglePlay} className={cx(bem.play_btn, {playing: this.isPlaying()})}></button>
				</div>

				<Volume onChange={this.setVolume} value={audio.getVolume()} />

				<button onClick={this.toggleVisualize} className="button_reset player__btn_spec"></button>
				{this.renderSpectrogram()}
			</div>
			);
	}
}
