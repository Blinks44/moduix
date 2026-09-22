import { createListCollection } from '@ark-ui/solid/collection';
import { Button } from '@moduix/solid/button';
import {
  useSelect,
  SelectRootProvider,
  SelectLabel,
  SelectControl,
  SelectTrigger,
  SelectValueText,
  SelectIndicator,
  SelectClearTrigger,
  SelectPositioner,
  SelectContent,
  SelectItem,
  SelectItemText,
  SelectItemIndicator,
} from '@moduix/solid/select';
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
  const select = useSelect({
    collection: fruits,
    defaultValue: ['banana'],
  });

  return (
    <div class={styles.root}>
      <SelectRootProvider value={select}>
        <SelectLabel>Choose fruit</SelectLabel>
        <SelectControl>
          <SelectTrigger>
            <SelectValueText placeholder="Select an option" />
          </SelectTrigger>
          <SelectIndicator />
          <SelectClearTrigger aria-label="Clear selection" />
        </SelectControl>
        <SelectPositioner>
          <SelectContent>
            <For each={fruits.items}>
              {(item) => (
                <SelectItem item={item}>
                  <SelectItemText>{item.label}</SelectItemText>
                  <SelectItemIndicator />
                </SelectItem>
              )}
            </For>
          </SelectContent>
        </SelectPositioner>
      </SelectRootProvider>
      <div>
        <output>Selected: {select().valueAsString || 'none'}</output>
        <Button type="button" size="sm" onClick={() => select().setValue(['banana'])}>
          Select banana
        </Button>
      </div>
    </div>
  );
}
