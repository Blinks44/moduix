//#region demo
import { Checkbox } from '@moduix/react';

const _labels = {
  basic: 'Enable notifications',
  disabled: 'Receive weekly summary',
  readOnly: 'Keep current selection',
};

export function CheckboxDisabledDemo() {
  return (
    <Checkbox disabled>
      <Checkbox.Control>
        <Checkbox.Indicator />
      </Checkbox.Control>
      <Checkbox.Label>Receive weekly summary</Checkbox.Label>
      <Checkbox.HiddenInput />
    </Checkbox>
  );
}
//#endregion