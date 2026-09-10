import { RadioGroup } from '@moduix/solid/radio-group';
import styles from '@/components/examples/radio-group/radio-group-orientation.module.css';

const frameworks = ['React', 'Solid', 'Vue'];

export default function RadioGroupOrientationDemo() {
  return (
    <RadioGroup orientation="horizontal" defaultValue="React">
      <RadioGroup.Label>Framework</RadioGroup.Label>
      <div class={styles.items}>
        {frameworks.map((framework) => (
          <RadioGroup.Option value={framework}>{framework}</RadioGroup.Option>
        ))}
      </div>
    </RadioGroup>
  );
}