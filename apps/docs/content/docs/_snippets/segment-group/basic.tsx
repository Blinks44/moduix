/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { SegmentGroup } from '@moduix/react';

const frameworks = ['React', 'Solid', 'Svelte', 'Vue'];

export function SegmentGroupDemo() {
  return (
    <SegmentGroup aria-label="Framework" defaultValue="React">
      <SegmentGroup.Indicator />
      {frameworks.map((framework) => (
        <SegmentGroup.Item key={framework} value={framework}>
          <SegmentGroup.ItemText>{framework}</SegmentGroup.ItemText>
          <SegmentGroup.ItemControl />
          <SegmentGroup.ItemHiddenInput />
        </SegmentGroup.Item>
      ))}
    </SegmentGroup>
  );
}

//#endregion