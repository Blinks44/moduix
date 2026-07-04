//#region demo
import { Checkbox } from '@moduix/react';

const _labels = {
  basic: 'Enable notifications',
  disabled: 'Receive weekly summary',
  readOnly: 'Keep current selection',
};

export function CheckboxReadOnlyDemo() {
  return (
    <Checkbox readOnly defaultChecked>
      <Checkbox.Control>
        <Checkbox.Indicator />
      </Checkbox.Control>
      <Checkbox.Label>Preserve existing setting</Checkbox.Label>
      <Checkbox.HiddenInput />
    </Checkbox>
  );
}
//#endregion