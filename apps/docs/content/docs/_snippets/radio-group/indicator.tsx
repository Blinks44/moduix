/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { RadioGroup } from '@moduix/react';

const frameworks = ['React', 'Solid', 'Vue'];

export function RadioGroupIndicatorDemo() {
  return (
    <div className="radio-indicator-stack">
      <div>Framework</div>
      <RadioGroup aria-label="Framework" defaultValue="React" className="radio-indicator-root">
        <RadioGroup.Indicator className="radio-group-indicator" />
        {frameworks.map((framework) => (
          <RadioGroup.Item key={framework} value={framework}>
            <RadioGroup.ItemControl />
            <RadioGroup.ItemText>{framework}</RadioGroup.ItemText>
            <RadioGroup.ItemHiddenInput />
          </RadioGroup.Item>
        ))}
      </RadioGroup>
    </div>
  );
}

//#endregion