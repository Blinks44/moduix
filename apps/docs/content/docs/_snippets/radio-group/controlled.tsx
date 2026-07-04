/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { RadioGroup } from '@moduix/react';
import { useState } from 'react';

const frameworks = ['React', 'Solid', 'Vue'];

export function ControlledRadioGroupDemo() {
  const [value, setValue] = useState(null as string | null);
  return (
    <RadioGroup value={value} onValueChange={(details) => setValue(details.value)}>
      <RadioGroup.Label>Framework</RadioGroup.Label>
      {frameworks.map((framework) => (
        <RadioGroup.Item key={framework} value={framework}>
          <RadioGroup.ItemControl />
          <RadioGroup.ItemText>{framework}</RadioGroup.ItemText>
          <RadioGroup.ItemHiddenInput />
        </RadioGroup.Item>
      ))}
    </RadioGroup>
  );
}

//#endregion