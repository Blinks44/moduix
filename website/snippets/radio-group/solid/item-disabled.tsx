import { RadioGroup, RadioGroupLabel, RadioGroupOption } from '@moduix/solid/radio-group';

export default function RadioGroupItemDisabledDemo() {
  return (
    <RadioGroup defaultValue="React">
      <RadioGroupLabel>Framework</RadioGroupLabel>
      <RadioGroupOption value="React">React</RadioGroupOption>
      <RadioGroupOption disabled value="Solid">
        Solid
      </RadioGroupOption>
      <RadioGroupOption value="Vue">Vue</RadioGroupOption>
    </RadioGroup>
  );
}