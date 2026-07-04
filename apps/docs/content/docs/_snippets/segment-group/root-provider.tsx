/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { useSegmentGroup } from '@ark-ui/react/segment-group';
import { SegmentGroup } from '@moduix/react';

const frameworks = ['React', 'Solid', 'Svelte', 'Vue'];

export function SegmentGroupRootProviderDemo() {
  const segmentGroup = useSegmentGroup({
    defaultValue: 'React',
  });
  return (
    <div className="segment-stack">
      <SegmentGroup.RootProvider aria-label="Framework" value={segmentGroup}>
        <SegmentGroup.Indicator />
        {frameworks.map((framework) => (
          <SegmentGroup.Item key={framework} value={framework}>
            <SegmentGroup.ItemText>{framework}</SegmentGroup.ItemText>
            <SegmentGroup.ItemControl />
            <SegmentGroup.ItemHiddenInput />
          </SegmentGroup.Item>
        ))}
      </SegmentGroup.RootProvider>
      <button
        className="segment-button"
        type="button"
        onClick={() => segmentGroup.setValue('Solid')}
      >
        Set to Solid
      </button>
      <output className="segment-output">selected: {segmentGroup.value ?? 'none'}</output>
    </div>
  );
}

//#endregion