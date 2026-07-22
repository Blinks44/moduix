import { useListCollection } from '@ark-ui/react/collection';
import { Combobox } from '@moduix/react';

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
      <Combobox.Label>Email</Combobox.Label>
      <Combobox.Control>
        <Combobox.Input placeholder="e.g. alex" />
        <Combobox.Trigger aria-label="Open options" />
      </Combobox.Control>
      <Combobox.Positioner>
        <Combobox.Content>
          <Combobox.List>
            {collection.items.map((item) => (
              <Combobox.Option key={item} item={item}>
                {item}
              </Combobox.Option>
            ))}
          </Combobox.List>
        </Combobox.Content>
      </Combobox.Positioner>
    </Combobox>
  );
}