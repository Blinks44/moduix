/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { useRadioGroup } from '@ark-ui/react/radio-group';
import { RadioGroup } from '@moduix/react';

const frameworks = ['React', 'Solid', 'Vue'];

export function RadioGroupRootProviderDemo() {
  const radioGroup = useRadioGroup({
    defaultValue: 'React',
  });
  return (
    <div className="radio-stack">
      <RadioGroup.RootProvider value={radioGroup}>
        <RadioGroup.Label>Framework</RadioGroup.Label>
        {frameworks.map((framework) => (
          <RadioGroup.Item key={framework} value={framework}>
            <RadioGroup.ItemControl />
            <RadioGroup.ItemText>{framework}</RadioGroup.ItemText>
            <RadioGroup.ItemHiddenInput />
          </RadioGroup.Item>
        ))}
      </RadioGroup.RootProvider>
      <button className="radio-button" type="button" onClick={() => radioGroup.setValue('Solid')}>
        Set to Solid
      </button>
    </div>
  );
}

//#endregion