import { Nav, NavLink } from '@/components/Nav';
import React from 'react';

const AdminLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <>
      <Nav>
        <NavLink href="/admin">DashBoard</NavLink>
        <NavLink href="/admin/products">Products</NavLink>
        <NavLink href="/users">Costumers</NavLink>
        <NavLink href="/orders">Sales</NavLink>
      </Nav>
      <div className="container my-6">{children}</div>
    </>
  );
};

export default AdminLayout;
