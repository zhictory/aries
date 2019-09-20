const Koa = require("koa");
const path = require('path')
const static = require("koa-static");

const staticPath = "./build";
const port = 5120;
const app = new Koa();

// logger
app.use(async (ctx, next) => {
  await next();
  const rt = ctx.response.get("X-Response-Time");
  console.log(`${ctx.method} ${ctx.url} - ${rt}`);
});

// x-response-time
app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  ctx.set("X-Response-Time", `${ms}ms`);
});

// static path
app.use(static(path.join(__dirname, staticPath)));

// response
app.use(async ctx => {
  ctx.body = "Hello World";
});

app.listen(port, () => {
  console.log("Server start ✔  Please visit http://localhost:" + port + " ⚡")
});
