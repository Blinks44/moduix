import { Checkbox } from '@moduix/react';

export default function CheckboxReadOnlyDemo() {
  return (
    <Checkbox readOnly defaultChecked>
      <Checkbox.Control />
      <Checkbox.Label>Preserve existing setting</Checkbox.Label>
    </Checkbox>
  );
}