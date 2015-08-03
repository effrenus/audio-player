import context from './context';
import AudioBase from './AudioBase';

const FREQ = [60, 170, 310, 600, 1000, 3000, 6000, 12000, 14000, 16000];

class AudioContext extends AudioBase {
	constructor() {
		super();
		this.context = context;
		this.source = this.context.createMediaElementSource(this.audio_elm);

		this.analyser = this.context.createAnalyser();
		this.analyser.minDecibels = -140;
		this.analyser.maxDecibels = 0;
		this.analyser.smoothingTimeConstant = 0.5;
		this.analyser.fftSize = 512;

		this.jsNode = context.createScriptProcessor(2048, 1, 1);
		this.jsNode.onaudioprocess = this._proccessAudio.bind(this);
	}

	createFilter(frequency) {
		let filter = this.context.createBiquadFilter();
		filter.type = 'peaking';
		filter.frequency.value = frequency;
		filter.Q.value = 1;
		filter.gain.value = 0;

		return filter;
	}

	createFilters() {
		this.filters = FREQ.map((freq) => {
			return this.createFilter(freq);
		});

		this.filters.reduce((prev, curr) => {
			prev.connect(curr);
			return curr;
		});

		this.source.connect(this.filters[0]);
		this.filters[this.filters.length - 1].connect(this.context.destination);
	}

	setGains(freqGains) {
		if (!this.filters) {
			this.createFilters();
		}

		freqGains.forEach((value, i) => {
			this.filters[i].gain.value = value;
		});
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
}

export default AudioContext;
