import React, {Component} from 'react';
import Slider from 'react-slider';

export default class AudioPlayer extends Component {

	constructor(props) {
		super();
		this.state = {value: props.value};
		this._onChange = this._onChange.bind(this);
	}

	_onChange(value) {
		this.props.onChange && this.props.onChange(value);
	}

	render() {
		return (
			<div className="player__volume">
				<Slider onChange={this._onChange} defaultValue={this.props.value} className="volume-control" />
			</div>
			);
	}
}
