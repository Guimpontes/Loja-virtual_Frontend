import React from 'react';
import { motion } from 'framer-motion'

export default function Loading() {

  const containerVariant = {
    initial: {
      transtion: {
        staggerChildren: 0.2,
      }
    },

    animate: {
      transition: {
        staggerChildren: 0.2,
      }
    }
  }

  const dotVariant = {
    initial: {
      y: "0%"
    },

    animate: {
      y: "100%"
    }
  }

  const dotTransition = {
    repeat: Infinity,
    repeatType: "reverse", 
    duration: 0.4
  }

  return (
    <motion.div
      className="loading-container"
      variants={containerVariant}
      animate="animate"
      initial="initial"
    >
      <motion.span
        className="loading-dot"
        variants={dotVariant}
        transition={dotTransition}
      />

      <motion.span
        className="loading-dot"
        variants={dotVariant}
        transition={dotTransition}
      />

      <motion.span
        className="loading-dot"
        variants={dotVariant}
        transition={dotTransition}
      />
    </motion.div>
  )
}


