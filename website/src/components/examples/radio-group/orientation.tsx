import { RadioGroup } from '@moduix/react/radio-group';
import styles from '@/components/examples/radio-group/radio-group-orientation.module.css';

const frameworks = ['React', 'Solid', 'Vue'];

export default function RadioGroupOrientationDemo() {
  return (
    <RadioGroup orientation="horizontal" defaultValue="React">
      <RadioGroup.Label>Framework</RadioGroup.Label>
      <div className={styles.items}>
        {frameworks.map((framework) => (
          <RadioGroup.Option key={framework} value={framework}>
            {framework}
          </RadioGroup.Option>
        ))}
      </div>
    </RadioGroup>
  );
}