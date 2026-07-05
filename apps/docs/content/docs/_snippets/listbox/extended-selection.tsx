/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { createListCollection } from '@ark-ui/react/collection';
import { Listbox } from '@moduix/react';

const frameworks = createListCollection({
  items: [
    {
      label: 'React',
      value: 'react',
    },
    {
      label: 'Vue',
      value: 'vue',
    },
    {
      label: 'Angular',
      value: 'angular',
    },
    {
      label: 'Svelte',
      value: 'svelte',
    },
    {
      label: 'Solid',
      value: 'solid',
    },
    {
      label: 'Preact',
      value: 'preact',
    },
  ],
});

export function ExtendedListboxDemo() {
  return (
    <Listbox collection={frameworks} selectionMode="extended">
      <Listbox.Label>Hold Cmd or Ctrl to select multiple</Listbox.Label>
      <Listbox.Content>
        {frameworks.items.map((item) => (
          <Listbox.Item key={item.value} item={item}>
            <Listbox.ItemText>{item.label}</Listbox.ItemText>
            <Listbox.ItemIndicator />
          </Listbox.Item>
        ))}
      </Listbox.Content>
    </Listbox>
  );
}

//#endregion