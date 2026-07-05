/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { createListCollection } from '@ark-ui/react/collection';
import { Listbox } from '@moduix/react';
import { useState } from 'react';

const sizes = createListCollection({
  items: [
    {
      label: 'Small',
      value: 'sm',
    },
    {
      label: 'Medium',
      value: 'md',
    },
    {
      label: 'Large',
      value: 'lg',
    },
    {
      label: 'Extra Large',
      value: 'xl',
    },
  ],
});

export function ControlledListboxDemo() {
  const [value, setValue] = useState(['md']);
  return (
    <Listbox collection={sizes} value={value} onValueChange={(details) => setValue(details.value)}>
      <Listbox.Label>Select size</Listbox.Label>
      <Listbox.Content>
        {sizes.items.map((item) => (
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