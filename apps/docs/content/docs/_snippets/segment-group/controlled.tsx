/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { SegmentGroup } from '@moduix/react';
import { useState } from 'react';

const frameworks = ['React', 'Solid', 'Svelte', 'Vue'];

export function ControlledSegmentGroupDemo() {
  const [value, setValue] = useState('React' as string | null);
  return (
    <div className="segment-stack">
      <SegmentGroup
        aria-label="Framework"
        value={value}
        onValueChange={(details) => setValue(details.value)}
      >
        <SegmentGroup.Indicator />
        {frameworks.map((framework) => (
          <SegmentGroup.Item key={framework} value={framework}>
            <SegmentGroup.ItemText>{framework}</SegmentGroup.ItemText>
            <SegmentGroup.ItemControl />
            <SegmentGroup.ItemHiddenInput />
          </SegmentGroup.Item>
        ))}
      </SegmentGroup>
      <output className="segment-output">selected: {value ?? 'none'}</output>
    </div>
  );
}

//#endregion