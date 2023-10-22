import { TodoController } from '../controller/todo'
import express from 'express'

export default async(router:express.Router) => {
    // ❤️‍🔥 POST
    router.post('/todos', TodoController().addTodo),

    // ❤️‍🔥 GET
    router.get('/todos', TodoController().getAllTodos)
    router.get('/todos/status/:status', TodoController().getTodosByStatus)
    router.get('/todos/getTodoById', TodoController().getTodoById)

    // ❤️‍🔥 UPDATE
    router.put('/todos/:id', TodoController().updateTodoById)

    // ❤️‍🔥 DELETE
    router.delete('/todos/:id', TodoController().deleteTodoById)
}