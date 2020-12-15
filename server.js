const Koa = require('koa');
const path = require('path');
const static = require('koa-static');
const Router = require('@koa/router');
const axios = require('axios');

const staticPath = './build';
const port = 5120;
const app = new Koa();
const router = new Router();

// logger
app.use(async (ctx, next) => {
  await next();
  const rt = ctx.response.get('X-Response-Time');
  console.log(`${ctx.method} ${ctx.url} - ${rt}`);
});

// x-response-time
app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  ctx.set('X-Response-Time', `${ms}ms`);
});

// static path
app.use(static(path.join(__dirname, staticPath)));

app.use(async (ctx, next) => {
  if (ctx.path === '/erp/getLangPackage') {
    const resp = await axios.get('https://iderpapi.wook.id/getLangPackage', {
      params: {
        language: 'zh-cn',
      },
    });

    ctx.body = resp.data;
  }
  if (ctx.path === '/oa3/getLangPackage') {
    const resp = await axios.get('https://idoaapi.wook.id/getLangPackage', {
      params: {
        language: 'zh-cn',
      },
    });

    ctx.body = resp.data;
  }
  if (ctx.path === '/app/getLangPackage') {
    const resp = await axios.post('https://idapi.wook.id/v1/index/getLanguagePackages', {});

    ctx.body = resp.data;
  }
  if (ctx.path === '/ibs/getLangPackage') {
    const resp = await axios.post('https://idibsapi.wook.id/langPackage', {});

    ctx.body = resp.data;
  }
});

app.use(async ctx => {
  ctx.body = 'Hello World';
});

app.listen(port, () => {
  console.log('Server start ✔  Please visit http://localhost:' + port + ' ⚡');
});
