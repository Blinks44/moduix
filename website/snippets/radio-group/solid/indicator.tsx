import {
  RadioGroup,
  RadioGroupIndicator,
  RadioGroupOption,
} from '@moduix/solid/radio-group';
import styles from '@/components/examples/radio-group/radio-group-indicator.module.css';

const frameworks = ['React', 'Solid', 'Vue'];

export default function RadioGroupIndicatorDemo() {
  return (
    <div class={styles.stack}>
      <div>Framework</div>
      <RadioGroup aria-label="Framework" defaultValue="React" class={styles.root}>
        <RadioGroupIndicator class={styles.indicator} />
        {frameworks.map((framework) => (
          <RadioGroupOption value={framework}>{framework}</RadioGroupOption>
        ))}
      </RadioGroup>
    </div>
  );
}
