const http = require('http');
const fs = require('fs');
let contador = 0;

const server = http.createServer((req, res) => {
const { url, method } = req;
if (url === '/' && method === 'GET') {
fs.readFile('index.html', 'utf-8', (erros, dados) => {
    if (erros) {
    res.end('Erro ao ler o arquivo');
    } else {
    res.end(dados);
    }
});

} else if (url === '/sobre' && method === 'GET') {
res.statusCode = 200;
res.setHeader('Content-Type', 'text/html; charset=UTF-8');
res.end(fs.readFileSync('sobre.html', 'utf-8'));


} else if (url === '/status' && method === 'GET') {
res.statusCode = 200;
res.setHeader('Content-Type', 'text/plain; charset=UTF-8');
res.end('Página de Status');

} else if (url === '/teste' && method === 'GET') {
res.statusCode = 200;
res.setHeader('Content-Type', 'text/plain; charset=UTF-8');
res.end('Página de Teste');

} else if (url === '/contador' && method === 'GET') {
res.statusCode = 200;
res.setHeader('Content-Type', 'text/plain; charset=UTF-8');
contador++;
res.end('Página de contador de requisições: ' + contador);

} else {
res.statusCode = 404;
res.setHeader('Content-Type', 'text/plain; charset=UTF-8');
res.end('Página não encontrada');
}
});
const PORT = 3000;
server.listen(PORT, () => {
console.log(`Servidor rodando em http://localhost:${PORT}`);
});