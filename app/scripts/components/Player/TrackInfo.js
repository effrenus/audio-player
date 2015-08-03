import React, {Component} from 'react';

export default class TrackInfo extends Component {
	renderCover() {
		return <img alt={this.props.track.title} src={this.props.track.image} />;
	}

	renderTitle() {
		return <span className="player__title">{this.props.track.title}</span>;
	}

	renderArtist() {
		return (this.props.track.artist) ? <span className="player__artist">{this.props.track.artist}</span> : '';
	}

	render() {
		return (
			<div className="player__info">
				{this.renderTitle()}
				{this.renderArtist()}
			</div>
		);
	}
}
