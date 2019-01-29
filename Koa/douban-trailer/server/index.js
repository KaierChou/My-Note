const Koa = require('koa')
const mongoose = require('mongoose')
const app = new Koa()
const views =require('koa-views')
const {resolve} = require('path')
const { connect, initSchemas } = require('./database/init')
mongoose.set('useCreateIndex', true) // 解决一个warn问题

;(async () =>{
  await connect()
  initSchemas() // 引入所有的模型
//   require('./task/movie') // 自动执行
  require('./task/api')
})()

app.use(views(resolve(__dirname, './views'), {
    extension: 'pug'
}));

app.use(async (ctx, next) => {
    await ctx.render('index', {
        you: "Luke",
        me: 'Kaier'
    })
})

app.listen(4455, () => {
    console.log('App listening on port 4455!')
})