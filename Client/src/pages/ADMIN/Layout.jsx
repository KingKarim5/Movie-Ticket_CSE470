import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <aside style={{ width: '220px', background: '#222', color: '#fff', padding: '2rem 1rem' }}>
        <h2 style={{ color: '#fff' }}>Admin Panel</h2>
        <nav>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            <li><Link to="/admin" style={{ color: '#fff', textDecoration: 'none' }}>Dashboard</Link></li>
            <li><Link to="/admin/bookings" style={{ color: '#fff', textDecoration: 'none' }}>List Bookings</Link></li>
            <li><Link to="/admin/shows" style={{ color: '#fff', textDecoration: 'none' }}>List Shows</Link></li>
            <li><Link to="/admin/add-show" style={{ color: '#fff', textDecoration: 'none' }}>Add Show</Link></li>
          </ul>
        </nav>
      </aside>
      <main style={{ flex: 1, padding: '2rem', background: '#f4f4f4' }}>
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
