import { Separator } from '@moduix/react/separator';
import { Stack } from '@moduix/react/stack';
import styles from '@/components/examples/separator/separator-decorative.module.css';

const sections = ['Personal details', 'Notifications'];

export default function DecorativeSeparatorDemo() {
  return (
    <div className={styles.root}>
      <Stack gap="4">
        <span>{sections[0]}</span>
        <Separator role="presentation" />
        <span>{sections[1]}</span>
      </Stack>
    </div>
  );
}