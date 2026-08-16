import { RadioGroup } from '@moduix/react/radio-group';

const frameworks = ['React', 'Solid', 'Vue'];

export default function RadioGroupAdvancedCustomizationDemo() {
  return (
    <RadioGroup defaultValue="React">
      <RadioGroup.Label>Framework</RadioGroup.Label>
      {frameworks.map((framework) => (
        <RadioGroup.Item key={framework} value={framework}>
          <RadioGroup.ItemControl />
          <RadioGroup.ItemText>{framework}</RadioGroup.ItemText>
        </RadioGroup.Item>
      ))}
    </RadioGroup>
  );
}