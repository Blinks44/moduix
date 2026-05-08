import { Separator, type SeparatorProps } from 'moduix';
import type { CssPropertyInput } from '../preview';
import styles from './separator.module.css';

export const separatorCssProperties: CssPropertyInput[] = [
  ['--separator-color', 'var(--color-border)', 'Controls the separator color.'],
  ['--separator-length-horizontal', '100%', 'Controls horizontal separator width.'],
  ['--separator-length-vertical', '1em', 'Controls vertical separator height.'],
  ['--separator-thickness', '1px', 'Controls separator thickness for both orientations.'],
  [
    '--separator-thickness-horizontal',
    'var(--separator-thickness, 1px)',
    'Controls horizontal separator thickness.',
  ],
  [
    '--separator-thickness-vertical',
    'var(--separator-thickness, 1px)',
    'Controls vertical separator thickness.',
  ],
];

export function SeparatorExample(props: SeparatorProps) {
  return (
    <div className={styles.card}>
      <div className={styles.stack}>
        <span className={styles.text}>Account settings</span>
        <Separator {...props} />
        <span className={styles.text}>Billing details</span>
      </div>
    </div>
  );
}

export function VerticalSeparatorExample() {
  return (
    <nav className={styles.nav} aria-label="Main navigation">
      <a href="#" className={styles.link}>
        Home
      </a>
      <a href="#" className={styles.link}>
        Pricing
      </a>
      <Separator orientation="vertical" />
      <a href="#" className={styles.link}>
        Sign in
      </a>
    </nav>
  );
}

export function CustomSeparatorExample() {
  return (
    <div className={styles.section}>
      <span className={styles.text}>Completed profile</span>
      <Separator className={styles.customSeparator} />
      <span className={styles.text}>Next step: billing details</span>
    </div>
  );
}