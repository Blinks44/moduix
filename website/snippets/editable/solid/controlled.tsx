import { Editable } from '@moduix/solid/editable';
import { createSignal } from 'solid-js';

export default function ControlledEditableDemo() {
  const [value, setValue] = createSignal('Downtown route');

  return (
    <Editable value={value()} onValueChange={(details) => setValue(details.value)}>
      <Editable.Label>Controlled value</Editable.Label>
      <Editable.Area>
        <Editable.Input />
        <Editable.Preview />
      </Editable.Area>
      <Editable.Controls />
    </Editable>
  );
}