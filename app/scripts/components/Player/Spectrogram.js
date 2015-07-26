import React, {Component} from 'react';
import _ from 'lodash';

export default class Spectrogram extends Component {
	constructor(props) {
		super(props);

		this._renderSpect = this._renderSpect.bind(this);
	}

	componentDidMount() {
		this.ctx = this.refs.canvas.getDOMNode().getContext('2d');

		this.props.audio.on('audioprocess', this._renderSpect.bind(this));
	}

	componentWillUnmount() {
		this.props.audio.removeListener('audioprocess', this._renderSpect);
	}

	_draw(array) {
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

	_renderSpect() {
		let analyser = this.props.audio.analyser;
		let array = new Uint8Array(analyser.frequencyBinCount);
		analyser.getByteFrequencyData(array);

		requestAnimationFrame(this._draw.bind(this, array));
	}

	render() {
		return <canvas width={this.props.width} height={this.props.height} ref="canvas" style={{display: (this.props.visualize ? 'block' : 'none')}} className="spectrogram"></canvas>;
	}
}


Spectrogram.defaultProps = {width: 1000, height: 325};
