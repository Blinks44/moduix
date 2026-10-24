import { createListCollection } from '@ark-ui/react/collection';
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
} from '@moduix/react/combobox';

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
        <ComboboxContent>
          <ComboboxList>
            {collection.items.map((item) => (
              <ComboboxOption key={item.value} item={item}>
                {item.label}
              </ComboboxOption>
            ))}
          </ComboboxList>
        </ComboboxContent>
      </ComboboxPositioner>
    </ComboboxRootProvider>
  );
}