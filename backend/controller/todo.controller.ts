import mongoose from 'mongoose'
import Todo from '../model/todo.model.ts'
import type{ Request, Response, Application } from 'express'


export const createTodo = async (req: Request, res: Response) => {
  try {
    const {text, completed} = req.body;
    const todo = new Todo({
      text:text,
      completed: completed,
      user:req.user?._id
    });
    await todo.save();
    res.status(201).json({message: 'Todo created successfully!',todo})
  } catch (error) {
    res.status(400).json({ error })
  }
}

export const getTodos = async(req: Request, res: Response) => {
  try {
    const todos = await Todo.find({user:req.user?._id});
    res.status(200).json({message: 'Todo fetched successfully!',todos})
  } catch (error) {
    res.status(400).json({ message: 'Error in Fetching Todos', error })
  }
}

export const updateTodo = async(req:Request, res:Response)=>{
  try {
    const id = req.params.id;
    console.log(id)
    const todo = await Todo.findByIdAndUpdate(id, req.body,{new:true});
    res.status(200).json({message: 'Todo updated successfully!',todo})
  } catch (error) {
    console.log(error)
    res.status(400).json({ message: 'Error in Updating Todo', error })
  }
}

export const deleteTodo = async(req:Request, res:Response)=>{
  try {
    const todo = await Todo.findByIdAndDelete(req.params.id,{new:true})
    res.status(200).json({message: 'Todo deleted successfully!',todo})
  } catch (error) {
    res.status(400).json({ message: 'Error in Deleting Todo', error })
  }
}