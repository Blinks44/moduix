import { Checkbox } from '@moduix/react';

export default function CheckboxDemo() {
  return (
    <Checkbox>
      <Checkbox.Control />
      <Checkbox.Label>Enable notifications</Checkbox.Label>
    </Checkbox>
  );
}