import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../Shared/Navbar';
import Footer from '../Shared/Footer';

const RootLayouts = () => {
    return (
        <div className=' flex flex-col min-h-screen'>   
        {/* bg-linear-to-bl from-primary to-secondary */}
            <Navbar></Navbar>
            <main className='flex-grow'>
                <Outlet></Outlet>
            </main>
            <Footer></Footer>
        </div>
    );
};

export default RootLayouts;