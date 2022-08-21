import classNames from 'classnames';
import React, { useCallback, Suspense } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { asideConfig } from './aside';
import styles from './style.less';

function Dashboard() {
  const renderActive = useCallback(({ isActive }) => {
    return classNames(styles.link, {
      [styles.active]: isActive,
    });
  }, []);

  return (
    <section className={styles.container}>
      <aside className={styles.aside}>
        {asideConfig.map((item) => (
          <NavLink to={item.to} key={item.to} className={renderActive}>
            {item.text}
          </NavLink>
        ))}
      </aside>
      <main className={styles.content}>
        <Suspense fallback={null}>
          <Outlet />
        </Suspense>
      </main>
      <div className={styles.name}></div>
    </section>
  );
}

export default Dashboard;
