import { Text } from '@moduix/react';
import styles from '@/components/examples/text.module.css';

export default function TextTruncationDemo() {
  return (
    <div className={styles.narrow}>
      <Text truncate>Release notes for the weekly platform update are ready for review.</Text>
      <Text lineClamp={2}>
        Longer interface copy can be clamped when it appears inside dense cards, tables, or
        constrained previews where the surrounding layout owns disclosure.
      </Text>
    </div>
  );
}