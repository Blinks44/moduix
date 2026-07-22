import { Checkbox } from '@moduix/react';

export default function CheckboxIndeterminateDemo() {
  return (
    <Checkbox checked="indeterminate">
      <Checkbox.Control />
      <Checkbox.Label>Select all team members</Checkbox.Label>
    </Checkbox>
  );
}