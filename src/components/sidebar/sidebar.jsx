'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  FaUsers,
  FaDoorOpen,
  FaChevronDown,
  FaChevronUp,
  FaPlus,
  FaList,
  FaHome,
  FaMoneyBill,
  FaBars,
  FaTimes
} from 'react-icons/fa';
import styles from './sidebar.module.css'; // ✅ CSS MODULE IMPORT

const SideNav = ({ userType = 'admin' }) => {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);

  const toggleCollapse = () => {
    setCollapsed(!collapsed);
    setOpenDropdown(null);
  };

  const toggleDropdown = (name) => {
    setOpenDropdown(openDropdown === name ? null : name);
  };

  const isActive = (path) => pathname === path;

  const adminLinks = [
    {
      name: 'Units',
      icon: <FaDoorOpen />,
      submenu: [
        { name: 'Add Unit', path: '/admin/dashboard/units/add', icon: <FaPlus /> },
        { name: 'View Units', path: '/admin/dashboard/units/view', icon: <FaList /> },
      ]
    },
    {
      name: 'Tenants', path: '/admin/dashboard/tenants',icon: <FaUsers />
    }, 
    { name: 'Payments', path: '/admin/dashboard/payments', icon: <FaMoneyBill /> }
  ];

  const tenantLinks = [
    { name: 'My Unit', path: '/tenant/dashboard/unit', icon: <FaHome /> },
    { name: 'Rent', path: '/tenant/dashboard/payments', icon: <FaMoneyBill /> }
  ];

  const links = userType === 'admin' ? adminLinks : tenantLinks;

  return (
    <div className={styles.sidebar} style={{ width: collapsed ? '80px' : '240px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        {!collapsed && <h2 className={styles.sidebarTitle}>{userType === 'admin' ? 'Admin' : 'Tenant'}</h2>}
        <button onClick={toggleCollapse} style={{ background: 'none', border: 'none', color: 'white', fontSize: '20px', cursor: 'pointer' }}>
          {collapsed ? <FaBars /> : <FaTimes />}
        </button>
      </div>

      <div className={styles.navList}>
        {/* Dashboard Link */}
        <Link href={userType === 'admin' ? '/admin/dashboard' : '/tenant/dashboard'}>
          <div className={`${styles.navLink} ${isActive(userType === 'admin' ? '/admin/dashboard' : '/tenant/dashboard') ? styles.navLinkActive : ''}`}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <FaHome /> {!collapsed && 'Dashboard'}
            </div>
          </div>
        </Link>

        {/* Other Links */}
        {links.map((link, idx) => (
          <div key={idx}>
            <div
              className={`${styles.navLink} ${isActive(link.path) ? styles.navLinkActive : ''}`}
              onClick={() => link.submenu ? toggleDropdown(link.name) : null}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                {link.icon}
                {!collapsed && link.name}
              </div>
              {!collapsed && link.submenu && (
                openDropdown === link.name ? <FaChevronUp /> : <FaChevronDown />
              )}
            </div>

            {link.submenu && openDropdown === link.name && !collapsed && (
              <div className={styles.subLinks}>
                {link.submenu.map((sublink, i) => (
                  <Link
                    key={i}
                    href={sublink.path}
                    className={`${styles.subLink} ${isActive(sublink.path) ? styles.subLinkActive : ''}`}
                  >
                    {sublink.icon} {sublink.name}
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SideNav;
