import { RadioGroup } from '@moduix/solid/radio-group';
import { createSignal } from 'solid-js';
import styles from '@/components/examples/radio-group/radio-group-controlled.module.css';

const frameworks = ['React', 'Solid', 'Vue'];

export default function ControlledRadioGroupDemo() {
  const [value, setValue] = createSignal<string | null>(null);

  return (
    <div class={styles.stack}>
      <RadioGroup value={value()} onValueChange={(details) => setValue(details.value)}>
        <RadioGroup.Label>Framework</RadioGroup.Label>
        {frameworks.map((framework) => (
          <RadioGroup.Option value={framework}>{framework}</RadioGroup.Option>
        ))}
      </RadioGroup>
      <output>Selected: {value() ?? 'none'}</output>
    </div>
  );
}