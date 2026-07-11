/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { SegmentGroup } from '@moduix/react';

const frameworks = [
  { value: 'React', label: 'React' },
  { value: 'Solid', label: 'Solid' },
  { value: 'Svelte', label: 'Svelte', disabled: true },
  { value: 'Vue', label: 'Vue' },
];

export function DisabledSegmentGroupDemo() {
  return (
    <SegmentGroup aria-label="Framework" defaultValue="React">
      <SegmentGroup.Indicator />
      <SegmentGroup.Items items={frameworks} />
    </SegmentGroup>
  );
}

//#endregion