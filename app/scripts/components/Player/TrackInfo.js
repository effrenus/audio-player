import React, {Component} from 'react';

export default class TrackInfo extends Component {
	renderCover() {
		return '';
	}

	render() {
		let tags = this.props.tags;
		return (
			<div className="player__info">
				{this.renderCover()}
				<span className="player__title">{tags.title}</span>
				<span className="player__artist">{tags.artist}</span>
			</div>
		);
	}
}
