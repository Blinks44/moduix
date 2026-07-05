/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { Separator } from '@moduix/react';
import styles from './separator-demo.module.css';

const navigationItems = ['Home', 'Pricing', 'Sign in'];

export function VerticalSeparatorDemo() {
  return (
    <nav className={styles.nav} aria-label="Main navigation">
      {navigationItems.slice(0, 2).map((item) => (
        <a key={item} href="#" className={styles.link}>
          {item}
        </a>
      ))}
      <Separator orientation="vertical" />
      <a href="#" className={styles.link}>
        {navigationItems[2]}
      </a>
    </nav>
  );
}

//#endregion