import { NumberInput, NumberInputField, NumberInputLabel, NumberInputScrubber } from '@moduix/react/number-input';
import { useState } from 'react';
import { PreviewMeta } from '@/components/mdx/Components';
import styles from '@/components/examples/number-input/number-input-scrubbing.module.css';

export default function NumberInputScrubberDemo() {
  const [value, setValue] = useState('250');

  return (
    <div className={styles.root}>
      <NumberInput defaultValue="250" onValueChange={(details) => setValue(details.value)}>
        <NumberInputLabel>Adjust value</NumberInputLabel>
        <NumberInputScrubber>Drag left or right to adjust</NumberInputScrubber>
        <NumberInputField />
      </NumberInput>
      <PreviewMeta>
        <output>Value: {value}</output>
      </PreviewMeta>
    </div>
  );
}
