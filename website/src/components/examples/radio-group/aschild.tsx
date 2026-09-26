import {
  RadioGroup,
  RadioGroupItem,
  RadioGroupItemControl,
  RadioGroupItemHiddenInput,
  RadioGroupItemText,
  RadioGroupLabel,
} from '@moduix/react/radio-group';
import styles from '@/components/examples/radio-group/radio-group-aschild.module.css';

const frameworks = ['React', 'Solid', 'Vue'];

export default function RadioGroupAsChildDemo() {
  return (
    <RadioGroup defaultValue="React">
      <RadioGroupLabel>Framework</RadioGroupLabel>
      {frameworks.map((framework) => (
        <RadioGroupItem key={framework} value={framework} asChild>
          <label className={styles.cardItem}>
            <RadioGroupItemControl />
            <RadioGroupItemText>{framework}</RadioGroupItemText>
            <RadioGroupItemHiddenInput />
          </label>
        </RadioGroupItem>
      ))}
    </RadioGroup>
  );
}