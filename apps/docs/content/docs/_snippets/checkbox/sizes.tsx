//#region demo
import { Checkbox } from '@moduix/react';

const _size = 'lg';
const _defaultChecked = true;

export function CheckboxSizesDemo() {
  return (
    <Checkbox size="lg" defaultChecked>
      <Checkbox.Control>
        <Checkbox.Indicator />
      </Checkbox.Control>
      <Checkbox.Label>Large</Checkbox.Label>
      <Checkbox.HiddenInput />
    </Checkbox>
  );
}
//#endregion