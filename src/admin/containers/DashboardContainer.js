import React from 'react';

function AdminDashboard() {
  const cards = [
    {
      title: "Zarządzanie Pracownikami",
      description: "Przeglądaj i zarządzaj profilami pracowników w systemie. Tutaj możesz edytować ich dane, usuwać profile pracowników oraz łatwo ich wyszukiwać dzięki paskowi wyszukiwania.",
      href: `/admin/employee-list`,
    },
    {
      title: "Zarządzanie Czytelnikami",
      description: "Przeglądaj i zarządzaj profilami czytelników w systemie. Tutaj możesz edytować ich dane, usuwać profile oraz łatwo wyszukiwać konkretnych czytelników dzięki paskowi wyszukiwania.",
      href: `/admin/readers-list`,
    },
    {
      title: "Zarządzanie książkami",
      description: "Ta sekcja umożliwia przeglądanie wszystkich dostępnych książek w systemie. Możesz edytować dane książek, usuwać pozycje z katalogu oraz łatwo wyszukiwać konkretne tytuły dzięki paskowi wyszukiwania.",
      href: `/admin/books-list`,
    },
    {
      title: "Dodaj pracownika",
      description: "Użyj formularza do dodania nowego pracownika, podając jego e-mail i hasło do logowania, oraz PESEL dla unikalnej identyfikacji. Upewnij się, że wprowadzasz kompletne dane, w tym imię, nazwisko i datę zatrudnienia.",
      href: `/admin/add-employee`,
    },
    {
      title: "Przeglądaj raport wypożyczeń",
      description: "Ta sekcja umożliwia przeglądanie i wyszukiwanie wszystkich wypożyczeń w systemie, zarówno obecnych, jak i zakończonych. Ułatwia dostęp do szczegółowych informacji o każdym wypożyczeniu, w tym danych o czytelnikach i książkach.",
      href: `/admin/borrowing-history`,
    },
    {
      title: "Dodaj książkę",
      description: "Użyj formularza, aby dodać nową książkę do systemu, wypełniając dane takie jak tytuł, autorzy, ISBN, rok wydania, wydawnictwo i ilość. Możesz też zarządzać kategoriami, dodając nowe lub usuwając istniejące.",
      href: `/admin/add-book`,
    },
  ];

  return (
    <div className="bg-white dark:bg-gray-800">
      <div className="container mx-auto py-6 px-4">
        <h1 className="text-3xl font-semibold text-black mb-4 dark:text-white">Panel główny</h1>
        <div className="text-blue-600 mb-4">
          W systemie <strong>Library Management</strong> masz dostęp do kompleksowych narzędzi do zarządzania biblioteką, w tym profilami pracowników i czytelników, księgozbiorami oraz wypożyczeniami. System umożliwia edycję danych, dodawanie nowych pozycji i zarządzanie kategoriami książek. Dla wygody, możesz zmienić motyw na ciemny oraz zmodyfikować swoje dane logowania w panelu użytkownika. Wykorzystaj te funkcje, aby efektywnie zarządzać biblioteką i ułatwić codzienne operacje.
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 justify-items-center">
          {cards.map((card, index) => (
            <div key={index} className="bg-white border border-gray-300 shadow-sm rounded-md overflow-hidden dark:bg-gray-800">
              <div className="bg-gray-200 px-4 py-2 dark:bg-gray-600">
                <h5 className="text-lg font-bold text-gray-900 dark:text-white">
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

export default AdminDashboard;