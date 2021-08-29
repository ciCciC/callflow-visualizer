'use strict';
const Koa = require('koa');
const chokidar = require('chokidar');
const fs = require('fs');
const Router = require('koa-router');
const cors = require('@koa/cors');
const {OUTPUT_PATH} = require('./../paths');
const serve = require('koa-static');
const router = new Router();
const app = new Koa();

app.use(cors({ credentials: true }));

function getJson(url, referer) {
  // const params = url.split('?');
  console.log('Requested: ' + url)
  const fileRoot = `${__dirname}/fixtures${url}/`;
  let fileName = fileRoot + `target.json`;
  if (referer.includes('extensive')) {
    const extensiveJson = fileRoot + 'happy-extensive.json';
    if (fs.existsSync(extensiveJson)) {
      fileName = extensiveJson;
    }
  }
  return JSON.parse(fs.readFileSync(require.resolve(fileName), 'utf8'));
}

app.use(serve(OUTPUT_PATH));

router.get('/api/*', (ctx) => {
  ctx.body = getJson(ctx.url+"/"+ctx.request.method, ctx.request.header.referer);
});

router.post('/api/*', (ctx) => {
  ctx.body = getJson(ctx.url+"/"+ctx.request.method, ctx.request.header.referer);
  ctx.response.status = 204;

});

app.use(router.routes());

app.listen(9912);

console.log('\x1b[33m%s\x1b[0m', 'Server started on http://localhost:9912\n' +
  '⣿⡇⣿⣿⣿⠛⠁⣴⣿⡿⠿⠧⠹⠿⠘⣿⣿⣿⡇⢸⡻⣿⣿⣿⣿⣿⣿⣿\n' +
  '⢹⡇⣿⣿⣿⠄⣞⣯⣷⣾⣿⣿⣧⡹⡆⡀⠉⢹⡌⠐⢿⣿⣿⣿⡞⣿⣿⣿\n' +
  '⣾⡇⣿⣿⡇⣾⣿⣿⣿⣿⣿⣿⣿⣿⣄⢻⣦⡀⠁⢸⡌⠻⣿⣿⣿⡽⣿⣿\n' +
  '⡇⣿⠹⣿⡇⡟⠛⣉⠁⠉⠉⠻⡿⣿⣿⣿⣿⣿⣦⣄⡉⠂⠈⠙⢿⣿⣝⣿\n' +
  '⠤⢿⡄⠹⣧⣷⣸⡇⠄⠄⠲⢰⣌⣾⣿⣿⣿⣿⣿⣿⣶⣤⣤⡀⠄⠈⠻⢮\n' +
  '⠄⢸⣧⠄⢘⢻⣿⡇⢀⣀⠄⣸⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣧⡀⠄⢀\n' +
  '⠄⠈⣿⡆⢸⣿⣿⣿⣬⣭⣴⣿⣿⣿⣿⣿⣿⣿⣯⠝⠛⠛⠙⢿⡿⠃⠄⢸\n' +
  '⠄⠄⢿⣿⡀⣿⣿⣿⣾⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⣿⣿⣿⣿⡾⠁⢠⡇⢀\n' +
  '⠄⠄⢸⣿⡇⠻⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣏⣫⣻⡟⢀⠄⣿⣷⣾\n' +
  '⠄⠄⢸⣿⡇⠄⠈⠙⠿⣿⣿⣿⣮⣿⣿⣿⣿⣿⣿⣿⣿⡿⢠⠊⢀⡇⣿⣿\n' +
  '⠒⠤⠄⣿⡇⢀⡲⠄⠄⠈⠙⠻⢿⣿⣿⠿⠿⠟⠛⠋⠁⣰⠇⠄⢸⣿⣿⣿');
