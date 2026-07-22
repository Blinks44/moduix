import { Checkbox } from '@moduix/react';
import { useState } from 'react';

export default function ControlledCheckboxDemo() {
  const [checked, setChecked] = useState(true);

  return (
    <Checkbox checked={checked} onCheckedChange={(details) => setChecked(details.checked === true)}>
      <Checkbox.Control />
      <Checkbox.Label>{checked ? 'Enabled' : 'Disabled'}</Checkbox.Label>
    </Checkbox>
  );
}