import { Separator } from '@moduix/react/separator';
import styles from '@/components/examples/separator/separator-vertical.module.css';

const navigationItems = [
  { href: '#home', label: 'Home' },
  { href: '#pricing', label: 'Pricing' },
  { href: '#sign-in', label: 'Sign in' },
];

export default function VerticalSeparatorDemo() {
  return (
    <nav aria-label="Main navigation" className={styles.root}>
      {navigationItems.slice(0, 2).map((item) => (
        <a key={item.href} href={item.href} className={styles.link}>
          {item.label}
        </a>
      ))}
      <Separator orientation="vertical" />
      <a href={navigationItems[2].href} className={styles.link}>
        {navigationItems[2].label}
      </a>
    </nav>
  );
}