/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { SegmentGroup } from '@moduix/react';

const views = ['List', 'Board', 'Calendar'];

export function VerticalSegmentGroupDemo() {
  return (
    <SegmentGroup
      aria-label="View"
      defaultValue="List"
      orientation="vertical"
      className="segment-vertical"
    >
      <SegmentGroup.Indicator />
      {views.map((view) => (
        <SegmentGroup.Item key={view} value={view}>
          <SegmentGroup.ItemText>{view}</SegmentGroup.ItemText>
          <SegmentGroup.ItemControl />
          <SegmentGroup.ItemHiddenInput />
        </SegmentGroup.Item>
      ))}
    </SegmentGroup>
  );
}

//#endregion