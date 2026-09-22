import {
  RadioGroup,
  RadioGroupItem,
  RadioGroupItemControl,
  RadioGroupItemHiddenInput,
  RadioGroupItemText,
  RadioGroupLabel,
} from '@moduix/solid/radio-group';

const frameworks = ['React', 'Solid', 'Vue'];

export default function RadioGroupAdvancedCustomizationDemo() {
  return (
    <RadioGroup defaultValue="React">
      <RadioGroupLabel>Framework</RadioGroupLabel>
      {frameworks.map((framework) => (
        <RadioGroupItem value={framework}>
          <RadioGroupItemControl />
          <RadioGroupItemText>{framework}</RadioGroupItemText>
          <RadioGroupItemHiddenInput />
        </RadioGroupItem>
      ))}
    </RadioGroup>
  );
}