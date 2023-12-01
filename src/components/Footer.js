import React from "react";

const Footer = () => {

  const handleThemeToggle = () => {
    // Tutaj możesz dodać obsługę zmiany motywu
  };

  return (
    <footer className="bg-gray-100 py-4">
      <div className="container mx-auto flex justify-center items-center">
        <div className="text-black flex items-center justify-center">
          <span>&copy; 2023 Library Management Studio</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;