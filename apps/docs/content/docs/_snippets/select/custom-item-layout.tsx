/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { Select } from '@moduix/react';

const item = {
  label: 'Apple',
  value: 'apple',
};

export function SelectCustomItemLayoutDemo() {
  return (
    <Select.Item item={item}>
      <Select.ItemText>
        <Select.ItemTextContent>
          <Select.ItemTextIcon aria-hidden>i</Select.ItemTextIcon>
          <Select.ItemTextLabel>{item.label}</Select.ItemTextLabel>
        </Select.ItemTextContent>
      </Select.ItemText>
      <Select.ItemIndicator />
    </Select.Item>
  );
}

//#endregion