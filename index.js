const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
var mongoose = require('mongoose');
const cors = require('koa2-cors')
const db = mongoose.connect("mongodb://localhost/testDB")
// 账户的数据库模型
var UserSchema = new mongoose.Schema({
    username: String,
    password: String,
    email: String,
    constent: String,
});
var User = mongoose.model('First', UserSchema);
// 为数据库新增数据
var user = {
    username: 'zhukai',
    password: 'get请求!!',
    constent: 'get请求!!'
}
var newUser = new User(user);
newUser.save();
const app = new Koa();
const poit = 2019;
app.use(cors({
    origin: function (ctx) {
        if (/3000$/.test(ctx.header.origin)) {
            return "*";
        }
        return 'http://localhost:8080';
    },
    exposeHeaders: ['WWW-Authenticate', 'Server-Authorization', 'Date'],
    maxAge: 100,
    credentials: true,
    allowMethods: ['GET', 'POST', 'OPTIONS'],
    allowHeaders: ['Content-Type', 'Authorization', 'Accept', 'X-Custom-Header', 'anonymous'],
}));
app.use(bodyParser());

const Router = require('koa-router');
const router = new Router({
    prefix: '/api'
});
router.get('/first', async (ctx, next) => {
    // 查数据库
    const data = await User.findOne({ username: 'zhukai' })
    const result = {
        code: 200,
        data: data,
        ts: 12345
    }
    ctx.response.body = result
    return result
})
router.post('/first', async (ctx, next) => {
    ctx.response.body = ctx.request.body
})
app.use(router.routes());

app.listen(poit, () => {
    console.log(`在${poit}端口启动`);
});