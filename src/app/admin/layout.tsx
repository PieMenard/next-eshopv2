import { Nav, NavLink } from '@/components/Nav';
import React from 'react';

export const dynamic = 'force-dynamic';

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
        <NavLink href="/admin/users">Costumers</NavLink>
        <NavLink href="/admin/orders">Sales</NavLink>
      </Nav>
      <div className="container my-6">{children}</div>
    </>
  );
};

export default AdminLayout;
