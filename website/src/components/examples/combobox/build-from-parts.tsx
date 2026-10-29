import { useListCollection } from '@ark-ui/react/collection';
import { useFilter } from '@ark-ui/react/locale';
import { CloseButton } from '@moduix/react/close-button';
import {
  Combobox,
  ComboboxClearTrigger,
  ComboboxContent,
  ComboboxControl,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxLabel,
  ComboboxList,
  ComboboxItem,
  ComboboxItemIndicator,
  ComboboxItemText,
  ComboboxPositioner,
  ComboboxTrigger,
} from '@moduix/react/combobox';
import { Check as CheckIcon, ChevronsUpDown as ChevronsUpDownIcon, X as XIcon } from 'lucide-react';

const fruits = [
  { label: 'Apple', value: 'apple' },
  { label: 'Banana', value: 'banana' },
  { label: 'Mango', value: 'mango' },
];

export default function BuildFromPartsComboboxDemo() {
  const { contains } = useFilter({ sensitivity: 'base' });
  const { collection, filter } = useListCollection({
    initialItems: fruits,
    filter: contains,
  });

  return (
    <Combobox collection={collection} onInputValueChange={(details) => filter(details.inputValue)}>
      <ComboboxLabel>Choose fruit</ComboboxLabel>
      <ComboboxControl>
        <ComboboxInput placeholder="e.g. Mango" />
        <ComboboxClearTrigger asChild aria-label="Clear selection">
          <CloseButton>
            <XIcon strokeWidth={3} />
          </CloseButton>
        </ComboboxClearTrigger>
        <ComboboxTrigger aria-label="Open options">
          <ChevronsUpDownIcon strokeWidth={3} />
        </ComboboxTrigger>
      </ComboboxControl>
      <ComboboxPositioner>
        <ComboboxContent>
          <ComboboxEmpty>No fruits found.</ComboboxEmpty>
          <ComboboxList>
            {collection.items.map((item) => (
              <ComboboxItem key={item.value} item={item}>
                <ComboboxItemText>{item.label}</ComboboxItemText>
                <ComboboxItemIndicator>
                  <CheckIcon strokeWidth={3} />
                </ComboboxItemIndicator>
              </ComboboxItem>
            ))}
          </ComboboxList>
        </ComboboxContent>
      </ComboboxPositioner>
    </Combobox>
  );
}