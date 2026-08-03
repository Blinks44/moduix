import { Checkbox } from '@moduix/react/checkbox';

export default function CheckboxDemo() {
  return (
    <Checkbox>
      <Checkbox.Control />
      <Checkbox.Label>Enable notifications</Checkbox.Label>
    </Checkbox>
  );
}