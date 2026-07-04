/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { SegmentGroup } from '@moduix/react';

const frameworks = ['React', 'Solid', 'Svelte', 'Vue'];

export function StyledSegmentGroupDemo() {
  return (
    <SegmentGroup aria-label="Framework" defaultValue="React" className="segment-custom-root">
      <SegmentGroup.Indicator />
      {frameworks.map((framework) => (
        <SegmentGroup.Item key={framework} value={framework} className="segment-custom-item">
          <SegmentGroup.ItemText>{framework}</SegmentGroup.ItemText>
          <SegmentGroup.ItemControl />
          <SegmentGroup.ItemHiddenInput />
        </SegmentGroup.Item>
      ))}
    </SegmentGroup>
  );
}

//#endregion