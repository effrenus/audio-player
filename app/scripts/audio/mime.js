let audio = document.createElement('audio');
let mimeTipes = ['audio/mpeg', 'audio/mp4', 'audio/mp3', 'audio/x-m4a', 'audio/ogg', 'audio/webm', 'audio/wav'];
let supported = mimeTipes.filter((type) => {
	return audio.canPlayType(type) !== '';
});
audio = null;

export default supported;
