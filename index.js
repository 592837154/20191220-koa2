const Koa = require('koa');
const app = new Koa();
const poit = 2019;

app.use(async (ctx) => {
    if (ctx.method === 'GET') {
        if (ctx.url === '/first') {
            ctx.body = { data: 'get请求!' }
        }
        return;
    }
    if (ctx.method === 'POST') {
        if (ctx.url === '/first') {
            let postData = await parsePostDate(ctx)
            ctx.body = postData
        }
        return;
    }
    ctx.body = '<h2>404</h2>'
})

const parsePostDate = (ctx) => {
    return new Promise((resolve, reject) => {
        try {
            let postData = ""
            ctx.req.on('data', (data) => {
                postData += data
            })
            ctx.req.addListener("end", function () {
                let parseData = parseQueryStr(postData)
                resolve(parseData)
            })
        } catch (error) {
            reject(error)
        }
    })
}

const parseQueryStr = (queryStr) => {
    const queryData = {}
    const queryStrList = queryStr.split('&')
    console.log(queryStrList)
    for (let [index, queryStr] of queryStrList.entries()) {
        let itemList = queryStr.split('=')
        console.log(itemList)
        queryData[itemList[0]] = decodeURIComponent(itemList[1])
    }
    return queryData
}
app.listen(poit, () => {
    console.log(`在${poit}端口启动`);
});