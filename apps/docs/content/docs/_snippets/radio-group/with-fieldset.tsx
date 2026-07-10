/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { Fieldset, RadioGroup } from '@moduix/react';

const frameworks = ['React', 'Solid', 'Vue'];

export function RadioGroupFieldsetDemo() {
  return (
    <Fieldset>
      <Fieldset.Legend>Select a framework</Fieldset.Legend>
      <RadioGroup defaultValue="React">
        {frameworks.map((framework) => (
          <RadioGroup.Option key={framework} value={framework}>
            {framework}
          </RadioGroup.Option>
        ))}
      </RadioGroup>
    </Fieldset>
  );
}

//#endregion