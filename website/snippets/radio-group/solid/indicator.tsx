import { RadioGroup, RadioGroupIndicator, RadioGroupOption } from '@moduix/solid/radio-group';
import { Stack } from '@moduix/solid/stack';
import styles from '@/components/examples/radio-group/radio-group-indicator.module.css';

const frameworks = ['React', 'Solid', 'Vue'];

export default function RadioGroupIndicatorDemo() {
  return (
    <Stack gap="2">
      <div>Framework</div>
      <RadioGroup aria-label="Framework" defaultValue="React" class={styles.root}>
        <RadioGroupIndicator />
        {frameworks.map((framework) => (
          <RadioGroupOption value={framework}>{framework}</RadioGroupOption>
        ))}
      </RadioGroup>
    </Stack>
  );
}