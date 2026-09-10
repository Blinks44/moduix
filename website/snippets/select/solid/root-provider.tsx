import { createListCollection } from '@ark-ui/solid/collection';
import { Button } from '@moduix/solid/button';
import { Select } from '@moduix/solid/select';
import { For } from 'solid-js';
import styles from '@/components/examples/select/select-root-provider.module.css';

const fruits = createListCollection({
  items: [
    { label: 'Apple', value: 'apple' },
    { label: 'Banana', value: 'banana' },
    { label: 'Blueberry', value: 'blueberry' },
    { label: 'Grape', value: 'grape' },
    { label: 'Kiwi', value: 'kiwi' },
    { label: 'Mango', value: 'mango' },
    { label: 'Orange', value: 'orange' },
    { label: 'Pineapple', value: 'pineapple' },
    { label: 'Strawberry', value: 'strawberry' },
    { label: 'Watermelon', value: 'watermelon' },
  ],
});

export default function SelectRootProviderDemo() {
  const select = Select.useSelect({
    collection: fruits,
    defaultValue: ['banana'],
  });

  return (
    <div class={styles.root}>
      <Select.RootProvider value={select}>
        <Select.Label>Choose fruit</Select.Label>
        <Select.Control>
          <Select.Trigger>
            <Select.ValueText placeholder="Select an option" />
          </Select.Trigger>
          <Select.Indicator />
          <Select.ClearTrigger aria-label="Clear selection" />
        </Select.Control>
        <Select.Positioner>
          <Select.Content>
            <For each={fruits.items}>
              {(item) => (
                <Select.Item item={item}>
                  <Select.ItemText>{item.label}</Select.ItemText>
                  <Select.ItemIndicator />
                </Select.Item>
              )}
            </For>
          </Select.Content>
        </Select.Positioner>
      </Select.RootProvider>
      <div>
        <output>Selected: {select().valueAsString || 'none'}</output>
        <Button type="button" size="sm" onClick={() => select().setValue(['banana'])}>
          Select banana
        </Button>
      </div>
    </div>
  );
}