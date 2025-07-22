import React, { use, useState } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import axios from 'axios';
import { useNavigate } from 'react-router';
import Swal from 'sweetalert2';
import { FaCheese, FaDrumstickBite, FaCarrot, FaCookieBite } from 'react-icons/fa';

const categories = [
  { label: "Dairy", icon: <FaCheese className="inline mr-2 text-yellow-500" /> },
  { label: "Meat", icon: <FaDrumstickBite className="inline mr-2 text-red-600" /> },
  { label: "Vegetables", icon: <FaCarrot className="inline mr-2 text-green-500" /> },
  { label: "Snacks", icon: <FaCookieBite className="inline mr-2 text-orange-400" /> },
];

const CategorySelector = ({ selectedCategory, onChange }) => {
  const [open, setOpen] = useState(false);

  const handleSelect = (category) => {
    onChange(category);
    setOpen(false);
  };

  const selected = categories.find(cat => cat.label === selectedCategory);

  return (
    <div className="relative w-full">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="input input-bordered w-full text-left rounded-lg flex items-center justify-between"
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span className="flex items-center gap-1">
          {selected ? selected.icon : <span className="text-gray-400 italic">Select Category</span>}
          {selected?.label || "Select Category"}
        </span>
        <svg
          className={`w-5 h-5 ml-2 transition-transform ${open ? "rotate-180" : "rotate-0"}`}
          fill="none" stroke="currentColor" strokeWidth="2"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"></path>
        </svg>
      </button>

      {open && (
        <ul
          tabIndex={-1}
          role="listbox"
          aria-label="Categories"
          className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-48 overflow-auto"
        >
          {categories.map(({ label, icon }) => (
            <li
              key={label}
              role="option"
              aria-selected={selectedCategory === label}
              onClick={() => handleSelect(label)}
              onKeyDown={e => { if(e.key === 'Enter') handleSelect(label); }}
              tabIndex={0}
              className={`cursor-pointer px-4 py-2 flex items-center hover:bg-indigo-100 ${
                selectedCategory === label ? 'bg-indigo-200 font-semibold' : ''
              }`}
            >
              {icon} {label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const AddFood = () => {
  const { loading, user } = use(AuthContext);
  const navigate = useNavigate();
  const [category, setCategory] = useState("");

  const handleAddFood = e => {
    e.preventDefault();
    const form = e.target;

    if (!category) {
      Swal.fire({
        icon: 'warning',
        title: 'Category is required',
      });
      return;
    }

    const food = {
      image: form.image.value,
      title: form.title.value,
      category,
      quantity: form.quantity.value,
      expiryDate: form.expiryDate.value,
      description: form.description.value,
      addedDate: new Date().toISOString(),
      userEmail: user?.email,
    };

    axios.post(`${import.meta.env.VITE_API_URL}/add-food`, food)
      .then(() => {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Data added successfully",
          showConfirmButton: false,
          timer: 1000
        });
        navigate(`/my-foods/${user?.email}`);
      })
      .catch(error => {
        console.error(error);
        Swal.fire({
          icon: 'error',
          title: 'Failed to add food',
          text: error.message || 'Please try again later',
        });
      });
  };

  return (
    <div className="max-w-4xl mx-auto p-8 bg-gradient-to-br from-white to-indigo-50 rounded-2xl shadow-xl">
      <h2 className="text-3xl font-extrabold mb-8 text-primary text-center">
        Add New Food Item
      </h2>
      <form onSubmit={handleAddFood} className="grid grid-cols-1 md:grid-cols-2 gap-8">

        {/* Left column */}
        <div className="space-y-6">
          <div>
            <label htmlFor="image" className="block mb-2 font-semibold text-gray-700">Photo URL</label>
            <input
              id="image"
              type="url"
              name="image"
              placeholder="https://example.com/image.jpg"
              className="input input-bordered w-full rounded-lg focus:ring-2 focus:ring-indigo-400 transition"
              required
            />
          </div>

          <div>
            <label htmlFor="title" className="block mb-2 font-semibold text-gray-700">Food Title</label>
            <input
              id="title"
              type="text"
              name="title"
              placeholder="Food Title"
              className="input input-bordered w-full rounded-lg focus:ring-2 focus:ring-indigo-400 transition"
              required
            />
          </div>

          <div>
            <label className="block mb-2 font-semibold text-gray-700">Category</label>
            <CategorySelector selectedCategory={category} onChange={setCategory} />
          </div>

          <div>
            <label htmlFor="quantity" className="block mb-2 font-semibold text-gray-700">Quantity</label>
            <input
              id="quantity"
              type="number"
              name="quantity"
              placeholder="Quantity"
              min="1"
              className="input input-bordered w-full rounded-lg focus:ring-2 focus:ring-indigo-400 transition"
              required
            />
          </div>
        </div>

        {/* Right column */}
        <div className="space-y-6 flex flex-col justify-between">
          <div>
            <label htmlFor="expiryDate" className="block mb-2 font-semibold text-gray-700">Expiry Date</label>
            <input
              id="expiryDate"
              type="date"
              name="expiryDate"
              className="input input-bordered w-full rounded-lg focus:ring-2 focus:ring-indigo-400 transition"
              required
            />
          </div>

          <div className="flex-grow">
            <label htmlFor="description" className="block mb-2 font-semibold text-gray-700">Description</label>
            <textarea
              id="description"
              name="description"
              placeholder="Add a short description"
              className="textarea textarea-bordered w-full h-full rounded-lg focus:ring-2 focus:ring-indigo-400 transition resize-none"
            />
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 mt-6">
            <input
              type="email"
              value={user?.email || ''}
              readOnly
              className="input input-bordered bg-base-200 text-base-content cursor-not-allowed rounded-lg"
            />
            <input
              type="text"
              value={user?.displayName || ''}
              readOnly
              className="input input-bordered bg-base-200 text-base-content cursor-not-allowed rounded-lg"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary w-full mt-4 py-3 text-lg font-semibold rounded-xl shadow-lg hover:shadow-indigo-500/50 transition"
          >
            Add Food
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddFood;
