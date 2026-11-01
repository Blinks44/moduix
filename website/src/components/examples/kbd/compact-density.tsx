import { Kbd } from '@moduix/react/kbd';
import { Stack } from '@moduix/react/stack';
import styles from '@/components/examples/kbd/kbd-compact-density.module.css';

const keys = ['Esc', 'Ctrl', '/'];

export default function KbdDenseDemo() {
  return (
    <Stack direction="row" align="center" wrap="wrap" gap="2">
      {keys.map((key) => (
        <Kbd key={key} className={styles.dense}>
          {key}
        </Kbd>
      ))}
    </Stack>
  );
}