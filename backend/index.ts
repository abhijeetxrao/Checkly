import express from 'express'
import type{ Request, Response, Application } from 'express'
const app:Application=express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
import dotenv from 'dotenv'
import cors from 'cors'
dotenv.config()
app.use(cors({
  origin:process.env.FRONTEND_URL,
  methods:["GET", "POST","PUT","DELETE"],
  allowedHeaders:["Content-Type","Authorization"],
  credentials:true
}))
import { connectDB } from './lib/db.ts'
import todoRouter from './routes/todo.router.ts'
import authRouter from './routes/user.route.ts'
const PORT = Number(process.env.PORT) || 3000;
connectDB();

app.use('/todo',todoRouter)
app.use('/auth', authRouter)


app.get('/',(req:Request,res:Response):void=>{
  res.send("hello!");
})

app.listen(process.env.PORT,()=>{
  console.log(`Server is running on port ${process.env.PORT}`);
})