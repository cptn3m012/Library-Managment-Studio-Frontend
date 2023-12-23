import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import { Outlet } from 'react-router-dom';
import Footer from './Footer';

function Layout({ role }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    }

    return (
        <div className='flex flex-row min-h-screen bg-neutral-400 overflow-hidden'>
            {isSidebarOpen && <Sidebar role={role} />}
            <div className='flex flex-col w-full'>
                <Header toggleSidebar={toggleSidebar} />
                <main className='bg-gray-50 flex-1 overflow-y-auto p-4'>
                    <Outlet />
                </main>
                <Footer />
            </div>
        </div>
    );
}

export default Layout;