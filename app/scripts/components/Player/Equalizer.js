import React, {Component} from 'react';
import presets from './presets';
import cx from 'bem-classnames';

const bem = {
	eq: {name: 'equalizer'},
	set: {name: 'equalizer__set', states: ['active']}
};

export default class Equalizer extends Component {
	constructor() {
		super();
		this.state = {eq: -1};
		this.setFilter = this.setFilter.bind(this);
	}

	setFilter(event) {
		let num = parseInt(event.target.getAttribute('data-set'), 10);
		this.setState({eq: num});
		this.props.audio.setGains(presets[num].g);
	}

	render() {
		return (
			<div className={cx(bem.eq)}>
				{presets.map((item, i) => {
					return <span key={'preset' + i} className={cx(bem.set, {active: this.state.eq === i})} data-set={i} onClick={this.setFilter}>{item.title}</span>;
				})}
			</div>
		);
	}
}
