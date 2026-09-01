import { RadioGroup } from '@moduix/react/radio-group';
import styles from '@/components/examples/radio-group/radio-group-indicator.module.css';

const frameworks = ['React', 'Solid', 'Vue'];

export default function RadioGroupIndicatorDemo() {
  return (
    <div className={styles.stack}>
      <div>Framework</div>
      <RadioGroup aria-label="Framework" defaultValue="React" className={styles.root}>
        <RadioGroup.Indicator className={styles.indicator} />
        {frameworks.map((framework) => (
          <RadioGroup.Option key={framework} value={framework}>
            {framework}
          </RadioGroup.Option>
        ))}
      </RadioGroup>
    </div>
  );
}