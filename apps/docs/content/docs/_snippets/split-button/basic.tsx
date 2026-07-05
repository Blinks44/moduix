/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { Menu, SplitButton } from '@moduix/react';

const items = [
  {
    value: 'save-draft',
    label: 'Save as Draft',
  },
  {
    value: 'duplicate',
    label: 'Duplicate',
  },
  {
    value: 'publish',
    label: 'Publish Now',
  },
];

export function SplitButtonDemo() {
  return (
    <SplitButton>
      <SplitButton.Action>Save Changes</SplitButton.Action>
      <SplitButton.Trigger />
      <SplitButton.Positioner>
        <SplitButton.Content>
          {items.slice(0, 2).map((item) => (
            <Menu.Item key={item.value} value={item.value}>
              {item.label}
            </Menu.Item>
          ))}
          <Menu.Separator />
          <Menu.Item value={items[2].value}>{items[2].label}</Menu.Item>
        </SplitButton.Content>
      </SplitButton.Positioner>
    </SplitButton>
  );
}

//#endregion