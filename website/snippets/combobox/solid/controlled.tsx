import { useListCollection } from '@ark-ui/solid/collection';
import { useFilter } from '@ark-ui/solid/locale';
import {
  Combobox,
  ComboboxClearTrigger,
  ComboboxContent,
  ComboboxControl,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxLabel,
  ComboboxList,
  ComboboxOption,
  ComboboxPositioner,
  ComboboxTrigger,
} from '@moduix/solid/combobox';
import { Stack } from '@moduix/solid/stack';
import { createSignal, For } from 'solid-js';

const fruits = [
  { label: 'Apple', value: 'apple' },
  { label: 'Banana', value: 'banana' },
  { label: 'Mango', value: 'mango' },
  { label: 'Orange', value: 'orange' },
];

export default function ControlledComboboxDemo() {
  const { contains } = useFilter({ sensitivity: 'base' })();
  const { collection, filter } = useListCollection({
    initialItems: fruits,
    filter: contains,
  });
  const [value, setValue] = createSignal(['mango']);

  return (
    <Stack align="center" gap="3">
      <Combobox
        collection={collection()}
        value={value()}
        onInputValueChange={(details) => filter(details.inputValue)}
        onValueChange={(details) => setValue(details.value)}
      >
        <ComboboxLabel>Choose fruit</ComboboxLabel>
        <ComboboxControl>
          <ComboboxInput />
          <ComboboxClearTrigger aria-label="Clear selection" />
          <ComboboxTrigger aria-label="Open options" />
        </ComboboxControl>
        <ComboboxPositioner>
          <ComboboxContent>
            <ComboboxEmpty>No fruits found.</ComboboxEmpty>
            <ComboboxList>
              <For each={collection().items}>
                {(item) => <ComboboxOption item={item}>{item.label}</ComboboxOption>}
              </For>
            </ComboboxList>
          </ComboboxContent>
        </ComboboxPositioner>
      </Combobox>
      <output>Selected: {value()[0] ?? 'none'}</output>
    </Stack>
  );
}