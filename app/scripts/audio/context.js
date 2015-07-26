/*eslint-disable no-unused-vars*/
let context;

try {
	window.AudioContext = window.AudioContext || window.webkitAudioContext;
	context = new AudioContext();
}
catch(e) {
	context = null;
}

export default context;
