process.on('uncaughtException' ,(err)=>{
    console.log("error",err);
  })
import express from 'express'
import { dbConnection } from './database/dbConnection.js'
import { AppError } from './src/utils/AppError.js'
import { globalError } from './src/middleware/globalError.js'
import { bootstrap } from './src/modules/bootstrap.js' 
import 'dotenv/config'

const app = express()
const port = 3000

app.use(express.json())
app.use( '/uploads' ,express.static('uploads'))

bootstrap(app)

app.use('*',(req,res,next)=>{
    return next(new AppError(`Route Not Found ${req.originalUrl}` , 404))
})

app.use(globalError)

process.on('unhandledRejection',(err)=>{
    console.log("error" ,err)
  })
app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))