'use strict';
const Koa = require('koa');
const chokidar = require('chokidar');
const fs = require('fs');
const Router = require('koa-router');
const cors = require('@koa/cors');
// const { createConfig } = require('es-dev-server/dist/config');
// const { createMiddlewares } = require('es-dev-server/dist/create-middlewares');

const {OUTPUT_PATH} = require('./../paths');
const serve = require('koa-static');

// const config = createConfig({
//   appIndex: 'index.html',
//   rootDir: './dist',
//   open: true,
//   watch: true,
//   nodeResolve: true,
//   basePath: '/callflow-visualizer',
// });

// const fileWatcher = chokidar.watch([]);

const router = new Router();

// const middlewares = createMiddlewares(config, fileWatcher).middlewares;
const app = new Koa();
app.use(cors({ credentials: true }));

// middlewares.forEach((middleware) => {
//   app.use(middleware);
// });
// app.use(cors({ credentials: true }));

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

//For testing unhappy scenarios
// router.post('/api/*', (ctx) => {
//   ctx.response.status = 400;
//   ctx.body = getJson(ctx.url+"/"+ctx.request.method+"?badRequest", ctx.request.header.referer);
// });

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
