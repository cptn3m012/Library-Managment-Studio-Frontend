import {
    HiOutlineUsers,
    HiOutlineBookOpen,
    HiOutlineClipboardList,
    HiOutlineViewGrid,
    HiOutlineLogout
} from 'react-icons/hi';

export const EMPLOYEE_SIDEBAR_LINKS = [
    {
		key: 'dashboard',
		label: 'Dashboard',
		path: '/staff',
		icon: <HiOutlineViewGrid />
	},
    {
        key: 'readers',
        label: 'Czytelnicy',
        path: '/employee/readers',
        icon: <HiOutlineUsers />,
        subLinks: [
            { label: 'Lista czytelników', path: 'readers-list' },
            { label: 'Dodaj czytelnika', path: 'add-reader' }
        ]
    },
    {
        key: 'books',
        label: 'Dostępne książki',
        path: 'books-list',
        icon: <HiOutlineBookOpen />,
    },
    {
        key: 'borrowings',
        label: 'Wypożyczenia',
        path: 'return-book', 
        icon: <HiOutlineClipboardList />,
        subLinks: [
            { label: 'Lista wypożyczeń', path: 'return-book' },
            { label: 'Historia wypożyczeń', path: 'borrowing-history' }
        ]
    },
];

export const EMPLOYEE_SIDEBAR_BOTTOM_LINKS = [
    {
        key: 'logout',
        label: 'Wyloguj się',
        action: () => {},
        icon: <HiOutlineLogout />
    }
];