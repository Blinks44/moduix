/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { RadioGroup } from '@moduix/react';

export function RadioGroupSizesDemo() {
  return (
    <RadioGroup defaultValue="md">
      <RadioGroup.Label>Control Size</RadioGroup.Label>
      {['xs', 'sm', 'md', 'lg', 'xl'].map((size) => (
        <RadioGroup.Item key={size} value={size}>
          <RadioGroup.ItemControl size={size} />
          <RadioGroup.ItemText>{size.toUpperCase()}</RadioGroup.ItemText>
          <RadioGroup.ItemHiddenInput />
        </RadioGroup.Item>
      ))}
    </RadioGroup>
  );
}

//#endregion