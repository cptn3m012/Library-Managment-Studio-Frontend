import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import { Outlet } from 'react-router-dom';

function Layout() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    }

    return(
        <div className='flex flex-row bg-neutral-500 h-screen w-screen overflow-hidden'>
            {isSidebarOpen && <Sidebar />}
            <div className='flex flex-col flex-1'>
                <Header toggleSidebar={toggleSidebar} />
                <div className='p-4'>
                    {<Outlet />}
                </div>
            </div>
        </div>
    );
}

export default Layout;