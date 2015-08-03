import React, {Component} from 'react';
import FileManager from './components/FileManager/FileManager';
import Tracklist from './components/Player/Tracklist';
import AudioPlayer from './components/Player/AudioPlayer';
import AUDIO_MIME_TYPES from './audio/mime';

class App extends Component {
	render() {
		return (
			<div>
				<AudioPlayer />
				<FileManager accept={AUDIO_MIME_TYPES} multiple={true} />
				<Tracklist />
			</div>
		);
	}
}

React.render(
	<App />,
	document.getElementById('app'));
