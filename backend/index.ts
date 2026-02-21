import express from 'express'
import type{ Request, Response, Application } from 'express'
import dotenv from 'dotenv'
dotenv.config()
const app:Application=express()
app.use(express.json())
import { connectDB } from './lib/db.ts'
import todoRouter from './routes/todo.router.ts'
import authRouter from './routes/user.route.ts'
const PORT = Number(process.env.PORT) || 3000;
connectDB();

app.use('/',todoRouter)
app.use('/auth', authRouter)


app.get('/',(req:Request,res:Response):void=>{
  res.send("hello!");
})

app.listen(process.env.PORT,()=>{
  console.log(`Server is running on port ${process.env.PORT}`);
})