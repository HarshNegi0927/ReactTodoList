import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FaTasks } from 'react-icons/fa'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Tasks', path: '/tasks' },
    { name: 'About', path: '/about' }
  ]

  const logoVariants = {
    hidden: { rotate: -180, scale: 0 },
    visible: { 
      rotate: 0,
      scale: 1,
      transition: { 
        type: "spring",
        stiffness: 260,
        damping: 20
      }
    },
    hover: { 
      rotate: 360,
      transition: { duration: 0.8, ease: "easeInOut" }
    }
  }

  return (
    <nav className="bg-gradient-to-r from-purple-600 to-indigo-600 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0">
              <motion.div
                className="text-white"
                variants={logoVariants}
                initial="hidden"
                animate="visible"
                whileHover="hover"
              >
                <FaTasks className="h-8 w-8" />
              </motion.div>
            </Link>
            <Link to="/" className="ml-3">
              <motion.span 
                className="text-white font-bold text-xl"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                TaskMaster
              </motion.span>
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * (index + 1) }}
                >
                  <Link
                    to={item.path}
                    className="text-white hover:bg-purple-500 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition duration-300"
                  >
                    {item.name}
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
          <div className="md:hidden flex items-center">
            <motion.button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-white hover:bg-purple-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              whileTap={{ scale: 0.95 }}
            >
              <span className="sr-only">Open main menu</span>
              {!isOpen ? (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </motion.button>
          </div>
        </div>
      </div>

      <motion.div
        className={`${isOpen ? 'block' : 'hidden'} md:hidden`}
        initial="hidden"
        animate={isOpen ? "visible" : "hidden"}
        variants={{
          visible: { opacity: 1, height: 'auto' },
          hidden: { opacity: 0, height: 0 }
        }}
        transition={{ duration: 0.3 }}
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className="text-white hover:bg-purple-500 hover:text-white block px-3 py-2 rounded-md text-base font-medium transition duration-300"
              onClick={() => setIsOpen(false)}
            >
              {item.name}
            </Link>
          ))}
        </div>
      </motion.div>
    </nav>
  )
}

export default Navbar

