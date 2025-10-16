import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './SideNavLink.module.css';

type Props = {
  to: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
  onClick?: () => void;
};

/**
 * PUBLIC_INTERFACE
 */
export function SideNavLink({ to, children, icon, onClick }: Props): React.ReactElement {
  /** Accessible side navigation link with active state and focus ring. */
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `${styles.link} ${isActive ? styles.active : ''}`
      }
      onClick={onClick}
    >
      {({ isActive }) => (
        <>
          {icon ? <span className={styles.icon} aria-hidden="true">{icon}</span> : null}
          <span aria-current={isActive ? 'page' : undefined}>{children}</span>
        </>
      )}
    </NavLink>
  );
}

export default SideNavLink;
