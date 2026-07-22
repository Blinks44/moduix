import { Checkbox } from '@moduix/react';

export default function CheckboxSizesDemo() {
  return (
    <Checkbox size="lg" defaultChecked>
      <Checkbox.Control />
      <Checkbox.Label>Large</Checkbox.Label>
    </Checkbox>
  );
}