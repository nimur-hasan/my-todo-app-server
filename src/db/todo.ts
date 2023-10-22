import mongoose from "mongoose";

const TodoSchema = new mongoose.Schema({
title: String,
description: String,
status: {
    type: String,
    enum: ['INCOMPLETE', 'COMPLETED']
},

}, {
timestamps: true,
})

export interface TodoInterface {
    title: String,
    description: String,
    status: String,
}

export const TodoModel = mongoose.model('Todo', TodoSchema)

// 🔥 Database Query
export const TodoDB = () => {
    return {

        // ❤️‍🔥 GET
        getTodoById: (id:string) =>  TodoModel.findById<TodoInterface>(id),
       
        getAllTodos: () => 
            TodoModel.find<TodoInterface>(),

        // ❤️‍🔥 CREATE
        createTodo : (values: Record<string, any>) => new TodoModel(values)
            .save().then((Todo) => Todo.toObject()),     

        // ❤️‍🔥 UPDATE
        updateTodoById: (id:string, values:Record<string, any>) => 
            TodoModel.findByIdAndUpdate<TodoInterface>(id, values, {new: true, upsert: true}),

   
        // ❤️‍🔥 DELETE
        deleteTodoById: (id:string) => TodoModel.findByIdAndDelete<TodoInterface>(id)
    }
}