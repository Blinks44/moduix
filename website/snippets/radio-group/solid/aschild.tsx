import {
  RadioGroup,
  RadioGroupItem,
  RadioGroupItemControl,
  RadioGroupItemHiddenInput,
  RadioGroupItemText,
  RadioGroupLabel,
} from '@moduix/solid/radio-group';
import styles from '@/components/examples/radio-group/radio-group-aschild.module.css';

const frameworks = ['React', 'Solid', 'Vue'];

export default function RadioGroupAsChildDemo() {
  return (
    <RadioGroup defaultValue="React">
      <RadioGroupLabel>Framework</RadioGroupLabel>
      {frameworks.map((framework) => (
        <RadioGroupItem
          value={framework}
          asChild={(props) => <label {...props()} class={styles.cardItem} />}
        >
          <RadioGroupItemControl />
          <RadioGroupItemText>{framework}</RadioGroupItemText>
          <RadioGroupItemHiddenInput />
        </RadioGroupItem>
      ))}
    </RadioGroup>
  );
}