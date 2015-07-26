import React, {Component} from 'react';

export default class TrackInfo extends Component {
	renderCover() {
		return '';
	}

	renderTitle() {
		let title = this.props.tags ? this.props.tags.title : this.props.name;
		return <span className="player__title">{title}</span>;
	}

	renderArtist() {
		return (this.props.tags && this.props.tags.artist) ? <span className="player__artist">{this.props.tags.artist}</span> : '';
	}

	render() {
		return (
			<div className="player__info">
				{this.renderCover()}
				{this.renderTitle()}
				{this.renderArtist()}
			</div>
		);
	}
}
