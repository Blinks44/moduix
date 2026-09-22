import { createListCollection } from '@ark-ui/solid/collection';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '@moduix/solid/input-group';
import {
  Select,
  SelectLabel,
  SelectField,
  SelectPositioner,
  SelectContent,
  SelectItem,
  SelectItemText,
  SelectItemIndicator,
} from '@moduix/solid/select';
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
      <SelectLabel>Choose fruit</SelectLabel>
      <SelectField placeholder="Search or select a fruit" clearLabel="Clear selection" />
      <SelectPositioner>
        <div ref={(element) => (popupRef = element)} class={styles.popup}>
          <div class={styles.popupHeader}>
            <InputGroup>
              <InputGroupAddon>
                <SearchIcon aria-hidden />
              </InputGroupAddon>
              <InputGroupInput
                aria-label="Filter fruits"
                ref={(element) => (inputRef = element)}
                value={query()}
                onInput={(event) => setQuery(event.currentTarget.value)}
                placeholder="Filter fruits"
              />
            </InputGroup>
          </div>
          <SelectContent class={styles.popupContent}>
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
                  <SelectItem item={item}>
                    <SelectItemText>{item.label}</SelectItemText>
                    <SelectItemIndicator />
                  </SelectItem>
                )}
              </For>
            </Show>
          </SelectContent>
        </div>
      </SelectPositioner>
    </Select>
  );
}
