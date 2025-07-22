import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { motion } from "framer-motion";

const AllExpiredFoods = () => {
    const [expiredFoods, setExpiredFoods] = useState([]);

    useEffect(() => {
        axios(`${import.meta.env.VITE_API_URL}/foods/expired`)
            .then((res) => {
                setExpiredFoods(res.data);
            })
            .catch(err => {
                console.log(err);
            });
    }, []);

    return (
        <div className="all-expired-foods p-4 w-11/12 mx-auto">
            <h2 className="text-3xl font-bold text-primary text-center mb-6">All Expired Food Items</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {expiredFoods.length === 0 ? (
                    <p className='text-red-600'>No expired foods found.</p>
                ) : (
                    expiredFoods.map((food, index) => (
                        <motion.div
                            key={food._id}
                            className="bg-red-200 relative rounded-xl shadow-md overflow-hidden flex flex-col md:flex-row gap-4 p-4"
                            initial={{ opacity: 0, y: 80 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{
                                duration: 0.6,
                                ease: "easeOut",
                                delay: index * 0.15
                            }}
                        >
                            <div className="w-40 h-40 overflow-hidden rounded-md flex-shrink-0">
                                <img
                                    src={food.image}
                                    alt={food.title}
                                    className="w-full h-40 object-contain rounded "
                                />
                            </div>
                            <div className='flex flex-col mb-4 justify-between'>
                                <h3 className="text-lg font-semibold">{food.title}</h3>
                                <p><strong>Category:</strong> {food.category}</p>
                                <p><strong>Quantity:</strong> {food.quantity}</p>
                                <p><strong>Expiry Date:</strong> {new Date(food.expiryDate).toLocaleDateString()}</p>
                                <span className="absolute top-2 right-2 bg-red-600 text-white px-2 py-1 rounded text-xs font-bold">
                                    Expired
                                </span>
                            </div>
                        </motion.div>
                    ))
                )}
            </div>
        </div>
    );
};

export default AllExpiredFoods;
