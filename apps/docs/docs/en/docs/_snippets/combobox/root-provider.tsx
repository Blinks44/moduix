import { createListCollection } from '@ark-ui/react/collection';
import { Button, Combobox, useCombobox } from '@moduix/react';

const jobTitles = [
  { label: 'Designer', value: 'designer' },
  { label: 'Developer', value: 'developer' },
  { label: 'Product Manager', value: 'product-manager' },
];

const collection = createListCollection({ items: jobTitles });

export default function RootProviderComboboxDemo() {
  const combobox = useCombobox({ collection });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--moduix-spacing-3)' }}>
      <Combobox.RootProvider value={combobox}>
        <Combobox.Label>Job title</Combobox.Label>
        <Combobox.Control>
          <Combobox.Input />
          <Combobox.ClearTrigger aria-label="Clear selection" />
          <Combobox.Trigger aria-label="Open options" />
        </Combobox.Control>
        <Combobox.Positioner>
          <Combobox.Content>
            <Combobox.List>
              {collection.items.map((item) => (
                <Combobox.Option key={item.value} item={item}>
                  {item.label}
                </Combobox.Option>
              ))}
            </Combobox.List>
          </Combobox.Content>
        </Combobox.Positioner>
      </Combobox.RootProvider>
      <Button type="button" onClick={() => combobox.focus()}>
        Focus
      </Button>
    </div>
  );
}