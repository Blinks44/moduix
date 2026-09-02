import { Separator } from '@moduix/react/separator';
import styles from '@/components/examples/separator/separator-vertical.module.css';

const navigationItems = ['Home', 'Pricing', 'Sign in'];

export default function VerticalSeparatorDemo() {
  return (
    <nav aria-label="Main navigation" className={styles.root}>
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