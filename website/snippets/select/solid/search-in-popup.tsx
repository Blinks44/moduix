import { createListCollection } from '@ark-ui/solid/collection';
import { InputGroup } from '@moduix/solid/input-group';
import { Select } from '@moduix/solid/select';
import { Search as SearchIcon } from 'lucide-solid';
import { createEffect, createMemo, createSignal, For, Show } from 'solid-js';
import styles from '@/components/examples/select/select-search-in-popup.module.css';

const fruits = [
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
];

export default function SelectSearchInPopupDemo() {
  let inputRef: HTMLInputElement | undefined;
  let popupRef: HTMLDivElement | undefined;
  const [open, setOpen] = createSignal(false);
  const [query, setQuery] = createSignal('');
  const collection = createMemo(() =>
    createListCollection({
      items: fruits.filter((item) => item.label.toLowerCase().includes(query().toLowerCase())),
    }),
  );

  createEffect(() => {
    if (open()) inputRef?.focus();
  });

  return (
    <Select
      collection={collection()}
      open={open()}
      lazyMount
      unmountOnExit
      onOpenChange={(details) => {
        setOpen(details.open);
        if (!details.open) setQuery('');
      }}
      onFocusOutside={(event) => {
        const target = event.detail.target;
        if (target instanceof Node && popupRef?.contains(target)) event.preventDefault();
      }}
      onInteractOutside={(event) => {
        const target = event.detail.target;
        if (target instanceof Node && popupRef?.contains(target)) event.preventDefault();
      }}
    >
      <Select.Label>Choose fruit</Select.Label>
      <Select.Field placeholder="Search or select a fruit" clearLabel="Clear selection" />
      <Select.Positioner>
        <div ref={(element) => (popupRef = element)} class={styles.popup}>
          <div class={styles.popupHeader}>
            <InputGroup>
              <InputGroup.Addon>
                <SearchIcon aria-hidden />
              </InputGroup.Addon>
              <InputGroup.Input
                aria-label="Filter fruits"
                ref={(element) => (inputRef = element)}
                value={query()}
                onInput={(event) => setQuery(event.currentTarget.value)}
                placeholder="Filter fruits"
              />
            </InputGroup>
          </div>
          <Select.Content class={styles.popupContent}>
            <Show
              when={collection().items.length > 0}
              fallback={
                <div class={styles.popupEmpty} role="presentation">
                  No fruits found.
                </div>
              }
            >
              <For each={collection().items}>
                {(item) => (
                  <Select.Item item={item}>
                    <Select.ItemText>{item.label}</Select.ItemText>
                    <Select.ItemIndicator />
                  </Select.Item>
                )}
              </For>
            </Show>
          </Select.Content>
        </div>
      </Select.Positioner>
    </Select>
  );
}