import { Separator } from '@moduix/react/separator';
import { Stack } from '@moduix/react/stack';
import styles from '@/components/examples/separator/separator-basic.module.css';

const sections = ['Account settings', 'Billing details'];

export default function SeparatorDemo() {
  return (
    <div className={styles.root}>
      <Stack gap="4">
        <span>{sections[0]}</span>
        <Separator />
        <span>{sections[1]}</span>
      </Stack>
    </div>
  );
}