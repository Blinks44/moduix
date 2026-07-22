import { Text } from '@moduix/react';
import styles from '@/components/examples/text.module.css';

export default function TextCustomElementDemo() {
  return (
    <Text asChild tone="primary" weight="medium">
      <a className={styles.link} href="/docs">
        Read the documentation
      </a>
    </Text>
  );
}