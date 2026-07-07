//#region demo
import { Checkbox } from '@moduix/react';

const _checked = 'indeterminate';

export function CheckboxIndeterminateDemo() {
  return (
    <Checkbox checked="indeterminate">
      <Checkbox.Control />
      <Checkbox.Label>Select all team members</Checkbox.Label>
      <Checkbox.HiddenInput />
    </Checkbox>
  );
}
//#endregion