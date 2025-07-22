import React from 'react';
import { motion } from 'framer-motion';
import { FaEnvelope, FaPhoneAlt, FaFacebookMessenger } from 'react-icons/fa';

const Support = () => {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <motion.h2 
        className="text-3xl md:text-4xl font-bold text-center mb-10 text-primary"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Support Center
      </motion.h2>

      <motion.div 
        className="bg-base-100 shadow rounded-xl p-6 space-y-6"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-start gap-4">
          <FaEnvelope className="text-2xl text-blue-500 mt-1" />
          <div>
            <p className="font-semibold">Email Support</p>
            <p>support@foodgroceryo.com</p>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <FaPhoneAlt className="text-2xl text-green-500 mt-1" />
          <div>
            <p className="font-semibold">Phone</p>
            <p>+8801323456532</p>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <FaFacebookMessenger className="text-2xl text-indigo-500 mt-1" />
          <div>
            <p className="font-semibold">Messenger</p>
            <p>facebook.com/foodgroceryo</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Support;
