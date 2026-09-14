import { Separator } from '@moduix/solid/separator';
import styles from '@/components/examples/separator/separator-basic.module.css';

const sections = ['Account settings', 'Billing details'];

export default function SeparatorBasicDemo() {
  return (
    <div class={styles.root}>
      <div class={styles.stack}>
        <span>{sections[0]}</span>
        <Separator />
        <span>{sections[1]}</span>
      </div>
    </div>
  );
}