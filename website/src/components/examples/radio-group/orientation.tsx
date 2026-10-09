import { RadioGroup, RadioGroupLabel, RadioGroupOption } from '@moduix/react/radio-group';
import styles from '@/components/examples/radio-group/radio-group-orientation.module.css';

const frameworks = ['React', 'Solid', 'Vue'];

export default function RadioGroupOrientationDemo() {
  return (
    <RadioGroup orientation="horizontal" defaultValue="React">
      <RadioGroupLabel>Framework</RadioGroupLabel>
      <div className={styles.items}>
        {frameworks.map((framework) => (
          <RadioGroupOption key={framework} value={framework}>
            {framework}
          </RadioGroupOption>
        ))}
      </div>
    </RadioGroup>
  );
}