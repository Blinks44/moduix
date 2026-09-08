import { Checkbox } from '@moduix/solid/checkbox';

export default function CheckboxSizesDemo() {
  return (
    <Checkbox size="lg" defaultChecked>
      <Checkbox.Control />
      <Checkbox.Label>Large</Checkbox.Label>
      <Checkbox.HiddenInput />
    </Checkbox>
  );
}