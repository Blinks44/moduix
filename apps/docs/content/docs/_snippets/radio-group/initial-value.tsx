/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { RadioGroup } from '@moduix/react';

const frameworks = ['React', 'Solid', 'Vue'];

export function InitialValueDemo() {
  return (
    <RadioGroup defaultValue="Solid">
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