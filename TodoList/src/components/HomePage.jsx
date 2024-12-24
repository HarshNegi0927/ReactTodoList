import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-indigo-100 flex flex-col justify-center items-center p-4">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <h1 className="text-5xl font-bold text-purple-700 mb-6">Welcome to iTask</h1>
        <p className="text-xl text-gray-700 mb-8">Manage your tasks efficiently and boost your productivity</p>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        <Feature 
          icon="📝" 
          title="Create Tasks" 
          description="Easily add new tasks to your list"
        />
        <Feature 
          icon="✅" 
          title="Mark as Complete" 
          description="Track your progress by marking tasks as done"
        />
        <Feature 
          icon="🔄" 
          title="Edit Tasks" 
          description="Update your tasks as needed"
        />
        <Feature 
          icon="🗑️" 
          title="Delete Tasks" 
          description="Remove tasks you no longer need"
        />
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="mt-12"
      >
        <Link to="/tasks" className="bg-purple-600 text-white font-bold py-3 px-6 rounded-full hover:bg-purple-700 transition duration-300">
          Get Started
        </Link>
      </motion.div>
    </div>
  )
}

const Feature = ({ icon, title, description }) => (
  <motion.div 
    className="bg-white p-6 rounded-lg shadow-md"
    whileHover={{ scale: 1.05 }}
    transition={{ duration: 0.2 }}
  >
    <div className="text-4xl mb-4">{icon}</div>
    <h2 className="text-xl font-semibold text-purple-700 mb-2">{title}</h2>
    <p className="text-gray-600">{description}</p>
  </motion.div>
)

export default HomePage

