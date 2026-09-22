import { RadioGroup, RadioGroupLabel, RadioGroupOption } from '@moduix/react/radio-group';
import { useState } from 'react';
import { PreviewMeta } from '@/components/mdx/Components';
import styles from '@/components/examples/radio-group/radio-group-controlled.module.css';

const frameworks = ['React', 'Solid', 'Vue'];

export default function ControlledRadioGroupDemo() {
  const [value, setValue] = useState(null as string | null);
  return (
    <div className={styles.stack}>
      <RadioGroup value={value} onValueChange={(details) => setValue(details.value)}>
        <RadioGroupLabel>Framework</RadioGroupLabel>
        {frameworks.map((framework) => (
          <RadioGroupOption key={framework} value={framework}>
            {framework}
          </RadioGroupOption>
        ))}
      </RadioGroup>
      <PreviewMeta>
        <output>Selected: {value ?? 'none'}</output>
      </PreviewMeta>
    </div>
  );
}