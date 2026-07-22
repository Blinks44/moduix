import { Text } from '@moduix/react';
import styles from '@/components/examples/text.module.css';

export default function TextAlignDemo() {
  return (
    <div className={styles.aligned}>
      <Text align="left">Left aligned text.</Text>
      <Text align="center">Center aligned text.</Text>
      <Text align="right">Right aligned text.</Text>
    </div>
  );
}