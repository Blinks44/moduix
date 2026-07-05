//#region demo
import { Checkbox } from '@moduix/react';

export function CheckboxDemo() {
  return (
    <Checkbox>
      <Checkbox.Control>
        <Checkbox.Indicator />
      </Checkbox.Control>
      <Checkbox.Label>Enable notifications</Checkbox.Label>
      <Checkbox.HiddenInput />
    </Checkbox>
  );
}
//#endregion