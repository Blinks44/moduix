/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { RadioGroup } from '@moduix/react';

const frameworks = ['React', 'Solid', 'Vue'];

export function RadioGroupOrientationDemo() {
  return (
    <RadioGroup orientation="horizontal" defaultValue="React">
      <RadioGroup.Label>Framework</RadioGroup.Label>
      <div className="radio-inline-items">
        {frameworks.map((framework) => (
          <RadioGroup.Item key={framework} value={framework}>
            <RadioGroup.ItemControl />
            <RadioGroup.ItemText>{framework}</RadioGroup.ItemText>
            <RadioGroup.ItemHiddenInput />
          </RadioGroup.Item>
        ))}
      </div>
    </RadioGroup>
  );
}

//#endregion