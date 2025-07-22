import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router';

const Fridge = () => {
    const [foods, setFoods] = useState([]);
    const [filteredFoods, setFilteredFoods] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [sortBy, setSortBy] = useState("title-asc");
    const [query, setQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const today = new Date();

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_API_URL}/foods`)
            .then((res) => {
                setFoods(res.data);
                setFilteredFoods(res.data);
            })
            .catch((err) => console.error(err));
    }, []);

    const handleCategoryChange = (e) => {
        const category = e.target.value;
        setSelectedCategory(category);
        setCurrentPage(1); // reset to first page when filter changes

        if (category === "All") {
            setFilteredFoods(foods);
        } else {
            const filtered = foods.filter(food => food.category === category);
            setFilteredFoods(filtered);
        }
    };

    // Filter by search query
    const searchFilteredFoods = filteredFoods.filter(food =>
        food.title.toLowerCase().includes(query.toLowerCase())
    );

    // Sort logic
    const sortedFoods = [...searchFilteredFoods].sort((a, b) => {
        const [field, order] = sortBy.split("-");
        const titleA = a.title.toLowerCase();
        const titleB = b.title.toLowerCase();
        if (titleA < titleB) return order === "asc" ? -1 : 1;
        if (titleA > titleB) return order === "asc" ? 1 : -1;
        return 0;
    });

    // Pagination logic
    const totalPages = Math.ceil(sortedFoods.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentFoods = sortedFoods.slice(startIndex, startIndex + itemsPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div className="p-6 max-w-7xl mx-auto">
            <div>
                <h2 className="text-3xl font-bold text-primary text-center mb-6">
                    Fridge Inventory
                </h2>
            </div>

            <div className="mb-6 text-center flex flex-wrap justify-center gap-4">
                <input
                    value={query}
                    onChange={(e) => {
                        setQuery(e.target.value);
                        setCurrentPage(1);
                    }}
                    className="input input-bordered w-full max-w-xs"
                    placeholder="Search by title"
                />
                <select
                    value={selectedCategory}
                    onChange={handleCategoryChange}
                    className="select select-bordered w-full max-w-xs"
                >
                    <option value="All">All Categories</option>
                    <option value="Dairy">Dairy</option>
                    <option value="Meat">Meat</option>
                    <option value="Vegetables">Vegetables</option>
                    <option value="Snacks">Snacks</option>
                </select>
                <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="select select-bordered w-full max-w-xs"
                >
                    <option value="title-asc">Title A-Z</option>
                    <option value="title-desc">Title Z-A</option>
                </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {currentFoods.map(food => {
                    const isExpired = new Date(food.expiryDate) < today;

                    return (
                        <div
                            key={food._id}
                            className="relative bg-white rounded-xl shadow-md overflow-hidden flex flex-col md:flex-row gap-4 p-4"
                        >
                            <div className="w-40 h-40 overflow-hidden rounded-md flex-shrink-0">
                                <img
                                    src={food.image}
                                    alt={food.title}
                                    className="w-full h-40 object-contain rounded mb-4"
                                />
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold">{food.title}</h3>
                                <p className="text-gray-600">Category: {food.category}</p>
                                <p className="text-gray-600">Quantity: {food.quantity}</p>
                                <p className="text-gray-600">
                                    Expiry: {new Date(food.expiryDate).toLocaleDateString()}
                                </p>

                                {isExpired && (
                                    <span className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 text-xs rounded font-bold">
                                        Expired
                                    </span>
                                )}

                                <Link
                                    to={`/foods/${food._id}`}
                                    className="btn btn-sm btn-primary mt-3"
                                >
                                    See Details
                                </Link>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Pagination */}
            <div className="mt-8 flex justify-center flex-wrap gap-2">
                {Array.from({ length: totalPages }, (_, i) => (
                    <button
                        key={i + 1}
                        onClick={() => handlePageChange(i + 1)}
                        className={`btn btn-sm ${currentPage === i + 1 ? 'btn-primary' : 'btn-outline'}`}
                    >
                        {i + 1}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default Fridge;
