/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { RadioGroup } from '@moduix/react';

export function RadioGroupSizesDemo() {
  return (
    <RadioGroup defaultValue="md">
      <RadioGroup.Label>Control Size</RadioGroup.Label>
      {['xs', 'sm', 'md', 'lg', 'xl'].map((size) => (
        <RadioGroup.Option key={size} value={size} size={size}>
          {size.toUpperCase()}
        </RadioGroup.Option>
      ))}
    </RadioGroup>
  );
}

//#endregion