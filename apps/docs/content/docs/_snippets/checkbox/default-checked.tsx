//#region demo
import { Checkbox } from '@moduix/react';

const _labels = {
  basic: 'Enable notifications',
  disabled: 'Receive weekly summary',
  readOnly: 'Keep current selection',
};

export function CheckboxDefaultCheckedDemo() {
  return (
    <Checkbox defaultChecked>
      <Checkbox.Control />
      <Checkbox.Label>Enable notifications</Checkbox.Label>
      <Checkbox.HiddenInput />
    </Checkbox>
  );
}
//#endregion