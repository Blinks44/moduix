import { RadioGroup, RadioGroupLabel, RadioGroupOption } from '@moduix/react/radio-group';

export default function RadioGroupSizesDemo() {
  return (
    <RadioGroup defaultValue="md">
      <RadioGroupLabel>Control Size</RadioGroupLabel>
      {(['xs', 'sm', 'md', 'lg', 'xl'] as const).map((size) => (
        <RadioGroupOption key={size} value={size} size={size}>
          {size.toUpperCase()}
        </RadioGroupOption>
      ))}
    </RadioGroup>
  );
}