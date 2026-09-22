import {
  RadioGroup,
  RadioGroupLabel,
  RadioGroupOption,
} from '@moduix/solid/radio-group';
import { createSignal } from 'solid-js';
import styles from '@/components/examples/radio-group/radio-group-controlled.module.css';

const frameworks = ['React', 'Solid', 'Vue'];

export default function ControlledRadioGroupDemo() {
  const [value, setValue] = createSignal<string | null>(null);

  return (
    <div class={styles.stack}>
      <RadioGroup value={value()} onValueChange={(details) => setValue(details.value)}>
        <RadioGroupLabel>Framework</RadioGroupLabel>
        {frameworks.map((framework) => (
          <RadioGroupOption value={framework}>{framework}</RadioGroupOption>
        ))}
      </RadioGroup>
      <output>Selected: {value() ?? 'none'}</output>
    </div>
  );
}
