import { RadioGroup } from '@moduix/solid/radio-group';
import styles from '@/components/examples/radio-group/radio-group-indicator.module.css';

const frameworks = ['React', 'Solid', 'Vue'];

export default function RadioGroupIndicatorDemo() {
  return (
    <div class={styles.stack}>
      <div>Framework</div>
      <RadioGroup aria-label="Framework" defaultValue="React" class={styles.root}>
        <RadioGroup.Indicator class={styles.indicator} />
        {frameworks.map((framework) => (
          <RadioGroup.Option value={framework}>{framework}</RadioGroup.Option>
        ))}
      </RadioGroup>
    </div>
  );
}