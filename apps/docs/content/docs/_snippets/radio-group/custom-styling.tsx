/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { RadioGroup } from '@moduix/react';

const frameworks = ['React', 'Solid', 'Vue'];

export function StyledRadioGroupDemo() {
  return (
    <RadioGroup defaultValue="React" className="radio-custom-root">
      <RadioGroup.Label className="radio-custom-label">Styled Framework</RadioGroup.Label>
      {frameworks.map((framework) => (
        <RadioGroup.Item key={framework} value={framework} className="radio-custom-item">
          <RadioGroup.ItemControl className="radio-custom-control" />
          <RadioGroup.ItemText className="radio-custom-text">{framework}</RadioGroup.ItemText>
          <RadioGroup.ItemHiddenInput />
        </RadioGroup.Item>
      ))}
    </RadioGroup>
  );
}

//#endregion