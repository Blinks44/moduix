/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { createListCollection } from '@ark-ui/react/collection';
import { Select as ArkSelect } from '@ark-ui/react/select';
import { Select } from '@moduix/react';

const languages = createListCollection({
  items: [
    {
      label: 'C#',
      value: 'csharp',
    },
    {
      label: 'Go',
      value: 'go',
    },
    {
      label: 'JavaScript',
      value: 'javascript',
    },
    {
      label: 'Python',
      value: 'python',
    },
    {
      label: 'Rust',
      value: 'rust',
    },
    {
      label: 'TypeScript',
      value: 'typescript',
    },
  ],
});

export function SelectSelectAllDemo() {
  return (
    <Select collection={languages} multiple>
      <Select.Label>Languages</Select.Label>
      <Select.Control>
        <Select.Trigger>
          <Select.ValueText placeholder="Select languages" />
        </Select.Trigger>
        <Select.Indicators>
          <Select.ClearTrigger aria-label="Clear selection" />
          <Select.Indicator />
        </Select.Indicators>
      </Select.Control>
      <Select.Positioner>
        <Select.Content>
          <ArkSelect.Context>
            {(select) => (
              <button
                className="select-bulk-action"
                type="button"
                onClick={() => {
                  select.selectAll();
                  select.setOpen(false);
                }}
              >
                Select all
              </button>
            )}
          </ArkSelect.Context>
          {languages.items.map((item) => (
            <Select.Item key={item.value} item={item}>
              <Select.ItemText>{item.label}</Select.ItemText>
              <Select.ItemIndicator />
            </Select.Item>
          ))}
        </Select.Content>
      </Select.Positioner>
      <Select.HiddenSelect />
    </Select>
  );
}

//#endregion