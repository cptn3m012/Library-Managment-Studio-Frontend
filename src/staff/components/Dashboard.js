import React from 'react';

function StaffDashboard() {
  const cards = [
    {
      title: "Zarządzanie Czytelnikam",
      description: "Przeglądaj i zarządzaj profilami czytelników w systemie. Możesz edytować dane, usuwać profile oraz łatwo wyszukiwać czytelników dzięki paskowi wyszukiwania.",
      href: `/staff/readers-list`,
    },
    {
      title: "Przeglądaj i Wypożycz Książki",
      description:  "Odkryj pełen katalog dostępnych książek. Wypożyczaj je łatwo i szybko. Ułatw sobie pracę, korzystając z opcji 'Wypożycz' i wygodnego paska wyszukiwania.",
      href: `/staff/books-list`,
    },
    {
      title: "Zarządzaj Zwrotami Książek",
      description:  "Ta sekcja umożliwia zarządzanie procesem zwrotów książek. Ułatwia lokalizowanie i organizowanie zwrotów, zapewniając szybkie i efektywne zarządzanie wypożyczonymi pozycjami.",
      href: `/staff/return-book`,
    },
    {
      title: "Dodaj czytelnika",
      description:  "Użyj formularza, aby dodać nowego czytelnika do systemu. Pamiętaj o uzupełnieniu wszystkich wymaganych informacji, korzystając z przystępnego interfejsu.",
      href: `/staff/add-reader`,
    },
    {
      title: "Przeglądaj historię wypożyczeń",
      description: "Ta sekcja umożliwia przeglądanie i wyszukiwanie wszystkich wypożyczeń w systemie, zarówno obecnych, jak i zakończonych. Ułatwia dostęp do szczegółowych informacji o każdym wypożyczeniu, w tym danych o czytelnikach i książkach.",
      href: `/staff/borrowing-history`,
    },
  ];

  return (
    <div className="bg-white dark:bg-gray-800">
      <div className="container mx-auto py-6 px-4">
        <h1 className="text-3xl font-semibold text-black mb-4 dark:text-white">Panel główny</h1>
        <div className="text-blue-600 mb-4">
          Witaj w systemie <strong>Library Management</strong>! Jako pracownik, masz dostęp do szerokiej gamy funkcji: zarządzania profilami czytelników, wypożyczania i zwrotów książek, a także przeglądania historii wypożyczeń. Wykorzystaj intuicyjne narzędzia wyszukiwania, aby szybko odnaleźć potrzebne informacje. Dodatkowo, możesz personalizować swoje doświadczenie, wybierając motyw interfejsu – jasny lub ciemny. Klikając na swoje imię i nazwisko w nagłówku, uzyskasz dostęp do opcji edycji swoich danych logowania, w tym zmiany adresu e-mail i hasła. Zapewnij sobie wygodną i efektywną pracę dzięki zaawansowanym narzędziom dostępnym w systemie! W razie jakichkolwiek problemów lub pytań, skontaktuj się z administratorem systemu mailowo: <strong><a href="mailto:librarymanagment2023@gmail.com">librarymanagment2023@gmail.com</a></strong>.
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

export default StaffDashboard;