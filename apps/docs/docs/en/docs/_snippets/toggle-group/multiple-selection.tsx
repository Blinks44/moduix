import { ToggleGroup } from '@moduix/react';
import styles from '@/components/examples/toggle-group.module.css';

export default function MultipleToggleGroupDemo() {
  return (
    <ToggleGroup multiple defaultValue={['bold', 'italic']} aria-label="Text formatting" size="md">
      <ToggleGroup.Item value="bold" aria-label="Bold">
        <strong>B</strong>
      </ToggleGroup.Item>
      <ToggleGroup.Item value="italic" aria-label="Italic">
        <em>I</em>
      </ToggleGroup.Item>
      <ToggleGroup.Item value="underline" aria-label="Underline">
        <span className={styles.underline}>U</span>
      </ToggleGroup.Item>
    </ToggleGroup>
  );
}