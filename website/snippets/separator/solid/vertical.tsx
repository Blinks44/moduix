import { Separator } from '@moduix/solid/separator';
import styles from '@/components/examples/separator/separator-vertical.module.css';

const navigationItems = ['Home', 'Pricing', 'Sign in'];

export default function VerticalSeparatorDemo() {
  return (
    <nav aria-label="Main navigation" class={styles.root}>
      {navigationItems.slice(0, 2).map((item) => (
        <a href="#" class={styles.link}>
          {item}
        </a>
      ))}
      <Separator orientation="vertical" />
      <a href="#" class={styles.link}>
        {navigationItems[2]}
      </a>
    </nav>
  );
}