import React from 'react';

function StaffDashboard() {
  const cards = [
    {
      title: "Zarządzanie Czytelnikam",
      description: "Przeglądaj i zarządzaj profilami czytelników w systemie. Tutaj możesz edytować ich dane lub usunąć profil czytelnika na stałe w razie potrzeby.",
      href: `/staff/readers-list`,
    },
    {
      title: "Przeglądaj i Wypożycz Książki",
      description: "Tutaj znajdziesz pełen katalog dostępnych książek. Możesz łatwo wypożyczyć konkretne pozycje, korzystając z opcji 'Wypożycz' obok każdej z nich.",
      href: `/staff/books-list`,
    },
    {
      title: "Zarządzaj wypożyczeniami",
      description: "Ta sekcja pozwala Ci przeglądać wszystkie aktualne wypożyczenia. Ułatwia wyszukiwanie i zarządzanie konkretnymi wypożyczeniami, umożliwiając ich szybki zwrot.",
      href: `/staff/return-book`,
    },
    {
      title: "Dodaj czytelnika",
      description: "Przejdź do formularza, który umożliwi Ci dodanie nowych czytelników do systemu. Pamiętaj o uzupełnieniu wszystkich niezbędnych informacji zgodnie z wymaganiami formularza.",
      href: `/staff/add-reader`,
    },
    {
      title: "Przeglądaj historię wypożyczeń",
      description: " Ta sekcja pozwala na przeglądanie i wyszukiwanie wszystkich wypożyczeń, zarówno obecnych, jak i zakończonych, zarejestrowanych w systemie.",
      href: `/staff/borrowing-history`,
    },
  ];

  return (
    <div className="bg-white dark:bg-gray-800">
      <div className="container mx-auto py-6 px-4">
        <h1 className="text-3xl font-semibold text-black mb-4 dark:text-white">Panel główny</h1>
        <div className="text-blue-600 mb-4">
          Witaj w systemie <strong>Library Management</strong> służącego do zarządzania biblioteką.
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 justify-items-center">
          {cards.map((card, index) => (
            <div key={index} className="bg-white border border-gray-300 shadow-sm rounded-md overflow-hidden dark:bg-gray-800">
              <div className="bg-gray-200 px-4 py-2">
                <h5 className="text-lg font-bold text-gray-900">
                  {card.title}
                </h5>
              </div>
              <div className="p-4">
                <p className="text-gray-700 dark:text-white">
                  {card.description}
                </p>
                <a href={card.href} className="text-blue-600 hover:text-blue-800 hover:underline mt-2 inline-block">
                  Kliknij tutaj
                  <svg className="ms-2 w-4 h-4 inline" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default StaffDashboard;