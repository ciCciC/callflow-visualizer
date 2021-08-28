'use strict';
const Koa = require('koa');
const proxy = require('koa-proxies');
const open = require('open');
const chokidar = require('chokidar');
const fs = require('fs');
const { createConfig } = require('es-dev-server/dist/config');
const { createMiddlewares } = require('es-dev-server/dist/create-middlewares');

const config = createConfig({
  appIndex: 'index.html',
  rootDir: './dist/',
  open: true,
  watch: true,
  nodeResolve: true,
  basePath: '/callflow-visualizer',
});

function getEnvVariables() {

  const basePath = './test/demo';
  const env = process.argv.slice(2)[0];
  if (env) {
    return JSON.parse(fs.readFileSync(`${basePath}/environment.${env}.json`));
  } else if(fs.existsSync(`${basePath}/environment.json`)){
    return JSON.parse(fs.readFileSync(`${basePath}/environment.json`));
  }
  return JSON.parse(fs.readFileSync(`${basePath}/environment.default.json`));
}

const envVariables = getEnvVariables();

const fileWatcher = chokidar.watch([]);

const middlewares = createMiddlewares(config, fileWatcher).middlewares;

const app = new Koa();
middlewares.forEach((middleware) => {
  app.use(middleware);
});

envVariables.proxies.forEach((proxyToSet) => {
  app.use(
    proxy(
      proxyToSet.path,
      {
        target: proxyToSet.target,
        headers: proxyToSet.headers,
        port: proxyToSet.port,
        rewrite: (path) => {
          if (proxyToSet.rewrite && proxyToSet.rewrite.pattern && proxyToSet.rewrite.with) {
            return path.replace(proxyToSet.rewrite.pattern, proxyToSet.rewrite.with);
          }
          return path;
        },
        logs: true,
      }
    )
  );
});

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
app.listen(9912, () => {
  open('http://localhost:9912');
});
