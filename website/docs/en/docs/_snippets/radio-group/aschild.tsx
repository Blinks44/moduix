import { RadioGroup } from '@moduix/react/radio-group';
import styles from '@/components/examples/radio-group/radio-group-aschild.module.css';

const frameworks = ['React', 'Solid', 'Vue'];

export default function RadioGroupAsChildDemo() {
  return (
    <RadioGroup defaultValue="React">
      <RadioGroup.Label>Framework</RadioGroup.Label>
      {frameworks.map((framework) => (
        <RadioGroup.Item key={framework} value={framework} asChild>
          <label className={styles.cardItem}>
            <RadioGroup.ItemControl />
            <RadioGroup.ItemText>{framework}</RadioGroup.ItemText>
          </label>
        </RadioGroup.Item>
      ))}
    </RadioGroup>
  );
}