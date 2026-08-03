import { Checkbox } from '@moduix/react/checkbox';

export default function CheckboxDefaultCheckedDemo() {
  return (
    <Checkbox defaultChecked>
      <Checkbox.Control />
      <Checkbox.Label>Enable notifications</Checkbox.Label>
    </Checkbox>
  );
}