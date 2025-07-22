import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router";
import { motion } from "framer-motion";

const RecentProducts = () => {
  const [foods, setFoods] = useState([]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/foods/recent`)
      .then((res) => setFoods(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (


    <div className="py-12 max-w-6xl mx-auto px-4">
    
                <h2 className="text-3xl font-bold text-center text-primary mb-8">Recent Added Foods</h2>
                <div className="grid gap-6 md:grid-cols-2">
                    {foods.map(({ _id, image, title, category, quantity, expiryDate, index }) => (
                            <motion.div
                                key={_id}
                                className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col md:flex-row gap-4 p-4"
                                initial={{ opacity: 0, y: 80 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{
                                    duration: 0.8,
                                    ease: "easeOut",
                                    delay: index * 0.3
                                }}
                            >
                            <div className="w-40 h-40 overflow-hidden rounded-md flex-shrink-0">
                                <img src={image} alt={title} className="w-full h-40 object-contain rounded-md mb-4" />
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold">{title}</h3>
                                <p className="text-sm"><strong>Category:</strong> {category}</p>
                                <p className="text-sm"><strong>Quantity:</strong> {quantity}</p>
                                <p className="text-sm text-red-600">
                                    <strong>Expiry:</strong> {new Date(expiryDate).toLocaleDateString()}
                                </p>
                                <Link to={`/foods/${_id}`} className="btn btn-sm btn-primary mt-3">See Details</Link>
                            </div>
                          </motion.div>
                    ))}
                </div>
            </div>
  );
};

export default RecentProducts;
