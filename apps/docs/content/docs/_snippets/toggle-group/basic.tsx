/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { ToggleGroup } from '@moduix/react';

const alignmentItems = [
  {
    value: 'left',
    label: 'Left',
  },
  {
    value: 'center',
    label: 'Center',
  },
  {
    value: 'right',
    label: 'Right',
  },
];

export function ToggleGroupDemo() {
  return (
    <ToggleGroup defaultValue={['left']} aria-label="Text alignment">
      {alignmentItems.map((item) => (
        <ToggleGroup.Item key={item.value} value={item.value}>
          {item.label}
        </ToggleGroup.Item>
      ))}
    </ToggleGroup>
  );
}

//#endregion