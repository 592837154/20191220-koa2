const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const app = new Koa();
const poit = 2019;
app.use(bodyParser());

const Router = require('koa-router');
const router = new Router({
    prefix: '/api'
});
router.get('/first', async (ctx, next) => {
    ctx.body = { data: 'get请求!!' }
})
router.post('/first', async (ctx, next) => {
    ctx.response.body = ctx.request.body
})
app.use(router.routes());

app.listen(poit, () => {
    console.log(`在${poit}端口启动`);
});