import {
	HiOutlineViewGrid,
	HiOutlineUsers,
	HiOutlineDocumentText,
	HiOutlineQuestionMarkCircle,
    HiOutlineBookOpen,
	HiOutlineUserGroup 
} from 'react-icons/hi'

export const DASHBOARD_SIDEBAR_LINKS = [
	{
		key: 'dashboard',
		label: 'Dashboard',
		path: '/admin',
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
		key: 'readers',
		label: 'Czytelnicy',
		path: 'readers-list',
		icon: <HiOutlineUserGroup />
	},
	{
		key: 'books',
		label: 'Książki',
		path: '/books',
		icon: <HiOutlineBookOpen />,
        subLinks: [
			{ label: 'Lista książęk', path: 'books-list' },
			{ label: 'Dodaj książkę', path: 'add-book' }
		]
	},
	{
		key: 'customers',
		label: 'Raport wypożyczeń',
		path: 'borrowing-history',
		icon: <HiOutlineDocumentText />
	}
]

export const DASHBOARD_SIDEBAR_BOTTOM_LINKS = [
    {
		key: 'logout',
		label: 'Wyloguj się',
		action: () => {},
		icon: <HiOutlineQuestionMarkCircle />
	}
]