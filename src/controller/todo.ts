import express from 'express'
import ErrorHandler from '../helpers/ErrorHandler';
import { TodoDB, TodoModel } from '../db/todo';
import ValidationError from '../helpers/ValidationError';

export const TodoController = () => {
    return {
        addTodo: async(req:express.Request, res: express.Response) => {
            try { 
                const createdTodo = await TodoDB().createTodo(req.body)           
                return res.status(201).json(createdTodo)
            } catch (error) {
                console.log(error)
                return ErrorHandler(res, 501, error)
            }

        },

        getTodosByStatus: async(req:express.Request, res:express.Response) =>{
            try {
                const {status} = req.params
                console.log(status)
                const Todos = await TodoModel.find({status})
                return res.status(200).json(Todos)
            } catch (error) {
                console.log(error)
                ErrorHandler(res, 501, error)
            }
        },

        getTodoById: async(req:express.Request, res:express.Response) =>{
            try {
                const {id} = req.query
                console.log(id)
                const Todo = await TodoDB().getTodoById(id.toString())
                return res.status(200).json(Todo)
            } catch (error) {
                console.log(error)
                ErrorHandler(res, 501, error)
            }
        },

        updateTodoById: async(req:express.Request, res:express.Response) =>{
            try {                
                const Todo = await TodoDB().updateTodoById(req.params.id, req.body)
                return res.status(200).json(Todo)
            } catch (error) {
                console.log(error)
                ErrorHandler(res, 501, error)
            }
        },

        deleteTodoById: async(req:express.Request, res:express.Response) =>{
            try {                
                await TodoDB().deleteTodoById(req.params.id)
                return res.status(200).json({
                    success: true
                })
            } catch (error) {
                console.log(error)
                ErrorHandler(res, 501, error)
            }
        },
        
        getAllTodos: async(req:express.Request, res: express.Response) => {

            try {
                const Todos = await TodoDB().getAllTodos()
                return res.status(200).json(Todos)
            } catch (error) {
                console.log(error)
                ErrorHandler(res, 501, error)
            }
        },

    }
}