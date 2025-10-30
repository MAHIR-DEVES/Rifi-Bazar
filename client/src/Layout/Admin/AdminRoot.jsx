// AdminLayout.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../../components/Admin/Sidebar/Sidebar';

const AdminRoot = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />

      <main className="flex-1 overflow-auto mt-14  md:mt-0">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminRoot;
