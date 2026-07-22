import { Checkbox } from '@moduix/react';

export default function CheckboxDefaultCheckedDemo() {
  return (
    <Checkbox defaultChecked>
      <Checkbox.Control />
      <Checkbox.Label>Enable notifications</Checkbox.Label>
    </Checkbox>
  );
}