import React from 'react';

const Breadcrumb = ({ links }) => {
    return (
        <div className='mb-4'>
            <nav className="flex" aria-label="Breadcrumb">
                <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
                    {links.map((link, index) => (
                        <li key={index} className="inline-flex items-center">
                            {index > 0 && (
                                <svg className="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4" />
                                </svg>
                            )}
                            <a href={link.path} className={`ms-1 text-sm font-medium ${index === links.length - 1 ? 'text-gray-500' : 'text-gray-700 hover:text-blue-600'} md:ms-2 dark:text-gray-400 dark:hover:text-white`}>
                                {link.label}
                            </a>
                        </li>
                    ))}
                </ol>
            </nav>
        </div>
    );
};


export default Breadcrumb;