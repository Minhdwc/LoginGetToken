const router = require('./homeRouter');
const homeRouter = require('./homeRouter');
const userRouter = require('./userRouter');
const routers = (app)=>{
    app.use('/', homeRouter)
    app.use('/user', userRouter)
}
module.exports = routers;