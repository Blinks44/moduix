//#region demo
import { Checkbox } from '@moduix/react';
import { useState } from 'react';

const _initialChecked = true;

export function ControlledCheckboxDemo() {
  const [checked, setChecked] = useState(true);

  return (
    <Checkbox checked={checked} onCheckedChange={(details) => setChecked(details.checked === true)}>
      <Checkbox.Control />
      <Checkbox.Label>{checked ? 'Enabled' : 'Disabled'}</Checkbox.Label>
      <Checkbox.HiddenInput />
    </Checkbox>
  );
}
//#endregion