import { Separator } from '@moduix/react/separator';
import styles from '@/components/examples/separator/separator-decorative.module.css';

const sections = ['Personal details', 'Notifications'];

export default function DecorativeSeparatorDemo() {
  return (
    <div className={styles.root}>
      <div className={styles.stack}>
        <span>{sections[0]}</span>
        <Separator role="presentation" />
        <span>{sections[1]}</span>
      </div>
    </div>
  );
}