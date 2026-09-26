import { createListCollection } from '@ark-ui/solid/collection';
import {
  useCombobox,
  ComboboxClearTrigger,
  ComboboxContent,
  ComboboxControl,
  ComboboxInput,
  ComboboxLabel,
  ComboboxList,
  ComboboxOption,
  ComboboxPositioner,
  ComboboxRootProvider,
  ComboboxTrigger,
} from '@moduix/solid/combobox';
import { For } from 'solid-js';
import styles from '@/components/examples/combobox/component-root-provider.module.css';

const jobTitles = [
  { label: 'Designer', value: 'designer' },
  { label: 'Developer', value: 'developer' },
  { label: 'Product Manager', value: 'product-manager' },
];

const collection = createListCollection({ items: jobTitles });

export default function RootProviderComboboxDemo() {
  const combobox = useCombobox({ collection });

  return (
    <ComboboxRootProvider value={combobox}>
      <ComboboxLabel>Job title</ComboboxLabel>
      <ComboboxControl>
        <ComboboxInput />
        <ComboboxClearTrigger aria-label="Clear selection" />
        <ComboboxTrigger aria-label="Open options" />
      </ComboboxControl>
      <ComboboxPositioner>
        <ComboboxContent class={styles.content}>
          <ComboboxList>
            <For each={collection.items}>
              {(item) => <ComboboxOption item={item}>{item.label}</ComboboxOption>}
            </For>
          </ComboboxList>
        </ComboboxContent>
      </ComboboxPositioner>
    </ComboboxRootProvider>
  );
}