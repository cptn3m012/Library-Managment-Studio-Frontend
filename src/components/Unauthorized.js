import React from 'react';

const Unauthorized = () => {
  return (
    <div className="flex items-center justify-center w-full h-screen bg-gradient-to-r from-blue-500 to-gray-300">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-white mb-4">401 Nieupoważniony dostęp</h1>
        <p className="text-xl text-gray-100 mb-8">Przepraszamy, nie masz dostępu do tej strony.</p>
        <a href="/" className="px-6 py-3 bg-white text-blue-500 rounded hover:bg-gray-100">Powróć na stronę do logowania</a>
      </div>
    </div>
  );
};

export default Unauthorized;