import { Editable } from '@moduix/solid/editable';
import { Show } from 'solid-js';

export default function AdvancedEditableCustomizationDemo() {
  return (
    <Editable defaultValue="Service area">
      <Editable.Label>Name</Editable.Label>
      <Editable.Area>
        <Editable.Input />
        <Editable.Preview />
      </Editable.Area>
      <Editable.Context>
        {(editable) => (
          <Show
            when={editable().editing}
            fallback={
              <Editable.Control>
                <Editable.EditTrigger />
              </Editable.Control>
            }
          >
            <span>Enter to save, Esc to cancel.</span>
          </Show>
        )}
      </Editable.Context>
    </Editable>
  );
}