import { createListCollection } from '@ark-ui/react/collection';
import { Button, Select } from '@moduix/react';
import { PreviewMeta } from '@/components/mdx/Components';

const fruits = createListCollection({
  items: [
    {
      label: 'Apple',
      value: 'apple',
    },
    {
      label: 'Banana',
      value: 'banana',
    },
    {
      label: 'Blueberry',
      value: 'blueberry',
    },
    {
      label: 'Grape',
      value: 'grape',
    },
    {
      label: 'Kiwi',
      value: 'kiwi',
    },
    {
      label: 'Mango',
      value: 'mango',
    },
    {
      label: 'Orange',
      value: 'orange',
    },
    {
      label: 'Pineapple',
      value: 'pineapple',
    },
    {
      label: 'Strawberry',
      value: 'strawberry',
    },
    {
      label: 'Watermelon',
      value: 'watermelon',
    },
  ],
});

export default function SelectRootProviderDemo() {
  const select = Select.useSelect({
    collection: fruits,
    defaultValue: ['banana'],
  });
  return (
    <div className="select-preview-stack">
      <Select.RootProvider value={select}>
        <Select.Label>Choose fruit</Select.Label>
        <Select.Control>
          <Select.Trigger>
            <Select.ValueText placeholder="Select an option" />
            <Select.Indicator />
          </Select.Trigger>
          <Select.ClearTrigger aria-label="Clear selection" />
        </Select.Control>
        <Select.Positioner>
          <Select.Content>
            {fruits.items.map((item) => (
              <Select.Item key={item.value} item={item}>
                <Select.ItemText>{item.label}</Select.ItemText>
                <Select.ItemIndicator />
              </Select.Item>
            ))}
          </Select.Content>
        </Select.Positioner>
      </Select.RootProvider>
      <PreviewMeta>
        <output>Selected: {select.valueAsString || 'none'}</output>
        <Button type="button" size="sm" onClick={() => select.setValue(['banana'])}>
          Select banana
        </Button>
      </PreviewMeta>
    </div>
  );
}