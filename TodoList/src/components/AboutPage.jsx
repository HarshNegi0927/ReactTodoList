import React from 'react'
import { motion } from 'framer-motion'
import { FaReact, FaDatabase, FaServer } from 'react-icons/fa'

const CodeBlock = ({ code }) => (
  <pre className="bg-gray-800 p-4 rounded-lg text-sm overflow-x-auto">
    <code className="text-gray-100">{code.trim()}</code>
  </pre>
);

const AboutPage = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { type: 'spring', stiffness: 100 }
    }
  }

  const workflowSteps = [
    { icon: <FaReact />, title: 'React Frontend', description: 'User interface built with React for dynamic updates.' },
    { icon: <FaServer />, title: 'State Management', description: 'useState hook manages the application state.' },
    { icon: <FaDatabase />, title: 'Local Storage', description: 'Tasks are persisted in the browser\'s local storage.' },
  ]

  const functions = [
    { 
      name: 'handleAdd', 
      description: 'Adds a new task to the list', 
      code: `
const handleAdd = () => {
  if (todo.trim()) {
    setTodos([...todos, {id: uuidv4(), todo, isCompleted: false}])
    setTodo("")
    saveToLS()
  }
}`
    },
    { 
      name: 'handleDelete', 
      description: 'Removes a task from the list', 
      code: `
const handleDelete = (id) => {  
  setTodos(todos.filter(item => item.id !== id))
  saveToLS()
}`
    },
    { 
      name: 'handleEdit', 
      description: 'Allows editing of an existing task', 
      code: `
const handleEdit = (id) => { 
  let t = todos.find(i => i.id === id) 
  setTodo(t.todo)
  setTodos(todos.filter(item => item.id !== id))
  saveToLS()
}`
    },
    { 
      name: 'handleCheckbox', 
      description: 'Toggles the completion status of a task', 
      code: `
const handleCheckbox = (id) => { 
  setTodos(todos.map(item => 
    item.id === id ? {...item, isCompleted: !item.isCompleted} : item
  ))
  saveToLS()
}`
    },
    { 
      name: 'saveToLS', 
      description: 'Saves the current state to localStorage', 
      code: `
const saveToLS = () => {
  localStorage.setItem("todos", JSON.stringify(todos))
}`
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 to-indigo-600 text-white py-12 px-4 sm:px-6 lg:px-8">
      <motion.div 
        className="max-w-4xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1 
          className="text-4xl font-bold mb-8 text-center"
          variants={itemVariants}
        >
          About TaskMaster
        </motion.h1>

        <motion.section className="mb-12" variants={itemVariants}>
          <h2 className="text-2xl font-semibold mb-4">How It Works</h2>
          <p className="text-lg mb-4">
            TaskMaster is a modern todo application built with React. It allows users to create, manage, and track their tasks efficiently.
          </p>
        </motion.section>

        <motion.section className="mb-12" variants={itemVariants}>
          <h2 className="text-2xl font-semibold mb-4">Text Stack</h2>
          <p className="text-lg mb-4">
            The text stack in TaskMaster is managed using React's useState hook. Here's how it works:
          </p>
          <ol className="list-decimal list-inside space-y-2">
            <li>When a user types in the input field, the <code className="bg-gray-700 px-1 rounded">handleChange</code> function updates the <code className="bg-gray-700 px-1 rounded">todo</code> state.</li>
            <li>The <code className="bg-gray-700 px-1 rounded">handleAdd</code> function creates a new task object and adds it to the <code className="bg-gray-700 px-1 rounded">todos</code> array state.</li>
            <li>The <code className="bg-gray-700 px-1 rounded">todos</code> state is then mapped over to display each task in the UI.</li>
          </ol>
        </motion.section>

        <motion.section className="mb-12" variants={itemVariants}>
          <h2 className="text-2xl font-semibold mb-4">Workflow</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {workflowSteps.map((step, index) => (
              <motion.div 
                key={index}
                className="bg-white bg-opacity-20 p-6 rounded-lg text-center"
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="text-4xl mb-4">{step.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p>{step.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <motion.section variants={itemVariants}>
          <h2 className="text-2xl font-semibold mb-4">Key Functions</h2>
          <div className="space-y-8">
            {functions.map((func, index) => (
              <motion.div 
                key={index}
                className="bg-white bg-opacity-10 p-6 rounded-lg"
                variants={itemVariants}
                whileHover={{ y: -5 }}
              >
                <h3 className="text-xl font-semibold mb-2">{func.name}</h3>
                <p className="mb-4">{func.description}</p>
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  transition={{ duration: 0.5 }}
                >
                  <CodeBlock code={func.code} />
                </motion.div>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </motion.div>
    </div>
  )
}

export default AboutPage

