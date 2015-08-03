import React, {Component, PropTypes} from 'react';
import {PLAYER_STATES} from '../../constants/Player';
import _ from 'lodash';

const MODES = {BAR: 1, OSCIL: 2};

export default class Spectrogram extends Component {
	constructor(props) {
		super(props);

		this._mode = MODES.BAR;
		this._binded = false;
		this._renderSpect = this._renderSpect.bind(this);
		this.toggleMode = this.toggleMode.bind(this);
	}

	componentDidMount() {
		this.ctx = this.refs.canvas.getDOMNode().getContext('2d');
	}

	componentWillUpdate(nextProps) {
		let isPlaying = (nextProps.playerState === PLAYER_STATES.PLAYING || nextProps.playerState === PLAYER_STATES.RESUMED);
		if (nextProps.active && isPlaying && !this._binded) {
			this.props.audio.on('audioprocess', this._renderSpect);
			this._binded = true;
		}
		if ((!nextProps.active || !isPlaying) && this._binded) {
			this.props.audio.removeListener('audioprocess', this._renderSpect);
			this._binded = false;
			this._clear();
		}
	}

	componentWillUnmount() {
		this.props.audio.removeListener('audioprocess', this._renderSpect);
	}

	toggleMode(event) {
		this._mode = parseInt(event.target.value, 10);
		return true;
	}

	_clear() {
		this.ctx.clearRect(0, 0, this.props.width, this.props.height);
	}

	_drawBar(array) {
		let gradient = this.ctx.createLinearGradient(0, 0, 0, this.props.height);
		gradient.addColorStop(1, '#7b4397');
		gradient.addColorStop(0, '#dc2430');

		this.ctx.clearRect(0, 0, this.props.width, this.props.height);
		this.ctx.fillStyle = gradient;
		let barWidth = (this.props.width / array.length) * 2.5;
		_.forEach(array, (value, i) => {
			this.ctx.fillRect(i * (barWidth + 1), this.props.height - value / 2, barWidth, value / 2);
		});
	}

	_drawOscil(array) {
		this.ctx.clearRect(0, 0, this.props.width, this.props.height);
		this.ctx.strokeStyle = '#222';
		this.ctx.lineWidth = 1;
		this.ctx.beginPath();
		let gap = (this.props.width / array.length) * 2.5;
		_.forEach(array, (value, i) => {
			let percent = value / 256;
			if (i === 0) {
				this.ctx.moveTo(i, this.props.height - (this.props.height * percent));
				return;
			}
			this.ctx.lineTo(i * gap, this.props.height - (this.props.height * percent));
		});
		this.ctx.stroke();
	}

	_renderSpect() {
		let analyser = this.props.audio.analyser;
		analyser.fftSize = (this._mode === MODES.BAR) ? 256 : 512;
		let array = new Uint8Array(analyser.frequencyBinCount);

		if (this._mode === MODES.BAR) {
			analyser.getByteFrequencyData(array);
			this._drawBar(array);
		}
		else if (this._mode === MODES.OSCIL) {
			analyser.getByteTimeDomainData(array);
			this._drawOscil(array);
		}
	}

	render() {
		return (
			<div className="spectrogram" style={{display: (this.props.active ? 'block' : 'none')}}>
				<canvas width={this.props.width} height={this.props.height} ref="canvas"></canvas>

				<input className="spectrogram__input" type="radio" onChange={this.toggleMode} id="vis_spectrum" value="1" name="specMode" defaultChecked />
				<label className="spectrogram__label" htmlFor="vis_spectrum">bar</label>

				<input className="spectrogram__input" type="radio" onChange={this.toggleMode} id="vis_oscil" value="2" name="specMode" />
				<label className="spectrogram__label" htmlFor="vis_oscil">wave</label>
			</div>
		);
	}
}

Spectrogram.defaultProps = {width: 1000, height: 325};

Spectrogram.propTypes = {
	width: PropTypes.number,
	height: PropTypes.number
};
