import { useListCollection } from '@ark-ui/react/collection';
import { useFilter } from '@ark-ui/react/locale';
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
} from '@moduix/react/combobox';

const fruits = [
  { label: 'Apple', value: 'apple' },
  { label: 'Banana', value: 'banana' },
  { label: 'Mango', value: 'mango' },
];

// Anatomy scene: the basic example kept open and inline so every part can be outlined.
export default function ComboboxAnatomy() {
  const { contains } = useFilter({ sensitivity: 'base' });
  const { collection, filter } = useListCollection({
    initialItems: fruits,
    filter: contains,
  });

  return (
    <div
      style={{
        minHeight: 380,
        width: '100%',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
      }}
    >
      <Combobox
        open
        portalled={false}
        collection={collection}
        onInputValueChange={(details) => filter(details.inputValue)}
      >
        <ComboboxLabel>Choose fruit</ComboboxLabel>
        <ComboboxControl>
          <ComboboxInput placeholder="e.g. Mango" />
          <ComboboxClearTrigger aria-label="Clear selection" />
          <ComboboxTrigger aria-label="Open options" />
        </ComboboxControl>
        <ComboboxPositioner>
          <ComboboxContent>
            <ComboboxEmpty>No fruits found.</ComboboxEmpty>
            <ComboboxList>
              {collection.items.map((item) => (
                <ComboboxOption key={item.value} item={item}>
                  {item.label}
                </ComboboxOption>
              ))}
            </ComboboxList>
          </ComboboxContent>
        </ComboboxPositioner>
      </Combobox>
    </div>
  );
}