import { RadioGroup } from '@moduix/react';

export default function RadioGroupItemDisabledDemo() {
  return (
    <RadioGroup defaultValue="React">
      <RadioGroup.Label>Framework</RadioGroup.Label>
      <RadioGroup.Option value="React">React</RadioGroup.Option>
      <RadioGroup.Option disabled value="Solid">
        Solid
      </RadioGroup.Option>
      <RadioGroup.Option value="Vue">Vue</RadioGroup.Option>
    </RadioGroup>
  );
}