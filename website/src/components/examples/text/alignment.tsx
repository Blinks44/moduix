import { Text } from '@moduix/react/text';
import styles from '@/components/examples/text/text-alignment.module.css';

export default function TextAlignDemo() {
  return (
    <div className={styles.stack}>
      <Text align="start">Start-aligned text.</Text>
      <Text align="center">Center aligned text.</Text>
      <Text align="end">End-aligned text.</Text>
    </div>
  );
}