import React from 'react';
import { Card, Button } from 'flowbite-react';
import {
	HiOutlineViewGrid
} from 'react-icons/hi'

function AdminDashboard() {
  // Tutaj możesz dodać logikę stanu i metody

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto py-6 px-4">
        <h1 className="text-3xl font-semibold text-gray-700">Dashboard administratora</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
          {/* Sekcja zarządzania pracownikami */}
          <Card>
            <h2 className="text-xl font-semibold mb-2">Zarządzanie pracownikami</h2>
            <ul className="mb-4">
              <li><Button color="info">Dodaj pracownika</Button></li>
              <li><Button color="info">Edytuj pracownika</Button></li>
              <li><Button color="info">Usuń pracownika</Button></li>
              <li><Button color="info">Przeglądaj pracowników</Button></li>
            </ul>
            <	HiOutlineViewGrid
 name="users" className="text-2xl text-gray-700" />
          </Card>

          {/* Sekcja zarządzania książkami */}
          <Card>
            <h2 className="text-xl font-semibold mb-2">Zarządzanie książkami</h2>
            <ul className="mb-4">
              <li><Button color="success">Dodaj książkę</Button></li>
              <li><Button color="success">Edytuj książkę</Button></li>
              <li><Button color="success">Usuń książkę</Button></li>
              <li><Button color="success">Przeglądaj książki</Button></li>
            </ul>
            <	HiOutlineViewGrid
 name="book" className="text-2xl text-gray-700" />
          </Card>

          {/* Sekcja raportów i analiz */}
          <Card>
            <h2 className="text-xl font-semibold mb-2">Raporty i analizy</h2>
            <ul className="mb-4">
              <li><Button color="warning">Raport wypożyczeń</Button></li>
              <li><Button color="warning">Raport przeterminowań</Button></li>
              <li><Button color="warning">Statystyki pracowników</Button></li>
              <li><Button color="warning">Analiza zasobów</Button></li>
            </ul>
            <	HiOutlineViewGrid
 name="chart-bar" className="text-2xl text-gray-700" />
          </Card>

          {/* Sekcja ustawień systemowych */}
          <Card>
            <h2 className="text-xl font-semibold mb-2">Ustawienia systemu</h2>
            <ul className="mb-4">
              <li><Button color="dark">Konfiguracja powiadomień</Button></li>
              <li><Button color="dark">Ustawienia dostępu</Button></li>
              <li><Button color="dark">Zarządzanie kategoriami</Button></li>
            </ul>
            <	HiOutlineViewGrid
 name="cog" className="text-2xl text-gray-700" />
          </Card>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
