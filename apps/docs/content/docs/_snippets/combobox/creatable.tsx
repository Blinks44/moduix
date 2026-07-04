//#region demo
import { useListCollection } from '@ark-ui/react/collection';
import { useFilter } from '@ark-ui/react/locale';
import { Combobox } from '@moduix/react';
import { useState } from 'react';
import { flushSync } from 'react-dom';

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

export function CreatableComboboxDemo() {
  const { contains } = useFilter({ sensitivity: 'base' });
  const { collection, filter, remove, update, upsert } = useListCollection({
    initialItems: issueLabels,
    filter: contains,
  });
  const [inputValue, setInputValue] = useState('');
  const [value, setValue] = useState([] as string[]);

  return (
    <Combobox
      collection={collection}
      inputValue={inputValue}
      value={value}
      allowCustomValue
      onInputValueChange={(details) => {
        const nextInputValue = details.inputValue;

        if (details.reason === 'input-change' || details.reason === 'item-select') {
          const hasExactMatch = collection.items.some(
            (item) => item.label.toLowerCase() === nextInputValue.toLowerCase(),
          );

          flushSync(() => {
            if (nextInputValue.trim() && !hasExactMatch) {
              upsert(createOptionValue, {
                label: nextInputValue,
                value: createOptionValue,
              });
            } else {
              remove(createOptionValue);
            }
          });
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
        setValue(details.value.map((item) => (item === createOptionValue ? inputValue : item)));

        if (details.value.includes(createOptionValue)) {
          update(createOptionValue, {
            label: inputValue,
            value: inputValue,
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
        <Combobox.Content>
          <Combobox.List>
            {collection.items.map((item) => (
              <Combobox.Item key={item.value} item={item}>
                <Combobox.ItemText>
                  {item.value === createOptionValue
                    ? `Create "${item.label}"`
                    : `${item.label}${item.created ? ' (new)' : ''}`}
                </Combobox.ItemText>
                <Combobox.ItemIndicator />
              </Combobox.Item>
            ))}
          </Combobox.List>
        </Combobox.Content>
      </Combobox.Positioner>
    </Combobox>
  );
}
//#endregion