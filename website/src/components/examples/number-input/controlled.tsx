import { NumberInput } from '@moduix/react/number-input';
import { useState } from 'react';
import { PreviewMeta } from '@/components/mdx/Components';
import styles from '@/components/examples/number-input/number-input-controlled.module.css';

export default function ControlledNumberInputDemo() {
  const [value, setValue] = useState('24');
  return (
    <div className={styles.root}>
      <NumberInput value={value} onValueChange={(details) => setValue(details.value)}>
        <NumberInput.Label>Controlled value</NumberInput.Label>
        <NumberInput.Field />
      </NumberInput>
      <PreviewMeta>
        <output>Current value: {value || 'empty'}</output>
      </PreviewMeta>
    </div>
  );
}