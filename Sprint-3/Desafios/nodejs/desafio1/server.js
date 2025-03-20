const { createServer } = require('node:http');
const { URL } = require('node:url');

const hostname = '127.0.0.1';
const port = 3000;
let count = 0;

const server = createServer((request, response) => {
	response.setHeader('Content-Type', 'application/json');
	try {
		const url = new URL(request.url, `http://${hostname}:${port}`);
		const pathParts = url.pathname.split('/').filter(Boolean);
		if (request.method === 'GET' && url.pathname === '/health-check') {
			response.statusCode = 200;
			response.end(
				JSON.stringify({ success: true, timestamp: new Date().toISOString() }),
			);
		} else if (request.method === 'GET' && pathParts[0] === 'is-prime-number') {
			const queryParams = Object.fromEntries(url.searchParams.entries());
			if (
				pathParts[1] === undefined &&
				(queryParams.number === undefined || queryParams.number === '')
			) {
				response.statusCode = 422;
				return response.end(
					JSON.stringify({ error: 'Por favor informe um número' }),
				);
			}
			const number = pathParts[1]
				? Number(pathParts[1])
				: Number(queryParams.number);
			if (isNaN(number) || number < 1) {
				response.statusCode = 400;
				return response.end(JSON.stringify({ error: 'Invalid input' }));
			}
			response.statusCode = 200;
			response.end(JSON.stringify({ isPrime: isPrime(number) }));
		} else if (request.method === 'POST' && url.pathname === '/count') {
			let body = '';
			request.on('data', (chunk) => {
				body += chunk.toString();
			});
			request.on('end', () => {
				try {
					const parsedBody = body.length > 0 ? JSON.parse(body) : {};
					const numberByIncrement = Number(parsedBody.incrementBy);
					if (isNaN(numberByIncrement) || numberByIncrement < 1) {
						response.statusCode = 400;
						return response.end(JSON.stringify({ error: 'Invalid input' }));
					}
					count += numberByIncrement;
					response.statusCode = 200;
					response.end(JSON.stringify({ counter: count }));
				} catch (error) {
					response.statusCode = 400;
					response.end(JSON.stringify({ error: 'Invalid JSON body' }));
				}
			});
		} else {
			response.statusCode = 404;
			response.end(JSON.stringify({ error: 'Route not found' }));
		}
	} catch (error) {
		console.error(error);
		response.statusCode = 500;
		response.end(JSON.stringify({ error: 'Internal Server Error' }));
	}
});

server.listen(port, hostname, () => {
	console.log(`Server running at http://${hostname}:${port}/`);
});

function isPrime(number) {
	if (number < 2) return false;
	if (number === 2 || number === 3) return true;
	if (number % 2 === 0 || number % 3 === 0) return false;
	for (let i = 5; i <= Math.sqrt(number); i += 2) {
		if (number % i === 0) return false;
	}
	return true;
}
