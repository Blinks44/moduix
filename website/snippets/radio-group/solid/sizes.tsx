import { RadioGroup } from '@moduix/solid/radio-group';

export default function RadioGroupSizesDemo() {
  return (
    <RadioGroup defaultValue="md">
      <RadioGroup.Label>Control Size</RadioGroup.Label>
      {(['xs', 'sm', 'md', 'lg', 'xl'] as const).map((size) => (
        <RadioGroup.Option value={size} size={size}>
          {size.toUpperCase()}
        </RadioGroup.Option>
      ))}
    </RadioGroup>
  );
}