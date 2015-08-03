import React, {Component} from 'react';

export default class PlayerProgress extends Component {
	constructor() {
		super();
		this.state = {progress: 0};
	}

	setProgress(progress) {
		this.setState({progress});
	}

	render() {
		return (
			<div className="player__progress progress">
				<i className="progress__bar" style={{width: this.state.progress + '%'}}></i>
			</div>
		);
	}
}
