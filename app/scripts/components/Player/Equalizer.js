import React, {Component} from 'react';
import presets from './presets';

export default class Equalizer extends Component {
	constructor() {
		super();
		this.setFilter = this.setFilter.bind(this);
	}

	setFilter(event) {
		let num = parseInt(event.target.getAttribute('data-set'), 10);
		this.props.audio.setGains(presets[num].g);
	}

	render() {
		return (
			<div className="equalizer">
				{presets.map((item, i) => {
					return <span key={'preset' + i} className="equalizer__set" data-set={i} onClick={this.setFilter}>{item.title}</span>;
				})}
			</div>
		);
	}
}
