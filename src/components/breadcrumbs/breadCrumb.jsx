'use client'; // if used in app/ directory

import Link from 'next/link';
import styles from './Breadcrumb.module.css';
import { LuSquareChevronRight } from "react-icons/lu";
import { IoMdHome } from "react-icons/io";

const Breadcrumb = ({ links }) => {
  return (
    <nav className={styles.breadcrumb}>
          {links.map((item, index) => (
            <span key={index} className={styles.breadcrumbItem}>
              {index === 0 ? (
                <IoMdHome className={styles.icon} size={16} />
              ) : (
                <LuSquareChevronRight className={styles.icon} size={16} />
              )}
              {item.to ? (
                <Link href={item.to}>
                  <span className={styles.link}>{item.label}</span>
                </Link>
              ) : (
                <span className={styles.current}>{item.label}</span>
              )}
            </span>
          ))}
    </nav>
  );
};

export default Breadcrumb;
