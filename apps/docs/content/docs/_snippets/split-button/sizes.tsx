/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { Menu, SplitButton } from '@moduix/react';

const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const;

export function SplitButtonSizesDemo() {
  return (
    <div className="row">
      {sizes.map((size) => (
        <SplitButton key={size} size={size} variant="outline">
          <SplitButton.Action>{size}</SplitButton.Action>
          <SplitButton.Trigger />
          <SplitButton.Positioner>
            <SplitButton.Content>
              <Menu.Item value={`${size}-create`}>Create</Menu.Item>
              <Menu.Item value={`${size}-create-open`}>Create and Open</Menu.Item>
            </SplitButton.Content>
          </SplitButton.Positioner>
        </SplitButton>
      ))}
    </div>
  );
}

//#endregion