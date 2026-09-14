import { Checkbox } from '@moduix/solid/checkbox';

export default function CheckboxDefaultCheckedDemo() {
  return (
    <Checkbox defaultChecked>
      <Checkbox.Control />
      <Checkbox.Label>Enable notifications</Checkbox.Label>
      <Checkbox.HiddenInput />
    </Checkbox>
  );
}