import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { motion } from "framer-motion";
import { FaExclamationTriangle, FaCalendarAlt, FaBoxes, FaTags } from "react-icons/fa";

const ExpairedFoodSection = () => {
    const [expairedFood, setExpairedFood] = useState([]);
    const [showAll, setShowAll] = useState(false);

    useEffect(() => {
        axios(`${import.meta.env.VITE_API_URL}/foods/expired`)
            .then((res) => {
                setExpairedFood(res.data);
            })
            .catch(err => console.log(err));
    }, []);

    const displayedFoods = showAll ? expairedFood : expairedFood.slice(0, 6);

    return (
        <div className="p-6 w-11/12 mx-auto bg-gradient-to-br from-red-50 via-pink-50 to-red-100 rounded-xl shadow-md">
            <h2 className="text-3xl font-extrabold text-red-700 text-center mb-3 flex justify-center items-center gap-2">
                <FaExclamationTriangle className="text-red-500" />
                Expired Food Items
            </h2>
            <p className="text-center text-gray-700 mb-6 font-medium">
                You have <span className="text-red-600 font-bold">{expairedFood.length}</span> expired items in your fridge.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {displayedFoods.length === 0 ? (
                    <p className="text-center col-span-2">No expired foods found.</p>
                ) : (
                    displayedFoods.map((food, index) => (
                        <motion.div
                            key={food._id}
                            className="relative bg-white border border-red-300 rounded-xl shadow-lg overflow-hidden flex flex-col md:flex-row gap-4 p-4 hover:shadow-red-300 transition"
                            initial={{ opacity: 0, y: 80 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{
                                duration: 0.6,
                                ease: "easeOut",
                                delay: index * 0.2
                            }}
                        >
                            <div className='w-36 h-36 overflow-hidden rounded-md flex-shrink-0 border border-red-200 bg-red-50'>
                                <img
                                    src={food.image}
                                    alt={food.title}
                                    className="w-full h-full object-contain"
                                />
                            </div>
                            <div className='flex flex-col justify-center text-gray-700 space-y-1'>
                                <h3 className="text-xl font-bold text-red-700 mb-2">{food.title}</h3>
                                <p className="flex items-center gap-2">
                                    <FaTags className="text-red-400" /> <strong>Category:</strong> {food.category}
                                </p>
                                <p className="flex items-center gap-2">
                                    <FaBoxes className="text-red-400" /> <strong>Quantity:</strong> {food.quantity}
                                </p>
                                <p className="flex items-center gap-2">
                                    <FaCalendarAlt className="text-red-400" /> <strong>Expiry:</strong> {new Date(food.expiryDate).toLocaleDateString()}
                                </p>
                                <span className="absolute top-2 right-2 bg-red-600 text-white px-3 py-1 text-xs rounded-full font-bold shadow-sm">
                                    Expired
                                </span>
                            </div>
                        </motion.div>
                    ))
                )}
            </div>

            {expairedFood.length > 6 && (
                <div className="flex justify-center mt-8">
                    <Link
                        to="/allExpiredFoods"
                        className="btn btn-outline btn-error hover:scale-105 transition px-6"
                    >
                        View All Expired Items
                    </Link>
                </div>
            )}
        </div>
    );
};

export default ExpairedFoodSection;
