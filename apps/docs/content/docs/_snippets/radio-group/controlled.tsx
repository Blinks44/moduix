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
        <RadioGroup.Option key={framework} value={framework}>
          {framework}
        </RadioGroup.Option>
      ))}
    </RadioGroup>
  );
}

//#endregion