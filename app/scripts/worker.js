importScripts('./libs/id3.min.js');

onmessage = function(e) {
	var file = e.data.file;
	ID3.loadTags(
		file.name,
		function(err, tags) {
			postMessage(ID3.getAllTags(file.name));
		},
		{
			tags: ['title', 'artist', 'album', 'picture'],
			dataReader: FileAPIReader(file)
		}
	);
}
