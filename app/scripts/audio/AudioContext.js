import context from './context';
import AudioBase from './AudioBase';

class AudioContext extends AudioBase {
	constructor() {
		super();
		this.context = context;
		this.source = this.context.createMediaElementSource(this.audio_elm);

		this.analyser = this.context.createAnalyser();
		this.analyser.smoothingTimeConstant = 0.3;
		this.analyser.fftSize = 512;

		this.jsNode = context.createScriptProcessor(2048, 1, 1);
		this.jsNode.onaudioprocess = this._proccessAudio.bind(this);
	}

	_proccessAudio() {
		this.emit('audioprocess');
	}

	playSound() {
		this.jsNode.connect(this.context.destination);
		this.source.connect(this.analyser);
		this.analyser.connect(this.context.destination);

		super.playSound();
	}

	playAudioFromFile(file) {
		this.audio_elm.src = URL.createObjectURL(file);
		this.playSound();
	}
}

export default AudioContext;
