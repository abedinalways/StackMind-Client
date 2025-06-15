import React from 'react';
import { motion } from 'framer-motion';
import { Typewriter } from 'react-simple-typewriter';
import mascot from '../assets/mascot.png'
const StackMindFamily = () => {
    
  
   const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <div className="container mx-auto py-12 px-4 text-center relative font-[raleway]">
      <h2 className="text-3xl md:text-5xl font-bold text-orange-400 mb-10 font-[sora]">
        That's The StackMind Family.
        <br />
        <span className="text-lg md:text-xl text-gray-600">
          <Typewriter
            words={['StackMind Magazine is so much more than articles.']}
            loop={false}
            cursor
            cursorStyle=".."
            typeSpeed={80}
          />
        </span>
      </h2>
      <div className="flex flex-col md:flex-row justify-center gap-6 mt-8">

        <motion.div
          className="bg-green-50 p-6 rounded-lg shadow-xl md:w-80"
          variants={cardVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div className="flex justify-center mb-4">
            <img
              src={mascot}
              alt="StackMind Books"
              className="w-24 h-24 object-contain md:absolute md:top-34 bg-white shadow-2xl rounded-full p-2"
            />
          </div>
          <h3 className="text-xl font-bold mb-4 mt-8 text-gray-800">
            StackMind Books
          </h3>
          <p className="text-gray-600 mb-6 text-sm ">
            14 printed books and 7 eBooks. Written for web developers, designers
            and marketers.
          </p>
          <button className="bg-green-400 hover:bg-green-600 btn underline text-white">
            Jump to books
          </button>
          <p className="text-sm text-gray-500 mt-2">
            Free airmail shipping worldwide. No ads or cuts.
          </p>
        </motion.div>

        {/* StackMind Workshops Card */}
        <motion.div
          className="bg-orange-50 p-6 rounded-lg shadow-md w-full md:w-80"
          variants={cardVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div className="flex justify-center mb-4">
            <img
              src={mascot}
              alt="StackMind Workshops"
              className="w-24 h-24 object-contain md:absolute md:top-34 bg-white shadow-2xl rounded-full p-2"
            />
          </div>
          <h3 className="text-xl font-bold mb-4 mt-8 text-gray-800">
            StackMind Workshops
          </h3>
          <p className="text-gray-600 mb-4">
            Online workshops with experts. Broken into 2.5h segments, with
            interactive live sessions.
          </p>
          <button className="bg-blue-500 btn hover:bg-blue-600 text-white underline">
            Jump to workshops
          </button>
          <p className="text-sm text-gray-500 mt-2">
            2.5h live sessions with Q&A and QA.
          </p>
        </motion.div>

        {/* StackMind Job Board Card */}
        <motion.div
          className="bg-blue-50 p-6 rounded-lg shadow-md w-full md:w-80"
          variants={cardVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div className="flex justify-center mb-4">
            <img
              src={mascot}
              alt="StackMind Job Board"
              className="w-24 h-24 object-contain bg-white md:absolute md:top-34  shadow-2xl rounded-full p-2"
            />
          </div>
          <h3 className="text-xl font-bold mb-4 mt-8 text-gray-800">
            StackMind Job Board
          </h3>
          <p className="text-gray-600 mb-4">
            Helping designers and developers find jobs, and connect with great
            companies.
          </p>
          <button className="bg-red-500 btn hover:bg-red-600 text-white underline">
            Jump to jobs
          </button>
          <p className="text-sm text-gray-500 mt-2">
            Freelancers and full-time, front-end & UX.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default StackMindFamily;