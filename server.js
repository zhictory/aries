const path = require("path");
const Koa = require("koa");
const staticServe = require("koa-static");
const mount = require("koa-mount");
const axios = require("axios");

const port = 5120;
const app = new Koa();

// static path
const client = new Koa();
client.use(staticServe(path.join(__dirname, "./build")));

// TODO 如何不遍历所有路由？
let routes = ["/", "/tool", "/tool/home", "/tool/language", "/tool/rank", "/tool/record", "/tool/fee"];
routes.forEach((pathname) => app.use(mount(pathname, client)));

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

app.use(async (ctx, next) => {
  if (ctx.path === "/erp/getLangPackage") {
    const resp = await axios.get("https://iderpapi.wook.id/getLangPackage", {
      params: {
        language: "zh-cn",
      },
    });

    ctx.body = resp.data;
  }
  if (ctx.path === "/oa3/getLangPackage") {
    const resp = await axios.get("https://idoaapi.wook.id/getLangPackage", {
      params: {
        language: "zh-cn",
      },
    });

    ctx.body = resp.data;
  }
  if (ctx.path === "/app/getLangPackage") {
    const resp = await axios.post("https://idapi.wook.id/v1/index/getLanguagePackages", {});

    ctx.body = resp.data;
  }
  if (ctx.path === "/ibs/getLangPackage") {
    const resp = await axios.post("https://idibsapi.wook.id/langPackage", {});

    ctx.body = resp.data;
  }
  if (ctx.path === "/getFee") {
    const feeData = require("../notes/备忘录/个人理财.json");

    ctx.body = feeData;
  }
});

app.use(async (ctx) => {
  ctx.body = "Hello World";
});

app.listen(port, () => {
  console.log("Server start ✔  Please visit http://localhost:" + port + " ⚡");
});
