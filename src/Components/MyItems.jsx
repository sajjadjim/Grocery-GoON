import React, { use, useEffect, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import axios from 'axios';
import Swal from 'sweetalert2';

const MyItems = () => {
    const { user } = use(AuthContext);
    const [foods, setFoods] = useState([]);
    const [selectedFood, setSelectedFood] = useState(null);
    const [viewMode, setViewMode] = useState('table');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 9;

    useEffect(() => {
        if (user?.email) {
            axios(`${import.meta.env.VITE_API_URL}/my-foods/${user.email}`)
                .then((res) => setFoods(res.data))
                .catch((err) => console.error(err));
        }
    }, [user]);

    const totalPages = Math.ceil(foods.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentFoods = foods.slice(startIndex, startIndex + itemsPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleUpdate = (e) => {
        e.preventDefault();
        const form = e.target;
        const updatedFood = {
            title: form.title.value,
            quantity: form.quantity.value,
            category: form.category.value,
        };
        axios.patch(`${import.meta.env.VITE_API_URL}/foods/${selectedFood._id}`, updatedFood, {
            withCredentials: true
        })
        .then((res) => {
            if (res.data.modifiedCount > 0) {
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Item updated",
                    showConfirmButton: false,
                    timer: 1000
                });
                const updateList = foods.map(food =>
                    food._id === selectedFood._id ? { ...food, ...updatedFood } : food
                );
                setFoods(updateList);
                setSelectedFood(null);
            }
        })
        .catch(error => console.log(error));
    };

    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`${import.meta.env.VITE_API_URL}/foods/${id}`, {
                    withCredentials: true
                }).then(res => {
                    if (res.data.deletedCount > 0) {
                        Swal.fire('Deleted!', 'Food item has been deleted.', 'success');
                        setFoods((prev) => prev.filter((food) => food._id !== id));
                    }
                });
            }
        });
    };

    return (
        <div className="min-h-screen  p-6">
            <h2 className="text-3xl font-bold text-center text-primary mb-6">My Food Items</h2>

            <div className="flex justify-center gap-4 mb-4">
                <button
                    className={`btn ${viewMode === 'table' ? 'btn-primary' : 'btn-outline'}`}
                    onClick={() => setViewMode('table')}
                >
                    Table View
                </button>
                <button
                    className={`btn ${viewMode === 'card' ? 'btn-primary' : 'btn-outline'}`}
                    onClick={() => setViewMode('card')}
                >
                    Card View
                </button>
            </div>

            {viewMode === 'table' ? (
                <div className="overflow-x-auto">
                    <table className="table table-zebra w-full rounded-lg shadow-md bg-white">
                        <thead className="bg-gray-200 text-gray-800">
                            <tr>
                                <th>Title</th>
                                <th>Quantity</th>
                                <th>Category</th>
                                <th>Expiry</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentFoods.map((food) => (
                                <tr key={food._id}>
                                    <td>{food.title}</td>
                                    <td>{food.quantity}</td>
                                    <td>{food.category}</td>
                                    <td>{food.expiryDate}</td>
                                    <td>
                                        <button onClick={() => setSelectedFood(food)} className="btn btn-sm btn-primary mr-2">Update</button>
                                        <button onClick={() => handleDelete(food._id)} className="btn btn-sm btn-error">Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {currentFoods.map(food => (
                        <div key={food._id} className="bg-white rounded-xl shadow-xl p-4 relative">
                            <h3 className="text-xl font-semibold mb-2">{food.title}</h3>
                            <p><strong>Quantity:</strong> {food.quantity}</p>
                            <p><strong>Category:</strong> {food.category}</p>
                            <p><strong>Expiry:</strong> {food.expiryDate}</p>
                            <div className="mt-3 flex gap-2">
                                <button onClick={() => setSelectedFood(food)} className="btn btn-sm btn-primary">Update</button>
                                <button onClick={() => handleDelete(food._id)} className="btn btn-sm btn-error">Delete</button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Pagination Controls */}
            <div className="mt-8 flex justify-center gap-2 flex-wrap">
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

            {/* Update Modal */}
            {selectedFood && (
                <dialog open className="modal">
                    <div className="modal-box">
                        <form onSubmit={handleUpdate}>
                            <h3 className="font-bold text-lg mb-2">Update Food</h3>
                            <input name="title" defaultValue={selectedFood.title} className="input input-bordered w-full mb-2" />
                            <input name="quantity" defaultValue={selectedFood.quantity} type="number" className="input input-bordered w-full mb-2" />
                            <input name="category" defaultValue={selectedFood.category} className="input input-bordered w-full mb-2" />
                            <div className="modal-action">
                                <button type="submit" className="btn btn-success">Save</button>
                                <button type="button" onClick={() => setSelectedFood(null)} className="btn">Cancel</button>
                            </div>
                        </form>
                    </div>
                </dialog>
            )}
        </div>
    );
};

export default MyItems;
