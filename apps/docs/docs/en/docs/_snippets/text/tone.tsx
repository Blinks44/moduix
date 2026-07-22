import { Text } from '@moduix/react';
import styles from '@/components/examples/text.module.css';

export default function TextTonesDemo() {
  return (
    <div className={styles.stack}>
      <Text tone="default">Default tone</Text>
      <Text tone="muted">Muted tone</Text>
      <Text tone="subtle">Subtle tone</Text>
      <Text tone="primary">Primary tone</Text>
      <Text tone="destructive">Destructive tone</Text>
    </div>
  );
}