import React, {Component} from 'react';
import FileManager from './components/FileManager/FileManager';
import Tracklist from './components/Player/Tracklist';
import AudioPlayer from './components/Player/AudioPlayer';

class App extends Component {
	render() {
		return (
			<div>
				<AudioPlayer />
				<FileManager />
				<Tracklist />
			</div>
		);
	}
}

React.render(
	<App />,
	document.getElementById('app'));
