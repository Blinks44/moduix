import { Separator } from '@moduix/solid/separator';
import { Stack } from '@moduix/solid/stack';
import styles from '@/components/examples/separator/separator-basic.module.css';

const sections = ['Account settings', 'Billing details'];

export default function SeparatorBasicDemo() {
  return (
    <div class={styles.root}>
      <Stack gap="4">
        <span>{sections[0]}</span>
        <Separator />
        <span>{sections[1]}</span>
      </Stack>
    </div>
  );
}