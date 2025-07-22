import { useEffect, useState } from "react";
import { Link } from "react-router";
import Countdown from 'react-countdown';
import axios from "axios";
import { motion } from "framer-motion";
import Spinner from "../../pages/loading";

const NearlyExpairySection = () => {
    const [foods, setFoods] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`${import.meta.env.VITE_API_URL}/foods/expiring-soon`);
                setFoods(res.data);
            } catch (err) {
                setError("Failed to load data.", err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) return <Spinner />;
    if (error) return <p className="text-center text-red-500">{error}</p>;

    return (
        <div className="py-12 max-w-6xl mx-auto px-4">

            <h2 className="text-3xl font-bold text-primary  text-center mb-8">Foods Expiring Soon</h2>
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
                            <p>
                                <strong> Time Left:</strong>{' '}
                                <Countdown date={new Date(expiryDate)} />
                            </p>
                            <Link to={`/foods/${_id}`} className="btn btn-sm btn-primary mt-3">See Details</Link>
                        </div>
                      </motion.div>
                ))}
            </div>
        </div>
    );
};

export default NearlyExpairySection;

