import { NumberInput } from '@moduix/react/number-input';
import { useState } from 'react';
import { PreviewMeta } from '@/components/mdx/Components';
import styles from '@/components/examples/number-input/number-input-scrubbing.module.css';

export default function NumberInputScrubberDemo() {
  const [value, setValue] = useState('250');

  return (
    <div className={styles.root}>
      <NumberInput defaultValue="250" onValueChange={(details) => setValue(details.value)}>
        <NumberInput.Label>Adjust value</NumberInput.Label>
        <NumberInput.Scrubber>Drag left or right to adjust</NumberInput.Scrubber>
        <NumberInput.Field />
      </NumberInput>
      <PreviewMeta>
        <output>Value: {value}</output>
      </PreviewMeta>
    </div>
  );
}