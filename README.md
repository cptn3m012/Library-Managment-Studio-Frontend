# Library Management Studio - Frontend

The frontend of the Library Management Studio provides a user-friendly interface for library staff and administrators to manage library operations efficiently. Built with modern web technologies, it offers a seamless experience for managing library resources, user accounts, and borrowing records.

## Technologies

- **React**: For building the user interface.
- **Tailwind CSS**: For styling components and pages.
- **Axios**: For making HTTP requests to the backend.

## Features

- **Login Page**: Secure authentication for library staff and administrators.
- **Dashboard**: Central place for all management activities.
- **Resource Management**: Add, update, and delete library resources.
- **Account Management**: Manage user accounts, including library members and staff.
- **Borrowing Records**: Track and manage book borrowings and returns.

## Getting Started

To get the frontend running locally:

1. **Clone this repository**
```
  git clone https://github.com/cptn3m012/Library-Managment-Studio-Frontend.git
```

2. **Navigate to the project directory**
```
 cd Library-Managment-Studio-Frontend
```
3. **Install dependencies**
```
  npm install
```
4. **Start the development server**
```
  npm start
```
The application will be available at `http://localhost:3000`.

## Configuration

For the frontend to function correctly, it requires interaction with the backend for data management and operations. Ensure the backend service is running and accessible. Configure the backend URL in the `.env` file or directly within your Axios service calls as needed.

The backend server needs to be set up and configured separately. You can find the backend project and setup instructions here: [Library Management Studio Backend](https://github.com/cptn3m012/Library-Managment-Studio-Backend).

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
