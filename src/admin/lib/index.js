import {
	HiOutlineViewGrid,
	HiOutlineUsers,
	HiOutlineDocumentText,
	HiOutlineQuestionMarkCircle,
    HiOutlineBookOpen,
	HiOutlineCog
} from 'react-icons/hi'

export const DASHBOARD_SIDEBAR_LINKS = [
	{
		key: 'dashboard',
		label: 'Dashboard',
		path: '/login',
		icon: <HiOutlineViewGrid />
	},
	{
		key: 'employee',
		label: 'Pracownicy',
		path: '/employee',
		icon: <HiOutlineUsers />,
        subLinks: [
			{ label: 'Lista pracowników', path: 'employee-list' },
			{ label: 'Dodaj pracownika', path: 'add-employee' }
		]
	},
	{
		key: 'books',
		label: 'Książki',
		path: '/books',
		icon: <HiOutlineBookOpen />,
        subLinks: [
			{ label: 'Dodaj książkę', path: 'add-book' },
			{ label: 'Edytuj książkę', path: '/edit-book' },
            { label: 'Usuń książkę', path: '/delete-book' },
            { label: 'Przeglądaj książki', path: '/edit-book' }
		]
	},
	{
		key: 'customers',
		label: 'Raporty',
		path: '/customers',
		icon: <HiOutlineDocumentText />,
        subLinks: [
			{ label: 'Raport wypożyczeń', path: '/add-book' },
			{ label: 'Raport przeterminowań', path: '/edit-book' },
            { label: 'Statystyki pracowników', path: '/edit-book' },
            { label: 'Analiza zasobów', path: '/edit-book' }
		]
	}
]

export const DASHBOARD_SIDEBAR_BOTTOM_LINKS = [
	{
		key: 'settings',
		label: 'Settings',
		path: '/settings',
		icon: <HiOutlineCog />
	},
    {
		key: 'logout',
		label: 'Wyloguj się',
		path: '/logout',
		icon: <HiOutlineQuestionMarkCircle />
	}
]