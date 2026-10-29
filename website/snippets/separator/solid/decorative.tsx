import { Separator } from '@moduix/solid/separator';
import { Stack } from '@moduix/solid/stack';
import styles from '@/components/examples/separator/separator-decorative.module.css';

const sections = ['Personal details', 'Notifications'];

export default function DecorativeSeparatorDemo() {
  return (
    <div class={styles.root}>
      <Stack gap="4">
        <span>{sections[0]}</span>
        <Separator role="presentation" />
        <span>{sections[1]}</span>
      </Stack>
    </div>
  );
}