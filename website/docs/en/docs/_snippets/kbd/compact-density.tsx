import { Kbd } from '@moduix/react/kbd';
import styles from '@/components/examples/kbd/kbd-compact-density.module.css';

const keys = ['Esc', 'Ctrl', '/'];

export default function KbdDenseDemo() {
  return (
    <div className={styles.root}>
      {keys.map((key) => (
        <Kbd key={key} className={styles.dense}>
          {key}
        </Kbd>
      ))}
    </div>
  );
}