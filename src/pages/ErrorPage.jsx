import React from 'react';
import { BiError } from "react-icons/bi";
import { Link } from 'react-router';

const ErrorPage = () => {
    return (
        <div className='w-10/12 mx-auto text-center justify-center items-center'>
            <button ><BiError color='red' size={200}/></button>
            <h1 className="text-6xl font-bold text-red-500 mb-4">404</h1>
            <p className="text-2xl font-semibold mb-2">Oops! Page not found</p>
            <p className="mb-6 text-gray-600">The page you are looking for might have been removed or doesn't exist.</p>
            <Link to="/" className="btn btn-primary">Go to Homepage</Link>
        </div>
    );
};

export default ErrorPage;