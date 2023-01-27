import React from 'react';
import { motion } from 'framer-motion'

export default function BtnLoading() {

    const containerVariants = {
        initial: {
            transition: {
                staggerChildren: 0.3
            }
        },
        animate: {
            transition: {
                staggerChildren: 0.3
            }
        }
    }

    const spanVariant = {
        inital: {
            x: 0,
        },

        animate: {
            x: 20,
        }
    }

    const spanTransition = {
        repeat: Infinity,
        repeatDelay: 0.4,
        repeatType: "reverse",
        duration: 0.7,
    }

    return (
        <motion.button
            className="btn-loading"
            variants={containerVariants}
            initial="initial"
            animate="animate"
        >
            <motion.span
                className="loading-span"
                variants={spanVariant}
                transition={spanTransition}
            />
            <motion.span
                className="loading-span"
                variants={spanVariant}
                transition={spanTransition}
            />
            <motion.span
                className="loading-span"
                variants={spanVariant}
                transition={spanTransition}
            />
        </motion.button>
    )
}
