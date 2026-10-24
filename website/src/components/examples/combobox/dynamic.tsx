import { useListCollection } from '@ark-ui/react/collection';
import {
  Combobox,
  ComboboxContent,
  ComboboxControl,
  ComboboxInput,
  ComboboxLabel,
  ComboboxList,
  ComboboxOption,
  ComboboxPositioner,
  ComboboxTrigger,
} from '@moduix/react/combobox';

const domains = ['gmail.com', 'outlook.com', 'proton.me'];

export default function DynamicComboboxDemo() {
  const { collection, set } = useListCollection({
    initialItems: [] as string[],
  });

  return (
    <Combobox
      collection={collection}
      onInputValueChange={(details) => {
        if (details.reason !== 'input-change') {
          return;
        }

        const name = details.inputValue.trim();
        set(name ? domains.map((domain) => `${name}@${domain}`) : []);
      }}
    >
      <ComboboxLabel>Email</ComboboxLabel>
      <ComboboxControl>
        <ComboboxInput placeholder="e.g. alex" />
        <ComboboxTrigger aria-label="Open options" />
      </ComboboxControl>
      <ComboboxPositioner>
        <ComboboxContent>
          <ComboboxList>
            {collection.items.map((item) => (
              <ComboboxOption key={item} item={item}>
                {item}
              </ComboboxOption>
            ))}
          </ComboboxList>
        </ComboboxContent>
      </ComboboxPositioner>
    </Combobox>
  );
}