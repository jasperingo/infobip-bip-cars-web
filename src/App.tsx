import React from 'react';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { NavItem } from './components/NavItem';

export const App = () => {
  return (
    <div className="flex">
      <header className="w-1/4 h-screen p-8">
        <h1 className="font-bold text-4xl text-orange-500">BipCars</h1>
        <nav className="my-8">
          <ul>
            <NavItem text="IVR FLow" path="/" />
            <NavItem text="Products" path="/products" />
            <NavItem text="Working hours" path="/working-hours" />
          </ul>
        </nav>
      </header>

      <main className="bg-red-100 flex-grow h-screen">
        <div className="container">
          <Outlet />
          <ToastContainer />
        </div>
      </main>
      
    </div>
  );
}
