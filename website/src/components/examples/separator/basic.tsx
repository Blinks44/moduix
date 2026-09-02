import { Separator } from '@moduix/react/separator';
import styles from '@/components/examples/separator/separator-basic.module.css';

const sections = ['Account settings', 'Billing details'];

export default function SeparatorDemo() {
  return (
    <div className={styles.root}>
      <div className={styles.stack}>
        <span>{sections[0]}</span>
        <Separator />
        <span>{sections[1]}</span>
      </div>
    </div>
  );
}