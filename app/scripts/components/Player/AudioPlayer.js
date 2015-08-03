import React, {Component} from 'react';
import cx from 'bem-classnames';
import FilesStore from '../../stores/FilesStore';
import PlayerStore from '../../stores/PlayerStore';
import TrackActions from '../../actions/TrackActions';
import {PLAYER_STATES} from '../../constants/Player';
import Volume from './Volume';
import Spectrogram from './Spectrogram';
import TrackInfo from './TrackInfo';
import Equalizer from './Equalizer';
import audio from '../../audio/';
import utils from '../../utils';
import PlayerProgress from './PlayerProgress';

const bem = {
	player: {name: 'player', states: ['visualized', 'equalizer']},
	panel: {name: 'player__panel'},
	controls: {name: 'player__controls'},
	play_btn: {name: 'player__play', states: ['playing']}
};

export default class AudioPlayer extends Component {
	constructor() {
		super();

		this.state = {progress: 0, playerState: PLAYER_STATES.STOPPED, visualize: false, equalizer: false};

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
				case PLAYER_STATES.STOPPED:
					audio.stop();
					break;
				case PLAYER_STATES.RESUMED:
				default:
					audio.playSound();
			}

			this.setState({track, playerState: storeState.playerState});
		});

		this._onProgress = this._onProgress.bind(this);
		this._onAudioEnd = this._onAudioEnd.bind(this);
		this.toggleVisualize = this.toggleVisualize.bind(this);
		this.toggleEq = this.toggleEq.bind(this);
		this.togglePlay = this.togglePlay.bind(this);

		audio.on('timeupdate', this._onProgress);
		audio.on('ended', this._onAudioEnd);
	}

	componentDidMount() {
		this.setState({playerGeom: this.refs.player.getDOMNode().getBoundingClientRect()});
	}

	componentWillUnmount() {
		TrackActions.stop();
		audio.removeListener('timeupdate', this._onProgress);
		audio.removeListener('ended', this._onAudioEnd);
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

	_onProgress(value) {
		if (this.isPlaying()) {
			this.refs.time.getDOMNode().innerText = utils.format(audio.getCurrentTime()) + '/' + utils.format(audio.getDuration());
			this.refs.progress.setProgress(value);
		}
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

	toggleEq() {
		this.setState({equalizer: !this.state.equalizer});
	}

	toggleVisualize() {
		this.setState({visualize: !this.state.visualize});
	}

	renderTrackInfo() {
		return (!!this.state.track) ? <TrackInfo track={this.state.track} /> : '';
	}

	renderSpectrogram() {
		return (this.state.playerGeom ? <Spectrogram width={this.state.playerGeom.width} height={100} playerState={this.state.playerState} active={this.state.visualize} audio={audio} /> : '');
	}

	render() {
		let timeControl = (this.isPlaying() || this.isPaused()) ? <i ref="time" className="player__time"></i> : '';

		return (
			<div ref="player" className={cx(bem.player, {visualized: this.state.visualize, equalizer: this.state.equalizer})}>
				<div className={cx(bem.panel)}>

					<PlayerProgress ref="progress" />

					{timeControl}

					{this.renderTrackInfo()}

					<div className={cx(bem.controls)}>
						<button onClick={this.togglePlay} className={cx(bem.play_btn, {playing: this.isPlaying()})}></button>
					</div>

					<Volume onChange={this.setVolume} value={audio.getVolume()} />

					<button title="Эквалайзер" onClick={this.toggleEq} className="button_reset player__btn player__btn_eq"></button>
					<button title="Визуализатор спектра" onClick={this.toggleVisualize} className="button_reset player__btn player__btn_spec"></button>
				</div>

				<Equalizer audio={audio} />
				{this.renderSpectrogram()}
			</div>
			);
	}
}
