import { createListCollection } from '@ark-ui/react/collection';
import {
  Listbox,
  ListboxContent,
  ListboxItem,
  ListboxItemIndicator,
  ListboxItemText,
  ListboxLabel,
} from '@moduix/react/listbox';
import { Check as CheckIcon } from 'lucide-react';

const countries = createListCollection({
  items: [
    {
      label: 'United States',
      value: 'us',
    },
    {
      label: 'United Kingdom',
      value: 'uk',
    },
    {
      label: 'Canada',
      value: 'ca',
    },
    {
      label: 'Australia',
      value: 'au',
    },
    {
      label: 'Germany',
      value: 'de',
    },
    {
      label: 'France',
      value: 'fr',
    },
    {
      label: 'Japan',
      value: 'jp',
    },
  ],
});

export default function BuildFromPartsListboxDemo() {
  return (
    <Listbox collection={countries}>
      <ListboxLabel>Select country</ListboxLabel>
      <ListboxContent>
        {countries.items.map((item) => (
          <ListboxItem key={item.value} item={item}>
            <ListboxItemText>{item.label}</ListboxItemText>
            <ListboxItemIndicator>
              <CheckIcon strokeWidth={3} />
            </ListboxItemIndicator>
          </ListboxItem>
        ))}
      </ListboxContent>
    </Listbox>
  );
}