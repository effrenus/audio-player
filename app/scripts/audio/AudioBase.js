import EventEmitter from 'events';

const DEFAULT_VOLUME = 90;

class AudioBase extends EventEmitter {
	constructor() {
		super();

		this.audio_elm = document.createElement('audio');
		this.audio_elm.controls = false;
		this.audio_elm.autoplay = false;
		this.setVolume(DEFAULT_VOLUME);
		this.bindListeners();
	}

	bindListeners() {
		let elm = this.audio_elm;
		elm.addEventListener('play', this._onPlay);
		elm.addEventListener('timeupdate', this._onProgress.bind(this));
		elm.addEventListener('ended', this._onEnd.bind(this));
	}

	_onPlay() {
		// console.log('play');
	}

	_onProgress() {
		let elm = this.audio_elm;
		let progress = (elm.currentTime / elm.duration) * 100;
		this.emit('timeupdate', progress);
	}

	_onEnd() {
		this.emit('ended');
	}

	playSound() {
		this.audio_elm.play();
	}

	playAudioFromFile(file) {
		this.audio_elm.src = URL.createObjectURL(file);
		this.playSound();
	}

	pause() {
		this.audio_elm.pause();
	}

	getVolume() {
		return this.audio_elm.volume * 100;
	}

	setVolume(value) {
		this.audio_elm.volume = value / 100;
	}

}

export default AudioBase;
