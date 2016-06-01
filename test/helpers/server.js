'use strict';

const http = require('http');
const getPort = require('get-port');
const pify = require('pify');
const host = exports.host = 'localhost';

function createServer(fn) {
	return () => {
		return getPort().then(port => {
			const server = http.createServer(fn);

			server.host = host;
			server.port = port;
			server.url = `http://${host}:${port}`;
			server.protocol = 'http';

			server.listen(port);
			server.close = pify(server.close);

			return server;
		});
	};
}

exports.createServer = createServer((req, res) => {
	const html = [
		'<body>',
		'<nav id="menu">Apenas um show</nav>',
		'</body>'
	].join('');
	res.writeHead(200, {
		'content-type': 'text/html'
	});
	res.end(html);
});
