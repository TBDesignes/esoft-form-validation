const Koa = require('koa');
const serve = require('koa-static');

const app = new Koa();
const serve_root = './public'

app.use(serve(serve_root));

app.listen(3000);