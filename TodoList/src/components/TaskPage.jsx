'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaEdit } from "react-icons/fa"
import { AiFillDelete } from "react-icons/ai"
import { v4 as uuidv4 } from 'uuid'

export default function TaskPage() { 
  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  const [showFinished, setShowFinished] = useState(true)

  useEffect(() => {
    let todoString = localStorage.getItem("todos")
    if(todoString){
      let todos = JSON.parse(todoString) 
      setTodos(todos)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }, [todos])

  const toggleFinished = () => {
    setShowFinished(!showFinished)
  }

  const handleEdit = (id) => { 
    let t = todos.find(i => i.id === id) 
    if (t) {
      setTodo(t.todo)
      setTodos(todos.filter(item => item.id !== id))
    }
  }

  const handleDelete = (id) => {  
    setTodos(todos.filter(item => item.id !== id))
  }

  const handleAdd = () => {
    if (todo.trim()) {
      setTodos([...todos, {id: uuidv4(), todo, isCompleted: false}])
      setTodo("") 
    }
  }

  const handleChange = (e) => { 
    setTodo(e.target.value)
  }

  const handleCheckbox = (id) => { 
    setTodos(todos.map(item => 
      item.id === id ? {...item, isCompleted: !item.isCompleted} : item
    ))
  }

  return (
    <motion.div 
      className="container mx-auto my-8 p-8 bg-white rounded-xl shadow-2xl max-w-2xl"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className='font-bold text-center text-4xl mb-8 text-purple-700'>Manage Your Tasks</h1>
      <div className="addTodo mb-8">
        <h2 className='text-2xl font-bold mb-4 text-gray-700'>Add a Task</h2>
        <div className="flex">
          <input  
            onChange={handleChange} 
            value={todo} 
            type="text" 
            className='flex-grow rounded-l-full px-5 py-3 border-2 border-purple-300 focus:outline-none focus:border-purple-500' 
            placeholder="Enter your task..."
          />
          <motion.button 
            onClick={handleAdd} 
            disabled={todo.length <= 3} 
            className='bg-purple-600 rounded-r-full px-6 py-3 text-white font-bold hover:bg-purple-700 disabled:bg-purple-300 disabled:cursor-not-allowed'
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Add
          </motion.button>
        </div>
      </div>
      <div className="mb-4">
        <label className='flex items-center cursor-pointer'>
          <input 
            className='form-checkbox h-5 w-5 text-purple-600 rounded border-gray-300 focus:ring-purple-500 hidden' 
            type="checkbox" 
            checked={showFinished} 
            onChange={toggleFinished}
          />
          <div className={`w-5 h-5 border-2 rounded flex items-center justify-center ${showFinished ? 'bg-purple-600 border-purple-600' : 'border-gray-400'}`}>
            {showFinished && (
              <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
            )}
          </div>
          <span className="ml-2 text-gray-700">Show Finished</span>
        </label>
      </div>
      <div className='h-px bg-gray-300 w-full my-6'></div>
      <h2 className='text-2xl font-bold mb-4 text-gray-700'>Your Tasks</h2>
      <AnimatePresence>
        {todos.length === 0 && 
          <motion.div 
            className='text-center text-gray-500 my-4'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            No tasks to display
          </motion.div>
        }
        {todos.map((item) => (
          (showFinished || !item.isCompleted) && 
          <motion.div 
            key={item.id} 
            className="todo flex items-center justify-between bg-gray-100 p-4 rounded-lg mb-4"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.3 }}
          >
            <label className="flex items-center space-x-3 cursor-pointer">
              <input 
                type="checkbox" 
                checked={item.isCompleted} 
                onChange={() => handleCheckbox(item.id)}
                className="form-checkbox h-5 w-5 text-purple-600 rounded border-gray-300 focus:ring-purple-500 hidden" 
              />
              <div className={`w-5 h-5 border-2 rounded flex items-center justify-center ${item.isCompleted ? 'bg-purple-600 border-purple-600' : 'border-gray-400'}`}>
                {item.isCompleted && (
                  <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                )}
              </div>
              <span className={`text-lg ${item.isCompleted ? "line-through text-gray-500" : "text-gray-800"}`}>
                {item.todo}
              </span>
            </label>
            <div className="buttons flex">
              <motion.button 
                onClick={() => handleEdit(item.id)} 
                className='bg-blue-500 hover:bg-blue-600 p-2 rounded-full text-white mr-2'
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <FaEdit />
              </motion.button>
              <motion.button 
                onClick={() => handleDelete(item.id)} 
                className='bg-red-500 hover:bg-red-600 p-2 rounded-full text-white'
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <AiFillDelete />
              </motion.button>
            </div> 
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.div>
  )
}

