/**
 * Traceability:
 * - Usability & Accessibility (WCAG 2.1 AA): Skip link, focus outlines, aria-expanded, aria-current, responsive nav.
 * - Routes: Dashboard (/), Register (/register), Login (/login), Bank (/bank), API Docs (external).
 */
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import SideNavLink from '../components/Nav/SideNavLink';
import styles from './SideNavLayout.module.css';

type Props = {
  children: React.ReactNode;
};

/**
 * PUBLIC_INTERFACE
 */
export default function SideNavLayout({ children }: Props): React.ReactElement {
  /** Layout with persistent left navigation and main content area. */
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [collapsed, setCollapsed] = React.useState(false);
  const location = useLocation();

  // Close mobile drawer when route changes
  React.useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  // Toggle handlers with keyboard support
  const onToggleMobile = () => setMobileOpen((s) => !s);
  const onToggleCollapse = () => setCollapsed((s) => !s);

  return (
    <div className={`${styles.root} ${collapsed ? styles.collapsed : ''}`}>
      <a href="#main-content" className="skip-to-content">Skip to content</a>

      <div className={styles.headerMobile} role="banner" aria-label="Header">
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <button
            type="button"
            className={styles.toggleBtn}
            onClick={onToggleMobile}
            aria-expanded={mobileOpen}
            aria-controls="primary-sidebar"
            aria-label="Toggle navigation menu"
          >
            ☰
          </button>
          <strong>EKYC Suite</strong>
        </div>
        <button
          type="button"
          className={styles.toggleBtn}
          onClick={onToggleCollapse}
          aria-pressed={collapsed}
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {collapsed ? '›' : '‹'}
        </button>
      </div>

      <aside
        id="primary-sidebar"
        className={`${styles.sidebar} ${collapsed ? styles.sidebarCollapsed : ''} ${mobileOpen ? styles.sidebarOpen : ''}`}
        aria-label="Primary"
        role="navigation"
      >
        <div className={styles.brand}>
          <span aria-hidden="true" style={{ width: 28, height: 28, borderRadius: 6, background: 'rgba(255,255,255,0.2)', display: 'inline-block' }} />
          <h1 className={styles.brandTitle} style={{ fontSize: 16 }}>EKYC Suite</h1>
        </div>
        <div className={styles.nav}>
          <div className={styles.navGroup}>
            <div className={styles.navHeader}>Main</div>
            <SideNavLink to="/" icon={<span aria-hidden="true">🏠</span>}>Dashboard</SideNavLink>
            <SideNavLink to="/register" icon={<span aria-hidden="true">📝</span>}>Register</SideNavLink>
            <SideNavLink to="/login" icon={<span aria-hidden="true">🔐</span>}>Login</SideNavLink>
            <SideNavLink to="/bank" icon={<span aria-hidden="true">🏦</span>}>Bank Details</SideNavLink>
          </div>
          <div className={styles.navGroup} style={{ marginTop: 12 }}>
            <div className={styles.navHeader}>Resources</div>
            <a
              className={styles.link}
              href="/docs"
              target="_blank"
              rel="noreferrer"
              aria-label="Open API documentation in a new tab"
            >
              <span className="icon" aria-hidden="true" style={{ width: 20, textAlign: 'center' }}>📜</span>
              <span className="linkText">API Docs</span>
            </a>
          </div>
        </div>
        <div className={styles.footer}>
          <div>© {new Date().getFullYear()} EKYC</div>
          <div style={{ opacity: 0.8 }}>Theme: Navy / White</div>
        </div>
      </aside>

      <main id="main-content" className={styles.content} role="main" tabIndex={-1}>
        {children}
      </main>
    </div>
  );
}
