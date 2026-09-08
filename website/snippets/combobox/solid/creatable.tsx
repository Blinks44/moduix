import { useListCollection } from '@ark-ui/solid/collection';
import { useFilter } from '@ark-ui/solid/locale';
import { Combobox } from '@moduix/solid/combobox';
import { For, createSignal } from 'solid-js';
import styles from '@/components/examples/combobox/component-creatable.module.css';

const createOptionValue = '__create-option__';

const issueLabels = [
  { label: 'Bug', value: 'bug' },
  { label: 'Feature', value: 'feature' },
  { label: 'Enhancement', value: 'enhancement' },
  { label: 'Documentation', value: 'documentation' },
] as Array<{
  label: string;
  value: string;
  created?: boolean;
}>;

export default function CreatableComboboxDemo() {
  const { contains } = useFilter({ sensitivity: 'base' })();
  const { collection, filter, remove, update, upsert } = useListCollection({
    initialItems: issueLabels,
    filter: contains,
  });
  const [inputValue, setInputValue] = createSignal('');
  const [value, setValue] = createSignal<string[]>([]);

  return (
    <Combobox
      collection={collection()}
      inputValue={inputValue()}
      value={value()}
      allowCustomValue
      onInputValueChange={(details) => {
        const nextInputValue = details.inputValue;

        if (details.reason === 'input-change' || details.reason === 'item-select') {
          const hasExactMatch = collection().items.some(
            (item) => item.label.toLowerCase() === nextInputValue.toLowerCase(),
          );

          if (nextInputValue.trim() && !hasExactMatch) {
            upsert(createOptionValue, {
              label: nextInputValue,
              value: createOptionValue,
            });
          } else {
            remove(createOptionValue);
          }
          filter(nextInputValue);
        }

        setInputValue(nextInputValue);
      }}
      onOpenChange={(details) => {
        if (details.reason === 'trigger-click') {
          filter('');
        }
      }}
      onValueChange={(details) => {
        setValue(details.value.map((item) => (item === createOptionValue ? inputValue() : item)));

        if (details.value.includes(createOptionValue)) {
          update(createOptionValue, {
            label: inputValue(),
            value: inputValue(),
            created: true,
          });
        }
      }}
    >
      <Combobox.Label>Issue label</Combobox.Label>
      <Combobox.Control>
        <Combobox.Input placeholder="e.g. Accessibility" />
        <Combobox.ClearTrigger aria-label="Clear selection" />
        <Combobox.Trigger aria-label="Open options" />
      </Combobox.Control>
      <Combobox.Positioner>
        <Combobox.Content class={styles.content}>
          <Combobox.List>
            <For each={collection().items}>
              {(item) => (
                <Combobox.Item item={item}>
                  <Combobox.ItemText>
                    {item.value === createOptionValue
                      ? `Create "${item.label}"`
                      : `${item.label}${item.created ? ' (new)' : ''}`}
                  </Combobox.ItemText>
                  <Combobox.ItemIndicator />
                </Combobox.Item>
              )}
            </For>
          </Combobox.List>
        </Combobox.Content>
      </Combobox.Positioner>
    </Combobox>
  );
}