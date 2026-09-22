import {
  RadioGroup,
  RadioGroupIndicator,
  RadioGroupOption,
} from '@moduix/react/radio-group';
import styles from '@/components/examples/radio-group/radio-group-indicator.module.css';

const frameworks = ['React', 'Solid', 'Vue'];

export default function RadioGroupIndicatorDemo() {
  return (
    <div className={styles.stack}>
      <div>Framework</div>
      <RadioGroup aria-label="Framework" defaultValue="React" className={styles.root}>
        <RadioGroupIndicator className={styles.indicator} />
        {frameworks.map((framework) => (
          <RadioGroupOption key={framework} value={framework}>
            {framework}
          </RadioGroupOption>
        ))}
      </RadioGroup>
    </div>
  );
}
