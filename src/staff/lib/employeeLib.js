import {
    HiOutlineUsers,
    HiOutlineBookOpen,
    HiOutlineSearchCircle,
    HiOutlineClipboardList,
    HiOutlineCog,
    HiOutlineLogout
} from 'react-icons/hi';

export const EMPLOYEE_SIDEBAR_LINKS = [
    {
        key: 'borrowings',
        label: 'Wypożyczenia',
        path: '/employee/borrowings',
        icon: <HiOutlineClipboardList />,
        subLinks: [
            { label: 'Wypożycz książkę', path: 'borrow-book' },
            { label: 'Przyjmij zwrot', path: '/return-book' },
            { label: 'Rezerwacje', path: '/reservations' },
            { label: 'Przypomnienia', path: '/reminders' }
        ]
    },
    {
        key: 'readers',
        label: 'Czytelnicy',
        path: '/employee/readers',
        icon: <HiOutlineUsers />,
        subLinks: [
            { label: 'Lista czytelników', path: 'readers-list' },
            { label: 'Dodaj czytelnika', path: 'add-reader' },
            { label: 'Historia wypożyczeń', path: '/borrowing-history' }
        ]
    },
    {
        key: 'books',
        label: 'Książki',
        path: '/employee/books',
        icon: <HiOutlineBookOpen />,
        subLinks: [
            { label: 'Wyszukaj książki', path: '/search-books' },
            { label: 'Dostępność książek', path: '/book-availability' }
        ]
    },
    {
        key: 'inventory',
        label: 'Inwentaryzacja',
        path: '/employee/inventory',
        icon: <HiOutlineSearchCircle />,
        subLinks: [
            { label: 'Lista książek', path: 'books-list' },
            { label: 'Stan książek', path: '/book-status' }
        ]
    }
];

export const EMPLOYEE_SIDEBAR_BOTTOM_LINKS = [
    {
        key: 'settings',
        label: 'Ustawienia',
        path: '/settings',
        icon: <HiOutlineCog />
    },
    {
        key: 'logout',
        label: 'Wyloguj się',
        action: () => {},
        icon: <HiOutlineLogout />
    }
];